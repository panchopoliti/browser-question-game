import React from 'react';
import PropTypes from 'prop-types';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
  import './css/ComboBox.scss'
  

export default function ComboBox({ 
    options = [],
    handleSelect, 
    inputId, 
    inputValue,
    handleOnChange,
 }) {

    const renderOptions = options.map((option, i) => {
        return <ComboboxOption key={i} value={option} />
    });

    return(
        <div>
            <Combobox 
                onSelect={handleSelect}
                openOnFocus
            >
            <ComboboxInput id={inputId} value={inputValue} onChange={handleOnChange}/>
            <ComboboxPopover>
                <ComboboxList persistSelection>
                    {renderOptions}
                </ComboboxList>
            </ComboboxPopover>
            </Combobox>
        </div>
    )
}

ComboBox.propTypes = {
    options: PropTypes.array,
    handleComboBox: PropTypes.func,
    handleOnChange: PropTypes.func,
    inputValue: PropTypes.string,
    inputId: PropTypes.string,
}