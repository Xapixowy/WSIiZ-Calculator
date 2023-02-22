import React from 'react';

import CalculatorContext from './calculator-context';

const defaultCalculatorState = {
   subjects: [],
   subjectsCount: 0,
   addSubject: () => {},
   removeSubject: () => {},
   editSubject: () => {},
   gpa: {
      min: 0,
      current: 0,
      max: 0,
   },
   scholarship: {
      min: 0,
      current: 0,
      max: 0,
   },
   secondTerms: 0,
};

const calculatorReducer = (state, action) => {
   if (action.type === 'ADD_SUBJECT') {
      const newSubject = {
         ...action.subject,
         id: Date.now(),
      };
      const subjects = [newSubject, ...state.subjects];
      const subjectsCount = ++state.subjectsCount;
      let secondTerms = state.secondTerms;
      action.subject.types.forEach((type) => {
         type.term1 < 3 && secondTerms++;
      });
      const newState = {
         ...state,
         subjects,
         subjectsCount,
         secondTerms,
      };
      return newState;
   } else if (action.type === 'REMOVE_SUBJECT') {
      console.log(action);
      const subjectIndex = state.subjects.findIndex((subject) => subject.id === action.id);
      if (subjectIndex >= 0) {
         const deletedSubject = state.subjects[subjectIndex];
         const subjects = state.subjects.filter((subject) => subject.id !== action.id);
         const subjectsCount = --state.subjectsCount;
         let secondTerms = state.secondTerms;
         deletedSubject.types.forEach((type) => {
            type.term1 < 3 && secondTerms--;
         });
         const newState = {
            ...state,
            subjects,
            subjectsCount,
            secondTerms,
         };
         return newState;
      } else return state;
   } else if (action.type === 'EDIT_SUBJECT') {
      const subjectIndex = state.subjects.findIndex((subject) => subject.id === action.id);
      if (subjectIndex >= 0) {
         const editedSubject = state.subjects[subjectIndex];
         const newSubject = action.subject;
         const subjects = state.subjects.splice(subjectIndex, 1, action.subject);
         const secondTerms = state.secondTerms;
         const newState = {
            ...state,
            subjects,
            secondTerms,
         };
         return newState;
      } else return state;
   } else return state;
};

const CalculatorProvider = (props) => {
   const [calculator, dispatchCalculator] = React.useReducer(calculatorReducer, defaultCalculatorState);

   const addSubjectHandler = (subject) => {
      dispatchCalculator({ type: 'ADD_SUBJECT', subject: subject });
   };

   const removeSubjectHandler = (subjectId) => {
      dispatchCalculator({ type: 'REMOVE_SUBJECT', id: subjectId });
   };

   const editSubjectHandler = (subject) => {
      dispatchCalculator({ type: 'EDIT_SUBJECT', subject: subject });
   };

   const calculatorContext = {
      subjects: calculator.subjects,
      subjectsCount: calculator.subjectsCount,
      addSubject: addSubjectHandler,
      removeSubject: removeSubjectHandler,
      editSubject: editSubjectHandler,
      gpa: calculator.gpa,
      scholarship: calculator.scholarship,
      secondTerms: calculator.secondTerms,
   };

   return <CalculatorContext.Provider value={calculatorContext}>{props.children}</CalculatorContext.Provider>;
};

export default CalculatorProvider;
