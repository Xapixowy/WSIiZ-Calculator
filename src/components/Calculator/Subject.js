import React, { useState } from 'react';

import styles from './Subject.module.css';
import SubjectType from './SubjectType';
import Button from '../UI/Button';
import NewType from '../Prompts/NewType';

const Subject = (props) => {
   const { id, name, gpa, types } = props;

   const [isPrompt, setIsPrompt] = useState(false);

   const showNewTypePrompt = () => {
      setIsPrompt(true);
   };

   const hideNewTypePrompt = () => {
      setIsPrompt(false);
   };

   const deleteSubjectHandler = () => {
      props.ctxHandler({ type: 'REMOVE_SUBJECT', id });
   };

   const subjectTypes = types.map((type) => (
      <SubjectType
         key={type.id}
         id={type.id}
         subjectId={id}
         name={type.name}
         grades={type.grades}
         ctxHandler={props.ctxHandler}
      />
   ));

   return (
      <div className={styles.subject}>
         {isPrompt && <NewType onClose={hideNewTypePrompt} subjectId={id} />}
         <h2 className={styles['subject__name']} onClick={deleteSubjectHandler}>
            {name}
         </h2>
         <div className={styles.types}>
            <h3>Name</h3>
            <h3>First term</h3>
            <h3>Second term</h3>
            <h3>Conditional retake</h3>
            <h3>Credit in advance</h3>
            <h3>Comission</h3>
            {subjectTypes}
            <div className={styles.controls}>
               <Button onClick={showNewTypePrompt}>Add new type</Button>
            </div>
         </div>
         <p className={styles['subject__final']}>
            Final grade: <span className={styles.primary}>{gpa.worstCase.toFixed(2)}</span> |{' '}
            <span className={styles.secondary}>{gpa.currentCase.toFixed(2)}</span> |{' '}
            <span className={styles.tertiary}>{gpa.bestCase.toFixed(2)}</span>
         </p>
      </div>
   );
};

export default Subject;
