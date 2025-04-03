let palavraSecreta = ""; //Armazena a palavra secreta.
let dica = ""; //Armazena a dica.
let palavraExibida = []; //Armazena um Array com * com o comprimento da palavraSecreta.
let tentativas = 6; //Armazena a quantidade de tentativas.
let letrasErradas = []; //Armazena as letras que forem clicadas e estiverem erradas.
let mapaAcentos = new Map(); //Armazena a correspondência da palavraSecreta antes e depois de remover acentos.

//valida a entrada impedindo a entrada de simbolos e números.
function validarEntrada(input){
    input.value = input.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
}

//função para remover acentos de palavras e mapeia a palavra com e sem acento
function removerAcentos(str){
    mapaAcentos.set(str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), str);
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function iniciarJogo(){
    //Pega a palavra e a dica inseridas pelo jogador e armazena em variáveis
    palavraSecreta = removerAcentos(document.getElementById("palavraInput").value.toLowerCase());
    dica = document.getElementById("dicaInput").value.toLowerCase();

    //Verifica se foi inserida uma palavra e uma dica
    if(!palavraSecreta || !dica){
        alert("Preencha a palavra e a dica!");
        return;
    };

    //Pega a palavra inserida, armazena em um Array e em seguida transforma seu comprimento em asteriscos para ser exibido ao usuário.
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
    //variável armazenando todas as letras do alfabeto e transformando em um array com o método .split().
    let alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");

    let painel = document.getElementById("alfabeto");
    painel.innerHTML = ""; //limpa antes de recriar

    //cria dinamicamente os botões de cada letra
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
                //ao encontrar a letra na palavra secreta, adiciona a mesma na palavra exibida ao jogador
                palavraExibida[index] = mapaAcentos.get(palavraSecreta)[index] || letra;
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
            alert(`Game Over! A palavra era "${mapaAcentos.get(palavraSecreta)}"`);
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