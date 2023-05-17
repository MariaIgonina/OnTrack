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
      className={`fixed bottom-9 right-9 bg-white p-4 rounded-lg z-50 shadow-md transition-all duration-300 flex flex-col ${
        isOpen ? "h-[450px] w-[450px]" : "h-15 w-auto"
      }`}
    >
      <button
        className="w-[150px] bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2 focus:outline-none"
        onClick={toggleChatWindow}
      >
        Open Chat
      </button>
      {isOpen && (
        <div
          className="h-full overflow-y-auto mt-4 flex-grow"
          ref={chatContainerRef}
        >
          <Chat trackId={trackId} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
