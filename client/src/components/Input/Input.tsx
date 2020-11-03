import React, { useEffect, useState } from 'react';

import './Input.scss';

type InputProps = {type?: string, value?: string, onChange?: any } // This any is not correct

function Input({type = "text", value = '', onChange}:InputProps) {

  return (
    <input className="input" type={type} value={value} onChange={onChange} />
  );
}

export default Input;
