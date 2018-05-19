class Pipe {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    setup() {
        var s = this
        s.alive = true
        s.active = true
        s.showIn = false
        s.number = 3
        s.pipeList = []
        s.x = 0
        s.spaceY = 120
        s.spaceX = randomBtween(200, 250)
        s.speed = 5

        for (var i = 3; i < s.number + 3; i++) {
            var p1 = GuaImage.new(s.game, 'pipe_down')
            // through 是否被小鸟穿过
            // true 未穿过 / false 穿过
            p1.through = true
            p1.x = (i * s.spaceX + p1.w) + s.x
            var p2 = GuaImage.new(s.game, 'pipe_up')
            p2.x = p1.x
            s.setPipeY(p1, p2)
            var o = {
                p1: p1,
                p2: p2
            }
            s.pipeList.push(o)
        }
    }

    draw(){
        var s = this
        if (s.showIn) {
            for (var i = 0; i < s.pipeList.length; i++) {
                var ps = s.pipeList[i]
                var { p1, p2 } = ps
                s.game.drawImage(p1)
                s.game.drawImage(p2)
            }
        }
    }

    setPipeY(p1, p2){
        p1.y = randomBtween(-280, -50)
        p2.y = p1.y + p1.h + this.spaceY
    }

    update(){
        if (this.active) {
            this.move()
        }
    }

    move(){
        var s = this
        for (var i = 0; i < s.pipeList.length; i++) {
            var ps = s.pipeList[i]
            var { p1, p2 } = ps
            p1.x -= s.speed
            p2.x -= s.speed
            if (p1.x < 0 - p1.w) {
                s.anew(p1, p2)
            }
        }
    }

    anew(p1, p2){
        p1.through = true
        p1.x += this.spaceX * this.number 
        p2.x = p1.x
        this.setPipeY(p1, p2)
        var lucky = randomBtween(4, 8)
        if (lucky == 6) {
            var coin = Coin.new(this.game)
            coin.x = p1.x + p1.w / 2 - coin.w / 2
            coin.y = p2.y - this.spaceY / 2
            coin.speed = this.speed
            if (this.showIn) {
                this.scene.addElement(coin)
                this.scene.coins.push(coin)
            }
        }
    }

    stopMove(){
        this.active = false
    }

    show(){
        this.showIn = true
    }

}
