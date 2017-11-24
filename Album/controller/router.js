var file = require('../models/file.js');
// 首页
exports.showIndex = function(req,res,next){
    // 不能这么写：因为是异步的这个数组还没有return，就会跳过执行下一条语句
    // res.render('index',{
    //     "albums" : file.getAllAlbums()
    // });

    // Node.js的编程思维，就是所有的东西都是异步的
    //所以，内层函数，不是return回来东西，而是调用高层函数提供的
    //回调函数，把数据当做回调函数的参数来使用。
    file.getAllAlbums(function(err,allAlbums,next){
        if (err) {
            next();//交给下面的中间件
            return;
        }
        res.render('index',{
            'albums': allAlbums
        });
    })
}

// 相册页
exports.showAlbum = function(req,res){
    // 遍历相册中的所有图片
    // res.send('相册'+ req.params.albumName);
    var albumName = req.params.albumName;
    //具体业务交给model
    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if (err) {
            res.render('err');
            return;
        }
        res.render('album',{
            'albumname':albumName,
            'images':imagesArray
        })
    });
}
