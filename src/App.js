import React from 'react';

import styles from './App.module.css';
import Calculator from './components/Layout/Calculator';
import Header from './components/Layout/Header';

const App = () => {
   return (
      <div className={styles.app}>
         <Header />
         <Calculator />
      </div>
   );
};

export default App;
