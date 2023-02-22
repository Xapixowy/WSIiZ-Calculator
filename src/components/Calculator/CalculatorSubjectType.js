import React from 'react';

import styles from './CalculatorSubjectType.module.css';

const roundGrade = (value) => {
   if (value < 1.5) return 1;
   else if (value < 2.25) return 2;
   else if (value < 2.75) return 2.5;
   else if (value < 3.25) return 3;
   else if (value < 3.75) return 3.5;
   else if (value < 4.25) return 4;
   else if (value < 4.75) return 4.5;
   else return 5;
};

const CalculatorSubjectType = (props) => {
   const [term1, setTerm1] = React.useState(props.type.term1);
   const [term2, setTerm2] = React.useState(props.type.term2);

   React.useEffect(() => {
      props.onValueChange({ id: props.type.id, term1: roundGrade(term1), term2: roundGrade(term2) });
      const timeoutIndex = setTimeout(() => {
         setTerm1(roundGrade(term1));
         setTerm2(roundGrade(term2));
      }, 500);
      return () => {
         clearInterval(timeoutIndex);
      };
   }, [term1, term2]);

   const changeTerm1ValueHandler = (e) => {
      const value = parseFloat(e.target.value);
      setTerm1(value);
   };

   const changeTerm2ValueHandler = (e) => {
      const value = parseFloat(e.target.value);
      setTerm2(value);
   };

   return (
      <div className={styles['subject__types-type']}>
         <div>{props.type.name}:</div>
         <div>
            <input
               className={term1 < 2 ? styles['negligible'] : ''}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={term1}
               onChange={changeTerm1ValueHandler}
            />
         </div>
         <div>
            <input
               className={term2 < 2 ? styles['negligible'] : ''}
               type="number"
               min="1"
               max="5"
               step="0.5"
               value={term2}
               onChange={changeTerm2ValueHandler}
            />
         </div>
      </div>
   );
};

export default CalculatorSubjectType;
