var dragSrcEl = null;

var answers = [
    "Remove portafilter from group",
    "Flush the group",
       "Knock out old coffee and wipe the basket",
       "Dose the correct amount of coffee",
       "Distribute coffee evenly",
       "Tamp consistently and level",
       "Wipe the rim and ears of the portafilter",
       "Insert the portafilter and immediately brew",
       "Watch the flow and stop the pump",
       "Clean the portafilter and return it to the group"
];

var random = [
    6,
    2,
    5,
    8,
    7,
    0,
    4,
    3,
    9,
    1,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

addAnswers();
setDnDHandlers();
document.getElementById('hint').setAttribute('onclick', 'getHint()');
document.getElementById('closeinfo').setAttribute('onclick', 'closeModal()');
document.getElementById('closehint').setAttribute('onclick', 'closeHint()');
document.getElementById('info').setAttribute('onclick', 'showInfo()');

function setDnDHandlers() {
    var cols = document.querySelectorAll('.answer');
    [].forEach.call(cols, addDragStart);

    var slots = document.querySelectorAll('.holder');
    [].forEach.call(slots, addDragEnd);
}

function addDragStart(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragleave', handleDragLeave, false);

}

function addDragEnd(elem) {
    elem.addEventListener('dragenter', handleDragEnter, false)
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);
}

function addAnswers() {


    for (var i = 0; i < (answers.length); i++) {

        var divnode = document.createElement("DIV");
        var textnode = document.createTextNode(answers[random[i]]);
        divnode.appendChild(textnode);
        divnode.className = "answer";
        divnode.setAttribute('draggable', 'true');

        var linode = document.createElement("LI");
        linode.className = "holder";
        linode.appendChild(divnode);
        document.getElementById("answerlist").appendChild(linode);

        var holdernode = document.createElement("LI");
        holdernode.className = "holder";
        document.getElementById("holderlist").appendChild(holdernode);


    }
}


function getHint() {
    document.getElementById("hint").classList.remove("click");
    var reset = document.querySelectorAll('.wrong');
    reset.forEach(element => element.classList.remove("wrong"));

    setTimeout(function(){

    
    document.getElementById("hint").classList.add("click")

    let checks = document.getElementById("holderlist").querySelectorAll(".holder");


    for (var i = 0; i < (answers.length); i++) {

        if (checks[i].childNodes[0]) {


        

            if (checks[i].childNodes[0].innerHTML != answers[i]) {
                checks[i].childNodes[0].classList.add("wrong")
            }

        }


    }

    if(document.querySelectorAll('.wrong').length==0) {
        showHint();
    }

    },50)



}


function handleDragStart(e) {
    // Target (this) element is the source node.
    dragSrcEl = this;

    e.dataTransfer.setData('text/html', this.outerHTML);

    e.dataTransfer.effectAllowed = 'move';

    this.classList.add('dragElem');

}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    this.classList.add('over');

    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {

}

function handleDragLeave(e) {
    this.classList.remove('over');
    this.classList.remove('dragElem');
}

function handleDrop(e) {
    e.preventDefault();
    // this/e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on. dragSrcEl is the source element, 'this' is the target

        dragSrcEl.outerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');

        setDnDHandlers();
    }
    this.classList.remove('over');
    checkanswer();
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    this.classList.remove('over');
    this.classList.remove('dragElem');
    checkanswer();

}


function checkanswer() {

    var reset = document.querySelectorAll('.wrong');
    reset.forEach(element => element.classList.remove("wrong"))
    

    let checks = document.getElementById("holderlist").querySelectorAll(".answer");
    
    if (checks.length == answers.length) {

        for (var i = 0; i < (answers.length); i++) {

            if (checks[i].innerHTML == answers[i]) {
                continue;
            } else {
                return;
            }

        }

        correct();
    }
}

function closeModal(){
    document.getElementById("startoverlay").style.display = "none";
    document.getElementById("infomodal").style.display="block";
    document.getElementById("infomodal").classList.add("modalflash");
    setTimeout(function(){
        document.getElementById("infomodal").style.display = "none";
    },4000)
}

function showHint(){
    document.getElementById("hintoverlay").style.display = "flex";
}

function closeHint(){
    document.getElementById("hintoverlay").style.display = "none";
}

function correct(){
    document.getElementById("winoverlay").style.display = "flex"
}

function showInfo(){
    document.getElementById("startoverlay").style.display = "flex";
}