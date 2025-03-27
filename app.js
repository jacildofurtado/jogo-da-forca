let palavraSecreta = "";
let dica = "";
let palavraExibida = [];
let tentativas = 6;
let letrasErradas = [];

function iniciarJogo(){
    //Pega a palavra e a dica inseridas pelo jogador e armazena em variáveis
    palavraSecreta = document.getElementById("palavraInput").value.toLowerCase();
    dica = document.getElementById("dicaInput").value.toLowerCase();

    //Verifica se foi inserida uma palavra e uma dica
    if(!palavraSecreta || !dica){
        alert("Preencha a palavra e a dica!");
        return;
    };

    //Pega a palavra inserida, armazena em um Array e em seguida transforma seu comprimento em asteriscos para ser exibidos ao usuário.
    palavraExibida = Array(palavraSecreta.length).fill("*");
    tentativas = 6;
    letrasErradas = [];

    //Acessa os elemetos html e exibe conteúdos neles dinamicamente.
    document.getElementById("dica").textContent = 'Dica: $(dica)';
    document.getElementById("palavra").textContent = palavraExibida.join(" ");
    document.getElementById("erros").textContent = "";

    //Desabilita os inputs
    document.getElementById("palavraInput").style.display = "none";
    document.getElementById("dicaInput").style.display = "none";

    //inicia a função de gerar teclado de letras
    gerarTeclado();
}