


function back(what) {
    if(what == 'menu'){
        document.getElementById('menu').style.display = "none";
    }
}




// Функция для загрузки счета из localStorage



function loadScore() {
    const savedScore = localStorage.getItem('score');
    return savedScore ? parseInt(savedScore, 10) : 0;
}

// Функция для сохранения счета в localStorage
function saveScore(score) {
    localStorage.setItem('score', score);
}

// Функция для загрузки купленных токенов из localStorage
function loadPurchasedTokens() {
    const savedTokens = localStorage.getItem('purchasedTokens');
    return savedTokens ? JSON.parse(savedTokens) : [];
}

// Функция для сохранения купленных токенов в localStorage
function savePurchasedTokens(tokens) {
    localStorage.setItem('purchasedTokens', JSON.stringify(tokens));
}

// Инициализация счета при загрузке страницы
let score = loadScore();
document.getElementById('score').innerText = score;

// Инициализация купленных токенов при загрузке страницы
let purchasedTokens = loadPurchasedTokens();

// Добавление обработчика события клика на картинку
document.getElementById('clickableImage').addEventListener('click', () => {
    score += 1;
    document.getElementById('score').innerText = score;
    saveScore(score);
});

function menu(){
    document.getElementById('menu').style.display = "flex";
}

// Инициализация токенов
const tokens = [
    { name: 'CapiToken', level: 1, price: 10, income: 1, image: 'images/token1.png' },
    { name: 'PassaToken', level: 1, price: 100, income: 10, image: 'images/token2.png' },
    { name: 'KrubsBUg', level: 1, price: 1000, income: 100, image: 'images/token3.png' },
];

// Функция для обновления интерфейса токенов
function updateTokens() {
    const tokenContainer = document.getElementById('tokens');
    tokenContainer.innerHTML = '';
    tokens.forEach((token, index) => {
        const tokenDiv = document.createElement('div');
        tokenDiv.className = 'token';
        tokenDiv.innerHTML = `
            <img src="${token.image}" alt="${token.name}" class="token-image">
            <span>${token.name} (Level: ${token.level})</span>
            <span>Income: ${token.income}/s</span>
            <button onclick="buyToken(${index})">Buy for ${token.price}</button>
        `;
        tokenContainer.appendChild(tokenDiv);
    });
}

// Функция для продажи токена
function sellToken(index) {
    const token = purchasedTokens[index];
    const sellPrice = Math.floor(token.price * (Math.random() + 0.5)); // Продажная цена с учетом случайного курса
    score += sellPrice;
    document.getElementById('score').innerText = score;
    saveScore(score);
    purchasedTokens.splice(index, 1); // Удаляем проданный токен из массива купленных токенов
    savePurchasedTokens(purchasedTokens);
    updatePurchasedTokens();
}

// Обновление интерфейса купленных токенов с возможностью продажи
function updatePurchasedTokens() {
    const purchasedTokenContainer = document.getElementById('purchasedTokens');
    purchasedTokenContainer.innerHTML = '';
    purchasedTokens.forEach((token, index) => {
        const tokenDiv = document.createElement('div');
        tokenDiv.className = 'token';
        const sellPrice = Math.floor(token.price * (Math.random() + 0.5)); // Продажная цена с учетом случайного курса
        tokenDiv.innerHTML = `
            <img src="${token.image}" alt="${token.name}" class="token-image">
            <span>${token.name} (Level: ${token.level})</span>
            <span>Income: ${token.income}/s</span>
            <span>Sell Price: ${sellPrice}</span>
            <button onclick="sellToken(${index})">Sell</button>
        `;
        purchasedTokenContainer.appendChild(tokenDiv);
    });
}

// Функция для обновления курса купленных токенов
function updatePurchasedTokenPrices() {
    purchasedTokens.forEach(token => {
        const priceChangePercentage = (Math.random() * 20) - 10; // Генерация случайного процента изменения цены от -10% до +10%
        const newPrice = Math.round(token.price * (1 + priceChangePercentage / 100)); // Обновление курса с учетом изменения цены
        token.price = Math.max(newPrice, 1); // Устанавливаем минимальное значение курса
    });
    updatePurchasedTokens(); // Обновление интерфейса купленных токенов после изменения курса
}



// Обновление курса купленных токенов каждые 10 минут
setInterval(updatePurchasedTokenPrices, 960); // 10 минут в миллисекундах (600000 мс)



// Функция для покупки токена
function buyToken(index) {
    const token = tokens[index];
    if (score >= token.price) {
        score -= token.price;
        token.level += 1;
        token.price = Math.round(token.price * 1.5);
        token.income *= 2;
        document.getElementById('score').innerText = score;
        saveScore(score);
        purchasedTokens.push(token);
        savePurchasedTokens(purchasedTokens);
        updateTokens();
        updatePurchasedTokens();
    } else {
        alert('Not enough points!');
    }
}

// Функция для начисления дохода от токенов
function generateIncome() {
    purchasedTokens.forEach(token => {
        score += token.income;
    });
    document.getElementById('score').innerText = score;
    saveScore(score);
}

// Функция для показа купленных токенов
function showPurchasedTokens() {
    document.getElementById('purchasedTokensContainer').style.display = 'flex';
}

// Функция для скрытия купленных токенов
function closePurchasedTokens() {
    document.getElementById('purchasedTokensContainer').style.display = 'none';
}

// Обновление токенов при загрузке страницы
updateTokens();
updatePurchasedTokens();

// Начисление дохода каждые секунду
setInterval(generateIncome, 1000);
