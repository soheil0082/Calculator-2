let keypad = document.querySelector(".calculator__keys");
let tempDisplay = document.querySelectorAll("p")[0];
let mainDisplay = document.querySelectorAll("p")[1];
let isWaitingForSecondNumber = false;
let isWaitingForAnswer = false;
let usedDecimal = false;

keypad.addEventListener("click", getKey);

function getKey(e) {
  if (e.target.className == "key--number") {
    if (mainDisplay.innerHTML == "0" || isWaitingForSecondNumber) {
      mainDisplay.innerHTML = e.target.innerHTML;
      if (isWaitingForSecondNumber) {
        isWaitingForSecondNumber = false;
        isWaitingForAnswer = true;
      }
    } else {
      mainDisplay.innerHTML += e.target.innerHTML;
    }
  } else if (e.target.className === "key--operator") {
    if (isWaitingForAnswer) {
      tempDisplay.innerHTML =
        eval(
          (tempDisplay.innerHTML + mainDisplay.innerHTML)
            .replace(/x/g, "*")
            .replace(/÷/g, "/")
        ) +
        " " +
        e.target.innerHTML;
      mainDisplay.innerHTML = "0";
    } else if (!isWaitingForSecondNumber) {
      if (mainDisplay.innerHTML != "0") {
        tempDisplay.innerHTML =
          mainDisplay.innerHTML + " " + e.target.innerHTML;
        isWaitingForSecondNumber = true;
        usedDecimal = false;
      } else if (e.target.dataset.action === "subtract") {
        mainDisplay.innerHTML = e.target.innerHTML;
      }
    }
  } else if (e.target.dataset.action === "decimal" && !usedDecimal) {
    if (isWaitingForSecondNumber) {
      mainDisplay.innerHTML = "0" + e.target.innerHTML;
      isWaitingForSecondNumber = false;
      isWaitingForAnswer = true;
    } else {
      mainDisplay.innerHTML += e.target.innerHTML;
    }
    usedDecimal = true;
  } else if (e.target.className == "key--equal" && isWaitingForAnswer) {
    tempDisplay.innerHTML = eval(
      (tempDisplay.innerHTML + mainDisplay.innerHTML)
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
    );
    mainDisplay.innerHTML = Number(tempDisplay.innerHTML).toFixed(4);
    isWaitingForAnswer = false;
    usedDecimal = false;
  } else if (e.target.dataset.action === "clear") {
    mainDisplay.innerHTML = "0";
    tempDisplay.innerHTML = "0";
    isWaitingForAnswer = false;
    isWaitingForSecondNumber = false;
    usedDecimal = false;
  }
}
