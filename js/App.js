import Practice from './Practice';
import Add from './Add';
import Global from './Global';

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        initDatabas();
    }
}

function initDatabas() {
    Global.database = firebase.database().ref();
    Global.database.on('value', loadCompletedVoc);
}

function loadCompletedVoc(event) {
    Global.allVoc = event.val();
    initfunction();
}

function initfunction(){
    const practice = new Practice();
    const add = new Add();
}
