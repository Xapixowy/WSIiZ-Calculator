import React, { useContext } from 'react';

import { IconSum } from '@tabler/icons-react';

import styles from './Summary.module.css';
import CalculatorContext from '../../store/calculator-context';

const Summary = () => {
   const ctx = useContext(CalculatorContext);

   const { subjects, gpa, scholarship } = ctx;

   return (
      <section className={styles.summary}>
         <div className={styles.data}>
            <header className={styles.header}>
               <IconSum size={32} />
               <h2>Summary</h2>
            </header>
            <div>
               Subjects: <span className={styles.secondary}>{subjects.length}</span>
            </div>
            <div>
               GPA: <span className={styles.primary}>{gpa.worstCase}</span> |{' '}
               <span className={styles.secondary}>{gpa.currentCase}</span> |{' '}
               <span className={styles.tertiary}>{gpa.bestCase}</span>
            </div>
            <div className={!scholarship.available && styles.unavailable}>
               Scholarship points: <span className={styles.primary}>{scholarship.worstCase}</span> |{' '}
               <span className={styles.secondary}>{scholarship.currentCase}</span> |{' '}
               <span className={styles.tertiary}>{scholarship.bestCase}</span>
            </div>
         </div>
         <div className={styles.legend}>
            <div className={styles['best-case']}>
               <span className={styles.circle}></span>
               <p>Best case</p>
            </div>
            <div className={styles['current-case']}>
               <span className={styles.circle}></span>
               <p>Current case</p>
            </div>
            <div className={styles['worst-case']}>
               <span className={styles.circle}></span>
               <p>Worst case</p>
            </div>
         </div>
      </section>
   );
};

export default Summary;
