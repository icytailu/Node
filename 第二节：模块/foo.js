function People(name,age,sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
}
People.prototype={
    sayHello:function(){
        console.log( `你好${this.name}，我今年${this.age}岁，性别${this.sex}`);
    },
    sayBye:function(){
        console.log(`bye-bye：${this.name}`)
    }

}
module.exports = People;