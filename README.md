qfunc
==============

Queue a number of async functions which get executed sequentially.

Example:
```js
const { Queue } = require('qfunc');

const queue = new Queue();

queue.enqueue(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('A');
});

queue.enqueue(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('B');
});
```

Output:

```
A
B
```

Enqueue any number of functions in a FIFO queue and they will run sequentially, awaiting the completion of each before starting the next.

This is useful when you want to asyncronously add functions to a queue without woring that they will execute in the order in which they were added.

You can see the depth of the queue by reading `queue.length()` like this:

```js
const { Queue } = require('qfunc');

const queue = new Queue();

queue.enqueue(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('A');
});

queue.enqueue(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('B');
});

console.log(queue.length());
```
In the above example, the queue length will be `1` because the first function will already have been dequeued and started leaving only one function on the queue.

You can also read `isEmpty()` which returns a boolean:

```js
const { Queue } = require('qfunc');

const queue = new Queue();

queue.enqueue(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('A');
});

queue.enqueue(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('B');
});

console.log(queue.isEmpty());
```

The above example results in `false` because the queue is not empty.

The implementation is super simple and far fewer lines than even this `README.md`. See what I mean by looking here: https://github.com/anders94/qfunc/blob/main/lib/index.js

Here's a more expressive example that uses an interval to continually show the length of the queue and prove that things operate in order:

```js
const { Queue } = require('qfunc');

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const queue = new Queue();

const i = setInterval(() => console.log(queue.length()), 250);

console.log('queue 1');
queue.enqueue(async () => {
    console.log('start 1');
    await timeout(1000);
    console.log('end 1');
});

console.log('queue 2');
queue.enqueue(async () => {
    console.log('start 2');
    await timeout(1000);
    console.log('end 2');
});

setTimeout(() => {
    console.log('queue 3');
    queue.enqueue(async () => {
	console.log('start 3');
	await timeout(1000);
	console.log('end 3');
	clearInterval(i);
    }, 1100);
});
```

Output:
```
queue 1
start 1
queue 2
queue 3
2
2
2
end 1
start 2
1
1
1
1
end 2
start 3
0
0
0
0
end 3
```

License
-------
MIT
