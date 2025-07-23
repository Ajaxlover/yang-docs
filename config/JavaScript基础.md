---
title: JavaScript基础
description: JavaScript核心概念与实践指南
---

# JavaScript基础

## 1. JavaScript简介

### 1.1 什么是JavaScript

JavaScript是一种轻量级的解释型或即时编译型编程语言，是一种基于原型、多范式、单线程的动态语言，支持面向对象、命令式和声明式（如函数式编程）编程风格。

### 1.2 JavaScript的历史与发展

- **1995年**：由Brendan Eich在网景公司开发，最初名为Mocha，后改名为LiveScript，最终命名为JavaScript
- **1997年**：ECMAScript标准确立（ECMA-262）
- **2009年**：ECMAScript 5发布
- **2015年**：ECMAScript 6（ES2015）发布，带来重大更新
- **现在**：每年发布一个新版本，持续演进

### 1.3 JavaScript的应用领域

- 网页交互与动态效果
- 前端框架（React、Vue、Angular等）
- 服务器端开发（Node.js）
- 移动应用开发（React Native、Ionic等）
- 桌面应用开发（Electron）
- 游戏开发
- 物联网应用

## 2. 基本语法

### 2.1 变量与数据类型

#### 变量声明

```javascript
// var - 函数作用域，可重复声明，有变量提升
var name = 'JavaScript';

// let - 块级作用域，不可重复声明，无变量提升
let age = 25;

// const - 块级作用域，不可重新赋值，无变量提升
const PI = 3.14159;
```

#### 基本数据类型

```javascript
// 字符串
let str = 'Hello World';

// 数字
let num = 42;
let float = 3.14;

// 布尔值
let isActive = true;

// undefined
let notDefined;

// null
let empty = null;

// Symbol (ES6)
let uniqueKey = Symbol('description');

// BigInt (ES2020)
let bigNumber = 9007199254740991n;
```

#### 引用数据类型

```javascript
// 对象
let person = {
  name: 'John',
  age: 30,
  isEmployed: true
};

// 数组
let fruits = ['Apple', 'Banana', 'Orange'];

// 函数
let greet = function() {
  return 'Hello!';
};

// 日期
let today = new Date();

// 正则表达式
let pattern = /\d+/g;
```

### 2.2 运算符

#### 算术运算符

```javascript
let a = 10;
let b = 3;

let sum = a + b;      // 加法: 13
let difference = a - b; // 减法: 7
let product = a * b;   // 乘法: 30
let quotient = a / b;  // 除法: 3.3333...
let remainder = a % b; // 取余: 1
let power = a ** b;    // 幂运算: 1000

// 自增和自减
let c = 5;
c++;  // c = 6
c--;  // c = 5
```

#### 比较运算符

```javascript
let x = 5;
let y = '5';

x == y;   // 相等（值相等）: true
x === y;  // 严格相等（值和类型都相等）: false
x != y;   // 不相等: false
x !== y;  // 严格不相等: true
x > 3;    // 大于: true
x < 10;   // 小于: true
x >= 5;   // 大于等于: true
x <= 4;   // 小于等于: false
```

#### 逻辑运算符

```javascript
let p = true;
let q = false;

p && q;  // 逻辑与: false
p || q;  // 逻辑或: true
!p;      // 逻辑非: false

// 短路求值
let result = p && 'Success';  // 'Success'
let fallback = q || 'Default'; // 'Default'

// 空值合并运算符 (ES2020)
let value = null;
let defaultValue = value ?? 'Default';  // 'Default'
```

### 2.3 条件语句

#### if-else语句

```javascript
let hour = 14;

if (hour < 12) {
  console.log('早上好');
} else if (hour < 18) {
  console.log('下午好');
} else {
  console.log('晚上好');
}
```

#### switch语句

```javascript
let day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = '星期一';
    break;
  case 2:
    dayName = '星期二';
    break;
  case 3:
    dayName = '星期三';
    break;
  case 4:
    dayName = '星期四';
    break;
  case 5:
    dayName = '星期五';
    break;
  default:
    dayName = '周末';
}

console.log(dayName);  // '星期三'
```

