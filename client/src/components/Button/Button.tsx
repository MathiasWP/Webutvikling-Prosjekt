import React, { useEffect, useState } from 'react';

import './Button.scss';


function Button({children, onClick, disabled = false, type = 'normal', ...other}) {
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
