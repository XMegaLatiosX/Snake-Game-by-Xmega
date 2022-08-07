function ids(id) {
    return document.querySelector(id)
}
const title = ids(".title")
const btn = ids(".btnPlay")


const preload = [new Image(), new Image(), new Image(), new Image(), new Image()]
preload[0].src = "./assets/dead-up.png"
preload[1].src = "./assets/dead-down.png"
preload[2].src = "./assets/dead-left.png"
preload[3].src = "./assets/dead-right.png"
preload[4].src = "./assets/settings1.png"

//movimentação/troca de sprite
const spd = 64
window.addEventListener('keydown', (event) =>{
    
    switch (event.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            if(player.pos.y - spd != player.tail[0].pos.y) {
                player.velocity = {x: 0, y: -spd}
                player.direction = "up"
            }
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            if(player.pos.y + spd != player.tail[0].pos.y) {
                player.velocity = {x: 0, y: spd}
                player.direction = "down"
            }
            break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
            if(player.pos.x - spd != player.tail[0].pos.x) {
                player.velocity = {x: -spd, y: 0}
                player.direction = "left"
            }
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            if(player.pos.x + spd != player.tail[0].pos.x) {
                player.velocity = {x: spd, y: 0}
                player.direction = "right"
            }
            break;
    }
})