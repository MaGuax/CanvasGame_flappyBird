class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        this.setup()
        this.setupInputs()
    }

    setup(){
        var s = this
        //
        s.bg = GuaImage.new(s.game, 'background')
        s.gounds = []
        for (var i = 0; i < 13; i++) {
            var g = GuaImage.new(s.game, 'ground')
            g.x = i * g.w
            g.y = 420
            s.gounds.push(g)
        }
        s.skipCount = 4
        //
        // s.title = GuaImage.new(s.game, 'title')
        // s.title.x = 10
        // s.title.y = 80
        s.bird = Bird.new(s.game)
        s.bird.x = 50
        s.bird.y = 220
        // s.start = GuaImage.new(s.game, 'start')
        // s.start.x = 150
        // s.start.y = 420

        s.addElement(s.bg)
        s.addElements(s.gounds)
        s.addElement(s.bird)
        // s.addElement(s.start)
    }

    setupInputs(){
        var s = this
        s.game.registerAction('p', function(){
            var scene = ScenePlay.new(s.game)
            s.game.replaceScene(scene)
        })

        s.game.registerAction('j', function(){
            s.bird.jump()
        })
    }

    update(){
        super.update()
        var s = this
        s.skipCount--
        var offset = 5
        if (s.skipCount == 0) {
            s.skipCount = 4
            offset = -15
        }
        for (var i = 0; i < 13; i++) {
            var g = s.gounds[i]
            g.x -= offset
        }
    }
}
