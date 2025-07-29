const gameboard = (function (){
    const posicao = Array(10).fill("");;
    const getIndice = (indice) => posicao[indice];
    const setIndice = (indice, time) => posicao[indice] = time;
    const mostrarPosicoes = () => {
        return {posicao};
    }
    return {getIndice,setIndice,mostrarPosicoes};
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
        const posicao = Number(prompt("Digite a posição(0 a 10):"));
        console.log("Posição digitada:", posicao);
        const posicaoEsc = gameboard.getIndice(posicao);
        console.log("Valor no tabuleiro:", posicaoEsc);
        
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
        gameboard.setIndice(posicao,getJogadorAtual().jogadorAtual.time);
        console.log(gameboard.mostrarPosicoes());
        trocarJogador();
        console.log(getJogadorAtual().jogadorAtual.player);
    }

    const trocarJogador = () =>{
        let players = controleDisplay.getPlayers();
        return jogadorAtual = jogadorAtual === players.player2 ? players.player1 :
        players.player2;
    }

    const getJogadorAtual = () =>{
        return {jogadorAtual};
    }
    return {iniciarJogo,getJogadorAtual,trocarJogador,turnoJogo};
})();


controleJogo.iniciarJogo();
controleJogo.turnoJogo();
