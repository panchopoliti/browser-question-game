export function getRandomInt(max) {
    const random = Math.random();

    return (random === 1) ? max : Math.floor(random * (max+1));
}

export const noop = () => {};

export const pascalCaseToCamelCase = (str) => {

    const firstLetterLowercase = str[0].toLowerCase();
    const splitWords = str.split(' ').join('').split('');
    splitWords.splice(0, 1, firstLetterLowercase);

    const camelCaseWord = splitWords.join('');

    return camelCaseWord
}

export function isDuplicate(arr, elem) {

    const checkArr = arr.slice();

    if (checkArr.indexOf(elem) === -1) return false;

    checkArr.splice(checkArr.indexOf(elem), 1);
    return (checkArr.indexOf(elem) !== -1);

}

export const callMethodsFromArray = (methods, ...params) => methods.map(fn =>  fn(...params));

export const getIdOfHigherNumberOfArray = (arr) => {

    const higherNumber = Math.max(...arr);
    
    if (isDuplicate(arr, higherNumber)) {
        const arrOfIds = [];
        const arrClone = arr.slice();

        while (arrClone.indexOf(higherNumber) !== -1) {
            const id = arrClone.indexOf(higherNumber);
            arrOfIds.push(id);

            arrClone.splice(arrClone.indexOf(higherNumber), 1, 'Element taken out');
        }

        return arrOfIds;
    }

    return [arr.indexOf(higherNumber)];
}

export function deleteDuplicates(array) {
    const result = [];
    
    array.forEach((elem) => {
        
        if (result.indexOf(elem) === -1) {
            result.push(elem);
        }

    });

	return result;
}

export function convertArrOfObjToOneObj(arr) {
    const cloneArr = arr.slice();

    return cloneArr.reduce((acum, elem) => Object.assign(acum, elem));
}