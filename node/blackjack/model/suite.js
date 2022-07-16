const Card = require("./card")

class Suite{
    constructor(suiteType){
        this.suite = []
        let cardParameter = [["number",2],["number",3],["number",4],["number",5],["number",6],["number",7],
                             ["number",8],["number",9],["number",10],["ace",1],["jack",10],["king",10],["queen",10]]
        
        for (let i = 0; i < 13; i++) { 
            this.suite.push(new Card(suiteType,cardParameter[i][0],cardParameter[i][1]));
        }
    }
}

module.exports =  Suite