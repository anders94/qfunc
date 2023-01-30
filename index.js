const { Queue } = require('./lib/');

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
