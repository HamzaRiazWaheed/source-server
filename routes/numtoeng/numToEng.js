const numRange = {
  "000": "thousand",
  "00": "hundred",
  "90": "ninety",
  "80": "eighty",
  "70": "seventy",
  "60": "sixty",
  "50": "fifty",
  "40": "forty",
  "30": "thirty",
  "20": "twenty",
  "19": "nineteen",
  "18": "eighteen",
  "17": "seventeen",
  "16": "sixteen",
  "15": "fifteen",
  "14": "fourteen",
  "13": "thirteen",
  "12": "twelve",
  "11": "eleven",
  "10": "ten",
  "9": "nine",
  "8": "eight",
  "7": "seven",
  "6": "six",
  "5": "five",
  "4": "four",
  "3": "three",
  "2": "two",
  "1": "one",
  "0": "zero"
}
const getEnglishFromJSON = (num) => numRange[num];
/**
 * Convert Num to untis e.g 99 to [90, 9]
 * @param {string} num Numeric string
 * @returns Array of Units e.g 99 to [90, 9]
 */
const numToUnits = (num) => [...num].map((m, i) => `${m}${'0'.repeat(num.length - (i+1))}`);
/**
 * Splits a string at every position specified and return the splits Array
 * @param {string} string 
 * @param {number} position 
 * @returns ["123", "456", ...]
 */
const splitAtPosition = (string, position) => {
  const regexExpression = new RegExp(`(\\d)(?=(\\d{${position}})+$)`, 'g');
  return string.replace(regexExpression, '$1 ').split(' ');
}
/**
 * Returns a string with specified Length and only repeated with character
 * @param {string} character 
 * @param {number} stringLength 
 * @returns String with length of stringLength and repeated with character 
 */
const stringOfCharacter = (character, stringLength) => character.toString().repeat(stringLength);

/**
 * Checks if its a Numeric string
 * @param {string} number 
 * @returns true or false
 */
const isAValidNumber = (number) => !isNaN(Number(number));//number.match(/^\d*$/);
/**
 * Checks if Numeric string is in Range
 * @param {string} number 
 * @returns true or false
 */
 const isNumberInRange = (number) => Number(number) >= 0 && Number(number) <= 99999;
/**
 * Convert Numeric string to its English representation
 * @param {string} number 
 * @returns English represention of numeric value
 */
const getEnglishString = (number) => {
  console.log('number: ', number);
  let digitsByUnits = [];
  
  if(Number(number) <= 20) {
    digitsByUnits.push(Number(number));
  } else {
  // Converts 123456 to 123 456
  let formatWithSpaces = splitAtPosition(number, 3);
  console.log('formated: ', formatWithSpaces);
  
  formatWithSpaces.forEach((m, i) => {
    const units = numToUnits(Number(m).toString());
    console.log('# units: ', i, m, units);
    // replace the 10th division
    const lastTwoChar = Number(m.slice(-2));
    if(lastTwoChar <= 20) {
      units.splice(units.length - 2,2,lastTwoChar.toString())
    }
    units.forEach(n => {
      console.log('unit: ', n);
      const num = Number(n).toString()
      // if its a 100th e.g 123
      if (num.length > 2) {
        const split100ths = splitAtPosition(n, 2)
        console.log('splits: ', split100ths);
        digitsByUnits.push(...split100ths)
      } else {
        if(num !== '0') {
          digitsByUnits.push(num)
        }
      }
    });
    console.log('digits by units: ', digitsByUnits);
    // Number of characted after the Unit set
    const numberOfDigitsToLeft = formatWithSpaces.slice((i + 1)).join().length;
    console.log("number of digits to Left: ", numberOfDigitsToLeft)
    if (numberOfDigitsToLeft) {
      digitsByUnits.push(stringOfCharacter(0, numberOfDigitsToLeft));
    }
  })  
  }
  const english = digitsByUnits.map(m => m.toString().length ? getEnglishFromJSON(m) : null).join(' ');
  console.log('d:' , digitsByUnits);
  return english;
}

/**
 * Convert numeric string to it english representation
 * @param {string} number
 * @returns English representaion of string or Error msg
 */

const convertNumberToEnglish = (number) => {
  let englishString = "";
  if(!isAValidNumber(number)) {
    englishString = "Not A Valid Number";
  } else if(!isNumberInRange(number)) {
    englishString = "Number out of allowed range of 0 and 99999";
  } else {
    // Split by .
    if(number.includes('.')) {
      englishString = number.split('.').map(m => getEnglishString(m)).join(' . ');
    } else {
      englishString = getEnglishString(number);
    }
  }
  return englishString;
}

module.exports = convertNumberToEnglish;
