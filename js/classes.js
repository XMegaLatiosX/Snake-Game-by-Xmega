class Sprite {
    constructor({position, imgSrc, scale = 1}) {
        this.pos = position
        this.img = new Image()//declara que .img é uma imagem
        this.img.height
        this.img.width
        this.img.src = imgSrc //assim que a fonte é passada a altura e o comprimento são definidos automaticamente
        this.scale = scale
    }
    //tudo relacionado a desenhar vai ser chamado aqui.
    draw() {
        //desenha a imagem
        //os parametros de draw image são: ("O" é de opcional, e entre paranteses são os de segunda prioridade)
        //imagem,(corte X, corte y, corte width, corte height) x, y,O width,O height.
        c.drawImage(this.img, this.pos.x, this.pos.y, this.img.width * this.scale, this.img.height * this.scale)
    }
    update() {
        this.draw()
    }
}

class Head extends Sprite {
    constructor({position, imgSrc, scale}) {
        //regula os parametros do sprite
        super({position, imgSrc, scale})
        //a cauda começa com 2 de comprimento
        this.tail = [
            new Body({position: {x: this.pos.x -64, y: this.pos.y}, imgSrc: "./assets/snk-b1.png", scale: 1, arrayNum: 0}),
            new Body({position: {x: this.pos.x -128, y: this.pos.y}, imgSrc: "./assets/snk-b2.png", scale: 1, arrayNum: 1})
        ]
        this.bImg = "./assets/snk-b1.png"
        this.pos = position
        this.width = 16 * this.scale
        this.height = 16 * this.scale
        this.velocity = {x:64, y:0}
        this.dead = false

        this.direction = "./assets/head-right.png"
        this.joj = {}
        this.jaj = {}
        this.consoleCounter = 0
        this.counter = 1
    }
    add() {
        //adiciona 1 comprimento de cauda com a posição anterior da ultima cauda
        this.counter++
        this.tail.push(new Body({position: {x: this.jaj.x,y: this.jaj.y}, imgSrc: this.bImg, scale: 1, arrayNum: this.counter}))
        if(this.bImg == "./assets/snk-b1.png") {
            this.bImg = "./assets/snk-b2.png"
        }else {
            this.bImg = "./assets/snk-b1.png"
        }
    }

    die() {
        this.dead = true
        if(this.tail.length >= 140) {
            ids(".title").innerHTML = "YOU WON!!"
            ids(".btnPlay").innerHTML = "GG"
        } else {
            ids(".title").innerHTML = "DEAD."
            ids(".btnPlay").innerHTML = "retry!"
        }
        ids(".btnPlay").onclick = function() {window.location.reload()}
        ids(".btnPlay").style.display = "block"
        ids(".title").style.display = "block"
    }
    update() {
        //colisão com paredes do mapa
        if( this.pos.x + this.width > canvas.width ||
            this.pos.y + this.height > canvas.height||
            this.pos.x < 0 ||
            this.pos.y < 0) {this.die();
        }
        //colisão com a fruta
        if( this.pos.x + this.width > fruit.pos.x  &&
            this.pos.y + this.height > fruit.pos.y &&
            this.pos.x < fruit.pos.x + fruit.width &&
            this.pos.y < fruit.pos.y + fruit.height) {fruit.eat(this)
        }
        //atualiza todas as caudas
        this.i= this.counter
        while(this.i > -1){
            //update 4 3 2 1...
            this.tail[this.i].update(this)
            this.i--
        }

        this.jaj.x = this.joj.x
        this.jaj.y = this.joj.y
        this.joj.x = this.tail[this.counter].pos.x
        this.joj.y = this.tail[this.counter].pos.y
        // c.drawImage()
        this.draw()
        if(!this.dead) {
            this.pos.x += this.velocity.x
            this.pos.y += this.velocity.y
            this.img.src = this.direction
            this.i= this.counter
            while(this.i > -1){
                this.tail[this.i].died(this)
                this.i--
            }
        }
    }
}

class Body extends Sprite{
    constructor({position, imgSrc, scale, arrayNum}) {
        super({position, imgSrc, scale})
        this.pos = position
        this.width = 16  * this.scale
        this.height = 16 * this.scale
        this.id = arrayNum
    }
    update(plClass) {
        this.draw()
        if(this.id == 0) {
            this.pos.x = plClass.pos.x
            this.pos.y = plClass.pos.y
        }
        if(this.id >0){
            this.pos.x = plClass.tail[this.id -1].pos.x
            this.pos.y = plClass.tail[this.id -1].pos.y
        }
    }
    died(plClass) {
        if( this.pos.x + this.width > plClass.pos.x &&
            this.pos.y + this.height > plClass.pos.y &&
            this.pos.x < plClass.pos.x + plClass.width &&
            this.pos.y < plClass.pos.y + plClass.height){plClass.die()}
    }
}

class Apple extends Sprite{
    constructor({position, imgSrc, scale}) {
        super({position, imgSrc, scale})
        this.pos = position
        this.width = 16  * this.scale
        this.height = 16 * this.scale
        this.jaj = 0
    }

    eat(playerClass) {
        this.changePos(playerClass)
        playerClass.add()
    }
    changePos(plClass) {
        console.log("TROQUEI" + this.jaj++)
        this.pos = {x: Math.floor(Math.random() * (canvas.width / 64)) * 64 + 12,
                    y: Math.floor(Math.random() * (canvas.height / 64))* 64 + 12}
        this.i = 0
        while(this.i < plClass.counter) {
            if( this.pos.x + this.width > plClass.tail[this.i].pos.x &&
                this.pos.y + this.height > plClass.tail[this.i].pos.y &&
                this.pos.x < plClass.tail[this.i].pos.x + plClass.tail[this.i].width &&
                this.pos.y < plClass.tail[this.i].pos.y + plClass.tail[this.i].height){
                this.pos = {x: Math.floor(Math.random() * (canvas.width / 64)) * 64 + 12,
                            y: Math.floor(Math.random() * (canvas.height / 64))* 64 + 12}}
            this.i++
        }
    }
    update() {
        this.draw()
    }
}