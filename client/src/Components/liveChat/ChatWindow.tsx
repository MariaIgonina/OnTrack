import React, { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import { Scrollbar } from "react-scrollbars-custom";

interface ChatWidnowProps {
  trackId: number; // Add a trackId prop for the specific chat room
}
const ChatWindow: React.FC<ChatWidnowProps> = ({ trackId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const toggleChatWindow = () => {
    setIsOpen((prevState) => !prevState);
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-md transition-height duration-300 ${
        isOpen ? "h-96" : "h-12"
      }`}
    >
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none"
        onClick={toggleChatWindow}
      >
        Open Chat
      </button>
      {isOpen && (
        <div className="max-h-80 overflow-y-auto" ref={chatContainerRef}>
          <Chat trackId={trackId} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
