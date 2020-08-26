import React from 'react';
import PropTypes from 'prop-types';
import { Switch, ComboBox } from '../Generic';
import styles from './css/SettingsModules.module.scss';
import { ErrorMessage } from '../Generic';

function SettingsModule({ id, title, invalid, errorMessage, children }) {
    return (
        <React.Fragment>
            <hr/>
            <div className={styles.boxSetting}>
                <h4 id={id}>{title}</h4>
                <div className={styles.boxSettingElement}>
                    <div className={`${(invalid) ? styles.invalidField : ''}`} aria-invalid={invalid}>
                        {children}
                    </div>
                </div>
            </div>
            <ErrorMessage {...errorMessage}/>
        </React.Fragment>
    )
}

export default function SettingsModules({ children, fields }) {

    const getSettingsModules = () => {

        const getModulePropsFromField = (field) => {

            const getId = (id) => `${id}Title`;
    
            return {
                fieldId: field.id,
                moduleId: getId(field.id),
                invalid: !field.status.value,
                errorMessage: {
                    show: !field.status.value,
                    ...field.errorMessage,
                },
            }
        };

        const furtherSettings = (field, prevSettings) =>  {

            const modulesChildrenAndTitle = {
                numberOfPlayers: {
                    title: 'Number of Players',
                    children: <input 
                        type='number'
                        id={prevSettings.fieldId} 
                        value={field.value} 
                        onChange={field.handler} 
                        aria-labelledby={prevSettings.moduleId}
                    />,
                },
                playWithTimer: {
                    title: 'Play with Timer',
                    children: <Switch
                        id={prevSettings.fieldId} 
                        checked={field.value}
                        onChange={field.handler}
                        aria-labelledby={prevSettings.moduleId}
                    />
                },
                difficulty: {
                    title: 'Difficulty',
                    children: <ComboBox
                        inputId={prevSettings.fieldId}
                        options={field.possibleDifficulties} 
                        handleSelect={field.handler.handleSelect}
                        inputValue={field.value}
                        handleOnChange={field.handler.handleOnChange}
                        aria-labelledby={prevSettings.moduleId}    
                    />,
                },
            };

            const moduleFurtherSettings = modulesChildrenAndTitle[field.id];
            
            return {
                ...prevSettings,
                ...moduleFurtherSettings,
            }
        }

        const settingModules = fields.map((field, i) => {
            const moduleProps =  getModulePropsFromField(field)
            const addFurtherProps = furtherSettings(field, moduleProps);

            return <SettingsModule key={i} {...addFurtherProps}/>
        });

        return settingModules;
    }

    const settingModules = getSettingsModules();


    return (
    <div className={styles.container}>
        <div className={styles.settingsContainer}>
            {settingModules}
            <hr/>
        </div>
        {children}
    </div>
    )
}

SettingsModules.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            status: PropTypes.shape({
                id: PropTypes.string,
                value: PropTypes.bool,
                typeOfError: PropTypes.string,
            }),
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
            ]),
            handler: PropTypes.oneOfType([
                PropTypes.func,
                PropTypes.object,
            ]),
            errorMessage: PropTypes.shape({
                id: PropTypes.string,
                text: PropTypes.string,
            }),
        }),
    )
}