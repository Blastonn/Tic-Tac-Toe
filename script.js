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

console.log(gameboard.getIndice(2));

function createPlayer(nome, time){
    const player = "Jogador:" + nome;
    return {player, time};
}

const controleDisplay = (function (){
    let player1,player2;
    const definirJogadores = () =>{
        const jogador1 = prompt("Digite o primeiro Jogador: ");
        player1 = createPlayer(jogador1,"X");
        const jogador2 = prompt("Digite o segundo Jogador: ");
        player2 = createPlayer(jogador2,"O");
        return player1, player2;
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
        controleDisplay.definirJogadores();
        players = controleDisplay.getPlayers();
        console.log("Players definidos:", players);
        jogadorAtual = players.player1;
        return jogadorAtual;
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
        
        if(pos[0] === time && pos[1] === time && pos[2] === time
        || pos[3] === time && pos[4] === time && pos[5] === time
        || pos[6] === time && pos[7] === time && pos[8] === time
        || pos[0] === time && pos[4] === time && pos[8] === time
        || pos[2] === time && pos[4] === time && pos[6] === time
        || pos[0] === time && pos[3] === time && pos[6] === time
        || pos[1] === time && pos[4] === time && pos[7] === time
        || pos[2] === time && pos[5] === time && pos[8] === time
        ){
            console.log(`${jogador.player} ganhou`);
            return true;
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
    return {iniciarJogo,novoTurno};
})();


controleJogo.iniciarJogo();
controleJogo.novoTurno();
