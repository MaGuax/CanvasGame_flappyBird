class Bird extends GuaAnimation{
    constructor(game) {
        var animations = {
            'idle': {
                number: 3,
                frameCount: 3,
                frames: []
            }
        }
        super(game, 'palyer', animations)
        this.filpX = false
        this.active = true

        //
        this.gy = 6
        this.vy = 0
        this.rotation = 0
    }

    draw(){
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)

        context.restore()
    }

    update(){
        super.update()
        if (this.active) {
            this.action()
        }
    }

    acitveOff(){
        this.active = false
    }

    acitveOn(){
        this.active = true
    }

    action(){
        this.y += this.vy         
        this.vy += this.gy * 0.2
        if (this.y > this.game.scene.landLine) {
            this.y = this.game.scene.landLine
        }

        if (this.rotation < 45) {
            this.rotation += 5
        }
    }

    jump(){
        if (this.lifes > 0) {
            this.vy = -10
            this.rotation = -45
        }
    }

    dead(){
        this.lifes -= 1
        this.vy = -10
        this.rotation = -45
    }
}
