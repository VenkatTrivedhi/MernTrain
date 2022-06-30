//function for couting even,odd,zeros
let countEvenOddZero=(arr)=>{
    let Evens = 0
    let Odds  = 0
    let Zero  = 0
     
    for(let element of arr){
        
        if(element==0){
            Zero++
            continue
        }

        if(element%2==0){
            Evens++
            continue
        }

        if(element%2!=0){
            Odds++
        }

    }
    console.log("No of evens is "+Evens)
    console.log("No of odds is "+Odds)
    console.log("No of zeros is "+Zero)
}

//function for reading arr
let read=()=>{
    let NumberOfElements = prompt('Enter No.of elements in array')
    
    const arr = []
    for(i=0;i<NumberOfElements;i++){
        input = prompt("enter a element")
        arr.push(input)
    }
    
    console.log(arr)

    countEvenOddZero(arr)   
}

read()