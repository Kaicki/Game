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
// Ex: derrotar um capanga do Coringa, desarmar uma bomba, etc.
