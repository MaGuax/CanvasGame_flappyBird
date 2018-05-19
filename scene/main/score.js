class Score {
    constructor(game, size, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.size = size
        this.setup()
    }

    static new(game, size, x, y) {
        var i = new this(game, size, x, y)
        return i
    }

    setup(config) {
        this.alive = true
        this.imgList = {}
        this.showNumber = []

        this.initNumber()
        this.initShowNumber()
    }

    initNumber(){
        for (var i = 0; i < 10; i++) {
            var name = `${this.size}_number${i}`
            var n = GuaImage.new(this.game, name)
            this.imgList[i] = n
        }
    }


    initShowNumber(){
        for (var i = 0; i < 2; i++) {
            var zero = this.imgList['0'].texture
            this.showNumber.push(zero)
        }
    }

    draw(){
        var s = this
        for (var i = 0; i < s.showNumber.length; i++) {
            var n = s.showNumber[i]
            var x = s.x + (i * n.width) - n.width
            s.game.context.drawImage(n, x, s.y)
        }
    }

    update() {

    }

    updateShow(number){
        var s = this

        number = String(number)
        if (number.length < 2) {
            number = '0' + number
        }

        var array = []

        for (var i = 0; i < number.length; i++) {
            var img = number[i]
            var n = s.imgList[img].texture
            array.push(n)
        }

        s.showNumber = array
    }
}
