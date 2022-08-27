
const paginater = (array,limit=5,pagenumber=1) =>{
    const startingIndex = (pagenumber-1)*limit
    const endingIndex = (pagenumber*limit)-1

    if(endingIndex>User.allUsers[indexOfSelfUser].length-1){
        return array.slice(startingIndex)
    }
    return array.slice(startingIndex,endingIndex)
}

module.exports = paginater