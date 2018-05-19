class Coin extends GuaImage {
    constructor(game) {
        super(game, 'coin')
        this.x = 0
        this.y = 0
        this.speed = 0
    }

    static new(game){
        var i = new this(game)
        return i
    }

    draw(){
        super.draw()
    }

    update(){
        super.update()
        this.x -= this.speed

        if (this.x < this.game.scene.startLine) {
            this.alive = false
        }
    }

    dead(){
        this.alive = false
    }
}
