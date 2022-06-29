// 
for (let i=0;i<=10000;i++){

    let sum = 0
    number = i.toString();
    
    for(let digit of number){   
        digit = parseInt(digit)    
        sum = sum + digit**3 
    } 
    if (sum==i){
        console.log(i)
    }

}




