import React from 'react';

import styles from './Button.module.css';

const Button = (props) => {
   return (
      <button
         type={props.type ? props.type : 'button'}
         className={`${props.className ? props.className : ''} ${styles.button}`}
         onClick={props.onClick}
      >
         {props.text}
      </button>
   );
};

export default Button;
