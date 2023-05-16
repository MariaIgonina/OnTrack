import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessage,
  fetchMessagesByTrack,
  newMessageReceived,
  selectmessage,
} from "../../store/messageSlice";
import { Message } from "../../Interfaces";
import { RootState } from "../../store/store";
import { socket } from "../../store/socket";
import moment from "moment";

interface ChatBoxProps {
  trackId: number; // Add a trackId prop for the specific chat room
}

const Chat: React.FC<ChatBoxProps> = ({ trackId }) => {
  const [messageText, setMessageText] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.message.messages);
  //   const messageNew = useSelector((state: RootState) => state.message.message);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const currentUserRole = useSelector((s: RootState) => s.currentUser.role);

  console.log("messages chatbox", messages);
  useEffect(() => {
    dispatch(fetchMessagesByTrack(trackId)); //! to add current trackID as room
    socket.emit("joinRoom", trackId);
  }, []);
  useEffect(() => {
    socket.on("receive_message", (newMessage: any) => {
      console.log("newMessge from socket:", newMessage);
      dispatch(newMessageReceived(newMessage));
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket]); // socket also?
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const sendMessage = () => {
    if (messageText.trim() === "") {
      return;
    }
    const newMessage: Message = {
      //   id: Date.now(),
      trackId: trackId, // ! to be changed?
      text: messageText,
      date: new Date().toISOString(),
      author: "Recruiter", // !To be changed
      files: [],
    };
    dispatch(createMessage(newMessage));
    dispatch(newMessageReceived(newMessage));
    setMessageText("");
  };

  return (
    <div>
      <div className="chat-box z-50">
        <ul>
          {messages.length &&
            messages.map((message, index) => (
              <li
                key={index}
                className={`flex-shrink-0 flex-grow flex items-start rounded-2xl shadow-md p-3 m-2 mt-2 ${
                  currentUserRole === message.author
                    ? "mr-4 bg-[#FFE8D1]"
                    : "ml-4 bg-[#D7E7E8]"
                }`}
              >
                <img
                  src={message.Track?.Vacancy?.recruiter?.logo}
                  alt="logo"
                  className="w-12 h-12 rounded-full mr-4" // Added margin-right (mr-4) for spacing between the logo and text
                />
                <div className="flex flex-col">
                  <p>
                    <strong>{message.Track?.Vacancy?.recruiter?.name}:</strong>{" "}
                    {message.text}
                  </p>
                  <p>{moment(message.date).format("MMMM Do, h:mm a")}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <input
        type="text"
        className="py-2 px-3 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
        placeholder="Type a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="w-auto bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
      >
        Send
      </button>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
