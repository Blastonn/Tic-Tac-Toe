const gameboard = (function (){
    const posicao = Array(9).fill("");
    const getIndice = (indice) => posicao[indice];
    const setIndice = (indice, time) => posicao[indice] = time;
    const limparArray = () =>{
        return posicao.fill("");
    }
    const mostrarPosicoes = () => {
        return {posicao};
    }
    const tamanhoArray = () =>{
        return posicao.length;
    }
    const tamanhoArrayVazio = () => {
        return posicao.filter(el => el === "").length;
    }
    const tamanhoArrayPreenchido = () =>{
        return posicao.filter(el => el !== "").length;
    }
    return {getIndice,setIndice,mostrarPosicoes,tamanhoArrayVazio,tamanhoArrayPreenchido,tamanhoArray,limparArray};
})();

function createPlayer(nome, time){
    const player = "Jogador:" + nome;
    return {player, time};
}

const controleDisplay = (function (){
    let player1,player2;
    const definirJogadores = (jogador1,jogador2) =>{
        player1 = createPlayer(jogador1,"X");
        player2 = createPlayer(jogador2,"O");
        return {player1, player2};
    }
    const getPlayers = () =>{
        return {player1, player2};
    }
    const definirPosicao = (posicao) =>{
        // let posicao = Number(prompt("Digite a posição(0 a 10):"));

        console.log("Posição digitada:", posicao);
        return posicao;
    }

    return {definirJogadores,definirPosicao,getPlayers};
})();

const controleJogo = (function () {
    let jogadorAtual;
    let players;
    const iniciarJogo = () =>{
        players = controleDisplay.getPlayers();
        console.log("Players definidos:", players);
        jogadorAtual = players.player1;
        return jogadorAtual;
    }

    const resetarJogador = () =>{
        jogadorAtual = players.player1;
        return {jogadorAtual};
    }
    const turnoJogo = (posicao) =>{
        posicao = controleDisplay.definirPosicao(posicao);
        if (posicao < 0 || posicao >= gameboard.tamanhoArray() || gameboard.getIndice(posicao) !== "") {
            console.log("Digite uma posição válida e vazia.");
            return { venceu: false, empate: false, invalido: true };
        }
        gameboard.setIndice(posicao,getJogadorAtual().jogadorAtual.time);
        console.log(gameboard.mostrarPosicoes().posicao);
        const resultado = checarVitoria();

        if (!resultado.venceu && !resultado.empate) {
            trocarJogador();
          }
        
          return resultado;
    }

    const checarVitoria = () => {
        const pos = gameboard.mostrarPosicoes().posicao;
        const time = getJogadorAtual().jogadorAtual.time;
        const jogador = getJogadorAtual().jogadorAtual;
      
        const combinacoes = [
          [0,1,2], [3,4,5], [6,7,8], 
          [0,3,6], [1,4,7], [2,5,8], 
          [0,4,8], [2,4,6]
        ];
      
        for (const [a, b, c] of combinacoes) {
          if (pos[a] === time && pos[b] === time && pos[c] === time) {
            return { venceu: true, empate: false, vencedor: jogador };
          }
        }
      
        if (gameboard.tamanhoArrayPreenchido() === gameboard.tamanhoArray()) {
          return { venceu: false, empate: true };
        }
      
        return { venceu: false, empate: false };
      };
    const trocarJogador = () =>{
        let players = controleDisplay.getPlayers();
        return jogadorAtual = jogadorAtual === players.player2 ? players.player1 :
        players.player2;
    }

    const getJogadorAtual = () =>{
        return {jogadorAtual};
    }

    return {iniciarJogo,getJogadorAtual,trocarJogador,turnoJogo,resetarJogador};
})();

const controleTela = (function () {
    const turn = document.querySelector(".display-prin");
    const botaoReinicio = document.querySelector(".btn-reiniciar");

    document.addEventListener('DOMContentLoaded', () => {
        const formulario = document.querySelector(".form-jogador");
        botaoReinicio.disabled = true;
        formulario.addEventListener("submit", handleSubmit);
        botaoReinicio.addEventListener("click", handleReinicio);
      });

    const updateScreen = () =>{
        const playerAtivo = controleJogo.getJogadorAtual().jogadorAtual.player;
        turn.textContent = `Proximo ${playerAtivo}`;
    }
    const mostrarMensagem = (mensagem) =>{
        turn.textContent = mensagem;
    }
    const criarBoard = () =>{
        const tabuleiroCelulas = document.querySelectorAll(".cell");
        tabuleiroCelulas.forEach((cell) =>{
            const btn = document.createElement("button");
            btn.classList.add("tab");
            cell.appendChild(btn);
        });
    } 
    const handleSubmit = (e) =>{
        e.preventDefault();
        const jogador1 = e.target.player1.value;
        const jogador2 = e.target.player2.value;
        controleDisplay.definirJogadores(jogador1, jogador2);
        controleJogo.iniciarJogo();
        updateScreen();
        criarBoard();
        tabuleiroCliques();
        e.target.querySelector('button').disabled = true;
        botaoReinicio.disabled = false;
        e.target.player1.disabled = true;
        e.target.player2.disabled = true;
    }
    const handleBoard = (e) =>{
        const alvo = e.target;
        const index = e.target.dataset.index;
        let score = 0;
        const time = controleJogo.getJogadorAtual().jogadorAtual.time;
     
        alvo.dataset.time = time;
        alvo.textContent = time;
        const resultado = controleJogo.turnoJogo(index);

        if (resultado.venceu) {
          mostrarMensagem(`${resultado.vencedor.player} venceu!`);
          score++;
          reiniciarVitoria();
          return ;
        }
      
        if (resultado.empate) {
          mostrarMensagem(`Empate!`);
          reiniciarVitoria();
          return;
        }
        updateScreen();
    }
    const handleReinicio = (e) =>{
        const botaoInicio = document.querySelector(".buttonS")
        const botoes = document.querySelectorAll('.tab');
        const formulario = document.querySelector(".form-jogador");

        botoes.forEach((botao)=> {
            botao.remove();
          });
          gameboard.limparArray();
          controleJogo.resetarJogador();
          updateScreen();
        player1.disabled = false;
        player2.disabled = false;
        formulario.reset();
        botaoInicio.disabled = false;
        botaoReinicio.disabled = true;
        turn.textContent = `Defina os jogadores`;


    }

    const reiniciarVitoria = () =>{
        const botoes = document.querySelectorAll('.tab');

        botoes.forEach((botao)=> {
            botao.textContent = "";
          });
          gameboard.limparArray();
          controleJogo.resetarJogador();

    }

    const tabuleiroCliques = () =>{
        const botoes = document.querySelectorAll('.tab');

        botoes.forEach((botao,index)=> {
          botao.addEventListener('click', handleBoard);
          botao.dataset.index = index;

        });
    };
return {updateScreen,reiniciarVitoria,mostrarMensagem};
})();

