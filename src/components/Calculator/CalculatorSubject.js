import React from 'react';
import Button from '../UI/Button';

import styles from './CalculatorSubject.module.css';
import CalculatorSubjectType from './CalculatorSubjectType';

const roundGrade = (value) => {
   if (value < 1.5) return 1;
   else if (value < 2.25) return 2;
   else if (value < 2.75) return 2.5;
   else if (value < 3.25) return 3;
   else if (value < 3.75) return 3.5;
   else if (value < 4.25) return 4;
   else if (value < 4.75) return 4.5;
   else return 5;
};

const CalculatorSubject = (props) => {
   const subject = props.subject;

   const [subjectFinal, setSubjectFinal] = React.useState(subject.final);
   const [subjectTypes, setSubjectTypes] = React.useState(subject.types);

   React.useEffect(() => {
      console.log(subjectTypes);
      const final = { ...subjectFinal };
      subjectTypes.forEach((type) => {
         if (type.term1 < 2) {
            final.min = 2.5;
            final.current = 0;
            final.max = 5;
         } else if (type.term1 < 3 && type.term2 < 2) {
            final.min = roundGrade((type.term1 + 3) / 2);
            final.current = type.term1;
            final.max = roundGrade((type.term1 + 5) / 2);
         } else if (type.term2 < 2) {
            final.min = type.term1;
            final.current = type.term1;
            final.max = roundGrade((type.term1 + 5) / 2);
         } else if (type.term1 >= type.term2) {
            final.min = final.current = final.max = type.term1;
         } else {
            final.min = final.current = final.max = roundGrade((type.term1 + type.term2) / 2);
         }
      });
      setSubjectFinal(final);
   }, [subjectTypes]);

   const removeSubjectHandler = () => {
      props.removeSubjectHandler(props.subject.id);
   };

   const updateTypeHandler = (args) => {
      const { id, term1, term2 } = args;
      const types = [...subjectTypes];
      const editedIndex = types.findIndex((item) => item.id === id);
      types[editedIndex].term1 = term1;
      types[editedIndex].term2 = term2;
      setSubjectTypes(types);
   };

   return (
      <div className={styles['subject']}>
         <h2 onClick={removeSubjectHandler} className={styles['subject__name']}>
            {subject.name}
         </h2>
         <div className={styles['subject__final']}>
            Final grade: <span className={styles['subject__final-min']}>{subjectFinal.min.toFixed(2)}</span> |{' '}
            <span className={styles['subject__final-current']}>{subjectFinal.current.toFixed(2)}</span> |{' '}
            <span className={styles['subject__final-max']}>{subjectFinal.max.toFixed(2)}</span>
         </div>
         <div className={styles['subject__types']}>
            <div className={styles['subject__types-header']}>
               <div></div>
               <div>Term 1:</div>
               <div>Term 2:</div>
            </div>
            {subjectTypes.map((type) => (
               <CalculatorSubjectType key={type.id} type={type} onValueChange={updateTypeHandler} />
            ))}
            <Button className={styles['subject__types-button']} text="Add new type" />
         </div>
      </div>
   );
};

export default CalculatorSubject;
