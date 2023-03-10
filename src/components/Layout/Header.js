import { IconCalculator } from '@tabler/icons-react';
import React from 'react';

import styles from './Header.module.css';

const Header = () => {
   return (
      <header className={styles.header}>
         <IconCalculator size={36} />
         <h1>WSIiZ Calculator</h1>
      </header>
   );
};

export default Header;
