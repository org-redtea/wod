# Wod

[![npm](https://img.shields.io/npm/v/@redtea/wod.svg)](https://www.npmjs.com/package/@redtea/wod)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@redtea/wod.svg)](https://www.npmjs.com/package/@redtea/wod)
[![npm type definitions](https://img.shields.io/npm/types/@redtea/wod.svg)](https://www.npmjs.com/package/@redtea/wod)
[![Travis](https://img.shields.io/travis/org-redtea/wod.svg)](https://travis-ci.org/org-redtea/wod)
[![npm](https://img.shields.io/npm/l/@redtea/wod.svg)](https://www.npmjs.com/package/@redtea/wod)
[![GitHub stars](https://img.shields.io/github/stars/org-redtea/wod.svg?style=social&label=Stars)](https://github.com/org-redtea/wod)

## Introduction

Wod is a library that provide the ability to spawn the web worker instance and execute any functions into it.

## Install
```bash
$ npm install --save @redtea/wod
```

## Usage


Package supports ES6, UMD module systems.


ES6
```JS
import { Wod, useThread } from "@redtea/wod"
```

Commonjs
```JS
const wod = require("@redtea/wod");
```

HTML
```HTML
<script src="https://unpkg.com/@redtea/wod"></script>
<script>var T1 = new Wod.Wod();</script>
```

Examples
```JS
// Create a instance of Wod. It also spawn a new web worker instance
const Worker_1 = new Wod(); // or Wod.spawn()

// Define event listeners
const listener = (event) => console.log(event.data);
const errorListener = (event) => console.log(event.message);

// Subscribe to any message from the Worker_1 thread
// The same as WebWorker.onmessage = function() {} 
Worker_1.on('message', listener);

// Subscribe to any errors that may occure in the Worker_1 thread
// The same as WebWorker.onerror = function() {} 
Worker_1.on('error', errorListener);

// This line execute the function in the Worker_1 thread context and post the 
// message to the Main thread. As result, message 'Message from Worker_1'
// will output to console of the Main thread
Worker_1.exec(() => postMessage('Message from Worker_1'));

// Using decorator

// Create a decorator that execute the function in the Worker_1 thread
let sayHelloToTheMainThread = useThread(Worker_1)(() => postMessage('Hello from Worker1'));

// This will print 'Hello from Worker1' to console of the Main thread
sayHelloToTheMainThread();

// Catching errors

// As we was subscribe to any error event from the Worker_1 above
// this will print the error message to the Main thread's console
Worker_1.exec(() => throw 'Error from Worker_1');

// Off event listener
Worker_1.off('message', listener);
Worker_1.off('error', errorListener);

// Terminate the worker
Worker_1.terminate();
```

## Wod

#### Wod.on(*event*: `string`, *listener*: `function`): `void`

Subscribe to *event*. Currently supported: `message`, `error`.

#### Wod.off(*event*: `string`, *listener*: `function`): `void`

Unsubscribe from *event*.

#### Wod.exec(*prog*: `function`[, *args*: `any[]`]): `void`

Execute *prog* in web worker thread. Optional *args* will be passed to *prog* as arguments.
```JS
// print 6
Worker.exec((a, b, c) => console.log(a + b + c), [1, 2, 3]);
```

#### Wod.terminate(): `void`

Terminate the web worker.


## Decorator

#### useThread(*thread*: `Wod`)(*prog*: `function`): `function`

Creates a decorator over *prog*. Each call of the decorator execute *prog* in the web worker context that *thread* bound to.

```JS

const wrapped = useThread(WodInstance)(function(arg) { postMessage(arg); });

wrapped('hello');
```
