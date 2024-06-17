"use client";
import React, { useState, useEffect } from "react";
import Message from "@/components/Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.log("Error Fetching Messages: ", error);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);

  return loading ? (
    <h1 className="text-center text-gray-500">Loading...</h1>
  ) : (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500">No messages found.</p>
            ) : (
              messages.map((message, index) => <Message key={message._id} message={message} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
