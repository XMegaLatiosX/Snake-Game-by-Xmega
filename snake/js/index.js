const canvas = ids("canvas")
canvas.width    = 1024
canvas.height   = 576
const c = canvas.getContext("2d")
let playing = false
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
function draw() {
    background.draw()
}
function start() {
    ids(".title").style.display = "none"
    ids(".btnPlay").style.display = "none"
    update()
}
//-------------------------------------------------------update()------------------------------------------//

let timerId
function update() {
    timerId = setTimeout(update, 150)
    background.update()
    player.update()
    fruit.update()
}
