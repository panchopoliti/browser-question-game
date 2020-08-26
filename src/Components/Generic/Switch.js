import React from 'react';
import Switch from 'react-switch';

export default function SwitchComponent(settings) {
    
    return (
        <Switch
            onColor="#52d869"
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            {...settings}
        />
    )
}