#### 三元运算符

```javascript
let age = 20;
let status = age >= 18 ? '成年' : '未成年';
console.log(status);  // '成年'
```

### 2.4 循环语句

#### for循环

```javascript
// 基本for循环
for (let i = 0; i < 5; i++) {
  console.log(i);  // 输出0到4
}

// for...in循环（遍历对象属性）
let person = {name: 'Alice', age: 25, job: 'Developer'};
for (let key in person) {
  console.log(key + ': ' + person[key]);
}

// for...of循环（遍历可迭代对象）
let colors = ['red', 'green', 'blue'];
for (let color of colors) {
  console.log(color);
}
```

#### while和do-while循环

```javascript
// while循环
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// do-while循环（至少执行一次）
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);
```

## 3. 函数

### 3.1 函数声明与表达式

```javascript
// 函数声明
function greet(name) {
  return 'Hello, ' + name + '!';
}

// 函数表达式
let sayHello = function(name) {
  return 'Hello, ' + name + '!';
};

// 箭头函数 (ES6)
let welcome = (name) => {
  return 'Welcome, ' + name + '!';
};

// 简化的箭头函数
let add = (a, b) => a + b;
```

### 3.2 参数与返回值

```javascript
// 默认参数 (ES6)
function greet(name = 'Guest') {
  return 'Hello, ' + name + '!';
}

console.log(greet());        // 'Hello, Guest!'
console.log(greet('Alice')); // 'Hello, Alice!'

// 剩余参数 (ES6)
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// 返回多个值（使用数组或对象）
function getPersonInfo() {
  return {
    name: 'John',
    age: 30,
    city: 'New York'
  };
}

let {name, age, city} = getPersonInfo();
```

### 3.3 作用域与闭包

```javascript
// 全局作用域
let globalVar = 'I am global';

function outer() {
  // 函数作用域
  let outerVar = 'I am from outer';
  
  function inner() {
    // 内部函数作用域
    let innerVar = 'I am from inner';
    console.log(innerVar);   // 可访问
    console.log(outerVar);   // 可访问（闭包）
    console.log(globalVar);  // 可访问
  }
  
  return inner;  // 返回内部函数
}

let closureFunc = outer();  // 创建闭包
closureFunc();  // 调用闭包函数
```

### 3.4 高阶函数

```javascript
// 函数作为参数
function calculate(operation, a, b) {
  return operation(a, b);
}

let add = (x, y) => x + y;
let multiply = (x, y) => x * y;

console.log(calculate(add, 5, 3));      // 8
console.log(calculate(multiply, 5, 3)); // 15

// 函数返回函数
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

let double = createMultiplier(2);
let triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

## 4. 对象与原型

### 4.1 对象创建与属性

```javascript
// 对象字面量
let person = {
  name: 'John',
  age: 30,
  greet: function() {
    return 'Hello, my name is ' + this.name;
  }
};

// 使用构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return 'Hello, my name is ' + this.name;
  };
}

let john = new Person('John', 30);

// 使用Object.create()
let personProto = {
  greet: function() {
    return 'Hello, my name is ' + this.name;
  }
};

let alice = Object.create(personProto);
alice.name = 'Alice';
alice.age = 25;
```

### 4.2 原型与继承

```javascript
// 原型继承
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return this.name + ' makes a noise.';
};

function Dog(name, breed) {
  Animal.call(this, name);  // 调用父构造函数
  this.breed = breed;
}

// 设置原型链
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 重写方法
Dog.prototype.speak = function() {
  return this.name + ' barks!';
};

// 添加新方法
Dog.prototype.fetch = function() {
  return this.name + ' fetches the ball!';
};

let dog = new Dog('Rex', 'German Shepherd');
console.log(dog.speak());  // 'Rex barks!'
console.log(dog.fetch());  // 'Rex fetches the ball!'
```

### 4.3 类 (ES6)

```javascript
// 基本类声明
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return 'Hello, my name is ' + this.name;
  }
  
  // 静态方法
  static createAnonymous() {
    return new Person('Anonymous', 0);
  }
}

