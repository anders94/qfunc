module.exports =
    class Queue {
	constructor() {
	    this.todo = [];
	    this.running = false;
	}
	enqueue = async (f) => {
	    this.todo.push(f);
	    await this.run();
	}
	dequeue = () => this.todo.shift();
	isEmpty = () => this.todo.length == 0;
	length = () => this.todo.length;
	run = async () => {
	    if (!this.running) {
		this.running = true;
		while (!this.isEmpty())
		    await this.dequeue()();
		this.running = false;
	    }
	};
    };
