let palavraSecreta = "";
let dica = "";
let palavraExibida = [];
let tentativas = 6;
let letrasErradas = [];

//valida a entrada impedindo a entrada de simbolos, números e letras acentuadas
function validarEntrada(input){
    input.value = input.value.replace(/[^a-A-Zz]/g, '');
}

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
    document.querySelector(".inicioDoJogo").style.display = "none";

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
    
    //Verifica se a letra está na palavra secreta
    if (palavraSecreta.includes(letra)){
        //percorre a palavra secreta para encontrar a posição da letra
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

    // verifica se ainda possue letra faltando ou se o número de tentativas chegou a zero.
    if (!palavraExibida.includes("*")) {
        setTimeout(() => {
            alert("Parabéns, você venceu!");
            resetarJogo();
        }, 100);
    } else if (tentativas === 0){
        setTimeout(() => {
            alert(`Game Over! A palavra era "${palavraSecreta}"`);
            resetarJogo();
        }, 100);
    }

}

//reseta o jogo
function resetarJogo(){
    document.getElementById("palavraInput").style.display = "";
    document.getElementById("dicaInput").style.display = "";
    document.querySelector(".inicioDoJogo").style.display = "";
    document.getElementById("palavraInput").value = "";
    document.getElementById("dicaInput").value = "";
    document.getElementById("alfabeto").innerHTML = "";
    document.getElementById("palavra").innerHTML = "";
    document.getElementById("erros").innerHTML = "";
    document.getElementById("dica").innerHTML = "";
}