"use strict";
const mocha = require("mocha");
const expect = require("chai").expect;
const validateInputs = require("../index").validateInputs;
const generateCombinations = require("../index").generateCombinations;
const INPUT_DATA = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const LENGTH = 6;
describe("All Input Validations",function(){
    it("Return false if end index is less than start index",function(){
        const data = "50,20";
        expect(validateInputs(data)).to.be.equal(false);

    })
    it("Return true if start index is less than end index",function(){
        const data = "20,50";
        expect(validateInputs(data)).to.be.equal(true);

    })
    it("Return true if end index equal to start index",function(){
        const data = "20,20";
        expect(validateInputs(data)).to.be.equal(true);

    })
    it("Check if start index is greater than total number of sequences",function(){
        const data="2176782337"
       return generateCombinations(INPUT_DATA,LENGTH,data).then(function(result){
           
           expect(result).to.contains('links have been generated successfully');
       })
    })
    it("Check if end index is greater than total number of sequences",function(){
        const startdata="2176782330"
        const data="2176782337"
       return generateCombinations(INPUT_DATA,LENGTH,startdata,data).then(function(result){
           
           expect(result).to.contains('links have been generated successfully');
       })
    })
    it("Check if going out of bound",function(){
        
        const data="2176782330";
       return generateCombinations(INPUT_DATA,LENGTH,data).then(function(result){
          
           expect(result).to.contains('links have been generated successfully');
       })
    })
})

