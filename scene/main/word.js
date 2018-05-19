class Word extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.active = false
        this.speed = 6
    }

    static new(game, name) {
        var i = new this(game, name)
        return i
    }

    update() {
        super.update()

        if (this.active) {
            this.y -= this.speed
        }

        if (this.y + this.h < this.game.scene.topLine || this.y > this.game.scene.bottomLine) {
            this.alive = false
        }
    }

    startMove(n){
        this.active = true
        this.speed = n
    }

    stopMove(){
        this.active = false
    }
}
