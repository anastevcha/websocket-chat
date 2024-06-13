import React, { useState } from "react";
import { useEffect } from "react";
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import EmojiPicker from "emoji-picker-react";

import styles from "../styles/Chat.module.css"
import emoji from "../images/emoji.png";
import Messages from "./Messages";



const socket = io.connect('https://websocket-chat-server-9j13.onrender.com')

const Chat = () => { 
   const { search } = useLocation();
   const navigate = useNavigate();
   const [params, setParams] = useState({room: "", user:""});
   const [state, setState] = useState([]);
   const [message, setMesage] = useState("");
   const [isOpen, setOpen] = useState(false);
   const [users, setUsers] = useState(0);

   useEffect(() => {
      const searchParams = Object.fromEntries(new URLSearchParams(search));
      setParams(searchParams);
      socket.emit("join", searchParams);
    }, [search]);

   useEffect(() => {
      socket.on("message", ({ data }) =>{

         setState((_state => [..._state, data]));
         console.log(data);
      });
   }, []);

   useEffect(() => {
      socket.on("room", ({ data: { users } }) => {
        setUsers(users.length);
      });
    }, []);

   console.log(state);

   const leftRoom = () => {
      socket.emit("leftRoom", { params });
      navigate("/");
    };


   const handleChange = ({target: {value}}) => setMesage(value);

   const handleSubmit = (e) => {
      e.preventDefault();
      
      if(!message) return;

      socket.emit("sendMessage", {message, params});

      setMesage("");
   };

   const onEmojiClick = ({emoji}) => setMesage(`${message} ${emoji}`);


   return(
      <div className={styles.wrap}>
         <div className={styles.header}>
             <div className={styles.title}>
               {params.room}
             </div>
             <div className={styles.users}>
             {users} пользователей в этой комнате
             </div>
             <button className={styles.left} onClick={leftRoom}>
               Покинуть комнату
             </button>
         </div>
         <div className={styles.messages}>
            <Messages messages = {state} name={params.name} />
         </div>

         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input}>
            <input 
               type="text" 
               name="message" 
               placeholder="Ваше сообщение"
               value={message}
               onChange={handleChange}
               autoComplete="off"
               required
            />       
            </div>

            <div className={styles.emoji}>
               <img src={emoji} alt="" onClick={() => setOpen(!isOpen)}/>

               {isOpen &&(
                  <div className={styles.emojies}>
                     <EmojiPicker onEmojiClick={onEmojiClick}/>
                  </div>
               )}
            </div>

            <div className="styles.button">
               <input type="submit" onSubmit={handleSubmit} value="Отправить сообщение"/>
            </div>
         </form>
         
      </div>
   );
};

export default Chat;