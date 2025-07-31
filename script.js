const gameboard = (function (){
    const posicao = Array(9).fill("");
    const getIndice = (indice) => posicao[indice];
    const setIndice = (indice, time) => posicao[indice] = time;
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
    return {getIndice,setIndice,mostrarPosicoes,tamanhoArrayVazio,tamanhoArrayPreenchido,tamanhoArray};
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
    const definirPosicao = () =>{
        let posicao = Number(prompt("Digite a posição(0 a 10):"));

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
        return jogadorAtual,novoTurno();
    }
    const turnoJogo = () =>{
        const posicao = controleDisplay.definirPosicao();
        if (posicao < 0 || posicao >= gameboard.tamanhoArray() || gameboard.getIndice(posicao) !== "") {
            console.log("Digite uma posição válida e vazia.");
            console.log(gameboard.mostrarPosicoes().posicao);
            return turnoJogo();
        }
        gameboard.setIndice(posicao,getJogadorAtual().jogadorAtual.time);
        console.log(gameboard.mostrarPosicoes().posicao);
        if (checarVitoria()) {
            return true; 
        }
        trocarJogador();
        console.log(`Proximo ${getJogadorAtual().jogadorAtual.player}`);
        return false;
    }

    const checarVitoria = () =>{
        const pos = gameboard.mostrarPosicoes().posicao;
        const time = getJogadorAtual().jogadorAtual.time;
        const jogador = getJogadorAtual().jogadorAtual;
        if(gameboard.tamanhoArrayPreenchido() === gameboard.tamanhoArray()){
            console.log("Empate.")
            return true;
        }
        const combinacoes = [
            [0,1,2], [3,4,5], [6,7,8], 
            [0,3,6], [1,4,7], [2,5,8], 
            [0,4,8], [2,4,6]           
          ];
          
          for (const [a, b, c] of combinacoes) {
            if (pos[a] === time && pos[b] === time && pos[c] === time) {
              console.log(`${jogador.player} ganhou`);
              return true;
            }
          }
        return false;
    }
    const novoTurno = () =>{
       let turnos =  0;
       while(true){
        if(turnoJogo()){
            break;
        }
        turnos++;   
    }
}
    const trocarJogador = () =>{
        let players = controleDisplay.getPlayers();
        return jogadorAtual = jogadorAtual === players.player2 ? players.player1 :
        players.player2;
    }

    const getJogadorAtual = () =>{
        return {jogadorAtual};
    }
    return {iniciarJogo,novoTurno,getJogadorAtual};
})();

function controleTela() {
    const game = controleJogo;


    const formjogador = document.querySelector(".form-jogador");
    const displayTurno = document.querySelector(".display-prin");
    const submitButton = document.querySelector(".button");


    formjogador.addEventListener("submit",(e) =>{
        e.preventDefault();
        const formData = new FormData(formjogador);

        const player1 = formData.get("player1");
        const player2 = formData.get("player2");
        console.log(player1);
        controleDisplay.definirJogadores(player1,player2);

        displayTurno.textContent = `${player1} X ${player2}`;
        submitButton.textContent = "REINICIAR";
        game.iniciarJogo();

        formjogador.reset();
    });
};

controleTela();

