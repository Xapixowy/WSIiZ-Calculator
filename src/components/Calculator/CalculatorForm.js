import React from 'react';
import Button from '../UI/Button';

import styles from './CalculatorForm.module.css';
import CalculatorSubject from './CalculatorSubject';

const CalculatorForm = () => {
   return (
      <form className={styles['calculator__form']}>
         <CalculatorSubject
            name="Architektura systemów komputerowych"
            min={4.2}
            current={4.76}
            max={5.1}
            types={[
               { name: 'Wykład', term1: 2, term2: 5 },
               { name: 'Laboratorium', term1: 5 },
               { name: 'Projekt', term1: 5 },
            ]}
         />
         <Button className={styles['calculator__new-subject']} text="Add new subject" />
      </form>
   );
};

export default CalculatorForm;
