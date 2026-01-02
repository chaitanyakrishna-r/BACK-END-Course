

//this is factory function
// function personMaker(name, age){
//     const person = {
//         name: name,
//         age: age,
//         talk(){
//         console.log(`hey hai my name is ${this.name}`);
//     }
//     }
    
    
//     return person;
// }


//constructors - doesn't return anything and start with capital letter
// function Person(name, age){
//    this.name = name;
//    this.age = age;
// }

// Person.prototype.talk = function(){
//     console.log(`Hi, My name is ${this.name}`);
// }
// let p1 = new Person("adam", 23);
// let p2 = new Person("eva", 24);

//classes

// class Person{
//     constructor(name, age){
//         this.name= name;
//         this.age= age;
//     }
//     talk(){
//         console.log(`Hi , My name is ${this.name}`);
//     }
// }

// let p1 = new Person("adam", 23);

// interitance

class Person{
    constructor(name, age){
        this.name= name;
        this.age = age;
    }
    talk(){
        console.log(`Hi, my name is ${this.name}`);
    }
}

class Student extends Person{
    constructor(name, age, marks){
        super(name, age);
        this.marks = marks;
    }
   
}


class Teacher extends Person{
    constructor(name, age, subject){
        super(name, age);//call the parent constructor function
        this.subject = subject;
    }
    
    teach(){
        console.log(`Hi, i will teach ${this.subject}`);
    }
}

let stud1 = new Student("adam",22,88);