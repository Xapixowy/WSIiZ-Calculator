import React from 'react';

import styles from './CalculatorForm.module.css';

import CalculatorContext from '../../store/calculator-context';
import CalculatorSubject from './CalculatorSubject';
import Button from '../UI/Button';
import NewSubjectPrompt from './NewSubjectPrompt';

const CalculatorForm = () => {
   const calculatorCtx = React.useContext(CalculatorContext);

   const [newSubjectPrompt, setNewSubjectPrompt] = React.useState(false);

   const showNewSubjectPrompt = () => {
      setNewSubjectPrompt(true);
   };

   const closeNewSubjectPrompt = () => {
      setNewSubjectPrompt(false);
   };

   React.useEffect(() => {
      console.log(calculatorCtx.subjects);
   }, [calculatorCtx.subjects]);

   const subjects = calculatorCtx.subjects.map((subject) => {
      return (
         <CalculatorSubject
            key={subject.id}
            subject={subject}
            removeSubjectHandler={calculatorCtx.removeSubject}
            editSubjectHandler={calculatorCtx.editSubject}
         />
      );
   });

   return (
      <form className={styles['calculator__form']}>
         {subjects}
         <Button className={styles['calculator__new-subject']} text="Add new subject" onClick={showNewSubjectPrompt} />
         {newSubjectPrompt && (
            <NewSubjectPrompt promptCloseHandler={closeNewSubjectPrompt} newSubjectHandler={calculatorCtx.addSubject} />
         )}
      </form>
   );
};

export default CalculatorForm;
