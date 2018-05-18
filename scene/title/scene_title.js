class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        this.setup()
        this.setupInputs()
    }

    setup(){
        var s = this

        s.actionScene = 'title'
        //
        s.bg = GuaImage.new(s.game, 'background')
        s.startLine = s.bg.x
        s.endLine = s.bg.x + s.bg.w
        s.land = Land.new(s.game)
        //
        // s.title = GuaImage.new(s.game, 'title')
        // s.title.x = 10
        // s.title.y = 80
        s.bird = Bird.new(s.game)
        s.bird.x = 50
        s.bird.y = 220
        s.bird.active = false

        // s.start = GuaImage.new(s.game, 'start')
        // s.start.x = 150
        // s.start.y = 420

        s.addElement(s.bg)
        // s.addElement(s.coin)
        s.addElement(s.bird)
        s.addElement(s.land)
    }

    setupInputs(){
        var s = this

        // document.querySelector('canvas').click = null

        // document.querySelector('canvas').addEventListener('click', function(){
        //     var nextS = ScenePlay.new(s.game)
        //     s.game.replaceScene(nextS)
        // })

        s.game.registerAction(s.actionScene, function(){
            var nextS = ScenePlay.new(s.game)
            s.game.replaceScene(nextS)
        })
    }
}
