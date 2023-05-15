import React, { useEffect, useState } from "react";
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

interface ChatBoxProps {
  trackId: number; // Add a trackId prop for the specific chat room
}

const Chat: React.FC<ChatBoxProps> = ({ trackId }) => {
  const [messageText, setMessageText] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.message.messages);
  //   const messageNew = useSelector((state: RootState) => state.message.message);

  console.log("messages chatbox", messages);
  useEffect(() => {
    dispatch(fetchMessagesByTrack(1)); //! to add current trackID as room
    socket.emit("joinRoom", 1);
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
      <div className="chat-box">
        <ul>
          {messages.length &&
            messages.map((message, index) => (
              <li
                key={index}
                // className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-[#D7E7E8]p-3 m-2 mr-4 ml-2"
                className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md p-3 m-2 mt-2 mr-4 bg-[#FFE8D1]"
              >
                <p>
                  <strong>{message.author}:</strong> {message.text}
                </p>
                <p>{JSON.stringify(message.date)}</p>
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
    </div>
  );
};

export default Chat;
