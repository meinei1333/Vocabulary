import Global from './Global';

var index = 1;
var name;
var xmlString;
var xmlDoc;
var xml;
var wav;
var symbol;

export default class Practice {
  constructor() {
    this.init();
  }

  init() {
    document.getElementById('next').addEventListener('click', this.next.bind(this));
    document.getElementById('sound').addEventListener('click', this.playAudio.bind(this));

    if (localStorage.getItem("index")) {
      index = localStorage.getItem("index");
    } else {
      index = 1;
    }
    this.showVoc();
  }

  next(event) {
    index++;
    this.showVoc();
  }

  showVoc() {
    if (index >= Global.allVoc.length) {
      index = 1;
    }
    localStorage.setItem("index", index);
    name = Global.allVoc[index].name;
    //name = 'crimea';
    document.getElementById("name").innerHTML = name;
    document.getElementById("content").innerHTML = Global.allVoc[index].content;
    this.get_symbol_pronounce(name);
  }

  get_symbol_pronounce(name) {
    var url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + name + '?key=9aee71c1-025d-49d9-975c-d1b81440200d';
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        xmlString = xhr.responseText;
        xmlDoc = $.parseXML(xmlString);
        xml = $(xmlDoc);
        if (xml.find('wav').length === 0) return;
        wav = xml.find('wav')[0].textContent;
        symbol = xml.find('pr')[0].textContent;
        document.getElementById("symbol").innerHTML = symbol;
        this.playAudio(name, wav);
      }
    }
    xhr.send()
  }

  playAudio() {
    var zeroStr = "";
    var str;
    var str = 'http://media.merriam-webster.com/soundc11/' + this.getSubdirectory() + '/' + wav;
    var audio = new Audio(str);
    audio.play();
  }

  getSubdirectory() {
    if (wav.slice(0, 3) == 'bix') {
      return 'bix';
    } else if (wav.slice(0, 2) == 'gg') {
      return 'gg';
    } else if (wav.slice(0, 6) == 'number') {
      return 'number';
    } else {
      return name.toLowerCase().slice(0, 1);
    }
  }
}