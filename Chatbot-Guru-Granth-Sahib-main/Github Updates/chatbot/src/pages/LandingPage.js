// src/pages/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-indigo-900 min-h-screen flex flex-col items-center justify-center text-white">
      {/* Ek Onkar Image */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <img
          src="/Ekonkar.jpg"
          alt="Ek Onkar"
          className="w-95 h-95"
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        AI CHATBOT FOR SHRI GURU GRANTH SAHIB JI
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-2xl text-center max-w-2xl mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      >
        Discover wisdom from Guru Granth Sahib and the Sikh Encyclopedia. Learn
        with ease.
      </motion.p>

      {/* Launch Chatbot Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        <Link to="/chatbot">
          <button className="px-6 py-3 bg-orange-600 hover:bg-orange-800 rounded-lg text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300">
          Ask the Eternal Guru
          </button>
        </Link>
      </motion.div>
      
    </div>
  );
};

export default LandingPage;
