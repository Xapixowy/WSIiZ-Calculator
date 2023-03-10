import React from 'react';

import styles from './Subject.module.css';
import SubjectType from './SubjectType';
import Button from '../UI/Button';

const Subject = (props) => {
   const { name, gpa, types } = props;

   const subjectTypes = types.map((type) => (
      <SubjectType key={type.id} id={type.id} name={type.name} grades={type.grades} />
   ));

   return (
      <div className={styles.subject}>
         <h2 className={styles['subject__name']}>{name}</h2>
         <div className={styles.types}>
            <h3>Name</h3>
            <h3>First term</h3>
            <h3>Second term</h3>
            <h3>Conditional retake</h3>
            <h3>Credit in advance</h3>
            <h3>Comission</h3>
            {subjectTypes}
            <div className={styles.controls}>
               <Button>Add new type</Button>
            </div>
         </div>
         <p className={styles['subject__final']}>
            Final grade: <span className={styles.primary}>{gpa.worstCase}</span> |{' '}
            <span className={styles.secondary}>{gpa.currentCase}</span> |{' '}
            <span className={styles.tertiary}>{gpa.bestCase}</span>
         </p>
      </div>
   );
};

export default Subject;
