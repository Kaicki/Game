// 1. Definição do Jogo
const cardContents = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // 8 itens
// Teremos 16 cartas no total (8 pares)

let gameCards = [];
let hasFlippedCard = false;
let lockBoard = false; // Bloqueia virar mais cartas enquanto checa o par
let firstCard, secondCard;

let matchesFound = 0;
let tries = 0;

// Referências ao DOM
const gameContainer = document.querySelector('.game-container');
const matchesDisplay = document.getElementById('matches');
const triesDisplay = document.getElementById('tries');
const resetButton = document.getElementById('reset-button');

// Função para embaralhar um array (Algoritmo Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca
    }
}

// 2. Inicialização do Jogo
function initGame() {
    // Cria os pares e embaralha
    gameCards = [...cardContents, ...cardContents]; // Duplica para criar os pares
    shuffle(gameCards);

    gameContainer.innerHTML = ''; // Limpa o container
    matchesFound = 0;
    tries = 0;
    matchesDisplay.textContent = matchesFound;
    triesDisplay.textContent = tries;

    // Cria os elementos das cartas no HTML
    gameCards.forEach(content => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.content = content; // Armazena o valor do par na carta

        // Conteúdo visual da carta
        card.innerHTML = `
            <div class="card-face">?</div>
            <div class="card-back">${content}</div>
        `;
        
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

// 3. Lógica de Virar a Carta
function flipCard() {
    if (lockBoard) return; // Se o tabuleiro estiver bloqueado, ignora o clique
    if (this === firstCard) return; // Se clicou na mesma carta, ignora

    this.classList.add('flip'); // Adiciona a classe CSS para virar

    if (!hasFlippedCard) {
        // Primeiro clique (primeira carta do par)
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // Segundo clique (segunda carta do par)
        secondCard = this;
        tries++;
        triesDisplay.textContent = tries;

        checkForMatch();
    }
}

// 4. Checagem do Par
function checkForMatch() {
    const isMatch = firstCard.dataset.content === secondCard.dataset.content;

    if (isMatch) {
        disableCards(); // Par encontrado
        matchesFound++;
        matchesDisplay.textContent = matchesFound;

        if (matchesFound === cardContents.length) {
            setTimeout(() => {
                alert(`Parabéns! Você ganhou em ${tries} tentativas!`);
            }, 500);
        }
    } else {
        unflipCards(); // Não é par
    }
}

// 5. Par Encontrado (Desabilitar clique)
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // Opcional: Adiciona uma classe para dar um estilo de "acertado"
    firstCard.classList.add('match');
    secondCard.classList.add('match');

    resetBoard();
}

// 6. Par Não Encontrado (Desvirar)
function unflipCards() {
    lockBoard = true; // Bloqueia o tabuleiro

    // Espera um tempo para o jogador ver as cartas
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1000); // 1 segundo
}

// 7. Resetar as variáveis de controle
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// 8. Evento do Botão Reiniciar
resetButton.addEventListener('click', initGame);

// Inicia o jogo quando a página carrega
initGame();

