
let player1 = prompt("enter name of player1:")
let player2 = prompt("enter name of player2:")


var grid = [[null,null,null],[null,null,null],[null,null,null]]
        
var gameOver = false

var winner = null

var currentPlayer = player1

var countMark = 0



let checkGameOVer=()=>{
    //if some one won in last turn it won't be game over  
    if (winner!=null){
        return
    }
    
    if (countMark>=9){
        gameOver=true
        console.log("Game Over")
    }
}



let checkWinner=(player)=>{
     
    //checking horizantal lines
    for (let i=0;i<3;i++){
        let left_cell = grid[i][0];
        let middle_cell = grid[i][1];
        let right_cell = grid[i][2];
        
        // to avoid false winning in next step incase 3 cells are null
        // we should skip this iteration with bellow condition
        if(left_cell===null){
            continue
        }
        
        if (left_cell==middle_cell&&middle_cell==right_cell){
            winner = player
            console.log(winner+" is winner")
            return
            }
        }

    // checking vertical lines
    for (let i=0;i<3;i++){

        let top_cell = grid[0][i];
        let center_cell = grid[1][i];
        let bottom_cell = grid[2][i];
        
        if(top_cell===null){
            continue
        }
         
        if (top_cell==center_cell&&center_cell==bottom_cell){
            winner = player
            console.log(winner+" is winner")
            return
        }
        } 
    
    // checking daignal line
    let top_right = grid[0][0] ;
    let bottom_left = grid[2][2];

    let center = grid[1][1] ;

    let top_left = grid[0][2] ;
    let bottom_right = grid[2][0] ;
      
    if(center===null){
        return
    }

    if (top_right==center && center==bottom_left){
        winner = player
        console.log(winner+" is winner")
    }
        
    if (top_left==center && center==bottom_right){
        winner = player
        console.log(winner+" is winner")
    }
}


// function for marking position
let mark=(player,position)=>{

    //getting indexes of given position in 2d-grid
    let first_index = Math.floor(position/3)
    let second_index = position%3

    let value = grid[first_index][second_index]

    // incase of position was already filled
    if (value!=null){
        let message =",that is filled,choose another position:"
        console.log("position filled")
        turn(player,message)
    }

    //filling position
    if (value===null){
        grid[first_index][second_index] = player
        countMark++

        //Grid
        console.log("Grid")
        for (let k=0;k<3;k++){
            console.log(grid[k])        
        }
        
        // checking whether someone win
        checkWinner(player)
        
        if (winner!=null){
            return
        }
        
        // checking whether game over
        checkGameOVer()    
        
        if(gameOver===true){
            return
        }
        
        //changing player for next turn
        if (player===player1){
            currentPlayer=player2
        }
        else{
            currentPlayer=player1
        }
    }
}


//function for reading a valid input in each turn  
let turn=(player,message="")=>{
 
    let input = prompt(player+"-turn,"+message+":")


    // to exit from prompt
    if(input===null){
        gameOver= true
        console.log('exited from game ,refresh to restart')
        return
    }
    else{
        // convert input into number or false
        position = input*1
    }

    // restricting datatype other than Numbers
    if (!position){
        message = ",please enter any number only from 1 to 9"
        console.log("only numbers from 1 to 9 are acceptable")
        turn(player,message)           
    }

    //restricting numbers other than 1-9 
    else if(0>=position||10<=position){
        message = ",please enter any number only from 1 to 9"
        console.log("only numbers from 1 to 9 are acceptable")
        turn(player,message)
    }

    //after getting a valid position we will try to mark the position
    if (0<position&&position<10){
    mark(player,position-1)
    }
    
}

// loop  for calling and recalling turn until the Game over or game Won 
while(true){
if (gameOver===true){
    break
}
if (winner!=null){
    break
}
turn(currentPlayer)
}
