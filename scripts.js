// Функция для загрузки счета из localStorage
function loadScore() {
    const savedScore = localStorage.getItem('score');
    return savedScore ? parseInt(savedScore, 10) : 0;
}

// Функция для сохранения счета в localStorage
function saveScore(score) {
    localStorage.setItem('score', score);
}

// Инициализация счета при загрузке страницы
let score = loadScore();
document.getElementById('score').innerText = score;

// Добавление обработчика события клика на картинку
document.getElementById('clickableImage').addEventListener('click', () => {
    score += 1;
    document.getElementById('score').innerText = score;
    saveScore(score);
});

// function clearStorage(){
//     localStorage.clear();
//     console.log('cleared');
//     console.log(localStorage);
// }

function menu(){
    document.getElementById('menu').style.display = "flex";
}