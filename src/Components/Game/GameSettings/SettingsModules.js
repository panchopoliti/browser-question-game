import React from 'react';
import PropTypes from 'prop-types';
import { Switch, ComboBox, ErrorMessage } from '../../Generic';
import styles from './css/SettingsModules.module.scss';
import { MAX_PLAYERS_IN_GAME } from '../../../constants.js';

function SettingsModule({ id, title, invalid, errorMessage, isModalDisplayed, children }) {
    return (
        <React.Fragment>
            <hr/>
            <div className={(isModalDisplayed) ? styles.modalBoxSetting :styles.boxSetting}>
                <h4 id={id} className={styles.moduleTitle}>{title}</h4>
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

export default function SettingsModules({ children, fields, isModalDisplayed }) {

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
                        className={`${styles.inputForm} ${styles.numberOfPlayersInput}`}
                        value={field.value} 
                        onChange={field.handler} 
                        aria-labelledby={prevSettings.moduleId}
                        min={1}
                        max={MAX_PLAYERS_IN_GAME}
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
                        inputClassName={`${styles.inputForm} ${styles.difficultyInput}`}
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

            return <SettingsModule key={i} isModalDisplayed={isModalDisplayed} {...addFurtherProps}/>
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
    ),
    isModalDisplayed: PropTypes.bool,
}