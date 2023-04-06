const canvas = ids("canvas")
canvas.width    = 1024
canvas.height   = 576
const c = canvas.getContext("2d")
let interval = 600
let playing = false
let paused = false


const background = new Sprite ({
    position: {x:0, y:0},
    imgSrc: "./assets/bg.png"
})
let player = new Head ({
    position: {x:4 * 64, y: 4 * 64},
    imgSrc: "./assets/head-right.png"
})
const fruit = new Apple ({
    position: {x: Math.floor(Math.random() * (canvas.width / 64)) * 64 + 12,
               y: Math.floor(Math.random() * (canvas.height / 64))* 64 + 12},
    imgSrc: "./assets/apple.png",
    scale: 0.5
})


function load() {
    background.draw()
}

function settingsTab() {
    paused = true
    //MAIN DIV FOR CONFIG SCREEN
    const configDiv = document.createElement('div')
    configDiv.className = "configDiv"

    //TELA DE CONFIGURAÇÃO
    const configScreen = document.createElement('div')
    configScreen.className = "configScreen"

    //div com os botões
    const optionsDiv = document.createElement('div')
    optionsDiv.className = "optionsDiv"

    //
    const setDifficulty = document.createElement('div')
    setDifficulty.className = "setDiffDiv"



    const spdUp = document.createElement('button')
    spdUp.className = "spdBtn down"
    spdUp.innerHTML = "◂"
    spdUp.onclick = () => {changeSpd(+100)}

    const spdDisplay = document.createElement('span') //EXIBI A VELOCIDADE
    spdDisplay.className = "spdDisplay"
    spdDisplay.innerHTML = "velocidade: " + (11 - interval / 100)

    const spdDown = document.createElement('button')
    spdDown.className = "spdBtn up"
    spdDown.innerHTML = "▸"
    spdDown.onclick = () => {changeSpd(-100)}

    if(interval == 100) spdDown.disabled = true
    if(interval == 1000) spdUp.disabled = true

    const backBtn = document.createElement('button')
    backBtn.className = "backBtn"
    backBtn.innerHTML = '⮭'
    backBtn.onclick = () => {close_config()}
    


    ids(".content").appendChild(configDiv)

    configDiv.appendChild(configScreen)

    configScreen.appendChild(backBtn)
    configScreen.appendChild(optionsDiv)

    optionsDiv.appendChild(setDifficulty)

    setDifficulty.appendChild(spdDisplay)
    setDifficulty.appendChild(spdDown)
    setDifficulty.appendChild(spdUp)

    function close_config() {
        paused = false
        if(btn.style.display == "none") update()
        ids(".content").removeChild(configDiv)
    }
    function changeSpd(value) {
        interval += value
        spdDisplay.innerHTML = "velocidade: " + (11 - interval / 100)
        if(interval == 1000) {
            spdUp.disabled = true
        }else {
            spdUp.disabled = false
        }
        if(interval == 100) {
            spdDown.disabled = true
        }else {
            spdDown.disabled = false
        }
    }
}


function start() {
    title.style.display = "none"
    btn.style.display = "none"
    update()
}
function gameOver(points) {
    btn.style.display = "block"
    if(points >= 140) {
        title.innerHTML = "YOU WON!!"
        btn.innerHTML = "GG"
    } else {
        title.innerHTML = "DEAD."
        btn.innerHTML = "retry!"
    }
    title.innerHTML += " points: " + (points - 2)
    btn.onclick = function() {
        title.innerHTML = ""
        background.draw()

        player = new Head ({
            position: {x:4 * 64, y: 4 * 64},
            imgSrc: "./assets/head-right.png"
        })
        update()
        btn.style.display = "none"
    }
    btn.style.display = "block"
    title.style.display = "block"
}

//-------------------------------------------------------update()------------------------------------------//
let timerId
function update() {
    if(!player.dead && !paused){
        timerId = setTimeout(update, interval)
        background.draw()
        player.update()
        fruit.draw()
    }
}
