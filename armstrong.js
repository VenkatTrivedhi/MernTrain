
for (let number=0;number<=100000;number++){

    let amstrongSum = 0

    //convert number into string form
    number_string= ""+ number
    length = number_string.length

    
    //getting amstrongSum 
    for(let digit_charecter of number_string){
          
        digit_integer = digit_charecter*1
        power = digit_integer**length
        amstrongSum = amstrongSum + power 
    } 

    //checking amstrong or not 
    if (amstrongSum==number){
        console.log('${i} is Amstrong number')
    }

}




