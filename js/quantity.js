/* CARROSSEL PRODUTO */

const imagens = [

  "../img/products/calminol2.png",
  "../img/products/calminol3.png",
  "../img/products/calminol4.png",
  "../img/products/calminol5.png"
  
  ];
  
  let indiceImagem = 0;
  
  function proximaImagem(){
  
  indiceImagem++;
  
  if(indiceImagem >= imagens.length){
  
  indiceImagem = 0;
  
  }
  
  document.getElementById("productImg").src = imagens[indiceImagem];
  
  }
  
  
  function imagemAnterior(){
  
  indiceImagem--;
  
  if(indiceImagem < 0){
  
  indiceImagem = imagens.length - 1;
  
  }
  
  document.getElementById("productImg").src = imagens[indiceImagem];
  
  }

/* QUANTIDADE */

let quantidade = 1

function aumentar(){

quantidade++

document.getElementById("quantidade").innerText = quantidade

}

function diminuir(){

if(quantidade > 1){

quantidade--

document.getElementById("quantidade").innerText = quantidade

}

}



/* FAQ */

document.querySelectorAll(".faq-question").forEach(pergunta=>{

pergunta.addEventListener("click",()=>{

let resposta = pergunta.nextElementSibling

if(resposta.style.display === "block"){

resposta.style.display = "none"

}else{

resposta.style.display = "block"

}

})

})



/* WHATSAPP */

document.getElementById("formWhatsapp").addEventListener("submit",function(e){

e.preventDefault()

let nome = document.getElementById("nome").value
let assunto = document.getElementById("assunto").value
let mensagem = document.getElementById("mensagem").value

let texto =
`Olá, meu nome é ${nome}%0A
Assunto: ${assunto}%0A
Mensagem: ${mensagem}`

let numero = "5511999999999"

window.open(
`https://wa.me/${numero}?text=${texto}`,
"_blank"
)

})



/* BOTÃO VOLTAR TOPO */

let botao = document.getElementById("topBtn")

window.onscroll = function(){

if(document.documentElement.scrollTop > 300){

botao.style.display = "block"

}else{

botao.style.display = "none"

}

}


function voltarTopo(){

window.scrollTo({
top:0,
behavior:"smooth"
})

}