import 'reflect-metadata';

const a: number = 5;
const b: string = 'string';
const c: boolean = true;
const d = '10';

const n = null;
const u = undefined;

const ad: number = a + Number(d);

//  Массивы
const names: string[] = ['John', 'Tom'];
const nums: number[] = [5, 6];

// Кортэжи tupls
const tupl: [number, string] = [5, 'string'];

// Any
let e: any = 67;
e = 'wer';

const anyArray: any[] = [6, 'sdf', false];

// Функции

function greet(name: string): string {
	return name + 'Hi';
}

// Объектные типы

function coords(coord: { lat: number; long?: number }) {
	return coord;
}

coords({ lat: 5, long: 6 });

// Union tupes
let universalId: string | number = '10';
universalId = 12;

function printId(id: number | string) {
	if (typeof id == 'string') {
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
	name: 'Jhony',
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
	color: 'black',
};

// Литералы

type Direction = 'left' | 'right';

function moveDog(direcion: Direction) {
	// console.log('dog move', direcion)
	switch (direcion) {
		case 'left':
			return -1;
		case 'right':
			return 1;
		default:
			return 0;
	}
}

moveDog('right');

interface IConnection {
	host: string;
	port: number;
}

function connect(connection: IConnection | 'deafult') {}

connect('deafult');

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

log<string>('asd');
log<number>(5);

interface HasLength {
	length: number;
}

function log2<T extends HasLength, K>(obj: T, arr: K[]): K[] {
	obj.length;

	console.log(obj);
	return arr;
}

log2<string, number>('123', [1, 2, 3]);

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

const map = new MapLocation(10, 10, 'test');

interface loggerService {
	log: (s: string) => void;
}

class Logger implements loggerService {
	log(str: string) {
		console.log(str);
	}
}

// Декораторы

function Component(id: number) {
	console.log('init component');
	return (target: Function) => {
		target.prototype.id = id;
	};
}

function DLogger() {
	console.log('init logger');
	return (target: Function) => {
		console.log('run logger');
	};
}

/**
 * Decorator to multiply the first argument of a method by 10
 * @param {Object} target The prototype of the class
 * @param {string} proppertyKey The name of the method
 * @param {PropertyDescriptor} propertyDescriptor The property descriptor of the method
 * @returns {void}
 */

function Method(target: Object, proppertyKey: string, propertyDescriptor: PropertyDescriptor) {
	console.log(proppertyKey);
	propertyDescriptor.value = function (...args: any[]) {
		return args[0] * 10;
	};
}

@DLogger()
@Component(5)
export class User {
	id: number;

	@Method
	updateId(newId: number) {
		this.id = newId;
		return this.id;
	}
}

// Define metadata

function Test(target: Function) {
	Reflect.defineMetadata('a', 1, target);
	const meta = Reflect.getMetadata('a', target);
	console.log('meta', meta);
}

@Test
class C {}
