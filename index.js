"use strict";
var program = require('commander');
const readline = require('readline');
var Combinatorics = require('js-combinatorics');
var replaceall = require("replaceall");
//var Regex = require("regex");
const fs = require('fs');
const INPUT_DATA = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const URL = "http://ekstep.in/co/"; // url to be concatenated
const INPUT_SEQUENCE_LENGTH = 2; // length of the sequence 
const PUBLISHER_ID = "ABCD";
const INPUT_PATTERN1 =  new RegExp(/^[0-9]+(,)+([0-9]+)?$/); //to Check two comma seprated numbers
const INPUT_PATTERN2= new RegExp(/^[0-9]+([0-9]+)?$/); // to check only 1 number
//const regex = new Regex(INPUT_PATTERN);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var finaloutput = [];


var inputs = [];
var start_index;
var end_index;
var cmb, a;

let writeStream = fs.createWriteStream('output.csv');

writeStream.on('error', (e) => {
  console.log('Program Exited with error code:',e.errno);
   console.log('PLEASE CLOSE OUTPUT.CSV FILE IF ITS ALREADY OPEN');
  process.exit();
});
/**
* to Get the Input from the user.
*
* @author Vaibhav Chaudhary
*/

getInput();

function getInput() {
  rl.question('Enter the start and end position eg: 100,200 or only start position: ', (answer) => {
    try {
     // console.log("value entered by user",answer,INPUT_PATTERN1.test(answer));
      if(INPUT_PATTERN1.test(answer)){
     // console.log("coming insde fst if");
      inputs = answer.split(',');
      start_index = inputs[0] - 1;
      end_index = inputs[1];
      if(end_index<start_index){
        tryAgain();
      }
      rl.close();
      }
    else if(INPUT_PATTERN2.test(answer)){
     //  console.log("coming insde 2nd if");
       start_index = answer;
      rl.close();

    }
    else{
      tryAgain();

    }
    }
    catch (e) {
      console.log("Exception occured:", e);
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
  rl.question('Inputs are inavlid Press 1 to enter the input again or anything to exit: ', (answer) => {
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
  //console.log("Done taking inputs");

  generateCombinations(INPUT_DATA,INPUT_SEQUENCE_LENGTH).then((e) => {
    console.log("Combinations has been created successfully");
    console.log(e);
   // writeStream.end();

  })
})

/**
* to Generate the sequence takes the DATA and length of the sequence
* @param {string[]} DATA 
* @param {string} SEQUENCE_LENGTH 
* @author Vaibhav Chaudhary
*/
function generateCombinations(DATA,SEQUENCE_LENGTH) {
  return new Promise((resolve, reject) => {
    cmb = Combinatorics.baseN(DATA, SEQUENCE_LENGTH);
    var count = 0;
    try {
      while (a = cmb.next()) {
        if(end_index!= undefined){
         // console.log("end index is definedd");
        if (count >= start_index && count < end_index) {
          writeStream.write(URL +PUBLISHER_ID+'-'+ a.toString().replace(/,/g, '') + '\n');
        }
        }
      else
        {
         // console.log("no end index");
           if (count >= start_index ) {
          writeStream.write(URL +PUBLISHER_ID+'-'+ a.toString().replace(/,/g, '') + '\n');
        }
        }
        
        if (cmb.next() == undefined){
          console.log("done");
          resolve("generated all combinations");
        }
        count++;
      }
    }
    catch (e) {
      console.log("Exception Occurred", e)
      process.exit();
    }

  })
}


writeStream.on('end', () => {
  console.log('wrote all data to file');
});