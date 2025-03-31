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
    document.getElementById("dica").textContent = `Dica: ${dica}`;
    document.getElementById("palavra").textContent = palavraExibida.join(" ");
    document.getElementById("erros").textContent = "";

    //Desabilita os inputs
    document.getElementById("palavraInput").style.display = "none";
    document.getElementById("dicaInput").style.display = "none";

    //inicia a função de gerar teclado de letras.
    gerarTeclado();
}

function gerarTeclado(){
    //variável armazenando o todas as letras do alfabeto e transformando em um array com o método .split().
    let alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");

    let painel = document.getElementById("alfabeto");
    painel.innerHTML = ""; //limpa antes de recriar

    //cria dinamicamente os botões
    alfabeto.forEach((letra) => {
        let botao = document.createElement("button");
        botao.textContent = letra;
        botao.onclick = () => verificarLetra(letra, botao);
        botao.style.margin = "5px";
        painel.appendChild(botao);
    });
}

function verificarLetra(letra, botao){
    botao.disabled = true; //Desativa a letra clicada

    if (palavraSecreta.includes(letra)){
        palavraSecreta.split("").forEach((char, index) => {
            if(char === letra){
                palavraExibida[index] = letra;
            }
        });
    } else {
        letrasErradas.push(letra);
        tentativas--;
    }

    document.getElementById("palavra").textContent = palavraExibida.join(" ");
    document.getElementById("erros").textContent = `Erros: ${letrasErradas.join(", ")} (${tentativas} tentativas restantes)`;

    if (!palavraExibida.includes("*")) {
        alert("Parabéns, você venceu!");
        resetarJogo();
    } else if (tentativas === 0){
        alert(`Game Over! A palavra era "${palavraSecreta}"`);
        resetarJogo();
    }

}

function resetarJogo(){
    document.getElementById("palavraInput").style.display = "block";
    document.getElementById("dicaInput").style.display = "block";
    document.getElementById("palavraInput").value = "";
    document.getElementById("dicaInput").value = "";
    document.getElementById("alfabeto").innerHTML = "";
    document.getElementById("palavra").innerHTML = "";
    document.getElementById("erros").innerHTML = "";
    document.getElementById("dica").innerHTML = "";
}