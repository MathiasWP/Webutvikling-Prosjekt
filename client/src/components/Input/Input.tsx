import React, { useEffect, useState } from 'react';

import './Input.scss';

type InputProps = {type?: string, name?: string, value?: string,placeholder?: string, onChange?: any } // This any is not correct

function Input({type = "text", name = '', value = '', onChange, placeholder}:InputProps) {
  return (
    <input className="input" name={name} type={type} value={value} placeholder={placeholder} onChange={onChange} />
  );
}

export default Input;
