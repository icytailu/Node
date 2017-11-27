// 读取文件就要用到fs模块
var fs = require('fs');

// 导出一个存放所有albums文件夹的数组

exports.getAllAlbums = function (callback) {
    //readdir读取xx文件夹下的文件目录（第一个参数err）
    //（第二个参数files 是文件目录中不包括 '.' 和 '..' 的文件名的数组。）
    fs.readdir('./uploads',function(err,files){
        // 读取一个文件的步骤就是：第一步先检查是否存在`./uploads`，如果不存在给一个提示
        // 以后遇到fs模块中读取文件方法首先判断是否存在该文件，然后再判断接下来怎么做~
        if(err) calback('没有找到文件夹',null);
           
        // 声明一个数组存放相册目录
        var allAlbums = [];
        // 迭代循环‘./uploads’的文件目录添加到声明的数组
        // 我们的目的是读取files然后把files中所有数据值添加到allAlbums中

        // 按照正常逻辑应该这么做。。。
        // for(var i =0; i<files.length; i++){
        //      fs.stat() 检查一个文件是否存在。fs.stat(path,callback)
        //      callback(err,stats) stats 是一个 fs.Stats 对象。stats.isFile() stats.isDirectory()
        //      因为Node是异步的，第一个文件还没读完就执行第二次循环了
        //     fs.stat('./uploads'+files[i],function(err,stats){
        //         if(err) callback('找不到文件~'+ files[i],null);
        //         if(stats.isDirectory()){
        //             allAlbums.push(files[i]);
        //         }
        //     })
        // }
        (function iterator(i){
            // 循环结束后把收集的数据的数组allAlbums当做callback的参数传递给`router.js`的albums
            //然后albums再渲染在index.ejs模板中在页面中呈递出来
            //必须添加 return 语句因为结束循环就要return一下不然整个函数没有返回值就会被一直挂起
            //next() 方法就不会执行下一条任务,就会显示：next is not a function
            if(i == files.length) return callback(null,allAlbums);
               
            fs.stat('./uploads/'+files[i],function(err,stats){
                if (err) callback('找不到文件~'+files[i],null);
                  
                if (stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            })
        })(0)
    })
}

exports.getAllImagesByAlbumName = function(albumName,callback){
    fs.readdir('./uploads/'+albumName,function(err,files){
        if (err) return callback('没有找到文件夹~',null);
            
        var allImages = [];
        (function iterator(i){
            if(i == files.length){
                callback(null,allImages);
                return;
            }
            fs.stat('./uploads/'+albumName +'/'+files[i],function(err,stats){
                if(err) callback('找不到文件~'+files[i],null)
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i + 1);
            })
        })(0)
    })
}