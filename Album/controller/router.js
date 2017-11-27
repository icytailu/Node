// 引入首页html模板
var file = require('../models/file.js');

// 导出渲染后的首页
exports.showIndex = function(req,res,next){
    // res.render('index',{
    //     'albums':file.getAllAlbums()
    // })
    file.getAllAlbums(function(err,allAlbums,next){
        if(err) next();
        
        res.render('index',{
            'albums':allAlbums
        })
    })
}

// 相册页
exports.showAlbum = function (req,res) {
    var albumName = req.params.albumName;
    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if (err) res.render('err');
        res.render('album',{
            'albumname':albumName,
            'images':imagesArray
        })
    })
}