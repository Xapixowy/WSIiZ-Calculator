import React, { useReducer } from 'react';
import CalculatorContext from './calculator-context';

const roundGrade = (grade) => {
   if (grade < 1.75) return 1;
   else if (grade >= 1.75 && grade < 2.25) return 2;
   else if (grade >= 2.25 && grade < 2.75) return 2.5;
   else if (grade >= 2.75 && grade < 3.25) return 3;
   else if (grade >= 3.25 && grade < 3.75) return 3.5;
   else if (grade >= 3.75 && grade < 4.25) return 4;
   else if (grade >= 4.25 && grade < 4.75) return 4.5;
   else return 5;
};

const calculateGpa = (types) => {
   const gpa = {
      worstCase: 0,
      currentCase: 0,
      bestCase: 0,
   };
   let numberOfGrades = 0;
   for (const type in types) {
      const { firstTerm, secondTerm, conditionalRetake, creditInAdvance, comission } = type.grades;
      let worstCase = 0;
      let currentCase = 0;
      let bestCase = 0;
   }
   return gpa;
};

const calculationsReducer = (state, action) => {
   console.log(action);
   if (action.type === 'ADD_SUBJECT') {
      const newState = { ...state };
      const newSubject = {
         ...action.subject,
         id: Date.now(),
      };
      newState.subjects.push(newSubject);
      return newState;
   } else if (action.type === 'REMOVE_SUBJECT') {
      const newState = { ...state };
      const newSubjects = newState.subjects.filter((subject) => subject.id !== action.id);
      newState.subjects = [...newSubjects];
      return newState;
   } else if (action.type === 'ADD_TYPE') {
      const newState = { ...state };
      const subjectIndex = newState.subjects.findIndex((subject) => subject.id === action.subjectId);
      const newTypes = [...newState.subjects[subjectIndex]];
      const newType = {
         ...action.type,
         id: Date.now(),
      };
      newTypes.push(newType);
      newState.subjects[subjectIndex].types = [...newTypes];
      return newState;
   } else if (action.type === 'REMOVE_TYPE') {
      const newState = { ...state };
      const subjectIndex = newState.subjects.findIndex((subject) => subject.id === action.subjectId);
      const newTypes = newState.subjects[subjectIndex].types.filter((type) => type.id !== action.typeId);
      newState.subjects[subjectIndex].types = [...newTypes];
      return newState;
   } else return state;
};

const calculationsDefault = {
   subjects: [],
   gpa: {
      worstCase: 0,
      currentCase: 0,
      bestCase: 0,
   },
   scholarship: {
      worstCase: 0,
      currentCase: 0,
      bestCase: 0,
      available: true,
   },
   dispatch: () => {},
};

const CalculatorProvider = (props) => {
   const [calculations, calculationsDispatch] = useReducer(calculationsReducer, calculationsDefault);

   const calculationsProvided = {
      ...calculations,
      dispatch: calculationsDispatch,
   };

   return <CalculatorContext.Provider value={calculationsProvided}>{props.children}</CalculatorContext.Provider>;
};

export default CalculatorProvider;
