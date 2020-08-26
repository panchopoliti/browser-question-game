function getValidationArgs(fields) {

    const difficultyValidationFn = (value, possibleDifficulties) => {

        if (!value) return false;
    
        return possibleDifficulties.includes(value);
    };
    
    const validationArgs = fields.map((field) => {
    
        const validationFn = {
            numberOfPlayers: (value) => (value <= 4) && (value > 1),
            playWithTimer: () => true,
            difficulty: (value) => difficultyValidationFn(value, field.possibleDifficulties),
        }
    
        return {
            id: field.id,
            value: field.value,
            validationFn: validationFn[field.id],
        }
    });

    return validationArgs;
}

export function formValidation(fields) {

    const args = getValidationArgs(fields)
    
    const isValid = (value, validationFn) => validationFn(value);

    let isValidForm = args.map((arg) => isValid(arg.value, arg.validationFn));
    isValidForm = !isValidForm.includes(false);

    const addStatusToArgs = args.map((field) => {
       return {
           id: field.id,
           value: field.validationFn(field.value),
           typeOfError: null,
       }
    });

    return {
        formStatus: isValidForm,
        fields: addStatusToArgs,
    };
}

export const createFieldIds = (fieldsObj) => {
    const fieldsClone = Object.assign({}, fieldsObj);
    const fieldNames = Object.keys(fieldsClone);
    
    fieldNames.forEach((name) => {
        fieldsClone[name].id = name;
    });

    return fieldsClone;
}


export const createInitialSettingsStatus = (fields) => {
    

    const fieldIds = fields.map(({ id }) => id);

    const arrOfStatus = fieldIds.map((name) => {
        return {
            id: name,
            value: true,
            typeOfError: null,
        }
    });

    return arrOfStatus;
}

export const injectFieldStatus = (fields, fieldStatusArr) => {    
    const fieldsClone = fields.slice();

    fieldsClone.forEach((field) => {
        const fieldStatus = fieldStatusArr.find((fieldStatus) => fieldStatus.id === field.id);

        field.status = fieldStatus;
    });

    return fieldsClone;
}

export const setErrorMessage = (fields, messages) => {
    const fieldsClone = fields.slice();

    fieldsClone.forEach((field) => {

        const message = messages.find((message) => message.id === field.id);
    
        field.errorMessage = message;
    });

    return fieldsClone;
}

export const setNewValuesFromInputs = (fields, settingsFieldsInfo) => {

    const returnObj = {};

    return new Promise((resolve) => {

        for (const field of fields) {

            const valuesIds = settingsFieldsInfo.map(({ id }) => id);
            
            if (valuesIds.includes(field.id)) {
    
                const settingField = settingsFieldsInfo.find(settingField => settingField.id === field.id);
    
                let value = settingField.value;
                const returnedValue = field.handler(value);
    
                returnObj[field.id] = returnedValue;
    
            }
        }

        resolve(returnObj);
    })

}