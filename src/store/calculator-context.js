import { createContext } from 'react';

const CalculatorContext = createContext({
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
});

export default CalculatorContext;
