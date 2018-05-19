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
        s.ending = false
        s.gotoHome = false
        s.playerScore = 0
        s.playerCoin = 0

        //
        s.bg_night = GuaImage.new(s.game, 'background_night')
        s.bg = GuaImage.new(s.game, 'background_day')
        s.startLine = s.bg.x
        s.endLine = s.bg.x + s.bg.w
        s.topLine = 0
        s.bottomLine = s.bg.h + s.topLine

        //
        s.ready_title = Word.new(s.game, 'ready_title')
        s.ready_title.x = s.bg.x + s.bg.w / 2 - s.ready_title.w / 2
        s.ready_title.y = 80

        //
        s.ready_button = Word.new(s.game, 'ready_button')
        s.ready_button.x = s.bg.x + s.bg.w / 2 - s.ready_button.w / 2
        s.ready_button.y = 280

        //
        s.end_title = Word.new(s.game, 'end_title')
        s.end_title.x = s.bg.x + s.bg.w / 2 - s.end_title.w / 2
        s.end_title.y = s.bg.h - s.end_title.h

        //
        s.bird = Bird.new(s.game)
        s.bird.x = s.bg.x + s.bg.w / 2 - s.bird.w / 2
        s.bird.y = 180

        //
        s.land = Land.new(s.game)
        s.landLine = 385

        //
        s.score = Score.new(s.game, 'big', s.bg.w / 2, 10)

        //
        s.pipe = Pipe.new(s.game)

        //
        s.coinLogo = GuaImage.new(s.game, 'coin_logo')
        s.coinLogo.x = 40
        s.coinLogo.y = 480
        s.coins = []
        s.coinsScore = Score.new(s.game, 'small', 80, 480)

        //
        s.addElement(s.bg_night)
        s.addElement(s.bg)
        s.addElement(s.pipe)
        s.addElement(s.bird)
        s.addElement(s.land)
        s.addElement(s.ready_title)
        s.addElement(s.ready_button)
    }

    setupInputs() {
        var s = this

        s.game.registerAction(s.actionScene, function(){
            if (s.gotoHome) {
                var nextS = SceneTitle.new(s.game)
                s.game.replaceScene(nextS)
            }
            s.bird.jump()
            s.skilled += 1
        })

    }

    update() {
        super.update()
        var s = this

        if (s.skilled == 5) {
            s.gameStart()
        }

        if (s.playing) {
            s.gameIng()
        }

        if (s.end_title.y == 110) {
            s.end_title.stopMove()
            s.gotoHome = true
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

    gameStart(){
        var s = this
        s.ready_title.startMove(6)
        s.ready_button.startMove(-6)
        s.bird.acitveOn()
        s.pipe.show()
        //
        s.addElement(s.score)
        s.addElement(s.coinLogo)
        s.addElement(s.coinsScore)
        s.playing = true
    }

    gameIng(){
        var s = this
        for (var i = 0; i < s.pipe.pipeList.length; i++) {
            var { p1, p2 } = s.pipe.pipeList[i]
            if (rectIntersects(p1, s.bird) || rectIntersects(p2, s.bird)) {
                s.gameOver()
            }

            if (p1.x + p1.w < s.bird.x && p1.through ) {
                s.addScore(1)
                p1.through = false
            }
        }

        for (var i = 0; i < s.land.landList.length; i++) {
            var l = s.land.landList[i]
            if (rectIntersects(l, s.bird)) {
                s.gameOver()
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

    gameOver(){
        var s = this
        s.bg.alive = false
        s.addElement(s.end_title)
        s.end_title.startMove(6)
        s.bird.dead()
        s.pipe.stopMove()
        s.land.stopMove()
        s.playing = false
    }
}
