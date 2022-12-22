function grow(){
    textArea.parentNode.style.minHeight = textArea.parentNode.clientHeight + "px";
    textArea.style.height = "194px"; 
    textArea.style.height = (textArea.scrollHeight)+"px";
    textArea.parentNode.style.minHeight = 0;
}

function encode(){
    if (emptyField()) return
    crrText = translate(1, textArea.value.toLocaleLowerCase())
    changeClass("full")
    output.textContent = crrText
}

function decode(){
    if (emptyField()) return
    crrText = translate(0, textArea.value.toLocaleLowerCase())
    changeClass("full")
    output.textContent = crrText
}

function emptyField(){
    if (textArea.value == ""){
        changeClass("empty")
        return true
    }
}

function translate(act, text){
    if (act == 1) {
        for (let key in keys){
            text = text.replaceAll(key, keys[key])
        }
    } else if (act == 0) {
        for (let key in keys){
            text = text.replaceAll(keys[key], key)
        }   
    }
    return text
}

function changeClass(act){
    if (act == "full"){
        output.parentElement.classList.remove("empty")
        output.parentElement.classList.add("full")
    } else if (act == "empty") {
        output.parentElement.classList.remove("full")
        output.parentElement.classList.add("empty")
        output.innerHTML = messageModel
    }
}

function copy(){
    let copyText = output.textContent
    let tempInput = document.createElement("input")
    tempInput.type = "text"
    tempInput.value = copyText
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand("Copy")
    document.body.removeChild(tempInput)

    changeText()
}

function changeText(){
    btnCopy.classList.add("trans")
    setTimeout(function(){
        btnCopy.disabled = true
        btnCopy.textContent = "Texto copiado com sucesso!"
        setTimeout(function(){
            btnCopy.classList.remove("trans")
        }, 1000)
    }, 500)
    setTimeout(() => {
        btnCopy.classList.add("trans")
    }, 2000);
    setTimeout(function(){   
        btnCopy.textContent = "Copiar"
        setTimeout(function(){
            btnCopy.classList.remove("trans")
        }, 500)
        btnCopy.disabled = false
    }, 2500)
}

let textArea = document.querySelector("textarea")
textArea.oninput = grow;
let crrText = ""
let keys = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat"
}
let output = document.querySelector('.text')
let messageModel = '<div class="message"><img src="./imgs/Girl.svg"><p>Nenhuma mensagem encontrada</p><p>Digite um texto que você deseja criptografar ou descriptografar.</p></div>'

let btnEncode = document.querySelector(".encode")
btnEncode.onclick = encode;
let btnDecode = document.querySelector(".decode")
btnDecode.onclick = decode
let btnCopy = document.querySelector(".copy")
btnCopy.onclick = copy;