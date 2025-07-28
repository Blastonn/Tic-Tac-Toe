const gameboard = (function (){
    const posicao = [0,1,2,3,4,5,6,7,8,9];
    const getIndice = (indice) => posicao[indice];
    return {getIndice};
})();

console.log(gameboard.getIndice(2));

function createPlayer(nome, time){
    const player = "Jogador:" + nome;
    return {player, time};
}

const newPlayer = createPlayer("Felipe", "X");
const newPlayer2 = createPlayer("Joao", "O");


console.log(newPlayer);
console.log(newPlayer2);