// 类继承
class Employee extends Person {
  constructor(name, age, position, salary) {
    super(name, age);  // 调用父类构造函数
    this.position = position;
    this.salary = salary;
  }
  
  // 重写方法
  greet() {
    return super.greet() + ' and I am a ' + this.position;
  }
  
  // 新方法
  promote(newPosition) {
    this.position = newPosition;
    this.salary *= 1.1;  // 加薪10%
  }
}

let emp = new Employee('Jane', 28, 'Developer', 80000);
console.log(emp.greet());  // 'Hello, my name is Jane and I am a Developer'
```

## 5. 数组与集合

### 5.1 数组操作

```javascript
// 创建数组
let fruits = ['Apple', 'Banana', 'Orange'];
let numbers = new Array(1, 2, 3, 4, 5);

// 访问元素
console.log(fruits[0]);  // 'Apple'

// 修改元素
fruits[1] = 'Grape';

// 数组长度
console.log(fruits.length);  // 3

// 添加和删除元素
fruits.push('Mango');         // 末尾添加
fruits.unshift('Strawberry'); // 开头添加
fruits.pop();                 // 删除末尾元素
fruits.shift();               // 删除开头元素

// 查找元素
let index = fruits.indexOf('Orange');  // 2
let hasApple = fruits.includes('Apple');  // true

// 切片和连接
let sliced = fruits.slice(1, 3);  // ['Grape', 'Orange']
let combined = fruits.concat(['Pear', 'Peach']);

// 删除/替换元素
fruits.splice(1, 1);  // 删除索引1的元素
fruits.splice(1, 1, 'Kiwi', 'Lemon');  // 替换并添加新元素
```

### 5.2 数组迭代方法

```javascript
let numbers = [1, 2, 3, 4, 5];

// forEach - 遍历数组
numbers.forEach(num => console.log(num * 2));

// map - 创建新数组
let doubled = numbers.map(num => num * 2);  // [2, 4, 6, 8, 10]

// filter - 过滤元素
let evens = numbers.filter(num => num % 2 === 0);  // [2, 4]

// reduce - 累积计算
let sum = numbers.reduce((total, num) => total + num, 0);  // 15

// find - 查找第一个匹配元素
let found = numbers.find(num => num > 3);  // 4

// some - 检查是否至少有一个元素满足条件
let hasEven = numbers.some(num => num % 2 === 0);  // true

// every - 检查是否所有元素都满足条件
let allPositive = numbers.every(num => num > 0);  // true
```

### 5.3 Set和Map

```javascript
// Set - 存储唯一值的集合
let uniqueNumbers = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log([...uniqueNumbers]);  // [1, 2, 3, 4, 5]

// 添加和删除元素
uniqueNumbers.add(6);
uniqueNumbers.delete(1);

// 检查元素
console.log(uniqueNumbers.has(3));  // true

// 获取大小
console.log(uniqueNumbers.size);  // 4

// Map - 键值对集合
let userRoles = new Map();

// 设置键值对
userRoles.set('john', 'admin');
userRoles.set('alice', 'editor');
userRoles.set('bob', 'subscriber');

// 获取值
console.log(userRoles.get('john'));  // 'admin'

// 检查键
console.log(userRoles.has('alice'));  // true

// 删除键值对
userRoles.delete('bob');

// 获取大小
console.log(userRoles.size);  // 2

// 遍历Map
userRoles.forEach((role, user) => {
  console.log(user + ' is a ' + role);
});
```

## 6. 异步JavaScript

### 6.1 回调函数

```javascript
// 基本回调示例
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'Product' };
    callback(null, data);  // 成功时调用回调
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data:', data);
  }
});

// 回调地狱问题
fetchUser(userId, (error, user) => {
  if (error) {
    console.error(error);
    return;
  }
  
  fetchPosts(user.id, (error, posts) => {
    if (error) {
      console.error(error);
      return;
    }
    
    fetchComments(posts[0].id, (error, comments) => {
      if (error) {
        console.error(error);
        return;
      }
      
      console.log(comments);
    });
  });
});
```

### 6.2 Promise

```javascript
// 创建Promise
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ id: 1, name: 'Product' });
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
}

