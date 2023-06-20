const slider = document.querySelector("[data-lenghtslider]");
const length  = document.querySelector("[data-lengthNumber]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#Numbers");
const symbolsCheck = document.querySelector("#symbols");
const dataindicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".genratebtn");
const copyMsg = document.querySelector("[data-copymsg]");
const copyBtn = document.querySelector("[data-copy]");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const mail = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const passwordDisplay = document.querySelector("[data-passwordDisplay]");


let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

 function handleSlider(){
    slider.value = passwordLength;
    length.innerText = passwordLength;
 };

 function setIndicator(color){
    dataindicator.style.backgroundColor = color;
 }

 function generateRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
 };

 function generateRndNumber(){
    return generateRandomInteger(0,9);
 };

 function generateUpperCase(){
    return String.fromCharCode(generateRandomInteger(65,90));
 };
 function generateLowerCase(){
    return String.fromCharCode(generateRandomInteger(97,122));
 };
 function generateSymbol(){
    const symbol = generateRandomInteger(0,mail.length);
        return mail.charAt(symbol);
 };
 function calcStrength(){
    let upper = false;
    let lower = false;
    let num = false;
    let sym = false;
    if (uppercaseCheck.checked) upper = true;
    if (lowercaseCheck.checked) lower = true;
    if (numbersCheck.checked) num = true;
    if (symbolsCheck.checked) sym = true;
    if (upper && lower && (num || sym) && passwordLength >= 8) {
        setIndicator("#0f0");
      } else if (
        (lower || upper) &&
        (num || sym) &&
        passwordLength >= 6
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }
 }

 async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");
    
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
 }
 function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

slider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click',()=>{
    if (passwordDisplay.value)
        copyContent();
})

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) =>{
        if (checkbox.checked)
            checkCount++;
    });
     if (passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange);
});
generateBtn.addEventListener('click',()=>{
    if (checkCount == 0)
        return;
    if (passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    console.log("Starting the Journey");
        password="";
        let funcArr = [];
        if (uppercaseCheck.checked)
            funcArr.push(generateUpperCase);

        if (lowercaseCheck.checked)
            funcArr.push(generateLowerCase);

        if (numbersCheck.checked)
            funcArr.push(generateRndNumber);

        if (symbolsCheck.checked)
            funcArr.push(generateSymbol);

        for(let i=0;i<funcArr.length;i++){
            password+=funcArr[i]();
        }
        console.log("COmpulsory adddition done");

        // genrate remaining password 
        for(let i=0; i<passwordLength-funcArr.length; i++) {
            let randIndex = generateRandomInteger(0 , funcArr.length);
            console.log("randIndex" + randIndex);
            password += funcArr[randIndex]();
        }
        console.log("Remaining adddition done");

        password = shufflePassword(Array.from(password));
        console.log("Shuffling done");
        passwordDisplay.value = password;
        console.log("UI adddition done");
        calcStrength();
        
});
