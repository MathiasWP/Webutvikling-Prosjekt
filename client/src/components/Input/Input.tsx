import React, { useEffect, useState } from 'react';

import './Input.scss';

type InputProps = {type?: string, name?: string, value?: string, onChange?: any } // This any is not correct

function Input({type = "text", name = '', value = '', onChange}:InputProps) {
  return (
    <input className="input" name={name} type={type} value={value} onChange={onChange} />
  );
}

export default Input;
