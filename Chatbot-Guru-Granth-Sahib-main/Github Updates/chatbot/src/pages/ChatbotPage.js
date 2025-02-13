import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Swal from "sweetalert2";
import "../App.css"; 

const ChatbotPage = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileContent, setFileContent] = useState(""); 

  const chatBodyRef = useRef(null);

  const scrollToBottom = () => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch("/data.txt");
        const text = await response.text();
        setFileContent(text);
      } catch (error) {
        console.error("Error fetching file:", error);
        setFileContent("Failed to load file content.");
      }
    };
    fetchFileContent();
  }, []);

  const handleSendMessage = async () => {
    if (isLoading) {
      Swal.fire({
        icon: "info",
        title: "Please wait",
        text: "Only one question can be answered at a time.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setChatHistory((prev) => [...prev, userMessage]);

    setInput("");

    try {
      setIsLoading(true);

      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {
                text: fileContent, 
              },
              {
                text: "Only answer the question from this file. If the question is not in the file, say 'I am a personalized chatbot trained from Guru Granth Sahib, so this question is out of my context.'",
              },
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage(input);

      const botMessage = { role: "bot", text: result.response.text() };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, due to internet issue an error occurred. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (isLoading) {
      Swal.fire({
        icon: "info",
        title: "Please wait",
        text: "Only one question can be answered at a time.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <img src="/Ekonkar.jpg" alt="Logo" className="chat-header-image" />
        <h2>The Eternal Guru</h2>
      </div>
      <div className="chat-body" ref={chatBodyRef}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.role === "user" ? "user-message" : "bot-message"
            }`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && <div className="loading">Generating response...Please Wait !</div>}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
        >
          Ask
        </button>
      </div>
      <h8 id="note">
        Disclaimer: This AI chatbot is trained from {" "}
        <a
          id="name"
          target="blank"
          href="https://www.jainfoundation.in/JAINLIBRARY/books/guru_granth_sahib_034116_data.pdf"
        >
          Guru Granth Sahib
        </a>
        , but may not always provide accurate answers.
      </h8>
    </div>
  );
};

export default ChatbotPage;
