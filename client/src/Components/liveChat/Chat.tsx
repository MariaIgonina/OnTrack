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
  }, [messageText]);
  useEffect(() => {
    dispatch(fetchMessagesByTrack(trackId)); //! to add current trackID as room
  }, [messages]);
  useEffect(() => {
    socket.on("receive_message", (newMessage: any) => {
      console.log("newMessge from socket:", newMessage);
      dispatch(newMessageReceived(newMessage));
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messageText, trackId]); // socket also?
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
      author: currentUserRole, // !To be changed
      files: [],
    };
    dispatch(createMessage(newMessage));
    setMessageText("");
  };

  return (
    <div>
      <div className="chat-box overflow-y-auto">
        <ul>
          {messages.length &&
            messages.map((message, index) => (
              <li
                key={index}
                className={`flex-shrink-0 flex-grow flex items-start rounded-2xl shadow-md p-3 m-2 mt-2 w-[75%] overflow-hidden ${
                  currentUserRole === message.author
                    ? "ml-[90px] bg-[#FFE8D1]"
                    : "mr-[90px] bg-[#D7E7E8]"
                }`}
              >
                <img
                  src={
                    message.author === "applicant"
                      ? message.Track?.Applicant?.picture
                      : message.Track?.Vacancy?.recruiter?.logo
                  }
                  alt="logo"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex flex-col">
                  <p>
                    <strong>
                      {message.author === "applicant"
                        ? message.Track?.Applicant?.name
                        : message.Track?.Vacancy?.recruiter?.name}
                      :
                    </strong>{" "}
                    {moment(message.date).format("h:mm a")}
                  </p>
                  <p className="wrap h-fit">{message.text}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="py-2 px-3 rounded-lg border color-grey-100 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent w-[275px]"
          placeholder="Type a message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent the default behavior of the Enter key (submitting the form)
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="w-auto bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2 ml-[20px]"
        >
          Send
        </button>
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
