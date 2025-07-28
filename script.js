function gameboard(){
   const posicao = [1,2,3,4,5,6,7,8,9];

   return () =>{
        return{
            tabuleiro: posicao,
            getIndice: (indice) => posicao[indice]

        };
   }
}

const escolherPos = gameboard();

console.log(escolherPos().getIndice(3));

function createPlayer(nome, time){

}