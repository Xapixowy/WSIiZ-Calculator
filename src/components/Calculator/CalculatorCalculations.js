import React from 'react';

import styles from './CalculatorCalculations.module.css';
import CalculatorContext from '../../store/calculator-context';

import { IconSum } from '@tabler/icons-react';

const CalculatorCalculations = (props) => {
   const calculatorCtx = React.useContext(CalculatorContext);

   return (
      <div className={styles['calculations']}>
         <header>
            <IconSum className={styles['header__icon']} />
            <h2>Calculations</h2>
         </header>
         <main>
            <div>
               Subjects: <span className={styles['subjects']}>{calculatorCtx.subjectsCount}</span>
            </div>
            <div>
               GPA: <span className={styles['gpa__min']}>{calculatorCtx.gpa.min.toFixed(2)}</span> |{' '}
               <span className={styles['gpa__current']}>{calculatorCtx.gpa.current.toFixed(2)}</span> |{' '}
               <span className={styles['gpa__max']}>{calculatorCtx.gpa.max.toFixed(2)}</span>
            </div>
            <div>
               Scholarship: <span className={styles['scholarship__min']}>{calculatorCtx.scholarship.min}</span> |{' '}
               <span className={styles['scholarship__current']}>{calculatorCtx.scholarship.current}</span> |{' '}
               <span className={styles['scholarship__max']}>{calculatorCtx.scholarship.max}</span>
            </div>
         </main>
         <footer>
            <div className={styles['legend__worst-case']}>
               <div></div>
               <p>Worst case</p>
            </div>
            <div className={styles['legend__current']}>
               <div></div>
               <p>Current</p>
            </div>
            <div className={styles['legend__best-case']}>
               <div></div>
               <p>Best case</p>
            </div>
         </footer>
      </div>
   );
};

export default CalculatorCalculations;
