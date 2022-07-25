function ids(id) {
    return document.querySelector(id)
}
const spd = 64
window.addEventListener('keydown', (event) =>{
    
    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            if(player.pos.y - spd != player.tail[0].pos.y) {
                player.velocity = {x: 0, y: -spd}
                player.direction = "./assets/head-up.png"
            }
            break;
        case 's':
        case 'ArrowDown':
            if(player.pos.y + spd != player.tail[0].pos.y) {
                player.velocity = {x: 0, y: spd}
                player.direction = "./assets/head-down.png"
            }
            break;
        case 'a':
        case 'ArrowLeft':
            if(player.pos.x - spd != player.tail[0].pos.x) {
                player.velocity = {x: -spd, y: 0}
                player.direction = "./assets/head-left.png"
            }
            break;
        case 'd':
        case 'ArrowRight':
            if(player.pos.x + spd != player.tail[0].pos.x) {
                player.velocity = {x: spd, y: 0}
                player.direction = "./assets/head-right.png"
            }
            break;
    }
})