
let factorial =(number)=>{
    if (number===0){
        return 0
    }
    else{
        return number+factorial(number-1)
    }

}


let read=(message='enter a number')=>{
    let input = prompt(message)
        
    if (input===null){
        console.log('exited,refresh restart')
        return
    }

    //converting input into number type
    
    input = input*1
    
    if (!input && input!=0){
        let message = "enter numbers only " 
        console.log(message)
        read(message)
    }
    //restrict negitive number 
    if (input<0){
        let message = "enter positive numbers only" 
        console.log(message)
        read(message)
    }

    if (input>=0){        
        console.log(factorial(input))
    }
}

read()

