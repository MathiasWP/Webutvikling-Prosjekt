import React, { useEffect, useState } from 'react';

import './Select.scss';

type SelectProps = {children?: any, value?: any, type?: string, disabled?: boolean, onChange?: any, other?: any  } // This any is not correct

function Select({children, onChange, value, disabled = false, ...other}:SelectProps) {

  return (
        <select {...other} value={value} className={`select`} onChange={onChange} disabled={disabled}>
            {children}
        </select>
  );
}

export default Select;
