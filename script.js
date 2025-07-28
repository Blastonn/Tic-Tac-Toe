const gameboard = (function (){
    const posicao = [0,1,2,3,4,5,6,7,8,9];
    const getIndice = (indice) => posicao[indice];
    const setIndice = (indice, time) => posicao[indice] = time;
    return {getIndice};
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
        const posicao = prompt("Digite a posicao: ");
        const posicaoEsc = gameboard.getIndice(posicao);
        console.log(posicaoEsc);
        return posicaoEsc;
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
        
    }

    const trocarJogador = () =>{
        let players = controleDisplay.getPlayers();
        jogadorAtual = jogadorAtual === players.player2 ? players.player1 :
        players.player2;
        console.log(jogadorAtual);
    }

    const getJogadorAtual = () =>{
        return {jogadorAtual};
    }
    return {iniciarJogo,getJogadorAtual,trocarJogador};
})();


controleJogo.iniciarJogo();