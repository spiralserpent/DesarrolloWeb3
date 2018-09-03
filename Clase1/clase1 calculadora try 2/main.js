/* global variables */
var currentOpp = ""; // last operator pressed
var display = document.getElementById('display'); // shortcut for display
var displayCleared = false; // has the "CE" button been pressed?
var num1 = 0; // the first number entered
var num2 = 0; // the second number entered
var carryNum = ""; // the result of the last operation, stored after hitting "=" (when num1, num2, and screenTotal are cleared)
var carryOver = false; // lets us know there is a carryNum
var screenTotal = ""; // the value (string) that appears on the display

/* operators */
var operators = {
  '+': function(a, b) { return parseFloat(a) + parseFloat(b) }, // add
  '-': function(a, b) { return parseFloat(a) - parseFloat(b) }, // subtract
  '*': function(a, b) { return parseFloat(a) * parseFloat(b) }, // multiply
  '/': function(a, b) { return parseFloat(a) / parseFloat(b) }, // division
};

/* functions */
function allClear() {
  carryNum = "";
  carryOver = false;
  displayCleared = false;
  num1 = 0;
  num2 = 0;
  runningTotal = 0;
  screenTotal = "";
  display.innerHTML = "0";
};
function clearDisplay() {
  screenTotal = num1;
  document.getElementById('display').innerHTML = "0";
  displayCleared = true;
};
function equals() { //when you press 'equals'
  if (num1 === 0) { // last number entered is assigned to either num1 or num2
    num1 = screenTotal;
  } else {
    num2 = screenTotal;
  }
  if (num1 !== 0 && num2 !== 0) { // if we have 2 numbers, prep for third (or higher) operation
    num1 = operators[currentOpp](num1, num2); // assign result of operation to num1
  }
  carryOver = true; // there is a number to carry over to another operation
  carryNum = num1; // that number is the value of num1
  display.innerHTML = parseFloat(num1.toFixed(5)); // display num1 on the screen (up to 5 decimals)
  num1 = 0; // clear num1 for next operation
  num2 = 0; // clear num2 for next operation
  screenTotal = ""; // clear screenTotal for next entry (but display still reads num1)
};
function percent() { 
  display.innerHTML = num1 * (screenTotal / 100);
  screenTotal *= num1 / 100;
};
function pressNum(num) { // when you press a number key
  if (displayCleared) { // has the "CE" button been pressed?
    screenTotal = num; // then make screenTotal = new entry
    displayCleared = false; // now forget about it
  } else {
    screenTotal = screenTotal + num; // otherwise, add the new entry to the end of screenTotal
  }
  display.innerHTML = screenTotal;
  if (carryOver) {
    num1 = carryNum;
    num2 = screenTotal + num;
    display.innerHTML = screenTotal;
    carryOver = false;
  }
};
function pressOp(opp) { // when you press an operator key
  // which operator is being used with our two numbers?
  displayCleared = false; // if the "CE" button has been pressed, forget about it
  if (carryOver) { // if equals has been pressed, prep for third (or higher) operation
      num1 = 0;
      num2 = 0;
      //display.innerHTML = "";
  } else { 
    num1 = screenTotal;
    num2 = 0;
  }
  currentOpp = opp;
  if (num1 === 0) { // assign last pressed number to num1 or num2
    num1 = screenTotal;
  } else {
    num2 = screenTotal;
  }
  screenTotal = ""; // clear screenTotal for next entry
};