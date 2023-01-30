qify
==============

Pronounced "queue if eye".

Queue a number of async functions which get executed sequentially.

Example:
```
const { Queue } = require('qify');

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

```
const { Queue } = require('qify');

const queue = new Queue();

queue.enqueue(async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('A');
});

queue.enqueue(async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('B');
});

queue.length();
```
In the above example, the queue length will be `1` because the first function will already have been dequeued and started leaving only one function on the queue.

You can also read `isEmpty()` which returns a boolean:

```
const { Queue } = require('qify');

const queue = new Queue();

queue.enqueue(async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('A');
});

queue.enqueue(async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('B');
});

queue.isEmpty();
```

The above example results in `false`.

The implementation is super simple and far fewer lines than even this `README.md`.
