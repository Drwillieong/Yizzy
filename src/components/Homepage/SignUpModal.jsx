import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; // Adjust the import according to your firebase setup
import { createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, sendEmailVerification, deleteUser } from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

const SignUpModal = ({ showSignUpModal, setShowSignUpModal }) => {
  const navigate = useNavigate();
  const [showEmailForm, setShowEmailForm] = useState(false); // Manage state internally
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const sendVerificationEmail = async (user) => {
    try {
      // Send the verification email
      await sendEmailVerification(user);

      // Custom email content
      const emailContent = `
        Welcome to VYBE!
        Dear user,

        Welcome to VYBE! Your registration reference number is VL81629098691896.

        Enjoy a maximum of Php 10,000 wallet balance and Php 10,000 incoming credits per month as well as these other features!

        - Send Money to other VYBE users
        - Scan to Pay Merchants

        For inquiries and comments, please visit the Contact Us page at the VYBE App or call our 24-hour BPI Contact Center at (+632) 889-10000.

        Thank you for joining the VYBE!

        VYBE Team

        *** This is a system-generated message. DO NOT REPLY TO THIS EMAIL. ***
      `;

      // Log the email content (you can replace this with an actual email service)
      console.log("Verification email sent:", emailContent);

      alert("A verification email has been sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      alert("Failed to send verification email. Please try again.");
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();

    const { firstName, lastName, contact, email, password, agreeToTerms } = formData;
    if (!firstName || !lastName || !contact || !email || !password || !agreeToTerms) {
      alert("All fields are required, and you must agree to the terms.");
      return;
    }

    try {
      // Check if the email is already registered
      const userRef = doc(db, "users", email);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        alert("This email is already registered. Redirecting to login...");
        navigate("/login");
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email with custom message
      await sendVerificationEmail(user);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        contact,
        email: user.email,
        role: "customer",
      });

      // Close the modal and navigate to login
      setShowSignUpModal(false);
      setShowEmailForm(false);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Failed to sign up. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        alert("This Google account is already registered. Redirecting to login...");
        navigate("/login");
        return;
      }

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "customer",
        provider: "Google",
      });

      // Send verification email with custom message
      await sendVerificationEmail(user);

      alert(`Signed up successfully using Google: ${user.email}`);
      setShowSignUpModal(false);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up with Google:", error);
      alert("Failed to sign up with Google. Please try again.");
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        alert("This Facebook account is already registered. Redirecting to login...");
        navigate("/login");
        return;
      }

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "customer",
        provider: "Facebook",
      });

      // Send verification email with custom message
      await sendVerificationEmail(user);

      alert(`Signed up successfully using Facebook: ${user.email}`);
      setShowSignUpModal(false);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up with Facebook:", error);
      alert("Failed to sign up with Facebook. Please try again.");
    }
  };

  return (
    <>
      {/* Main Sign-Up Modal */}
      {showSignUpModal && !showEmailForm && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-lg font-bold mb-4">Sign Up</h2>
            <button onClick={handleGoogleSignUp} className="w-full border py-2 rounded-md flex items-center justify-center mb-3">
              Sign up with Google
            </button>
            <button onClick={handleFacebookSignUp} className="w-full border py-2 rounded-md flex items-center justify-center mb-3">
              Sign up with Facebook
            </button>
            <button onClick={() => setShowEmailForm(true)} className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold">
              Sign up with Email
            </button>
            <p className="mt-3 text-gray-500">
              Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Log in instead</span>
            </p>
            <button onClick={() => setShowSignUpModal(false)} className="mt-3 text-gray-500">Close</button>
          </div>
        </div>
      )}

      {/* Email Sign-Up Modal */}
      {showEmailForm && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Sign Up with Email</h2>
            <form onSubmit={handleEmailSignUp}>
              <input type="text" name="firstName" placeholder="First Name" className="w-full border rounded-md p-2 mb-3" onChange={handleChange} />
              <input type="text" name="lastName" placeholder="Last Name" className="w-full border rounded-md p-2 mb-3" onChange={handleChange} />
              <input type="text" name="contact" placeholder="Contact Number" className="w-full border rounded-md p-2 mb-3" onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" className="w-full border rounded-md p-2 mb-3" onChange={handleChange} />
              <input type="password" name="password" placeholder="Password" className="w-full border rounded-md p-2 mb-3" onChange={handleChange} />
              <label className="flex items-center text-sm mb-3">
                <input type="checkbox" name="agreeToTerms" className="mr-2" onChange={handleChange} />
                I agree to the <span className="text-blue-500 cursor-pointer ml-1">Terms & Privacy Policy</span>
              </label>
              <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold">Sign Up</button>
            </form>
            <button onClick={() => setShowEmailForm(false)} className="mt-3 text-gray-500">Back</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpModal;