import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  // Auto scroll xuống tin nhắn mới nhất
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4 rounded-lg">
      {/* Tiêu đề */}
      <div className="text-lg font-semibold text-center text-gray-800 mb-2">
        Chat with AI
      </div>

      {/* Chat messages container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto bg-white rounded-lg p-4 shadow"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 m-1 rounded-lg w-fit max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="flex items-center p-2 bg-white rounded-lg shadow mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Nhấn Enter để gửi
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
