import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../UI/Button';

import styles from './NewSubjectPrompt.module.css';

const Backdrop = (props) => {
   return <div className={styles['prompt__backdrop']} onClick={props.onClick}></div>;
};

const defaultSubjectTerm = {
   value: 1,
   negligible: true,
};

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

const calculateGpa = (term1, term2) => {
   const final = {
      min: 0,
      current: 0,
      max: 0,
   };
   if (term1 < 2) {
      final.min = 2.5;
      final.current = 0;
      final.max = 5;
   } else if (term1 < 3) {
      if (term2 < 2) {
         final.min = roundGrade((term1 + 3) / 2);
         final.current = term1;
         final.max = roundGrade((term1 + 5) / 2);
      } else final.min = final.current = final.max = roundGrade(term1 + term2);
   } else {
      final.min = term1;
      final.current = term1;
      final.max = roundGrade((term1 + 5) / 2);
   }
   return final;
};

const Window = (props) => {
   const [subjectName, setSubjectName] = React.useState('');
   const [subjectType, setSubjectType] = React.useState('');
   const [subjectTerm1, setSubjectTerm1] = React.useState(defaultSubjectTerm);
   const [subjectTerm2, setSubjectTerm2] = React.useState(defaultSubjectTerm);

   const subjectNameHandler = (e) => {
      setSubjectName(e.target.value);
   };

   const subjectTypeHandler = (e) => {
      setSubjectType(e.target.value);
   };

   const subjectTerm1Handler = (e) => {
      const value = parseFloat(e.target.value);
      const negligible = value >= 2 ? false : true;
      const newState = { value, negligible };
      setSubjectTerm1(newState);
   };

   const subjectTerm2Handler = (e) => {
      const value = parseFloat(e.target.value);
      const negligible = value >= 2 ? false : true;
      const newState = { value, negligible };
      setSubjectTerm2(newState);
   };

   const addSubjectHandler = () => {
      const term1 = roundGrade(parseFloat(subjectTerm1.value));
      const term2 = roundGrade(parseFloat(subjectTerm2.value));
      const final = calculateGpa(term1, term2);
      const subject = {
         name: subjectName,
         types: [
            {
               id: Date.now(),
               name: subjectType,
               term1,
               term2,
            },
         ],
         final,
      };
      props.newSubjectHandler(subject);
      props.onClose();
   };

   return (
      <form onSubmit={addSubjectHandler} className={styles['prompt__window']}>
         <div className={styles['prompt__form']}>
            <div className={styles['prompt__input']}>
               <label>Subject name:</label>
               <input
                  type="text"
                  name="subjectName"
                  placeholder="Databases"
                  value={subjectName}
                  onChange={subjectNameHandler}
                  required
               />
            </div>
            <div className={styles['prompt__input']}>
               <label>Subject type:</label>
               <input
                  type="text"
                  name="subjectType"
                  placeholder="Lecture"
                  value={subjectType}
                  onChange={subjectTypeHandler}
                  required
               />
            </div>
            <div className={styles['prompt__input']}>
               <label>Term 1:</label>
               <input
                  className={subjectTerm1.negligible ? styles['negligible'] : ''}
                  type="number"
                  name="subjectTerm1Grade"
                  min={1}
                  max={5}
                  step={0.5}
                  value={subjectTerm1.value}
                  onChange={subjectTerm1Handler}
               />
            </div>
            <div className={styles['prompt__input']}>
               <label>Term 2:</label>
               <input
                  className={subjectTerm2.negligible ? styles['negligible'] : ''}
                  type="number"
                  name="subjectTerm1Grade"
                  min={1}
                  max={5}
                  step={0.5}
                  value={subjectTerm2.value}
                  onChange={subjectTerm2Handler}
               />
            </div>
         </div>
         <Button type="submit" text="Add new subject" />
      </form>
   );
};

const NewSubjectPrompt = (props) => {
   return (
      <React.Fragment>
         {ReactDOM.createPortal(<Backdrop onClick={props.promptCloseHandler} />, document.getElementById('prompt'))}
         {ReactDOM.createPortal(
            <Window onClose={props.promptCloseHandler} newSubjectHandler={props.newSubjectHandler} />,
            document.getElementById('prompt'),
         )}
      </React.Fragment>
   );
};

export default NewSubjectPrompt;
