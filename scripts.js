var score = localStorage.score;
var add = localStorage.add;

window.onload = load();

function save() {
    localStorage.score = score;
    localStorage.add = add;
    console.log('saved' + localStorage);
}

function load() {
    if(score == undefined) {
        score = 0;
        add = 1;
        save();
        load();
    } else {
        document.getElementById('score').innerHTML = score;
        console.log('loaded' + localStorage);
    }
}
 
function clicked() {
    score = parseInt(score, 10) + parseInt(add, 10);
    console.log('added' + score);
    save();
    load();
}

function clearS() {
    localStorage.clear();
}