import React from 'react';

import styles from './App.module.css';

import Calculator from './components/Calculator';

const App = () => {
   return (
      <div className={styles.app}>
         <Calculator />
      </div>
   );
};

export default App;
