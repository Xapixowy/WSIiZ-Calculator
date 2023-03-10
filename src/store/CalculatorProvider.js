import React, { useEffect, useReducer } from 'react';
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
   for (const type of types) {
      const { grades } = type;
      for (const gradeName in grades) {
         const grade = grades[gradeName];
         if (grade >= 2) {
            gpa.currentCase += grade;
            numberOfGrades += 1;
         }
      }
   }
   gpa.currentCase = roundGrade((gpa.currentCase /= numberOfGrades));
   if (numberOfGrades === 0) {
      gpa.currentCase = 0;
   }
   return gpa;
};

const calculationsReducer = (state, action) => {
   const lastUpdate = Date.now();
   if (action.type === 'ADD_SUBJECT') {
      const newState = { ...state };
      const newSubject = {
         ...action.subject,
         id: Date.now(),
         gpa: calculateGpa(action.subject.types),
      };
      newState.lastUpdate = lastUpdate;
      newState.subjects.push(newSubject);
      return newState;
   } else if (action.type === 'REMOVE_SUBJECT') {
      const newState = { ...state };
      const newSubjects = newState.subjects.filter((subject) => subject.id !== action.id);
      newState.lastUpdate = lastUpdate;
      newState.subjects = [...newSubjects];
      return newState;
   } else if (action.type === 'ADD_TYPE') {
      const newState = { ...state };
      const subjectIndex = newState.subjects.findIndex((subject) => subject.id === action.subjectId);
      const newSubject = { ...newState.subjects[subjectIndex] };
      const newTypes = [...newSubject.types];
      const newType = {
         ...action.typeToAdd,
         id: Date.now(),
      };
      newTypes.push(newType);
      newSubject.types = [...newTypes];
      newSubject.gpa = calculateGpa(newTypes);
      newState.lastUpdate = lastUpdate;
      newState.subjects[subjectIndex] = { ...newSubject };
      return newState;
   } else if (action.type === 'REMOVE_TYPE') {
      const newState = { ...state };
      const subjectIndex = newState.subjects.findIndex((subject) => subject.id === action.subjectId);
      const newSubject = { ...newState.subjects[subjectIndex] };
      const newTypes = newSubject.types.filter((type) => type.id !== action.typeId);
      newSubject.types = [...newTypes];
      newSubject.gpa = calculateGpa(newTypes);
      newState.lastUpdate = lastUpdate;
      newState.subjects[subjectIndex] = { ...newSubject };
      return newState;
   } else if (action.type === 'UPDATE_TYPE') {
      const newState = { ...state };
      const subjectIndex = newState.subjects.findIndex((subject) => subject.id === action.subjectId);
      const newSubject = { ...newState.subjects[subjectIndex] };
      const typeIndex = newSubject.types.findIndex((type) => type.id === action.typeId);
      const newType = { ...newSubject.types[typeIndex] };
      newType.grades = { ...action.grades };
      newSubject.types[typeIndex] = { ...newType };
      newSubject.gpa = calculateGpa(newSubject.types);
      newState.lastUpdate = lastUpdate;
      newState.subjects[subjectIndex] = { ...newSubject };
      return newState;
   } else if (action.type === 'UPDATE_GPA') {
      const newState = { ...state };
      const newGpa = {
         worstCase: 0,
         currentCase: 0,
         bestCase: 0,
      };
      let numberOfGrades = 0;
      if (newState.subjects.length !== 0) {
         for (const subject of newState.subjects) {
            if (subject.gpa.currentCase >= 2) {
               newGpa.currentCase += subject.gpa.currentCase;
               numberOfGrades += 1;
            }
         }
         if (numberOfGrades > 0) newGpa.currentCase = newGpa.currentCase / numberOfGrades;
      }
      newState.gpa = { ...newGpa };
      return newState;
   } else if (action.type === 'UPDATE_SCHOLARSHIP') {
      const newState = { ...state };
      const scholarship = {
         worstCase: 0,
         currentCase: 0,
         bestCase: 0,
         available: true,
      };
      if (newState.gpa.currentCase >= 2) {
         let numberOfSecondTerms = 0;
         for (const subject of newState.subjects) {
            for (const type of subject.types) {
               if (type.grades.secondTerm >= 2) numberOfSecondTerms++;
               console.log(type);
            }
         }
         const currentGpa = newState.gpa.currentCase;
         scholarship.currentCase = Math.round(50 * Math.pow(currentGpa, 2) - 200 * currentGpa + 250);
         if (numberOfSecondTerms > 1) scholarship.available = false;
      }
      newState.scholarship = { ...scholarship };
      return newState;
   } else return state;
};

const calculationsDefault = {
   lastUpdate: 0,
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

   useEffect(() => {
      calculationsDispatch({ type: 'UPDATE_GPA' });
   }, [calculations.lastUpdate]);

   useEffect(() => {
      calculationsDispatch({ type: 'UPDATE_SCHOLARSHIP' });
   }, [calculations.gpa.currentCase]);

   const calculationsProvided = {
      ...calculations,
      dispatch: calculationsDispatch,
   };

   return <CalculatorContext.Provider value={calculationsProvided}>{props.children}</CalculatorContext.Provider>;
};

export default CalculatorProvider;
