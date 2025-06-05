// praticing oops
class Car {
  brand;
  model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails){
    this.#brand =  carDetails.brand;
    this.#model =  carDetails.model;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed}km/h, ${this.isTrunkOpen}`);
  }

  go() {
    if(this.isTrunkOpen){
      return;
    }
    this.speed += 5;
    if(this.speed > 200 ){
      this.speed = 200;
    }
  }

  brake() {
    this.speed -= 5;
    if(this.speed < 0){
      this.speed = 0;
    }
  }

  openTrunk(){
    if(!this.isTrunkOpen && this.speed === 0){
      this.isTrunkOpen = true;
    }
  }
  closeTrunk(){
    if(this.isTrunkOpen){
      this.isTrunkOpen = false;
    }
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed}km/h, acceleration: ${this.acceleration}`);
  }

  go() {
    this.speed += this.acceleration;
    if(this.speed > 300 ){
      this.speed = 300;
    }
  }
  openTrunk(){
    this.isTrunkOpen = false;
  }
  closeTrunk(){
    this.isTrunkOpen = false;
  }

}

const car1 = new Car({ brand: 'Toyota', model: 'Corolla' });
const car2 = new RaceCar({ brand: 'McLaren', model: 'F1', acceleration: 20});

car1.displayInfo();
car1.openTrunk();
car1.go();
car1.displayInfo();
car1.closeTrunk();
car1.go();
car1.displayInfo();
car1.brake();
car2.displayInfo();
car2.go();
car2.displayInfo();