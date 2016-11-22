export default class Global {
    static set database(value) {
        this._database = value;
    }
    static get database() {
        return this._database;
    }
    static set allVoc(value){
        this._allVoc = value;
    }
    static get allVoc(){
        return this._allVoc;
    }
}