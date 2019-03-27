class A {
    constructor(){
        this.name = "test";
    }
};

class B extends A {
    constructor(){
        super();
        this.banana = "test"
    }
}

let Atest = new A();
let Btest = new B();
console.log("testing: ", Atest, Btest)

Btest.name = "lskjdfkl";
console.log("testing: ", Atest, Btest)
