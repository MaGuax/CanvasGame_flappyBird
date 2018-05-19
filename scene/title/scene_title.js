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
        s.bg = GuaImage.new(s.game, 'background_day')
        s.startLine = s.bg.x
        s.endLine = s.bg.x + s.bg.w
        s.land = Land.new(s.game)
        //
        s.title = GuaImage.new(s.game, 'home_title')
        s.title.x = s.bg.x + s.bg.w / 2 - s.title.w / 2
        s.title.y = 80
        //
        s.bird = Bird.new(s.game)
        s.bird.x = s.bg.x + s.bg.w / 2 - s.bird.w / 2
        s.bird.y = 190
        s.bird.acitveOff()
        //
        s.button = GuaImage.new(s.game, 'start_button')
        s.button.x = s.bg.x + s.bg.w / 2 - s.button.w / 2
        s.button.y = 280

        s.addElement(s.bg)
        s.addElement(s.title)
        s.addElement(s.bird)
        s.addElement(s.button)
        s.addElement(s.land)
    }

    setupInputs(){
        var s = this

        s.game.registerAction(s.actionScene, function(){
            var nextS = ScenePlay.new(s.game)
            s.game.replaceScene(nextS)
        })
    }
}
