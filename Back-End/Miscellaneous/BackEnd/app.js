class Mammals{
    constructor(name){
        this.name = name;
        this.type = "warm-blooded"
    }
    walk(){
        console.log("I can walk");
    }
}

class Dog extends Mammals{
    constructor(name){
        super(name);
        this.name = name;
    }
    bark(){
        console.log("barking");
    }
}

let dog1 = new Dog("johny");