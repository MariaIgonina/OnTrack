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
      className={`fixed bottom-9 right-9 bg-white p-4 rounded-lg shadow-md transition-height duration-300 z-50 ${
        isOpen ? "h-96" : "h-12"
      }`}
    >
      <button
        className="w-auto bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
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
