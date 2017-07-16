# Node
对JS的一个解析

> ## [深入浅出Node.js](http://tw93.com/2015-03-01/shen-ru-qian-chu-nodejs-reading-mind-map.html)

> ls：查看当前路径下面的文件和文件夹。<br>
> pwd：查看当前所在路径。<br>
> cd Desktop：切换到桌面。<br>
> mkdir nodejs入门：在当前路径下面创建nodejs入门文件夹。<br>
> cd nodejs入门：进入nodejs入门文件夹。<br>
> vi helloworld.js：创建一个helloworld.js文件，并在文件里面输入console.log("Hello World!"),保存并退出。<br>
> cat helloworld.js：查看helloworld.js文件内容。<br>
> node helloworld.js：在当前路径下面执行helloworld.js文件。<br>

学习Node要知道模块的概念
## 模块
> 编写稍大一点的程序时一般都会将代码模块化。在NodeJS中，一般将代码合理拆分到不同的JS<br>
> 文件中，每一个文件就是一个模块，而文件路径就是模块名。<br>
在编写每个模块时。都有 `require`,`exports`,`moudle`三个预先定义好的变量可供使用
### require
> require函数用于在当前模块中加载和使用别的模块，传一个模块名，返回一个模块导出对象。
### export
> export对象是当前模块的导出对象，用于导出模块公有方法和属性别的模块<br>通过require函数使用当前模块时得到的就是当前模块的exports对象。
### module
> 通过module对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。<br>
> 例如模块导出对象默认是一个普通对象，如果想改成一个函数的话
```js
module.exports = function(){
     console.log("hello node");
}
```
