// 1. Variável para armazenar a pontuação atual de "Vigilância"
let pontosDeVigilancia = 0;

// 2. Elementos HTML para a pontuação e mensagens
const elementoPlacar = document.getElementById('current-score');
const elementoMensagem = document.getElementById('message-area');

// 3. Função para atualizar a pontuação exibida no HTML
function atualizarPlacar() {
    elementoPlacar.textContent = pontosDeVigilancia;
    console.log("Pontos de Vigilância: " + pontosDeVigilancia);
}

// 4. Função para exibir mensagens temáticas
function exibirMensagem(texto, cor = 'var(--bat-blue)') {
    elementoMensagem.textContent = texto;
    elementoMensagem.style.color = cor;
    // Remove a mensagem depois de um tempo
    setTimeout(() => {
        elementoMensagem.textContent = '';
    }, 3000); 
}

// 5. Função que será chamada quando o jogador ganhar pontos
function adicionarPonto(pontosGanhos = 1) {
    pontosDeVigilancia += pontosGanhos;
    atualizarPlacar();
    exibirMensagem(`+${pontosGanhos} Vigilância! Gotham agradece.`);

    // Lógica de "Game Over" ou objetivo alcançado com tema Batman
    if (pontosDeVigilancia >= 10) {
        exibirMensagem("O Cavaleiro das Trevas triunfa! Missão concluída.", 'var(--bat-yellow)');
        // Em um jogo real, aqui você chamaria uma função de Fim de Jogo ou próxima fase.
        // Por exemplo, desativar o botão para evitar mais cliques.
        document.querySelector('.bat-button').disabled = true;
    }
}

// 6. Inicia o placar quando a página carrega
document.addEventListener('DOMContentLoaded', (event) => {
    atualizarPlacar();
    exibirMensagem("Iniciando Operação Vigilância...", 'var(--bat-light-gray)');
});

// No seu jogo, você chamaria 'adicionarPonto(valor)' quando o jogador realizar uma ação temática.
// Ex: derrotar um capanga do Coringa, desarmar uma bomba, etc
let pontosDeVigilancia = 0;
const elementoPlacar = document.getElementById('current-score');
const elementoMensagem = document.getElementById('message-area');

function atualizarPlacar() {
    elementoPlacar.textContent = pontosDeVigilancia;
}

function exibirMensagem(texto, cor = 'var(--bat-blue)') {
    // ... [Mantenha a função de mensagem do código anterior] ...
}

// =======================================================
// NOVAS VARIÁVEIS E LÓGICA DO JOGO
// =======================================================

const batman = document.getElementById('batman');
const obstaculo = document.getElementById('joker-obstacle');
const gameBoard = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');

let isJumping = false;
let isGameOver = true; // Começa como Game Over até o jogo ser iniciado

// --- FUNÇÃO DE PULO ---
function jump() {
    if (isJumping || isGameOver) return;
    
    isJumping = true;
    batman.classList.add('jump');

    // Remove a classe 'jump' após a animação para permitir um novo pulo
    setTimeout(() => {
        batman.classList.remove('jump');
        isJumping = false;
    }, 500); 
}

// --- FUNÇÃO PARA INICIAR O JOGO ---
function startGame() {
    isGameOver = false;
    pontosDeVigilancia = 0;
    atualizarPlacar();
    gameStatus.style.display = 'none';
    restartButton.style.display = 'none';
    
    // Inicia a animação do obstáculo
    obstaculo.style.animationPlayState = 'running';
    
    // Inicia a contagem de pontos e a verificação de colisão
    loopPontos = setInterval(updateScore, 50); // Incrementa a pontuação mais rápido
    loopColisao = setInterval(checkCollision, 10);
    exibirMensagem("A Missão de Gotham começou!");
}

// --- CONTADOR DE PONTOS ---
function updateScore() {
    if (!isGameOver) {
        pontosDeVigilancia += 1;
        atualizarPlacar();
    }
}

// --- VERIFICAÇÃO DE COLISÃO ---
function checkCollision() {
    if (isGameOver) return;
    
    // Posições (usando getBoundingClientRect para precisão)
    const batmanRect = batman.getBoundingClientRect();
    const obstacleRect = obstaculo.getBoundingClientRect();

    // Lógica de Colisão:
    // 1. O obstáculo está na mesma faixa horizontal do Batman?
    // 2. A parte superior do obstáculo está abaixo da parte inferior do Batman (colisão vertical)?
    const isColliding = 
        batmanRect.right > obstacleRect.left &&
        batmanRect.left < obstacleRect.right &&
        batmanRect.bottom > obstacleRect.top;

    if (isColliding) {
        gameOver();
    }
}

// --- FIM DE JOGO ---
function gameOver() {
    isGameOver = true;
    
    // Para todos os loops de jogo
    clearInterval(loopPontos);
    clearInterval(loopColisao);
    
    // Para a animação do obstáculo
    obstaculo.style.animationPlayState = 'paused';
    
    // Exibe a tela de Game Over
    gameStatus.textContent = `FALHA NA MISSÃO! Pontos Finais: ${pontosDeVigilancia}`;
    gameStatus.style.display = 'block';
    restartButton.style.display = 'block';
    exibirMensagem("O Coringa venceu desta vez. Reinicie a Missão!", '#ff4500'); // Vermelho
}

// --- EVENT LISTENERS ---
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === ' ') {
        if (isGameOver) {
            startGame(); // Inicia o jogo se estiver em Game Over
        } else {
            jump(); // Pula se o jogo estiver ativo
        }
    }
});

// Evento de clique para pular (útil em dispositivos móveis ou com o mouse)
gameBoard.addEventListener('click', () => {
    if (isGameOver) {
        startGame();
    } else {
        jump();
    }
});

// Evento do botão de Reiniciar
restartButton.addEventListener('click', startGame);

// Inicializa o placar ao carregar a página
document.addEventListener('DOMContentLoaded', (event) => {
    atualizarPlacar();
});
