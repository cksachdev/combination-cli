"use strict";
const readline = require('readline');
var Combinatorics = require('js-combinatorics');
const fs = require('fs');
var Spinner = require('cli-spinner').Spinner;
 //Spinner.setDefaultSpinnerString(15);
const INPUT_DATA = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
//, "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
const URL = "https://diksha.gov.in/tn/"; // url to be concatenated
const INPUT_SEQUENCE_LENGTH = 6; // length of the sequence 
const PUBLISHER_ID = "MHSC"; // PUBLISHER ID
const SEPARATOR = ":"; // Separator between publisher id and sequence
const FLAG = true; //true if want to add  publihser ID and sequence after comma
const INPUT_PATTERN1 = new RegExp(/^[0-9]+(,)+([0-9]+)?$/); //to Check two comma seprated numbers
const INPUT_PATTERN2 = new RegExp(/^[0-9]+([0-9]+)?$/); // to check only 1 number
const MAX_LIMIT = 1000000; //Maximum number of sequences that can be genreated at one time max is 1000000

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
        tryAgain();
      }
      rl.close();
    }
    else if (INPUT_PATTERN2.test(answer)) {

      start_index = answer;
      rl.close();

    }
    else {
      tryAgain();

    }
  }
  catch (e) {
    console.log("Exception occured:", e);
    tryAgain();

  }


}
/**
* to Get the Input from the user.
*
* @author Vaibhav Chaudhary
*/

getInput();

function getInput() {
  spinner = new Spinner({text:'Processing....'});
 
  rl.question('Enter the start and end position eg: 100,200 or only start position: ', (answer) => {
    validateInputs(answer);
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
  
  spinner.start();
  generateCombinations(INPUT_DATA, INPUT_SEQUENCE_LENGTH).then((e) => {

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
* @author Vaibhav Chaudhary
*/
function generateCombinations(DATA, SEQUENCE_LENGTH) {
  return new Promise((resolve, reject) => {
    var count = 0;
    var cmb = Combinatorics.baseN(DATA, SEQUENCE_LENGTH);
    var cmb_length = cmb.length;
    //console.log("das", cmb_length);
    if (start_index > cmb_length || end_index > cmb_length) {
      reject("Last index is greater than the total number of sequences");
      return next();
    }
    else {
      cmb.filter((elem) => {
        //var cmb_length = cmb.length();
        if (count == MAX_LIMIT + 1) {
         // console.log("MAx limit reached");
          resolve(MAX_LIMIT + " links has been generated successfully");
          return next();
        }
        else {
          if (end_index != undefined) {

            if (count >= start_index && count < end_index) {
              if(FLAG)
              writeStream.write(URL + PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '')+'\,'+PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '') + '\n');
              else
                 writeStream.write(URL + PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '') + '\n');

            }
            else if (count > end_index - 1) {
              console.log('dasad');
              resolve("All links have been generated successfully");
              return next();
            }
          }
          else {
            if (count >= start_index) {
              if(FLAG)
              writeStream.write(URL + PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '')+'\,'+PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '')+ '\n');
              else
                writeStream.write(URL + PUBLISHER_ID + SEPARATOR + elem.toString().replace(/,/g, '') + '\n');

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
  console.log('done');
  
});