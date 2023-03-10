import React from 'react';

import styles from './Calculator.module.css';

import Calculations from '../Calculator/Calculations';
import Summary from '../Calculator/Summary';
import CalculatorProvider from '../../store/CalculatorProvider';

const DUMMY_DATA = {
   subjects: [
      {
         name: 'Architektura systemów komputerowych',
         gpa: {
            worstCase: 3.67,
            currentCase: 4.21,
            bestCase: 5.18,
         },
         types: [
            {
               id: 1,
               name: 'Wykład',
               grades: {
                  firstTerm: 2,
                  secondTerm: 2,
                  conditionalRetake: 2,
                  creditInAdvance: 3,
                  comission: 2,
               },
            },
            {
               id: 2,
               name: 'Laboratorium',
               grades: {
                  firstTerm: 2,
                  secondTerm: 3,
                  conditionalRetake: 3,
                  creditInAdvance: 4,
                  comission: 5,
               },
            },
         ],
      },
   ],
   gpa: {
      worstCase: 3.67,
      currentCase: 4.21,
      bestCase: 5.18,
   },
   scholarship: {
      worstCase: 312,
      currentCase: 382,
      bestCase: 469,
      available: false,
   },
};

const Calculator = () => {
   return (
      <main className={styles.calculator}>
         <CalculatorProvider>
            <Calculations />
            <Summary />
         </CalculatorProvider>
      </main>
   );
};

export default Calculator;
