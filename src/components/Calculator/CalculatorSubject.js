import React from 'react';
import Button from '../UI/Button';

import styles from './CalculatorSubject.module.css';

const CalculatorSubject = (props) => {
   return (
      <div className={styles['subject']}>
         <h2 className={styles['subject__name']}>{props.name}</h2>
         <div className={styles['subject__final']}>
            Final grade: <span className={styles['subject__final-min']}>{props.min.toFixed(2)}</span> |{' '}
            <span className={styles['subject__final-current']}>{props.current.toFixed(2)}</span> |{' '}
            <span className={styles['subject__final-max']}>{props.max.toFixed(2)}</span>
         </div>
         <div className={styles['subject__types']}>
            <div className={styles['subject__types-header']}>
               <div></div>
               <div>Term 1:</div>
               <div>Term 2:</div>
            </div>
            {props.types.map((type) => (
               <div className={styles['subject__types-type']}>
                  <div>{type.name}:</div>
                  <div>
                     <input type="number" min="1" max="5" step="0.5" value={type.term1 ? type.term1 : 1} />
                  </div>
                  <div>
                     <input type="number" min="1" max="5" step="0.5" value={type.term2 ? type.term2 : 1} />
                  </div>
               </div>
            ))}
            <Button className={styles['subject__types-button']} text="Add new type" />
         </div>
      </div>
   );
};

export default CalculatorSubject;
