var __main = function() {
    var game = GuaGame.instance(30, imgConfig, function(g){
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
}

__main()
