//function sum of fibanoci series
var terminated = false 
let fibanoci=(first,second)=>{
    console.log(first,second)
   
    if (second>=5000){
        return first
    }   
    let temp = second
    second = first+second
    first = temp
    return first + fibanoci(first,second)
}

//function for reading a valid number type 

let readAndHandle=(msg="enter number")=>{
    let arr =[0,1]

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
        

        if (!input&&input!=0){
            let message = "enter numbers only,for Number " 
            console.log(message)
            readAndHandle(message)
        }
        //restrict negitive number 
        if (input<0){
            let message = "enter positive numbers only,for Number " 
            console.log(message)
            readAndHandle(message)
        }

        if (input>=0){
            arr[i]= input
        }
    }

    let firstNumber = arr[0]
    let secondNumber = arr[1]

    console.log(fibanoci(firstNumber,secondNumber))
}
    
readAndHandle()