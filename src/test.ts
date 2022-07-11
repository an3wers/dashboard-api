let a: number = 5;
let b: string = "string";
let c: boolean = true;
let d = "10";

let n = null;
let u = undefined;

let ad: number = a + Number(d);

//  Массивы
const names: string[] = ["John", "Tom"];
const nums: number[] = [5, 6];

// Кортэжи tupls
const tupl: [number, string] = [5, "string"];

// Any
let e: any = 67;
e = "wer";

const anyArray: any[] = [6, "sdf", false];

// Функции

function greet(name: string): string {
  return name + "Hi";
}

// Объектные типы

function coords(coord: { lat: number; long?: number }) {
  return coord;
}

coords({ lat: 5, long: 6 });

// Union tupes
let universalId: string | number = "10";
universalId = 12;

function printId(id: number | string) {
  if (typeof id == "string") {
    console.log(id.toLocaleUpperCase());
  } else {
    console.log(id);
  }
}

function helloUser(user: string | string[]) {
  if (Array.isArray(user)) {
    user.map((el) => el);
  } else {
    console.log(user);
  }
}

// Type Aliase and Interface

type Coord = {
  lat: number;
  long: number;
};

interface ICoord {
  lat: number;
  long: number;
}

function compute(coord: ICoord) {
  return coord;
}

compute({ lat: 7, long: 10 });

//
type ID = number | string;

function printId2(id: ID) {
  console.log(id);
}

printId2(100);

const objArray: object[] = [{}, {}];

interface IAnimal {
  name: string;
}

interface IDog extends IAnimal {
  age: number;
}

const jhony: IDog = {
  name: "Jhony",
  age: 4,
};

jhony.name;

type Car = {
  model?: string;
  age?: number;
};

type BMW = Car & {
  color: string;
};

const myBmw: BMW = {
  color: "black",
};

// Литералы

type Direction = "left" | "right";

function moveDog(direcion: Direction) {
  // console.log('dog move', direcion)
  switch (direcion) {
    case "left":
      return -1;
    case "right":
      return 1;
    default:
      return 0;
  }
}

moveDog("right");

interface IConnection {
  host: string;
  port: number;
}

function connect(connection: IConnection | "deafult") {}

connect("deafult");

// Enum

enum Direction2 {
  Left,
  Right,
}

// Generics

function log<T>(obj: T): T {
  console.log(obj);
  return obj;
}

log<string>("asd");
log<number>(5);

interface HasLength {
  length: number;
}

function log2<T extends HasLength, K>(obj: T, arr: K[]): K[] {
  obj.length;

  console.log(obj);
  return arr;
}

log2<string, number>("123", [1, 2, 3]);

interface IUser {
  name: string;
  age?: number;
  bid: <T>(sum: T) => boolean;
}

function bid<T>(sum: T): boolean {
  return true;
}

// Class

class CoordClass {
  lat: number;
  long: number;

  constructor(lat: number, long: number) {
    this.lat = lat;
    this.long = long;
  }

  computeDistance(newLat: number, newLong: number): number {
    return 0;
  }
}

const point = new CoordClass(10, 8);

class MapLocation extends CoordClass {
  name: string;
  constructor(lat: number, long: number, name: string) {
    super(lat, long);
  }

  override computeDistance(newLat: number, newLong: number): number {
    return 1;
  }
}

const map = new MapLocation(10, 10, "test");

interface loggerService {
  log: (s: string) => void;
}

class Logger implements loggerService {
  log(str: string) {
    console.log(str);
  }
}
