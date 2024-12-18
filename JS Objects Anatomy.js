class Car {
    static totalCars = 0; //class (static) attribute

    constructor(name,year) {
      this.name = name; //instance attributes
      this.year = year;
      Car.totalCars++; // increment totalCars when a new Car is created
    }
    age() { //instance method. function keyword not needed when declaring methods.
        const date = new Date();
        return date.getFullYear() - this.year;
    }
    static getTotalCars() { //class (static) method
        return Car.totalCars;
    }
}

//If you want to use the myCar object inside the static method, you can send it as a parameter:
class Car {
  constructor(name) {
    this.name = name;
  }
  static hello(x) {
    return "Hello " + x.name;
  }
}


class ElectricCar extends Car { // Extending Car class to create ElectricCar class
    constructor(name, year, batteryLife) {
        super(name, year); // call the parent class constructor (params required)
        this.batteryLife = batteryLife; // additional attribute for ElectricCar
    }

    batteryStatus() { // instance method specific to ElectricCar
        return `Battery life is ${this.batteryLife}%`;
    }
  }

const myCar = new Car("Ford", 2015);
const myElectricCar = new ElectricCar("Tesla", 2020, 85);

// You can call 'getTotalCars()' on the Car Class:
console.log("Total cars:", Car.getTotalCars());

// But NOT on a Car Object:
console.log(myCar.getTotalCars()); // this will raise an error.

// Calling static method with an instance
console.log(Car.hello(myCar)); // Output: "Hello Ford"
