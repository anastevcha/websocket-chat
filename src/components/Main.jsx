import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

import styles from '../styles/Main.module.css';

const FIELDS = {
   NAME: "name",
   ROOM: "room",
};

const Main = () => {
   const {NAME, ROOM} = FIELDS;
   
   const [values, setValues] = useState({[NAME]:"", [ROOM]:""}); 

   console.log(values);

   const handleChange = ({target: {value, name}}) => {
      setValues({...values, [name]:value});
   };

   const handleClick = (e) => {
      const isDisabled = Object.values(values).some((value) => !value);
      console.log(isDisabled);
      if(isDisabled) e.preventDefault();
   };

   return(<div className="{styles.wrap}">
            <div className="{styles.container}">
               <h1 className={styles.heading}>Вход</h1>
               
               <form action="" className={styles.form}>
                  <div className={styles.group}>
                     <input 
                     type="text" 
                     name="name" 
                     placeholder="Имя пользователя"
                     value={values[NAME]} 
                     className={styles.input} 
                     autoComplete="off"
                     required
                     onChange={handleChange}/>
                  </div>
                  <div className={styles.group}>
                     <input 
                     type="text" 
                     name="room" 
                     placeholder="Название комнаты"
                     value={values[ROOM]}
                     className={styles.input} 
                     onChange={handleChange}
                     autoComplete="off"
                     required/>
                  </div>

                  <Link onClick={handleClick} 
                  className={styles.group} 
                  to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
                  >

                     <button type="submit" className={styles.button}>Зайти в комнату</button>
                  </Link>
               </form>
            </div>
         </div>
   );
};

export default Main;