//iterating each number from 0 to 100000
for (let number=0;number<=100000;number++){

    let amstrongSum = 0

    //convert number into string form
    number_string= ""+ number

    //no of digits in number
    length = number_string.length

    
    //getting amstrongSum of number, by iterating each digit
    for(let digit_charecter of number_string){
        
        //converting each digit into integer  
        digit_integer = digit_charecter*1
    
        power = digit_integer**length
        amstrongSum = amstrongSum + power 
    } 

    //checking whether number is amstron
    if (amstrongSum==number){
        console.log('${i} is Amstrong number')
    }

}




