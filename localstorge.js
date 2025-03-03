 /**
  * save an iteam local storage
  * @param {string} key- key to be use in local storage  
  * @param {string | number| object | boolean | any[]} value- value to be save  
  * @returns {string}
  */

function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true; 
    } catch (error) {
        console.error("Error saving to localStorage:", error);
        return false;
    }
}

function readFromLocalStorage(key) {
    try {
        let value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error("Error reading from localStorage:", error);
        return null;
    }
}

function deleteFromLocalStorage(key) {
    if (localStorage.getItem(key) !== null) {
        localStorage.removeItem(key);
        return true; 
    }
    return false;
}

saveToLocalStorage()