let secretNumber;
let attempts = 0;
const maxAttempts = 5; // Limita o número de tentativas

const startButton = document.getElementById('startGameButton');
const gameArea = document.getElementById('game-area');
const inputArea = document.getElementById('input-area');
const guessInput = document.getElementById('guessInput');
const submitButton = document.querySelector('.submit-button');
const messageDisplay = document.getElementById('message-display');
const instructionText = document.querySelector('.instruction-text');

/**
 * Função principal para iniciar/reiniciar o jogo.
 */
function startGame() {
    // 1. Gera um novo número secreto entre 1 e 10.
    secretNumber = Math.floor(Math.random() * 10) + 1;
    attempts = 0;

    // 2. Oculta o botão 'PLAY NOW' e mostra a área de input.
    gameArea.style.display = 'none';
    inputArea.style.display = 'flex';
    
    // 3. Reseta o display de mensagens e o campo de input.
    messageDisplay.textContent = "Jogo iniciado! Você tem " + (maxAttempts - attempts) + " tentativas.";
    messageDisplay.className = 'result-message';
    guessInput.value = '';
    guessInput.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = 'ADIVINHAR';
    instructionText.textContent = "Adivinhe o número entre 1 e 10!";

    // Define o listener do botão ADIVINHAR (para garantir que só haja um)
    submitButton.removeEventListener('click', checkGuess);
    submitButton.addEventListener('click', checkGuess);
}

/**
 * Função para verificar o palpite do usuário.
 */
function checkGuess() {
    const guess = parseInt(guessInput.value);

    // Validação básica
    if (isNaN(guess) || guess < 1 || guess > 10) {
        messageDisplay.textContent = "Por favor, digite um número válido (1-10).";
        messageDisplay.className = 'result-message';
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        // VENCEU
        messageDisplay.textContent = "PARABÉNS! Você acertou em " + attempts + " tentativas!";
        messageDisplay.className = 'result-message correct';
        endGame('JOGAR NOVAMENTE');
    } else if (attempts >= maxAttempts) {
        // PERDEU
        messageDisplay.textContent = "FIM DE JOGO! O número secreto era " + secretNumber + ".";
        messageDisplay.className = 'result-message too-high'; // Usando a cor de erro
        endGame('TENTAR NOVAMENTE');
    } else {
        // CONTINUA O JOGO
        if (guess > secretNumber) {
            messageDisplay.textContent = "ERROU! É um número menor. Tentativas restantes: " + (maxAttempts - attempts);
            messageDisplay.className = 'result-message too-high';
        } else {
            messageDisplay.textContent = "ERROU! É um número maior. Tentativas restantes: " + (maxAttempts - attempts);
            messageDisplay.className = 'result-message too-low';
        }
        guessInput.value = ''; // Limpa o input
    }
}

/**
 * Função para finalizar o jogo e mostrar o botão de reinício.
 * @param {string} buttonText - Texto a ser exibido no botão.
 */
function endGame(buttonText) {
    guessInput.disabled = true;
    submitButton.disabled = true;

    // Reposiciona o botão 'PLAY NOW' para ser um botão 'JOGAR NOVAMENTE'
    const restartButton = startButton;
    restartButton.querySelector('span').textContent = buttonText;
    
    inputArea.style.display = 'none';
    gameArea.style.display = 'block';

    // Define o listener para o reinício
    restartButton.removeEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
}

// Configura o botão inicial 'PLAY NOW' para iniciar o jogo
startButton.addEventListener('click', startGame);
