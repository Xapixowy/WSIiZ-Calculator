import React from 'react';

const CalculatorContext = React.createContext({
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
});

export default CalculatorContext;
