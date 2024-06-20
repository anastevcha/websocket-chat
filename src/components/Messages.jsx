import React from "react";

import styles from "../styles/Messages.module.css";

const Messages = ({ messages, name, typingUsers }) => {
  return (
    <div className={styles.messages}>
      {messages.map(({ user, message }, i) => {
        const itsMe =
          user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const isTyping = typingUsers && typingUsers.includes(user.name);
        const className = itsMe ? styles.me : styles.user;
        return (
          <div key={i} className={`${styles.message} ${className}`}>
            <span className={styles.user}>{user.name}</span>
            <div className={styles.text}>{message}</div>
            {isTyping && <div className={styles.typingMessage}>Кто-то печатает...</div>}
          </div>
        );
      })}
    </div>
  );
};
export default Messages;