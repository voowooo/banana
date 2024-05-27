// scripts.js

// Load the initial language
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    document.getElementById('languageSwitcher').value = savedLanguage;
    changeLanguage(savedLanguage);
});

function changeLanguage(language) {
    localStorage.setItem('language', language);
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key];
    });
}

// Existing functions and initializations

function back(what) {
    if(what == 'menu'){
        document.getElementById('menu').style.display = "none";
    }
}

function loadScore() {
    const savedScore = localStorage.getItem('score');
    return savedScore ? parseInt(savedScore, 10) : 0;
}

function saveScore(score) {
    localStorage.setItem('score', score);
}

function loadPurchasedTokens() {
    const savedTokens = localStorage.getItem('purchasedTokens');
    return savedTokens ? JSON.parse(savedTokens) : [];
}

function savePurchasedTokens(tokens) {
    localStorage.setItem('purchasedTokens', JSON.stringify(tokens));
}

function loadTokens() {
    const savedTokens = localStorage.getItem('tokens');
    return savedTokens ? JSON.parse(savedTokens) : [
        { name: 'CapiToken', level: 1, price: 10, income: 1, image: 'images/TokenImages/token1.png' },
        { name: 'PassaToken', level: 1, price: 100, income: 10, image: 'images/TokenImages/token2.png' },
        { name: 'KrubsBUg', level: 1, price: 1000, income: 100, image: 'images/TokenImages/token3.png' },
        { name: 'Black Coin', level: 1, price: 1499, income: 52, image: 'images/TokenImages/token4.png' },
    ];
}

function saveTokens(tokens) {
    localStorage.setItem('tokens', JSON.stringify(tokens));
}

let score = loadScore();
document.getElementById('score').innerText = score;

let purchasedTokens = loadPurchasedTokens();

let tokens = loadTokens();

document.getElementById('clickableImage').addEventListener('click', () => {
    score += 1;
    document.getElementById('score').innerText = score;
    saveScore(score);
});

function menu(){
    document.getElementById('menu').style.display = "flex";
}

function updateTokens() {
    const tokenContainer = document.getElementById('tokens');
    tokenContainer.innerHTML = '';
    tokens.forEach((token, index) => {
        const tokenDiv = document.createElement('div');
        tokenDiv.className = 'token';
        tokenDiv.innerHTML = `
            <img src="${token.image}" alt="${token.name}" class="token-image"></br>
            <span>${token.name}</span></br>
            <span>Income: ${token.income}/s</span></br>
            <button onclick="buyToken(${index})">Buy for ${token.price}</button>
        `;
        tokenContainer.appendChild(tokenDiv);
    });
}

function sellToken(index) {
    const token = purchasedTokens[index];
    const sellPrice = Math.floor(token.price * (Math.random() + 0.5));
    score += sellPrice;
    document.getElementById('score').innerText = score;
    saveScore(score);
    purchasedTokens.splice(index, 1);
    savePurchasedTokens(purchasedTokens);
    updatePurchasedTokens();
}

function updatePurchasedTokens() {
    const purchasedTokenContainer = document.getElementById('purchasedTokens');
    purchasedTokenContainer.innerHTML = '';
    purchasedTokens.forEach((token, index) => {
        const tokenDiv = document.createElement('div');
        tokenDiv.className = 'token';
        const sellPrice = Math.floor(token.price * (Math.random() + 0.5));
        tokenDiv.innerHTML = `
            <img src="${token.image}" alt="${token.name}" class="token-image"></br>
            <span>${token.name}</span></br>
            <span>Income: ${token.income}/s</span></br>
            <span>Sell Price: ${sellPrice}</span></br>
            <button onclick="sellToken(${index})" data-translate="sell">Sell</button>
        `;
        purchasedTokenContainer.appendChild(tokenDiv);
    });
    // Update language for dynamic content
    changeLanguage(localStorage.getItem('language') || 'en');
}

function updatePurchasedTokenPrices() {
    purchasedTokens.forEach(token => {
        const priceChangePercentage = (Math.random() * 20) - 10;
        const newPrice = Math.round(token.price * (1 + priceChangePercentage / 100));
        token.price = Math.max(newPrice, 1);
    });
    savePurchasedTokens(purchasedTokens);
    updatePurchasedTokens();
}

setInterval(updatePurchasedTokenPrices, 600000);

function buyToken(index) {
    const token = tokens[index];
    if (score >= token.price) {
        score -= token.price;
        const purchasedToken = {
            name: token.name,
            level: token.level,
            price: token.price,
            income: token.income,
            image: token.image
        };
        document.getElementById('score').innerText = score;
        saveScore(score);
        purchasedTokens.push(purchasedToken);
        savePurchasedTokens(purchasedTokens);

        token.price = Math.round(token.price * 1.5);
        saveTokens(tokens);

        updateTokens();
        updatePurchasedTokens();
    } else {
        alert(translations[localStorage.getItem('language') || 'en'].notEnoughPoints);
    }
}

function generateIncome() {
    purchasedTokens.forEach(token => {
        score += token.income;
    });
    document.getElementById('score').innerText = score;
    saveScore(score);
}

function showPurchasedTokens() {
    document.getElementById('purchasedTokensContainer').style.display = 'flex';
}

function closePurchasedTokens() {
    document.getElementById('purchasedTokensContainer').style.display = 'none';
}

function resetProgress() {
    if (confirm(translations[localStorage.getItem('language') || 'en'].resetProgress)) {
        localStorage.clear();
        score = 0;
        document.getElementById('score').innerText = score;
        purchasedTokens = [];
        tokens = [
            { name: 'CapiToken', level: 1, price: 10, income: 1, image: 'images/TokenImages/token1.png' },
            { name: 'PassaToken', level: 1, price: 100, income: 10, image: 'images/TokenImages/token2.png' },
            { name: 'KrubsBUg', level: 1, price: 1000, income: 100, image: 'images/TokenImages/token3.png' },
            { name: 'Black Coin', level: 1, price: 1499, income: 52, image: 'images/TokenImages/token4.png' },
        ];
        saveScore(score);
        savePurchasedTokens(purchasedTokens);
        saveTokens(tokens);
        updateTokens();
        updatePurchasedTokens();
    }
}

updateTokens();
updatePurchasedTokens();
setInterval(generateIncome, 1000);