// 使用Promise
fetchData()
  .then(data => {
    console.log('Data:', data);
    return processData(data);  // 返回另一个Promise
  })
  .then(result => {
    console.log('Result:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    console.log('Operation completed');
  });

// Promise.all - 并行执行多个Promise
Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
])
.then(([users, posts, comments]) => {
  console.log('Users:', users);
  console.log('Posts:', posts);
  console.log('Comments:', comments);
})
.catch(error => {
  console.error('Error:', error);
});

// Promise.race - 返回最先完成的Promise结果
Promise.race([
  fetchFromAPI1(),
  fetchFromAPI2()
])
.then(result => {
  console.log('Fastest API result:', result);
})
.catch(error => {
  console.error('Error:', error);
});
```

### 6.3 Async/Await

```javascript
// 基本async/await用法
async function fetchUserData(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    
    return {
      user,
      posts,
      comments
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;  // 重新抛出错误
  } finally {
    console.log('Operation completed');
  }
}

// 调用async函数
fetchUserData(1)
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Error:', error));

// 并行执行
async function fetchAllData() {
  try {
    // 并行执行多个异步操作
    const [users, posts, comments] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
      fetchComments()
    ]);
    
    return { users, posts, comments };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

## 7. 模块化

### 7.1 CommonJS模块 (Node.js)

```javascript
// 导出模块 (math.js)
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};

// 导入模块
const math = require('./math');
console.log(math.add(5, 3));  // 8

// 解构导入
const { add, subtract } = require('./math');
console.log(subtract(10, 4));  // 6
```

### 7.2 ES模块 (ES6)

```javascript
// 导出模块 (math.js)
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// 默认导出
export default function multiply(a, b) {
  return a * b;
}

// 导入模块
import multiply, { add, subtract } from './math.js';

console.log(add(5, 3));       // 8
console.log(subtract(10, 4));  // 6
console.log(multiply(2, 3));   // 6

// 导入所有
import * as math from './math.js';
console.log(math.add(5, 3));  // 8
```

## 8. DOM操作

### 8.1 选择元素

```javascript
// 通过ID选择
const header = document.getElementById('header');

// 通过类名选择
const items = document.getElementsByClassName('item');

// 通过标签名选择
const paragraphs = document.getElementsByTagName('p');

// 使用CSS选择器
const container = document.querySelector('.container');
const allButtons = document.querySelectorAll('button');
```

### 8.2 修改DOM

```javascript
// 修改内容
element.textContent = 'New text content';
element.innerHTML = '<span>HTML content</span>';

// 修改属性
element.setAttribute('id', 'newId');
element.id = 'newId';
element.href = 'https://example.com';

// 修改样式
element.style.color = 'red';
element.style.fontSize = '16px';
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('selected');

// 创建新元素
const newElement = document.createElement('div');
newElement.textContent = 'New Element';
newElement.classList.add('box');

// 添加到DOM
parentElement.appendChild(newElement);
parentElement.insertBefore(newElement, referenceElement);

// 移除元素
parentElement.removeChild(childElement);
element.remove();  // 较新的方法
```

### 8.3 事件处理

```javascript
// 添加事件监听器
const button = document.querySelector('button');

button.addEventListener('click', function(event) {
  console.log('Button clicked!');
  console.log('Event:', event);
});

// 使用箭头函数
button.addEventListener('click', (event) => {
  console.log('Button clicked with arrow function!');
});

// 移除事件监听器
function handleClick(event) {
  console.log('Clicked!');
}

button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);

// 事件委托
document.getElementById('parent-list').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('List item clicked:', event.target.textContent);
  }
});

// 阻止默认行为
document.querySelector('a').addEventListener('click', function(event) {
  event.preventDefault();
  console.log('Link click prevented');
});

// 阻止事件冒泡
child.addEventListener('click', function(event) {
  event.stopPropagation();
  console.log('Child clicked, but event won\'t bubble up');
});
```

## 9. 错误处理

### 9.1 try-catch语句

```javascript
try {
  // 可能会抛出错误的代码
  const result = riskyOperation();
  console.log('Result:', result);
} catch (error) {
  // 处理错误
  console.error('An error occurred:', error.message);
} finally {
  // 无论是否有错误都会执行
  console.log('Cleanup operations');
}
```

