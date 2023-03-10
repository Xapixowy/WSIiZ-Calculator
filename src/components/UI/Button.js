import React from 'react';

import styles from './Button.module.css';

const Button = (props) => {
   return (
      <button
         onClick={props.onClick ? props.onClick : undefined}
         type={props.type ? props.type : 'button'}
         className={`${styles.button} ${props.className ? props.className : ''}`}
      >
         {props.children}
      </button>
   );
};

export default Button;
