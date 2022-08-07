class Sprite {
    constructor({position, imgSrc, scale = 1}) {
        this.pos = position
        this.img = new Image()//define .img como um objeto Image
        this.img.height
        this.img.width
        //assim que a fonte é passada a altura e o comprimento são definidos automaticamente no this.img
        this.img.src = imgSrc
        this.scale = scale
    } 
    draw() {
        //desenha a imagem
        //os parametros de draw image são: ("O" é de opcional, e entre paranteses são os de segunda prioridade)
        //imagem,O:(corte X, corte y, corte width, corte height) x, y,O: width,O: height.
        c.drawImage(this.img, this.pos.x, this.pos.y, this.img.width * this.scale, this.img.height * this.scale)
    }
    update() {
        //essa parte é importante pro desenho inteiro ser atualizado constantemente,
        //caso contrario alguns sprites irao se repetir
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
        // this.deadImg1 = new Image()
        this.bodyImg = "./assets/snk-b1.png"
        this.pos = position
        this.width = 16 * this.scale
        this.height = 16 * this.scale
        this.velocity = {x:64, y:0}
        this.dead = false

        this.direction = "right"
        //salvam as posições anterioes a da ultima cauda 
        this.prevPos = {}
        this.nextPos = {}
    }
    add() {
        //adiciona 1 comprimento de cauda com a posição anterior da ultima cauda
        this.tail.push(new Body({
            position: {x: this.nextPos.x,y: this.nextPos.y},
            imgSrc: this.bodyImg,
            scale: 1,
            arrayNum: this.tail.length
        }))
        //alterna o sprite das caudas
        if(this.bodyImg == "./assets/snk-b1.png") {
            this.bodyImg = "./assets/snk-b2.png"
        }else {
            this.bodyImg = "./assets/snk-b1.png"
        }
    }

    die() {
        //declara q o player morreu.
        this.dead = true
        
        this.pos.x = this.tail[0].pos.x
        this.pos.y = this.tail[0].pos.y
        this.c = 0
        while(this.c <= this.tail.length - 1){
            if(this.c != this.tail.length - 1) {
                this.tail[this.c].pos.x = this.tail[this.c + 1].pos.x
                this.tail[this.c].pos.y = this.tail[this.c + 1].pos.y
            } else {
                this.tail[this.c].pos.x = this.nextPos.x
                this.tail[this.c].pos.y = this.nextPos.y
            }
            this.tail[this.c].draw()
            this.c++
        }
        if(this.pos.x + spd == this.tail[0].pos.x) {
            this.img.src = "./assets/dead-left.png"
        }else
        if(this.pos.x - spd == this.tail[0].pos.x) {
            this.img.src = "./assets/dead-right.png"
        }else
        if(this.pos.y + spd == this.tail[0].pos.y) {
            this.img.src = "./assets/dead-up.png"
        }else
        if(this.pos.y - spd == this.tail[0].pos.y) {
            this.img.src = "./assets/dead-down.png"
        }
        this.draw()

        gameOver(this.tail.length)
    }
    update() {
        if(!this.dead) {
            this.i= this.tail.length - 1
             while(this.i > -1){
                 if(this.tail[this.i].checkCollider(this)) {this.die(); return}
                 this.i--
             }
            //colisão com paredes do mapa
             if( this.pos.x + this.width > canvas.width ||
                 this.pos.y + this.height > canvas.height||
                 this.pos.x < 0 ||
                 this.pos.y < 0) {this.die(); return}
            //colisão com a fruta
            if( this.pos.x + this.width > fruit.pos.x  &&
                this.pos.y + this.height > fruit.pos.y &&
                this.pos.x < fruit.pos.x + fruit.width &&
                this.pos.y < fruit.pos.y + fruit.height) {fruit.eat(this)
            }
            //atualiza todas as caudas em ordem decrescente, para que cada uma pegue a posição PASSADA da próxima cauda
            this.i = this.tail.length - 1
            while(this.i > -1){
                this.tail[this.i].update(this)
                this.i--
            }
    
            // c.drawImage()
            this.draw()
            this.nextPos.x = this.prevPos.x
            this.nextPos.y = this.prevPos.y
            this.prevPos.x = this.tail[this.tail.length - 1].pos.x
            this.prevPos.y = this.tail[this.tail.length - 1].pos.y

            this.pos.x += this.velocity.x
            this.pos.y += this.velocity.y
            this.img.src = "./assets/head-"+this.direction+".png"
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
        //pega posição da prolxima cauda, muda de lugar
        if(this.id == 0) {
            this.pos.x = plClass.pos.x
            this.pos.y = plClass.pos.y
        }else{
            this.pos.x = plClass.tail[this.id -1].pos.x
            this.pos.y = plClass.tail[this.id -1].pos.y
        }
    }
    checkCollider(obj) {
        //retorna verdadeiro se o objeto passado está collidindo com o corpo
        //pro código proceder com base nessa informação
        if( this.pos.x + this.width > obj.pos.x &&
            this.pos.y + this.height > obj.pos.y &&
            this.pos.x < obj.pos.x + obj.width &&
            this.pos.y < obj.pos.y + obj.height){return true}
        //se a condição acima for falsa, retornara falso
        return false
    }
}

class Apple extends Sprite{
    constructor({position, imgSrc, scale}) {
        super({position, imgSrc, scale})
        this.pos = position
        this.width = 16  * this.scale
        this.height = 16 * this.scale
    }

    eat(playerClass) {
        this.changePos(playerClass)
        playerClass.add()
    }
    changePos(plClass) {
        this.pos = {x: Math.floor(Math.random() * (canvas.width / 64)) * 64 + 12,
                    y: Math.floor(Math.random() * (canvas.height / 64))* 64 + 12}
        this.i = 0
        while(this.i < plClass.tail.length - 1) {
            if(plClass.tail[this.i].checkCollider(this)){this.changePos(plClass)}
            this.i++
        }
        //se a fruta nascer dentro da caebça ira trocar de posição
        if( this.pos.x + this.width > plClass.pos.x &&
            this.pos.y + this.height > plClass.pos.y &&
            this.pos.x < plClass.pos.x + plClass.width &&
            this.pos.y < plClass.pos.y + plClass.height){this.changePos(plClass)}
    }
}