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
   const { id, subjectId, name, grades, ctxHandler } = props;

   const [firstTerm, setFirstTerm] = useState(grades.firstTerm);
   const [secondTerm, setSecondTerm] = useState(grades.secondTerm);
   const [conditionalRetake, setConditionalRetake] = useState(grades.conditionalRetake);
   const [creditInAdvance, setCreditInAdvance] = useState(grades.creditInAdvance);
   const [comission, setComission] = useState(grades.comission);
   const [isDisabled, setIsDisabled] = useState({
      secondTerm: true,
      conditionalRetake: true,
      creditInAdvance: true,
      comission: true,
   });

   useEffect(() => {
      if (firstTerm < 2) {
         setIsDisabled({
            secondTerm: true,
            conditionalRetake: true,
            creditInAdvance: true,
            comission: true,
         });
         setSecondTerm(1);
         setConditionalRetake(1);
         setCreditInAdvance(1);
         setComission(1);
      } else if (secondTerm < 2) {
         setIsDisabled({
            secondTerm: false,
            conditionalRetake: true,
            creditInAdvance: true,
            comission: true,
         });
         setConditionalRetake(1);
         setCreditInAdvance(1);
         setComission(1);
      } else if (conditionalRetake < 2) {
         setIsDisabled({
            secondTerm: false,
            conditionalRetake: false,
            creditInAdvance: true,
            comission: true,
         });
         setCreditInAdvance(1);
         setComission(1);
      } else if (creditInAdvance < 2) {
         setIsDisabled({
            secondTerm: false,
            conditionalRetake: false,
            creditInAdvance: false,
            comission: true,
         });
         setComission(1);
      } else {
         setIsDisabled({
            secondTerm: false,
            conditionalRetake: false,
            creditInAdvance: false,
            comission: false,
         });
      }
      const timeoutIndex = setTimeout(() => {
         setFirstTerm(roundGrade(firstTerm));
         setSecondTerm(roundGrade(secondTerm));
         setConditionalRetake(roundGrade(conditionalRetake));
         setCreditInAdvance(roundGrade(creditInAdvance));
         setComission(roundGrade(comission));
         ctxHandler({
            type: 'UPDATE_TYPE',
            subjectId,
            typeId: id,
            grades: { firstTerm, secondTerm, conditionalRetake, creditInAdvance, comission },
         });
      }, 500);
      return () => {
         clearTimeout(timeoutIndex);
      };
   }, [firstTerm, secondTerm, conditionalRetake, creditInAdvance, comission, subjectId, id]);

   const firstTermHandler = (e) => {
      setFirstTerm(parseFloat(e.target.value));
   };

   const secondTermHandler = (e) => {
      setSecondTerm(parseFloat(e.target.value));
   };

   const conditionalRetakeHandler = (e) => {
      setConditionalRetake(parseFloat(e.target.value));
   };

   const creditInAdvanceHandler = (e) => {
      setCreditInAdvance(parseFloat(e.target.value));
   };

   const comissionHandler = (e) => {
      setComission(parseFloat(e.target.value));
   };

   const typeDeleteHandler = () => {
      props.ctxHandler({ type: 'REMOVE_TYPE', subjectId, typeId: id });
   };

   return (
      <Fragment>
         <p className={styles['type__name']} onClick={typeDeleteHandler}>
            {name}
         </p>
         <div className={styles['type__grade']}>
            <input
               className={`${styles['type__input']} ${firstTerm < 2 && styles.disabled}`}
               name={`${id}-firstTerm`}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={firstTerm}
               onChange={firstTermHandler}
            />
         </div>
         <div className={styles['type__grade']}>
            <input
               className={`${styles['type__input']} ${secondTerm < 2 && !isDisabled.secondTerm && styles.disabled}`}
               name={`${id}-secondTerm`}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={secondTerm}
               onChange={secondTermHandler}
               disabled={isDisabled.secondTerm}
            />
         </div>
         <div className={styles['type__grade']}>
            <input
               className={`${styles['type__input']} ${
                  conditionalRetake < 2 && !isDisabled.conditionalRetake && styles.disabled
               }`}
               name={`${id}-conditionalRetake`}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={conditionalRetake}
               onChange={conditionalRetakeHandler}
               disabled={isDisabled.conditionalRetake}
            />
         </div>
         <div className={styles['type__grade']}>
            <input
               className={`${styles['type__input']} ${
                  creditInAdvance < 2 && !isDisabled.creditInAdvance && styles.disabled
               }`}
               name={`${id}-creditInAdvance`}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={creditInAdvance}
               onChange={creditInAdvanceHandler}
               disabled={isDisabled.creditInAdvance}
            />
         </div>
         <div className={styles['type__grade']}>
            <input
               className={`${styles['type__input']} ${comission < 2 && !isDisabled.comission && styles.disabled}`}
               name={`${id}-comission`}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={comission}
               onChange={comissionHandler}
               disabled={isDisabled.comission}
            />
         </div>
      </Fragment>
   );
};

export default SubjectType;
