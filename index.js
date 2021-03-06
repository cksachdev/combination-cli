"use strict";
const readline = require('readline');
var Combinatorics = require('js-combinatorics');
const fs = require('fs');
var Spinner = require('cli-spinner').Spinner;
//Spinner.setDefaultSpinnerDelay(0);
//Spinner.setDefaultSpinnerString('Spinner 3 of 20')

const INPUT_DATA = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const URL = "https://diksha.gov.in/tn/"; // url to be concatenated
const INPUT_SEQUENCE_LENGTH = 6; // length of the sequence 
const PUBLISHER_ID = "MHSC"; // PUBLISHER ID
const SEPARATOR = ":"; // Separator between publisher id and sequence
const FLAG = true; //true if want to add  publihser ID and sequence after comma
const INPUT_PATTERN1 = new RegExp(/^[0-9]+(,)+([0-9]+)?$/); //to Check two comma seprated numbers
const INPUT_PATTERN2 = new RegExp(/^[0-9]+([0-9]+)?$/); // to check only 1 number
const MAX_LIMIT = 1000000; //Maximum number of sequences that can be genreated at once.
const SUCCESS_TEXT = "done in"; //Text to be displayed after processing

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var inputs = [];
var start_index;
var end_index;
var spinner;

let writeStream = fs.createWriteStream('output.csv');

writeStream.on('error', (e) => {
  console.log('Program Exited with error code:', e.errno);
  console.log('PLEASE CLOSE OUTPUT.CSV FILE IF ITS ALREADY OPEN');
  process.exit();
});


/**
* to validate the inputs entered by the user.
* @param {string} answer 
* @author Vaibhav Chaudhary
*/

function validateInputs(answer) {
  try {

    if (INPUT_PATTERN1.test(answer)) {

      inputs = answer.split(',');
      start_index = inputs[0] - 1;
      end_index = inputs[1];
      if (end_index < start_index) {
        return false;
      }
      
      return true;
    }
    else if (INPUT_PATTERN2.test(answer)) {

      start_index = answer;
     
      return true;

    }
    else {
      return false;

    }
  }
  catch (e) {
    console.log("Exception occured:", e);
    return false;

  }


}
/**
* to Get the Input from the user.
*
* @author Vaibhav Chaudhary
*/

getInput();

function getInput() {

  spinner = new Spinner({ text: 'Processing....' });
  rl.question('Enter the start and end position eg: 100,200 or only start position: ', (answer) => {
    if (validateInputs(answer)) {

      spinner.start();
      console.log("Preparing....")
      rl.close();

    }
    else {
      tryAgain();
    }
  });

}

/**
* to Give the user another chance to enter the inputs.
*
* @author Vaibhav Chaudhary
*/

function tryAgain() {
  rl.question('Entered inputs are invalid!! \nPress anything to exit or 1 to enter the inputs again: ', (answer) => {
    //  console.log("value entered by user in try again",answer);
    if (answer == 1) {
      getInput();
    }
    else {
      process.exit();
    }
  })
}



rl.on('close', () => {


  console.time(SUCCESS_TEXT);
  generateCombinations(INPUT_DATA, INPUT_SEQUENCE_LENGTH, start_index, end_index).then((e) => {
    //console.log(e);
    writeStream.end();
    // spinner.stop();
  }).catch((e) => {
    console.log(e);
    writeStream.end();
    // spinner.stop();
  })
})

/**
* to Generate the sequence takes the DATA and length of the sequence
* @param {string[]} DATA 
* @param {string} SEQUENCE_LENGTH 
* @param {string} startIndex
* @param {string} endIndex
* @author Vaibhav Chaudhary
*/
function generateCombinations(DATA, SEQUENCE_LENGTH, startIndex, endIndex) {
  return new Promise((resolve, reject) => {
    var count = 0;
    var genrated_sequence_count = 0;
    var cmb = Combinatorics.baseN(DATA, SEQUENCE_LENGTH);
    var cmb_length = cmb.length;
    //console.log("das", cmb_length,startIndex);
    if(endIndex-startIndex > MAX_LIMIT){
      reject("Difference between start Index and end Index is more than Maximum Limit");
      return next();
      
    }
    if ((startIndex != undefined && startIndex > cmb_length) || (endIndex != undefined && endIndex > cmb_length)) {
      reject("Index is greater than the total number of sequences");
      return next();
    }
    else {
      cmb.filter((elem) => {
        //var cmb_length = cmb.length();
        if (genrated_sequence_count == MAX_LIMIT) {
          // console.log("MAx limit reached");
          resolve(count + " links have been generated successfully");
          return next();
        }
        else {
          if (endIndex != undefined) {

            if (count >= startIndex && count < endIndex) {
              if (FLAG)
                writeStream.write(URL + PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '') + '\,' + PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '') + '\n');
              else
                writeStream.write(URL + PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '') + '\n');
              genrated_sequence_count++
            }
            else if (count > endIndex - 1) {
              resolve("All links have been generated successfully");
              return next();
            }
          }
          else {
            if (count >= startIndex) {
              if (FLAG)
                writeStream.write(URL + PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '') + '\,' + PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '') + '\n');
              else
                writeStream.write(URL + PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '') + '\n');
              genrated_sequence_count++;
            }
          }
        }
        count++;
      });
    }
  })
}


writeStream.on('finish', () => {
  spinner.stop();
  console.timeEnd(SUCCESS_TEXT);


});

module.exports = {
  validateInputs,
  generateCombinations
}
