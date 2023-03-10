import React, { useContext, useState } from 'react';

import styles from './Calculations.module.css';

import Subject from './Subject';
import Button from '../UI/Button';
import NewSubject from '../Prompts/NewSubject';

import CalculatorContext from '../../store/calculator-context';

const Calculations = () => {
   const ctx = useContext(CalculatorContext);

   const [isPrompt, setIsPrompt] = useState(false);

   const showNewSubjectPrompt = () => {
      setIsPrompt(true);
   };

   const hideNewSubjectPrompt = () => {
      setIsPrompt(false);
   };

   const subjects = ctx.subjects.map((subject) => (
      <Subject key={subject.id} id={subject.id} name={subject.name} gpa={subject.gpa} types={subject.types} />
   ));

   return (
      <section className={styles.calculations}>
         {isPrompt && <NewSubject onClose={hideNewSubjectPrompt} />}
         {subjects}
         <div className={styles.controls}>
            <Button className={styles.button} onClick={showNewSubjectPrompt}>
               Add new subject
            </Button>
         </div>
      </section>
   );
};

export default Calculations;
