var originalJason;
var resultJason;
$.getJSON("http://localhost:3000/db/voc.json", analyzeJson);

function analyzeJson(json){
    originalJason = json;
    originalJason.sort(compare);
    var tempQuestion;
    /*resultJason = '[';
    originalJason.forEach( element=> {
        if(tempQuestion === element.question) return;
        tempQuestion = element.question;
        resultJason += '{ "content" : "'+ element.question +'",\n "name" : "'+element.answer+'" },\n'
        //console.log(element.question+' : '+element.answer);
    })
    resultJason += ']';*/
    const ar = [];
    originalJason.forEach( element=> {
        if(tempQuestion === element.question) return;
        const obj = {};
        obj.content = element.answer;
        obj.name = element.question;
        ar.push(obj);
    })

    //var myString = JSON.stringify(ar);
    //console.log(myString);
    saveJsonFile(ar);
}

function saveJsonFile(ar){
    var json = JSON.stringify(ar);
    var blob = new Blob([json], {type: "application/json"});
    saveAs(blob, "result.json");
}

function compare(a,b) {
  if (a.question < b.question)
    return -1;
  if (a.question > b.question)
    return 1;
  return 0;
}