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

        s.actionScene = 'play'
        s.skilled = 0
        s.playing = false
        s.gameOver = false
        s.playerScore = 0
        s.playerCoin = 0
        //
        s.bg = GuaImage.new(s.game, 'background')
        s.startLine = s.bg.x
        s.endLine = s.bg.x + s.bg.w
        s.land = Land.new(s.game)
        s.score = Score.new(s.game, 'big', s.bg.w / 2, 10)
        s.pipe = Pipe.new(s.game)
        s.coins = []
        s.coinsScore = Score.new(s.game, 'small', 80, 480)

        //
        s.bird = Bird.new(s.game)
        s.bird.x = 50
        s.bird.y = 220

        s.addElement(s.bg)
        s.addElement(s.pipe)
        s.addElement(s.bird)
        s.addElement(s.score)
        s.addElement(s.land)
        s.addElement(s.coinsScore)
    }

    setupInputs() {
        var s = this

        s.game.registerAction(s.actionScene, function(){
            s.bird.jump()
            s.skilled += 1
        })

    }

    update() {
        super.update()
        var s = this

        if (s.skilled == 5) {
            s.pipe.show()
            s.playing = true
        }

        if (s.playing) {
            for (var i = 0; i < s.pipe.pipeList.length; i++) {
                var { p1, p2 } = s.pipe.pipeList[i]
                if (rectIntersects(p1, s.bird) || rectIntersects(p2, s.bird)) {
                    s.bird.dead()
                    s.pipe.stopMove()
                    s.land.stopMove()
                    s.playing = false
                }
                if (p1.x + p1.w < s.bird.x && p1.through ) {
                    s.addScore(1)
                    p1.through = false
                }
            }

            for (var i = 0; i < s.land.landList.length; i++) {
                var l = s.land.landList[i]
                if (rectIntersects(l, s.bird)) {

                }
            }

            for (var i = 0; i < s.coins.length; i++) {
                var c = s.coins[i]
                if (rectIntersects(c, s.bird)) {
                    s.addCoin()
                    c.dead()
                }
            }
        }

        s.coins = s.coins.filter(c => c.alive)
    }

    addScore(n){
        this.playerScore += n
        this.score.updateShow(this.playerScore)
    }

    addCoin(){
        this.playerCoin += 1
        this.coinsScore.updateShow(this.playerCoin)
    }
}
