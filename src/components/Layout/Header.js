import React from 'react';

import styles from './Header.module.css';

import { IconCalculator } from '@tabler/icons-react';

const Header = () => {
   return (
      <header className={styles.header}>
         <IconCalculator className={styles['header__icon']} />
         <h1 className={styles['header__text']}>WSIiZ Calculator</h1>
      </header>
   );
};

export default Header;
