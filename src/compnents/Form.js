import { useState, useEffect } from 'react';


const Form = (props) => {

    const [cardNumber, setCardNumber] = useState(null);
    const [luhnSum, setLuhnSum] = useState(null);
    const [luhnArray, setLuhnArray] = useState([null]);

    // DOM variables
    const inputEL = document.querySelector(".searchterm");
    const resultEL = document.querySelector(".result");

    let validity = "";
    let message = "Please enter card number above to validate."
    // function that runs setCardNumber
    const handleChange = (e) => {
        setCardNumber(e.target.value)
        if (cardNumber != null && cardNumber !== undefined) {
            // validateCard()
        }
    }

    //function to validate the card number: 
    const validateCard = () => {
        let stringDigits = inputEL.value;
        // convert the input string into numbers array(coma separated digits)
        let numDigits = [];
        for (let i = 0, len = inputEL.value.length; i < len; i += 1) {
            numDigits.push(+stringDigits.charAt(i));
        }

        // evaluate card number with luhn alteration
        let len = numDigits.length;
        let alteredNumber = [];
        let k = 0;
        if (len >= 2) {
            for (let i = len - 1; i >= 0; i--) {
                if (k % 2 === 1) {
                    alteredNumber.push(numDigits[i] * 2)
                }
                else { alteredNumber.push(numDigits[i]) }
                k++;
            }
            alteredNumber = alteredNumber.reverse();
            setLuhnArray(alteredNumber);
            console.log(luhnArray)
        }
        console.log(luhnArray)
        //
    }

    // if luhnArray chages setLuhnSum
    useEffect(() => {
        if(luhnArray!==null){
        setLuhnSum(luhnArray.reduce((a, b) => a + b))}
    }, [luhnArray]);

    // whenever luhnSum changes, validate the number 
    useEffect(() => {

        // console.log("Luhn Sum: " + luhnSum)
        if(luhnArray!==null){
        if (luhnArray.length >= 2 && luhnSum % 10 === 0) {
            // console.log("Card number is valid.")
            validity = 'valid';
        }
        else {
            // console.log("Card number is invalid.")
            validity = 'invalid';
        }}
    }, [luhnSum]);

    const handleSubmit = (event) => {
        event.preventDefault();
        validateCard();
        // console.log(inputEL.value)
        if (luhnSum !== null) {
            resultEL.innerHTML = `<div><h2>Result:</h2><br/>
            Luhn Altered Number: ${luhnArray} <br/>
            Luhn Altered Numbers' Sum: ${luhnSum} <br/><br/>
            Card Number ${cardNumber} is ${validity}.<br/>
            </div>`
        }
        else {

            resultEL.textContent = `${message}`
        }
    }

    // function to clear result and text box
    const clearEntry = () => {
        if (inputEL) {
            inputEL.value = null;
            setCardNumber(null)
            setLuhnArray(null)
            setLuhnSum(null)
        }
        if (resultEL) {
            resultEL.textContent = `${message}`;
        }
        // setCardNumber();
    }


    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="searchterm"
                    className="searchterm"
                    onChange={handleChange}//value={cardNumber.searchterm}
                />
                <input type="submit" value="submit" />
                <h3 className='cardNum'>{cardNumber}</h3>
                <input type="button" value="Clear" onClick={clearEntry} />
            </form>
            <br/>
            <div className="result">{message}</div>
        </div>
    );
}

export default Form;