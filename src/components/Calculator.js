import React from 'react';

import styles from './Calculator.module.css';
import CalculatorProvider from '../store/CalculatorProvider';
import CalculatorCalculations from './Calculator/CalculatorCalculations';
import CalculatorForm from './Calculator/CalculatorForm';
import CalculatorContext from '../store/calculator-context';

import Header from './Layout/Header';
import Card from './UI/Card';

const Calculator = () => {
   return (
      <CalculatorProvider>
         <Header />
         <Card className={styles.interface}>
            <CalculatorForm />
            <CalculatorCalculations />
         </Card>
      </CalculatorProvider>
   );
};

export default Calculator;
