for (let i=0;i<=100000;i++){

    let amstrongSum = 0
    number= ""+i
    length = number.length

    for(let digit_string of number){  
        digit_int = digit_string*1  
        cube = digit_int**length
        amstrongSum = amstrongSum + cube 
    } 
    if (amstrongSum==i){
        console.log(i)
    }

}




