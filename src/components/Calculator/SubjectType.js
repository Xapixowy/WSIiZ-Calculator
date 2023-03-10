import React, { Fragment, useState, useEffect } from 'react';

import styles from './SubjectType.module.css';

const roundGrade = (grade) => {
   if (grade < 1.75) return 1;
   else if (grade >= 1.75 && grade < 2.25) return 2;
   else if (grade >= 2.25 && grade < 2.75) return 2.5;
   else if (grade >= 2.75 && grade < 3.25) return 3;
   else if (grade >= 3.25 && grade < 3.75) return 3.5;
   else if (grade >= 3.75 && grade < 4.25) return 4;
   else if (grade >= 4.25 && grade < 4.75) return 4.5;
   else return 5;
};

const SubjectType = (props) => {
   const { id, name, grades } = props;

   const [isDisabled, setIsDisabled] = useState({
      secondTerm: true,
      conditionalRetake: true,
      creditInAdvance: true,
      comission: true,
   });

   useEffect(() => {
      if (grades.firstTerm < 2) {
         setIsDisabled({
            secondTerm: true,
            conditionalRetake: true,
            creditInAdvance: true,
            comission: true,
         });
      } else if (grades.secondTerm < 2) {
         setIsDisabled({
            secondTerm: false,
            conditionalRetake: true,
            creditInAdvance: true,
            comission: true,
         });
      } else if (grades.conditionalRetake < 2) {
         setIsDisabled({
            secondTerm: false,
            conditionalRetake: false,
            creditInAdvance: true,
            comission: true,
         });
      } else if (grades.creditInAdvance < 2) {
         setIsDisabled({
            secondTerm: false,
            conditionalRetake: false,
            creditInAdvance: false,
            comission: true,
         });
      } else {
         setIsDisabled({
            secondTerm: false,
            conditionalRetake: false,
            creditInAdvance: false,
            comission: false,
         });
      }
   }, [grades]);

   return (
      <Fragment>
         <p className={styles['type__name']}>{name}</p>
         <div className={styles['type__grade']}>
            <input
               className={`${styles['type__input']} ${grades.firstTerm < 2 && styles.disabled}`}
               name={`${id}-firstTerm`}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={grades.firstTerm}
            />
         </div>
         <div className={styles['type__grade']}>
            <input
               className={`${styles['type__input']} ${
                  grades.secondTerm < 2 && !isDisabled.secondTerm && styles.disabled
               }`}
               name={`${id}-secondTerm`}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={grades.secondTerm}
               disabled={isDisabled.secondTerm}
            />
         </div>
         <div className={styles['type__grade']}>
            <input
               className={`${styles['type__input']} ${
                  grades.conditionalRetake < 2 && !isDisabled.conditionalRetake && styles.disabled
               }`}
               name={`${id}-conditionalRetake`}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={grades.conditionalRetake}
               disabled={isDisabled.conditionalRetake}
            />
         </div>
         <div className={styles['type__grade']}>
            <input
               className={`${styles['type__input']} ${
                  grades.creditInAdvance < 2 && !isDisabled.creditInAdvance && styles.disabled
               }`}
               name={`${id}-creditInAdvance`}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={grades.creditInAdvance}
               disabled={isDisabled.creditInAdvance}
            />
         </div>
         <div className={styles['type__grade']}>
            <input
               className={`${styles['type__input']} ${
                  grades.comission < 2 && !isDisabled.comission && styles.disabled
               }`}
               name={`${id}-comission`}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={grades.comission}
               disabled={isDisabled.comission}
            />
         </div>
      </Fragment>
   );
};

export default SubjectType;
