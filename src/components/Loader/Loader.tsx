import React from 'react';

import styles from './Loader.module.scss'

export const Loader = () => {
  return <>
    <div className={styles.loadingSection}>
      <div className={styles.loading}></div>
    </div>
  </>
}

