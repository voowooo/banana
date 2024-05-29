var score = localStorage.score;
var add = localStorage.add;
var incomeGlobal = localStorage.incomeGlobal;

window.onload = load();
window.onload = showTokens();

function save() {
    localStorage.score = score;
    localStorage.add = add;
    localStorage.incomeGlobal = incomeGlobal;
    localStorage.pocket = JSON.stringify(pocket);
    console.log('saved' + localStorage);
}

function load() {
    if(score == undefined) {
        score = 0;
        add = 1;
        incomeGlobal = 0;
        pocket = [];
        save();
        load();
    } else {
        document.getElementById('score').innerHTML = score;
        document.getElementById('income').innerHTML = incomeGlobal;
        pocket = JSON.parse(localStorage.pocket || '[]');
        loadMyTokens();
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

function showTokens() {
    // console.log('showTokens() function was called');
    const shop = document.getElementById('shop');
    var completed = 0;
    var finish = tokens.length;
    while(completed < finish) {
        const tokenDiv = document.createElement('div');
        tokenDiv.className = 'tokenDiv';
        tokenDiv.innerHTML = `
            <p>${tokens[completed].name}</p>
            <p>${tokens[completed].price}</p>
            <p>${tokens[completed].id}</p>
            <p>${tokens[completed].income}</p>
            <button onclick='buy(${tokens[completed].id})'>Buy For ${tokens[completed].price}</button>
        `;
        shop.appendChild(tokenDiv);
        completed = completed + 1;
    }
    
}

function buy(goodId) {
    console.log('function buy(good) was called');
    console.log('goodId is ' + goodId);
    var token = tokens[goodId];
    score = parseInt(score, 10) - parseInt(token.price, 10);
    console.log('paid' + score);
    incomeGlobal = parseInt(incomeGlobal, 10) + token.income;
    pocket.push(token);
    console.log(pocket);
    loadMyTokens();
    save();
    load();
}

function loadMyTokens(){
    const pocketMain = document.getElementById('pocket');
    pocketMain.innerHTML = `<h1>POCKET</h1>`;
    var completed = 0;
    var finish = pocket.length;
    while(completed < finish) {
        const pocketDiv = document.createElement('div');
        pocketDiv.className = 'pocketDiv';
        pocketDiv.innerHTML = `
            <p>${pocket[completed].name}</p>
            <p>${pocket[completed].price}</p>
            <p>${pocket[completed].id}</p>
        `;
        pocketMain.appendChild(pocketDiv);
        completed = completed + 1;
    }
}

function addIncome(){
    score = score = parseInt(score, 10) + parseInt(incomeGlobal, 10);
    save();
    load();
}

setInterval(addIncome, 1000);