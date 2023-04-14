function handleSubmit(event) {
    event.preventDefault();

    let value = [];
    value.push(ref.current.value);
    //["394832948290"]

    //split input into an array of numbers
    let num = Array.from(String(value), Number);
    //[3,4,5,6,7,8]

    for (let i = 0; i < num.length; i += 2) {
      num[i] = num[i] * 2;
    }

    //update the state by copying in the old array and pasting
    //the new one
    setCardNum([...cardNum, num]);
  }
  