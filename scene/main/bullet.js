class Land {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(game) {
        return new this(game)
    }

    setup(){
        var s = this
        s.name = 'ground'
        s.number = 13
        s.landList = []
        s.skipCount = 4
        // s.offset = 5
        //
        for (var i = 0; i < s.number; i++) {
            var g = GuaImage.new(s.game, s.name)
            g.x = i * g.w
            g.y = 420
            s.landList.push(g)
        }
    }

    draw(){

    }


    update(){
        var s = this
        s.skipCount--
        var offset = 5
        if (s.skipCount == 0) {
            s.skipCount = 4
            // s.offset = -2
            offset = -15
        }
        // for (var i = 0; i < 13; i++) {
        //     var g = s.eles[i]
        //     g.x -= offset
        // }
        // for (g of s.landList) {
        //     g.x -= s.offset
        // }
        for (var i = 0; i < s.landList.length; i++) {
            var l = s.landList[i]
            l.x -= offset
        }
    }
}
