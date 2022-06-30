
//recursive function for checking prime number 
//intial factor1 will 3 ,will be increamented for each recursion
let prime = (number, factor1) => {

    //if reminder is 0 when number divided by the factor1,
    // then the factor1 is really a factor, and number is not a prime.
    if (number % factor1 === 0) {
        console.log(`${number} is Not Prime number`)
        return
    }

    let factor2 = number / factor1

    //after factor1 becomes bigger than factor2
    //the same factor will be repeated in reverse
    //so no need continue search for factors
    if (factor1 > factor2) {
        console.log(`${number} is Prime number`)
        return
    }

    prime(number, factor1 + 1)
}


//function for reading a valid number type 
let readAndHandle = (message = "enter a number") => {
    let input = prompt(message)

    if (input === null) {
        console.log('exited,refresh restart')
        return
    }

    // converting input into number type or false
    input = input * 1

    // restricting datatype other than numbers
    if (!input && input != 0) {
        let message = "enter numbers only"
        console.log(message)
        readAndHandle(message)
    }

    //restrict negitive number 
    if (input < 0) {
        let message = "enter positive numbers"
        console.log(message)
        readAndHandle(message)
    }
    
    //proceeding with valid input
    if (input>= 0) {
        let initial_factor1 = 2
        switch (input) {
            case 0:
                console.log('0 is not a prime number')
                break
            case 1:
                console.log('1 is not a prime numner')
                break
            case 2:
                console.log('2 is prime number')
                break
            default:
                //recursive function
                prime(input, initial_factor1)
        }
    }
}

readAndHandle()