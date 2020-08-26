import React from 'react';
import PropTypes from 'prop-types';
import { SettingsModules } from '../Game';
import { useFieldStatus, useInputState, useSwitchState, useComboBoxState } from '../../Hooks/app-hooks.js';
import styles from './css/GameSettings.module.scss';
import { 
    injectFieldStatus, 
    createInitialSettingsStatus,
    setErrorMessage,
    formValidation,
    setNewValuesFromInputs,
 } from '../../functions/settings-form-functions.js';
import { noop } from '../../functions/general-functions.js';
import { Button } from '../Generic/';
import isEqual from 'lodash.isequal';

export default function GameSettings ({ 
    fields: initialPropsFields,
    isGameStarted,
    successButtonHandler,
    cancelButton,
    title,
    titleClassname,
    stopKeyEventPropagation, 
    containerId
    }) {

    const initialObjectState = createInitialSettingsStatus(initialPropsFields);
    const { fieldStatus, setFieldStatus } = useFieldStatus(initialObjectState);
    const fields = injectFieldStatus(initialPropsFields, fieldStatus);

    const [ numberOfPlayersValue, playWithTimerValue, difficultyValue ] = initialPropsFields.map(({ value }) => value);

    const { inputValue, handleChange } = useInputState(numberOfPlayersValue);
    const { switchState, handleSwitch } = useSwitchState(playWithTimerValue);
    const { comboBoxValue, handlers: comboBoxHandlers } = useComboBoxState(difficultyValue);

    const settingsFieldsInfo = [
        {
            id: 'numberOfPlayers',
            value: inputValue,
            handler: handleChange,
        },
        {
            id: 'playWithTimer',
            value: switchState,
            handler: handleSwitch,
        },
        {
            id: 'difficulty',
            value: comboBoxValue,
            handler: comboBoxHandlers,
        },
    ];

    let settingFields = fields.map((field) => {

        const settingField = settingsFieldsInfo.find(settingField => settingField.id === field.id);
    
        const { value, handler } = settingField;

        return {
            ...field,
            handler,
            value,
        };
    });

    const errorMessages = settingFields.map((field) => {
        const messages = {
            numberOfPlayers: 'Players between 2 and 4',
            difficulty: 'You must choose a valid difficulty',
        }

        return {
            id: field.id,
            text: messages[field.id],
        }
    });

    settingFields = setErrorMessage(settingFields, errorMessages);

    const fieldsValue = fields.map((field) => ({ [field.id]: field.value }));
    const settingFieldsValue = settingFields.map((field) => ({ [field.id]: field.value }));

    const didSettingFieldsChange = !isEqual(fieldsValue, settingFieldsValue);

    const onSuccessClick = () => {

        const validation = formValidation(settingFields);
        setFieldStatus(validation.fields);

        if (!validation.formStatus) return;

        if (!didSettingFieldsChange) {
            
            return successButtonHandler();
        };

        const fieldsState = setNewValuesFromInputs(fields, settingsFieldsInfo);
        fieldsState.then((newState) => {

            if (successButtonHandler) successButtonHandler(newState);

        });
    }

    const handleKeyPress = (ev) => {

        if (stopKeyEventPropagation) ev.nativeEvent.stopImmediatePropagation();
    
        switch (ev.key) {
          case 'Enter':
            return onSuccessClick();
          default:
            noop();
        };
    
    };

    return (
        <div id={containerId} className={styles.container} onKeyDown={handleKeyPress}>
            { title && <div className={styles.titleContainer}>
                <h1 className={(titleClassname) ? titleClassname : styles.title}>{title}</h1>
            </div>}
            <SettingsModules fields={settingFields}>
            <div className={styles.buttonsContainer}>
                { cancelButton }
                <Button 
                    text={(!isGameStarted) ? 'Start' : (didSettingFieldsChange) ? 'Start Again' : 'Continue'}
                    className={styles.button}
                    onClick={onSuccessClick} 
                />
            </div>
            </SettingsModules>
        </div>
    )
}

GameSettings.propTypes = {
    containerId: PropTypes.string,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
            ]),
            handler: PropTypes.func,
        }),
    ),
    isGameStarted: PropTypes.bool,
    title: PropTypes.string,
    titleClassname: PropTypes.string,
    successButtonHandler: PropTypes.func,
    cancelButton: PropTypes.element,
    stopKeyEventPropagation: PropTypes.bool,    
};

