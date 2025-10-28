// 1. Definição do Jogo
// Usamos emojis vibrantes como conteúdo das cartas
const cardContents = ['😊', '😎', '🤩', '🥳', '🚀', '🌈', '🌟', '🍕']; 

let gameCards = [];
let hasFlippedCard = false;
let lockBoard = false; // Bloqueia virar mais cartas enquanto checa o par
let firstCard = null;
let secondCard = null;

let matchesFound = 0;
let tries = 0;

// Referências ao DOM
const gameContainer = document.querySelector('.game-container');
const matchesDisplay = document.getElementById('matches');
const triesDisplay = document.getElementById('tries');
const resetButton = document.getElementById('reset-button');

// Configuração de Sons (É NECESSÁRIO CRIAR A PASTA 'sounds' com os MP3s)
const flipSound = new Audio('sounds/flip.mp3'); 
const matchSound = new Audio('sounds/match.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');
const winSound = new Audio('sounds/win.mp3');

// Função para embaralhar um array (Algoritmo Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

// 2. Inicialização do Jogo
function initGame() {
    // Cria os pares e embaralha
    gameCards = [...cardContents, ...cardContents]; 
    shuffle(gameCards);

    gameContainer.innerHTML = ''; // Limpa o container
    matchesFound = 0;
    tries = 0;
    matchesDisplay.textContent = matchesFound;
    triesDisplay.textContent = tries;
    
    resetBoard(); // Garante que as variáveis de controle estão limpas

    // Cria os elementos das cartas no HTML
    gameCards.forEach(content => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.content = content; // Armazena o valor do emoji

        // Ícone de interrogação no verso da carta (usando Font Awesome)
        card.innerHTML = `
            <div class="card-face"><i class="fas fa-question"></i></div>
            <div class="card-back">${content}</div>
        `;
        
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

// 3. Lógica de Virar a Carta
function flipCard() {
    if (lockBoard) return; 
    if (this === firstCard) return; 
    if (this.classList.contains('match')) return; // Não vira cartas já combinadas

    this.classList.add('flip'); 
    flipSound.play(); 

    if (!hasFlippedCard) {
        // Primeira carta virada
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // Segunda carta virada
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
        matchSound.play();
        disableCards(); 
        matchesFound++;
        matchesDisplay.textContent = matchesFound;

        if (matchesFound === cardContents.length) {
            // Vitória!
            winSound.play(); 
            setTimeout(() => {
                alert(`🎉 Parabéns! Você ganhou em ${tries} tentativas!`);
            }, 500);
        }
    } else {
        wrongSound.play();
        unflipCards(); 
    }
}

// 5. Par Encontrado (Desabilitar clique)
function disableCards() {
    // Remove os event listeners para que as cartas não possam mais ser clicadas
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // Adiciona a classe 'match' para o estilo e animação
    firstCard.classList.add('match');
    secondCard.classList.add('match');

    resetBoard();
}

// 6. Par Não Encontrado (Desvirar)
function unflipCards() {
    lockBoard = true; // Bloqueia o tabuleiro para evitar mais cliques enquanto desvira

    // Espera 1 segundo para o jogador ver a diferença
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1000); 
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
