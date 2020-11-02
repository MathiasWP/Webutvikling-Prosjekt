import React, { useEffect, useState } from 'react';

import './Input.scss';

type InputProps = {type?: string, value?: string, onValueChange?: any } // This any is not correct

function Input({type = "text", value = '', onValueChange}:InputProps) {
    const [_value, setValue] = useState(value);

    function handleChange(e) {
        const inputValue = e.value;
        setValue(inputValue);
        onValueChange(inputValue)
    }

  return (
    <input className="input" type={type} value={_value} onChange={handleChange} />
  );
}

export default Input;
