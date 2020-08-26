import { useState } from 'react';

export function useInputState(initialValue) {

    const [inputValue, setInputValue] = useState(initialValue);
  
    const handleChange = (ev) => {
      const value = (ev.target.value === '') ? '' : +ev.target.value;
      
      setInputValue(value);
    }
    
    return {
        inputValue,
        handleChange,
    }
  }
  
export function useSwitchState(initialValue) {
  const [switchState, setSwitchState] = useState(initialValue);

  const handleSwitch = (checked) => setSwitchState(checked);

  return {
    switchState,
    handleSwitch,
  }
}

export function useComboBoxState(initialValue) {

    const [comboBoxValue, setValue] = useState(initialValue);

    const handleOnChange = (ev) =>setValue(ev.target.value);

    const handleSelect = (item) => {
      setValue(item);
  }

  return {
      comboBoxValue,
      handlers: {
        handleSelect,
        handleOnChange,
    }
  }     
}

export function useFieldStatus(initialObj) {
  
  const [ fieldStatus, setStatus ] = useState(initialObj);

  function setFieldStatus(validationFields) {

    return setStatus(validationFields);
  }

  return {
    fieldStatus,
    setFieldStatus,
  }
}