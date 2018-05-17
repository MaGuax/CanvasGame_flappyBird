class GuaScene {
    constructor(game) {
        this.game = game
        this.game.actions = {}
        this.game.keydowns = {}
        this.elements = []
    }

    addElement(e) {
        e.scene = this
        // console.log('e', e, );
        this.elements.push(e)
    }

    addElements(es) {
        for (var i = 0; i < es.length; i++) {
            var e = es[i]
            this.addElement(e)
        }
    }

    draw() {
        // console.log('bug', this.elements);
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.draw()
        }
    }

    update() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }

        this.elements = this.elements.filter(e => e.alive)
    }

    static new(game) {
        var i = new this(game)
        return i
    }
}
