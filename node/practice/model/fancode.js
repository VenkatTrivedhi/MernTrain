class TableFan{
    static serialNumber = 0;
    constructor(type){
        this.serilNumber = TableFan.serialNumber++
        this.type = type
    }

}

class CelingFan{
    static serialNumber = 0;
    constructor(type){
        this.serialNumber =  TableFan.serialNumber++
        this.type = type
    }
}

class Fan{
    constructor(type){
    switch(type){
        case("TableFan"): return new TableFan(type)     
        case("CelingFan"): return new CelingFan(type)
    }
}}
const newfan = new Fan("TableFan")
console.log(newfan)
