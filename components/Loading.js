import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './Loading.css';

export default function Loading() {
  useStyles(s);
  return (
    <div className={s.loadingContainer}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
