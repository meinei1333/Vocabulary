import Global from './Global';

export default class Add {
    constructor() {
        document.getElementById('save').addEventListener('click', this.saveVoc.bind(this));
    }

    saveVoc() {
        const obj = {
            name: document.getElementById('name_txt').value,
            content: document.getElementById('content_txt').value,
        }
        //Global.database.push(obj);
        const db = Global.database.child(Global.allVoc.length);
        db.set(obj);
        db.on('child_added', function (data) {
            document.getElementById('name_txt').value = '';
            document.getElementById('content_txt').value = '';
        });
    }
}