### 9.2 抛出自定义错误

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

try {
  const result = divide(10, 0);
} catch (error) {
  console.error(error.message);  // 'Division by zero is not allowed'
}

// 自定义错误类型
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('Name is required');
  }
  if (!user.email) {
    throw new ValidationError('Email is required');
  }
}

try {
  validateUser({ name: 'John' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## 10. 现代JavaScript特性

### 10.1 解构赋值

```javascript
// 数组解构
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// 对象解构
const person = { name: 'John', age: 30, city: 'New York' };
const { name, age, city: location = 'Unknown' } = person;
console.log(name);     // 'John'
console.log(age);      // 30
console.log(location); // 'New York'

// 函数参数解构
function printPersonInfo({ name, age, city = 'Unknown' }) {
  console.log(`${name} is ${age} years old and lives in ${city}`);
}

printPersonInfo(person); // 'John is 30 years old and lives in New York'
```

### 10.2 展开运算符

```javascript
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// 复制数组
const original = [1, 2, 3];
const copy = [...original];

// 对象展开
const defaults = { theme: 'light', fontSize: 16 };
const userPrefs = { fontSize: 18 };
const settings = { ...defaults, ...userPrefs };  // { theme: 'light', fontSize: 18 }

// 函数参数
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));  // 15
```

### 10.3 可选链操作符

```javascript
const user = {
  name: 'John',
  address: {
    city: 'New York'
  }
};

// 传统方式
const city1 = user && user.address && user.address.city;

// 使用可选链
const city2 = user?.address?.city;
console.log(city2);  // 'New York'

const zipCode = user?.address?.zipCode;
console.log(zipCode);  // undefined

// 与方法调用一起使用
const result = user.getDetails?.();

// 与数组一起使用
const firstItem = array?.[0];
```

### 10.4 空值合并运算符

```javascript
// 传统方式
const name1 = user.name !== undefined && user.name !== null ? user.name : 'Anonymous';

// 使用空值合并运算符
const name2 = user.name ?? 'Anonymous';

// 与可选链结合使用
const city = user?.address?.city ?? 'Unknown';
```

## 11. 实用技巧与最佳实践

### 11.1 性能优化

```javascript
// 避免频繁DOM操作
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  fragment.appendChild(item);
}
document.getElementById('list').appendChild(fragment);

// 使用防抖函数
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedSearch = debounce(function(query) {
  console.log('Searching for:', query);
  // 执行搜索操作
}, 300);

// 使用节流函数
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const throttledScroll = throttle(function() {
  console.log('Scroll event throttled');
  // 执行滚动处理
}, 100);
```

### 11.2 代码组织

```javascript
// 模块模式
const calculator = (function() {
  // 私有变量和函数
  let result = 0;
  
  function validate(n) {
    return typeof n === 'number';
  }
  
  // 公共API
  return {
    add(n) {
      if (validate(n)) {
        result += n;
      }
      return this;
    },
    subtract(n) {
      if (validate(n)) {
        result -= n;
      }
      return this;
    },
    getResult() {
      return result;
    }
  };
})();

console.log(calculator.add(5).subtract(2).getResult());  // 3

// 工厂函数
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      return `Hello, my name is ${this.name}`;
    }
  };
}

const john = createPerson('John', 30);
console.log(john.greet());  // 'Hello, my name is John'
```

### 11.3 调试技巧

```javascript
// 使用console方法
console.log('Basic logging');
console.error('Error message');
console.warn('Warning message');
console.info('Informational message');

// 格式化输出
console.log('%cStyled text', 'color: red; font-size: 20px;');

// 表格输出
console.table([{ name: 'John', age: 30 }, { name: 'Alice', age: 25 }]);

// 分组输出
console.group('User Details');
console.log('Name: John');
console.log('Age: 30');
console.groupEnd();

// 计时
console.time('Operation');
// 执行一些操作
console.timeEnd('Operation');  // 'Operation: 1.23ms'

// 断言
console.assert(1 === 2, 'This will show an error');

// 堆栈跟踪
console.trace('Trace message');
```

## 12. 实际应用示例

### 12.1 表单验证

```javascript
const form = document.getElementById('registration-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', function(event) {
  let isValid = true;
  const errors = [];
  
  // 验证用户名
  if (username.value.trim() === '') {
    errors.push('用户名不能为空');
    isValid = false;
  } else if (username.value.length < 3) {
    errors.push('用户名至少需要3个字符');
    isValid = false;
  }
  
  // 验证邮箱
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errors.push('请输入有效的邮箱地址');
    isValid = false;
  }
  
  // 验证密码
  if (password.value.length < 8) {
    errors.push('密码至少需要8个字符');
    isValid = false;
  }
  
  if (!isValid) {
    event.preventDefault();  // 阻止表单提交
    displayErrors(errors);   // 显示错误信息
  }
});

function displayErrors(errors) {
  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = '';
  
  const errorList = document.createElement('ul');
  errors.forEach(error => {
    const errorItem = document.createElement('li');
    errorItem.textContent = error;
    errorList.appendChild(errorItem);
  });
  
  errorContainer.appendChild(errorList);
}
```

### 12.2 数据获取与显示

```javascript
// 使用Fetch API获取数据
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    displayError(error.message);
  }
}

function displayUsers(users) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  
  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    
    userCard.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Website:</strong> ${user.website}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
    `;
    
    userList.appendChild(userCard);
  });
}

