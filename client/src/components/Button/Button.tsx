import React, { useEffect, useState } from 'react';

import './Button.scss';

type ButtonProps = {children?: any, type?: string, disabled?: boolean, onClick?: any } // This any is not correct

function Button({children, onClick, disabled = false, type = 'normal', ...other}:ButtonProps) {
  switch (type) {
    case 'normal':
      break;
    case 'success':
      break;
    default:
      console.error(`Type ${type} is not supported. Type has been set to "normal"`)
      type = 'normal'
      break;
  }

  return (
        <button {...other} className={`button button-${type}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
  );
}

export default Button;
