//function sum of fibanoci series
let fibanoci=(firstNumber,secondNumber)=>{
   
    if (secondNumber>=5000){
        return firstNumber
    }
    
    //creating and shifting to next 2 numbers
    let temporary = secondNumber
    secondNumber = firstNumber + secondNumber
    firstNumber = temporary

    //return sum of all first numbers less 5000 in series 
    return firstNumber + fibanoci(firstNumber,secondNumber)
}

//function for reading a valid number type 
let readInput=(msg="enter number")=>{
    let arr =[0,1]

    //changing initial 2 numbers
    for (let i=0;i<2;i++){
        let number = i+1
        let message =  msg + number
        let input = prompt(message)
        
        if (input===null){
            console.log('exited,refresh restart')
            return
        }

        //converting input into number type
        input = input*1
        
        //allowing only numbers
        if (!input&&input!=0){
            let message = "enter numbers only,for Number " 
            console.log(message)
            readInput(message)
        }

        //restrict negitive number 
        if (input<0){
            let message = "enter positive numbers only,for Number " 
            console.log(message)
            readInput(message)
        }

        if (input>=0){
            arr[i]= input
        }
    }

    let firstNumber = arr[0]
    let secondNumber = arr[1]

    console.log(`sum of fibonaci series(${firstNumber},${secondNumber}...) is ${fibanoci(firstNumber,secondNumber)}`)
}
    
readInput()