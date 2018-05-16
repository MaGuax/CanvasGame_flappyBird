class ScenePlay extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    setup(){
        var s = this
        //
        s.bg = GuaImage.new(s.game, 'background')
        s.land = Land.new(s.game)

        //
        s.bird = Bird.new(s.game)
        s.bird.x = 50
        s.bird.y = 220

        s.addElement(s.bg)
        s.addElements(s.land.landList)
        s.addElement(s.bird)
    }

    setupInputs() {
        var s = this

        document.querySelector('canvas').addEventListener('click', function(){
            s.bird.jump()
        })

    }

    update() {
        super.update()
        var s = this

        s.getAliveEle()
        s.land.update()

        // s.score.text = `玩家得分：${s.playerScore}`

        // if (!s.player.alive) {
        //     if (!localStorage.hightScore || Number(localStorage.hightScore) < s.playerScore) {
        //         localStorage.hightScore = s.playerScore
        //     }
        //     localStorage.endingScore = s.playerScore
        //     var scene = SceneEnd.new(s.game)
        //     s.game.replaceScene(scene)
        // }
    }

    addScore(n){
        this.playerScore += n
    }

    getAliveEle(){
        // var s = this
        // s.playerBullet = s.playerBullet.filter(ele => ele.alive)
        // s.enemysBullet = s.enemysBullet.filter(ele => ele.alive)
        // s.playerLifes = s.playerLifes.filter(ele => ele.alive)
        // s.enemys = s.enemys.filter(ele => ele.alive)
    }
}
