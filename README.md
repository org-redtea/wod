# Wod

[![npm](https://img.shields.io/npm/v/@redtea/wod.svg)](https://www.npmjs.com/package/@redtea/wod)
[![Travis](https://img.shields.io/travis/org-redtea/wod.svg)](https://travis-ci.org/org-redtea/wod)

Allows execute any function in web worker

## Install
```bash
$ npm install --save @redtea/wod
```

## Usage
```JS
import { Wod, useThread } from "@redtea/wod"
// or
// const wod = require("@redtea/wod");
// or
// in html <script src="https://unpkg.com/@redtea/intervals"></script>
// <script>var T1 = new Wod.Wod();</script>

// create instance of worker
const Worker1 = new Wod(); // or Wod.spawn()
const listener = (event) => console.log(event.data);
const errorListener = (event) => console.log(event.message);

// subscribe to any message from Worker1
Worker1.on('message', listener);

// will output 'Message from Worker1' to console
Worker1.exec(() => postMessage('Message from Worker1'));

// Using decorator

// wrap any function with decorator
let decoratedFunction = useThread(Worker1)(() => postMessage('Message from Worker1'));

// call it
// print the same message to console as above
decoratedFunction();

// if you use typescript:
// @useThread(Worker1) () => postMessage('Message from Worker1');

// catching errors

// subscribe to any error
Worker1.on('error', errorListener);

// will print error message
Worker1.exec(() => throw 'Error from worker1');

// off event listener
Worker1.off('message', listener);
Worker1.off('error', errorListener);

// terminate the worker
Worker1.terminate();
```

## Wod instance

#### Wod.on(*event*: `string`, *listener*: `function`): `void`

Subscribe to event. Currently supported: `message`, `error`.

#### Wod.off(*event*: `string`, *listener*: `function`): `void`

Unsubscribe from event.

#### exec(*prog*: `function`[, *args*: `any[]`])

Execute *prog* in web worker thread. Optional *args* will be passed to prog as arguments.
```JS
// print 6
Worker.exec((a, b, c) => console.log(a + b + c), [1, 2, 3]);
```

## Decorator

#### useThread(*thread*: `Wod`)(*prog*: `function`): `function`

Create the decorator over *prog*. The decorator execute *prog* in the web worker when call.