function displayError(message) {
  const errorContainer = document.getElementById('error-container');
  errorContainer.textContent = `Error: ${message}`;
  errorContainer.style.display = 'block';
}

// 初始化
document.addEventListener('DOMContentLoaded', fetchUsers);
```

### 12.3 本地存储

```javascript
// 任务管理器应用
const taskManager = {
  tasks: [],
  
  
  // 初始化
  init() {
    this.loadTasks();
    this.renderTasks();
    this.setupEventListeners();
  },
  
  // 从localStorage加载任务
  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  },
  
  // 保存任务到localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  },
  
  // 添加新任务
  addTask(text) {
    if (text.trim() === '') return;
    
    const task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    
    this.tasks.push(task);
    this.saveTasks();
    this.renderTasks();
  },
  
  // 删除任务
  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
    this.renderTasks();
  },
  
  // 切换任务完成状态
  toggleTaskStatus(id) {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    
    this.saveTasks();
    this.renderTasks();
  },
  
  // 渲染任务列表
  renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    if (this.tasks.length === 0) {
      taskList.innerHTML = '<p>没有任务，请添加新任务</p>';
      return;
    }
    
    this.tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      if (task.completed) {
        taskItem.classList.add('completed');
      }
      
      taskItem.innerHTML = `
        <input type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
        <button class="delete-btn" data-id="${task.id}">删除</button>
      `;
      
      taskList.appendChild(taskItem);
    });
  },
  
  // 设置事件监听器
  setupEventListeners() {
    // 添加任务表单
    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', event => {
      event.preventDefault();
      const taskInput = document.getElementById('task-input');
      this.addTask(taskInput.value);
      taskInput.value = '';
    });
    
    // 任务列表事件委托
    const taskList = document.getElementById('task-list');
    taskList.addEventListener('click', event => {
      // 删除按钮
      if (event.target.classList.contains('delete-btn')) {
        const id = Number(event.target.dataset.id);
        this.deleteTask(id);
      }
      
      // 复选框
      if (event.target.type === 'checkbox') {
        const id = Number(event.target.dataset.id);
        this.toggleTaskStatus(id);
      }
    });
  }
};

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  taskManager.init();
});
```

## 总结

JavaScript是一门功能强大且灵活的编程语言，它是现代Web开发的核心。通过本文档，我们系统地介绍了JavaScript的基础知识和高级特性，包括基本语法、函数、对象与原型、数组与集合、异步编程、模块化、DOM操作、错误处理以及现代JavaScript特性等内容。

掌握这些知识点，将帮助你成为一名更加高效和专业的前端开发者。随着JavaScript生态系统的不断发展，持续学习和实践是提升技能的关键。

希望这份JavaScript基础指南对你的学习和工作有所帮助！