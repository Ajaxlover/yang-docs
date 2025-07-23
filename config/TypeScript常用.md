# TypeScript 语法说明文档

## 常用程度说明
- 🔥 **极常用** - 日常开发必备，几乎每个项目都会用到
- ⭐ **常用** - 经常使用，大多数项目会用到
- 💡 **中等** - 特定场景使用，中级开发者需要掌握
- 🔧 **高级** - 复杂场景使用，高级开发者或特殊需求时使用

## 目录
1. [基本类型](#基本类型) 🔥
2. [变量声明](#变量声明) 🔥
3. [函数](#函数) 🔥
4. [接口](#接口) 🔥
5. [类](#类) ⭐
6. [泛型](#泛型) ⭐
7. [枚举](#枚举) ⭐
8. [联合类型和交叉类型](#联合类型和交叉类型) ⭐
9. [类型断言](#类型断言) 💡
10. [模块](#模块) 🔥
11. [装饰器](#装饰器) 🔧
12. [高级类型](#高级类型) 🔧

---

## 基本类型 🔥

### 1. 基础数据类型 🔥

```typescript
// 布尔值 🔥
let isDone: boolean = false;

// 数字 🔥
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 字符串 🔥
let color: string = "blue";
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next month.`;

// 数组 🔥
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// 元组 ⭐
let x: [string, number];
x = ["hello", 10]; // OK
// x = [10, "hello"]; // Error

// 枚举 ⭐
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any 💡 (不推荐过度使用)
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// Void 🔥
function warnUser(): void {
    console.log("This is my warning message");
}

// Null 和 Undefined ⭐
let u: undefined = undefined;
let n: null = null;

// Never 💡
function error(message: string): never {
    throw new Error(message);
}

// Object ⭐
declare function create(o: object | null): void;
create({ prop: 0 }); // OK
create(null); // OK
```

### 2. 类型注解 🔥

```typescript
// 变量类型注解 🔥
let count: number = 5;
let name: string = "Alice";

// 函数参数和返回值类型注解 🔥
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// 对象类型注解 🔥
let person: { name: string; age: number } = {
    name: "Bob",
    age: 30
};
```

---

## 变量声明

### 1. let 和 const

```typescript
// let 声明
let a = 10;
let b: number = 20;

// const 声明
const PI = 3.14159;
const message: string = "Hello World";

// 块级作用域
function f(input: boolean) {
    let a = 100;
    
    if (input) {
        let b = a + 1; // b 只在 if 块中可见
        return b;
    }
    
    // return b; // Error: 'b' doesn't exist here
}
```

### 2. 解构赋值

```typescript
// 数组解构
let input = [1, 2];
let [first, second] = input;
console.log(first); // 1
console.log(second); // 2

// 对象解构
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;

// 重命名
let { a: newName1, b: newName2 } = o;

// 默认值
let { a, b = 1001 } = o;

// 函数参数解构
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}
```

---

## 函数 🔥

### 1. 函数声明和表达式 🔥

```typescript
// 函数声明 🔥
function add(x: number, y: number): number {
    return x + y;
}

// 函数表达式 🔥
let myAdd = function(x: number, y: number): number { 
    return x + y; 
};

// 箭头函数 🔥
let myAdd2 = (x: number, y: number): number => x + y;

// 完整的函数类型 ⭐
let myAdd3: (x: number, y: number) => number = 
    function(x: number, y: number): number { return x + y; };
```

### 2. 可选参数和默认参数 🔥

```typescript
// 可选参数 🔥
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

// 默认参数 🔥
function buildName2(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

// 剩余参数 ⭐
function buildName3(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
```

### 3. 函数重载 💡

```typescript
// 重载签名
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };

// 实现签名
function pickCard(x: any): any {
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
```

---

## 接口 🔥

### 1. 基本接口 🔥

```typescript
// 基本接口定义 🔥
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);
```

### 2. 可选属性和只读属性 🔥

```typescript
interface SquareConfig {
    color?: string;      // 可选属性 🔥
    width?: number;      // 可选属性 🔥
    readonly id: number; // 只读属性 ⭐
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
```

### 3. 函数类型接口 ⭐

```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```

### 4. 可索引类型接口 💡

```typescript
// 字符串索引签名
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

// 字典模式
interface StringDictionary {
    [index: string]: string;
    length: number;    // 可以，length是number类型
    name: string;      // 可以，name是string类型
}
```

### 5. 类类型接口 ⭐

```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

### 6. 继承接口 ⭐

```typescript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

---

## 类

### 1. 基本类定义

```typescript
class Greeter {
    greeting: string;
    
    constructor(message: string) {
        this.greeting = message;
    }
    
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

### 2. 继承

```typescript
class Animal {
    name: string;
    constructor(theName: string) { 
        this.name = theName; 
    }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { 
        super(name); 
    }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { 
        super(name); 
    }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
```

### 3. 访问修饰符

```typescript
class Animal {
    public name: string;           // 公共的
    private age: number;           // 私有的
    protected species: string;     // 受保护的
    readonly id: number;           // 只读的
    
    public constructor(theName: string, theAge: number, theSpecies: string) {
        this.name = theName;
        this.age = theAge;
        this.species = theSpecies;
        this.id = Math.random();
    }
    
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
    
    private getAge(): number {
        return this.age;
    }
}
```

### 4. 存取器

```typescript
class Employee {
    private _fullName: string;
    
    get fullName(): string {
        return this._fullName;
    }
    
    set fullName(newName: string) {
        if (newName && newName.length > 0) {
            this._fullName = newName;
        } else {
            console.log("Error: Invalid name");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

### 5. 静态属性和方法

```typescript
class Grid {
    static origin = {x: 0, y: 0};
    
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    
    constructor (public scale: number) { }
}
```

### 6. 抽象类

```typescript
abstract class Department {
    constructor(public name: string) {
    }
    
    printName(): void {
        console.log('Department name: ' + this.name);
    }
    
    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
    constructor() {
        super('Accounting and Auditing');
    }
    
    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }
    
    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}
```

---

## 泛型

### 1. 基本泛型

```typescript
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 使用泛型函数
let output = identity<string>("myString");
let output2 = identity("myString"); // 类型推论

// 泛型数组
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}
```

### 2. 泛型接口

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

### 3. 泛型类

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

### 4. 泛型约束

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // 现在我们知道它有length属性了
    return arg;
}

// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

---

## 枚举

### 1. 数字枚举

```typescript
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

// 使用枚举
let direction: Direction = Direction.Up;

// 反向映射
enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

### 2. 字符串枚举

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

### 3. 异构枚举

```typescript
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```

### 4. 计算的和常量成员

```typescript
enum FileAccess {
    // 常量成员
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // 计算成员
    G = "123".length
}
```

### 5. const 枚举

```typescript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

---

## 联合类型和交叉类型

### 1. 联合类型

```typescript
// 基本联合类型
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

// 联合类型的类型保护
interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim();    // errors

// 类型断言
if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}
```

### 2. 交叉类型

```typescript
interface ErrorHandling {
    success: boolean;
    error?: { message: string };
}

interface ArtworksData {
    artworks: { title: string }[];
}

interface ArtistsData {
    artists: { name: string }[];
}

// 交叉类型
type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
    if (response.error) {
        console.error(response.error.message);
        return;
    }
    console.log(response.artists);
};
```

### 3. 可辨识联合

```typescript
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

---

## 类型断言

### 1. 基本类型断言

```typescript
// 尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;
```

### 2. 类型保护

```typescript
// typeof 类型保护
function isNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

// instanceof 类型保护
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}
```

---

## 模块

### 1. 导出

```typescript
// 导出声明
export interface StringValidator {
    isAcceptable(s: string): boolean;
}

export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

// 导出语句
class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };

// 重新导出
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";

// 默认导出
export default class Calculator {
    add(x: number, y: number): number {
        return x + y;
    }
}
```

### 2. 导入

```typescript
// 导入一个模块中的某个导出内容
import { ZipCodeValidator } from "./ZipCodeValidator";

// 对导入内容重命名
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";

// 将整个模块导入到一个变量
import * as validator from "./ZipCodeValidator";

// 导入默认导出
import Calculator from "./Calculator";

// 具有副作用的导入模块
import "./my-module.js";
```

### 3. 命名空间

```typescript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

// 使用命名空间
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
```

---

## 装饰器

### 1. 类装饰器

```typescript
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

### 2. 方法装饰器

```typescript
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

### 3. 属性装饰器

```typescript
function format(formatString: string) {
    return function (target: any, propertyKey: string): any {
        let value = target[propertyKey];

        const getter = function () {
            return `${formatString} ${value}`;
        };

        const setter = function (newVal: string) {
            value = newVal;
        };

        return {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        };
    };
}

class Greeter {
    @format("Hello")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
}
```

### 4. 参数装饰器

```typescript
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata("required", target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata("required", existingRequiredParameters, target, propertyKey);
}

class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet(@required name: string) {
        return "Hello " + name + ", " + this.greeting;
    }
}
```

---

## 高级类型

### 1. 映射类型

```typescript
// Partial<T> - 将T中的所有属性设为可选
type Partial<T> = {
    [P in keyof T]?: T[P];
}

// Required<T> - 将T中的所有属性设为必需
type Required<T> = {
    [P in keyof T]-?: T[P];
}

// Readonly<T> - 将T中的所有属性设为只读
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}

// Pick<T, K> - 从T中选择属性K
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

// 使用示例
interface Person {
    name: string;
    age: number;
    email: string;
}

type PartialPerson = Partial<Person>;
type PersonName = Pick<Person, 'name'>;
```

### 2. 条件类型

```typescript
// 基本条件类型
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;     // "string"
type T2 = TypeName<true>;    // "boolean"

// 分布式条件类型
type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = T extends U ? T : never;

type T3 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T4 = Filter<string | number | (() => void), Function>;  // () => void

// infer 关键字
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type T5 = ReturnType<() => string>;  // string
type T6 = ReturnType<(x: number) => number>;  // number
```

### 3. 索引类型

```typescript
// keyof 操作符
interface Person {
    name: string;
    age: number;
    location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // "length" | "toString" | "pop" | "push" | "concat" | "join" 

// 索引访问操作符
type P1 = Person["name"];  // string
type P2 = Person["name" | "age"];  // string | number
type P3 = string["charAt"];  // (pos: number) => string
type P4 = string[]["push"];  // (...items: string[]) => number

// 实用示例
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}

let person: Person = {
    name: 'John',
    age: 25,
    location: 'NYC'
};

let name: string = getProperty(person, 'name');
let age: number = getProperty(person, 'age');
let unknown = getProperty(person, 'unknown'); // error
```

### 4. 工具类型

```typescript
// Exclude<T, U> - 从T中排除U
type T0 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;  // "c"

// Extract<T, U> - 从T中提取U
type T2 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"

// NonNullable<T> - 从T中排除null和undefined
type T3 = NonNullable<string | number | undefined>;  // string | number

// Record<K, T> - 创建一个类型，其属性键为K，属性值为T
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>;
// 等同于: { prop1: string, prop2: string, prop3: string }

// Omit<T, K> - 从T中排除属性K
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;
// 等同于: { title: string; completed: boolean }
```

---

## 🔥 常用语法快速参考

### 新手必学 (🔥 极常用)
```typescript
// 1. 基本类型声明
let name: string = "张三";
let age: number = 25;
let isActive: boolean = true;
let items: number[] = [1, 2, 3];

// 2. 函数定义
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// 3. 接口定义
interface User {
    name: string;
    age: number;
    email?: string; // 可选属性
}

// 4. 对象使用接口
const user: User = {
    name: "李四",
    age: 30
};

// 5. 模块导入导出
export interface Product { name: string; price: number; }
import { Product } from './types';
```

### 进阶常用 (⭐ 常用)
```typescript
// 1. 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 2. 联合类型
type Status = 'loading' | 'success' | 'error';

// 3. 类定义
class Animal {
    constructor(public name: string) {}
    move(): void { console.log('Moving...'); }
}

// 4. 枚举
enum Color { Red, Green, Blue }

// 5. 类型别名
type Point = { x: number; y: number; };
```

### 实用技巧总结

| 语法特性 | 使用场景 | 常用程度 |
|---------|---------|---------|
| `string`, `number`, `boolean` | 基本变量声明 | 🔥 |
| `interface` | 定义对象结构 | 🔥 |
| `?:` 可选属性 | 接口中的可选字段 | 🔥 |
| `function(param: type): returnType` | 函数类型注解 | 🔥 |
| `type[]` 或 `Array<type>` | 数组类型 | 🔥 |
| `export/import` | 模块化开发 | 🔥 |
| `<T>` 泛型 | 可重用组件 | ⭐ |
| `type A \| B` 联合类型 | 多种可能的类型 | ⭐ |
| `enum` | 常量集合 | ⭐ |
| `class` | 面向对象编程 | ⭐ |
| `as` 类型断言 | 类型转换 | 💡 |
| `extends` | 类型约束/继承 | 💡 |
| `@decorator` | 装饰器 | 🔧 |
| 映射类型 | 高级类型操作 | 🔧 |

### 最佳实践建议

1. **🔥 优先掌握**: 基本类型、接口、函数类型注解
2. **⭐ 重点学习**: 泛型、联合类型、类、枚举
3. **💡 按需学习**: 类型断言、高级类型操作
4. **🔧 深入研究**: 装饰器、复杂的映射类型

---

## 总结

TypeScript 提供了强大的类型系统，包括：

1. **静态类型检查** - 在编译时捕获错误
2. **类型推断** - 自动推断变量类型
3. **接口和类** - 面向对象编程支持
4. **泛型** - 编写可重用的代码
5. **高级类型** - 复杂的类型操作
6. **装饰器** - 元编程支持
7. **模块系统** - 代码组织和重用

这些特性使得 TypeScript 成为大型 JavaScript 应用开发的理想选择，提供了更好的代码质量、可维护性和开发体验。

---

*本文档涵盖了 TypeScript 的主要语法特性，每个部分都包含了详细的代码示例。建议结合实际项目练习这些概念。*