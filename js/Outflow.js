class Outflow extends Data{
    static outflowCounter = 0;

    constructor(description, value){
        super(description, value);
        this._id = ++Outflow.outflowCounter;
    }
    get id(){
        return this._id;
    }
}