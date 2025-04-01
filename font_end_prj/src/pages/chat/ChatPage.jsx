import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);
  
  useEffect(() => {
    // Kiểm tra nếu Dialogflow Messenger chưa được thêm
    if (!document.querySelector("df-messenger")) {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;
      document.body.appendChild(script);

      const messenger = document.createElement("df-messenger");
      messenger.setAttribute("intent", "WELCOME");
      messenger.setAttribute("chat-title", "AI_COOKWIKI");
      messenger.setAttribute("agent-id", "f7e6cbda-cc5b-4b18-90ed-6e3458158af4");
      messenger.setAttribute("language-code", "en");
      document.body.appendChild(messenger);
    }
  }, []);

  // Hàm gửi tin nhắn lên Dialogflow
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
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