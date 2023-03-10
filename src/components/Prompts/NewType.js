import React, { useState, useEffect, useContext, Fragment } from 'react';
import { createPortal } from 'react-dom';

import styles from './NewSubject.module.css';

import Button from '../UI/Button';
import CalculatorContext from '../../store/calculator-context';

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

const Backdrop = (props) => {
   return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const Prompt = (props) => {
   const { subjectId } = props;

   const ctx = useContext(CalculatorContext);

   const [typeName, setTypeName] = useState('');
   const [firstTerm, setFirstTerm] = useState(1);
   const [secondTerm, setSecondTerm] = useState(1);
   const [conditionalRetake, setConditionalRetake] = useState(1);
   const [creditInAdvance, setCreditInAdvance] = useState(1);
   const [comission, setComission] = useState(1);

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
      }, 500);
      return () => {
         clearTimeout(timeoutIndex);
      };
   }, [firstTerm, secondTerm, conditionalRetake, creditInAdvance, comission]);

   const typeNameHandler = (e) => {
      setTypeName(e.target.value);
   };

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

   const submitHandler = (e) => {
      e.preventDefault();
      const typeToAdd = {
         name: typeName,
         grades: {
            firstTerm,
            secondTerm,
            conditionalRetake,
            creditInAdvance,
            comission,
         },
      };
      ctx.dispatch({ type: 'ADD_TYPE', subjectId, typeToAdd });
      props.onClose();
   };

   return (
      <div className={styles.prompt}>
         <header>Add new type</header>
         <form onSubmit={submitHandler}>
            <label htmlFor={styles['type__name']}>Type name:</label>
            <input
               id={styles['type__name']}
               name="typeName"
               type="text"
               value={typeName}
               onChange={typeNameHandler}
               placeholder="Lecture"
               minLength={3}
               maxLength={25}
               required
            />
            <div className={styles.types}>
               <h3>First term</h3>
               <h3>Second term</h3>
               <h3>Conditional retake</h3>
               <h3>Credit in advance</h3>
               <h3>Comission</h3>
               <div className={styles['type__grade']}>
                  <input
                     className={`${styles['type__input']} ${firstTerm < 2 && styles.disabled}`}
                     name="firstTerm"
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
                     className={`${styles['type__input']} ${
                        secondTerm < 2 && !isDisabled.secondTerm && styles.disabled
                     }`}
                     name="secondTerm"
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
                     name="conditionalRetake"
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
                     name="creditInAdvance"
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
                     name="comission"
                     type="number"
                     min="1"
                     max="5"
                     step="0.5"
                     value={comission}
                     onChange={comissionHandler}
                     disabled={isDisabled.comission}
                  />
               </div>
            </div>
            <div className={styles.controls}>
               <Button type="submit">Confirm</Button>
               <Button onClick={props.onClose}>Close</Button>
            </div>
         </form>
      </div>
   );
};

const NewSubject = (props) => {
   return (
      <Fragment>
         {createPortal(<Backdrop onClose={props.onClose} />, document.getElementById('prompt'))}
         {createPortal(
            <Prompt onClose={props.onClose} subjectId={props.subjectId} />,
            document.getElementById('prompt'),
         )}
      </Fragment>
   );
};

export default NewSubject;
