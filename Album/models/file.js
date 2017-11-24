var fs = require('fs');

exports.getAllAlbums = function(callback){
    fs.readdir('./uploads',function(err,files){
        if (err) callback('没找到文件夹',null);
        var allAlbums = [];
        (function iterator(i){
            if(i == files.length){
                callback(null,allAlbums);
                return;
            }
            fs.stat('./uploads/'+files[i],function(err,stats){
                if (err) callback("找不到文件啦~"+files[i],null)
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    })
}


exports.getAllImagesByAlbumName = function(albumName,callback){
    fs.readdir('./uploads/'+albumName,function(err,files){
        if (err) {
            callback('没找到文件夹',null);
            return;
        }
        var allImages = [];
        (function iterator(i){
            if(i == files.length){
                callback(null,allImages);
                return;
            }
            fs.stat('./uploads/' + albumName + '/' + files[i],function(err,stats){
                if (err) callback("找不到文件啦~"+files[i],null)
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    })
}