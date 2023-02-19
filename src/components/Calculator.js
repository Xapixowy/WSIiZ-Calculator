import React from 'react';

import styles from './Calculator.module.css';
import CalculatorForm from './Calculator/CalculatorForm';

import Header from './Layout/Header';
import Card from './UI/Card';

const Calculator = () => {
   return (
      <React.Fragment>
         <Header />
         <Card>
            <CalculatorForm />
         </Card>
      </React.Fragment>
   );
};

export default Calculator;
