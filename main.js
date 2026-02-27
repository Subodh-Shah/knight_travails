class Queue {
	constructor() {
		this.queue = [];
	}
	
	enqueue(node) {
		this.queue.push(node);
	}
	
	dequeue() {
		return this.queue.shift();
	}
	
	size() {
		return this.queue.length;
	}
}

class Node {
	//coordinates as array and parent as another node object or null for start position
	constructor(coordinates, parent = null) {
		this.coordinates = coordinates;
		this.parent = parent;
	}
}

function buildPath(node) {
	let path = [];
	while(node !== null) {
		path.unshift(node.coordinates);
		node = node.parent;
	}
	return path;
}

function knightMoves(x, y) {
	let moves = [[1,2], [1,-2], [-1,2], [-1,-2], 
				 [2,1], [2,-1], [-2,1], [-2,-1]];
	return moves.map(([dx, dy]) => [x + dx, y + dy])
				.filter(([newX, newY]) => newX>=0 && newX<8 && newY>=0 && newY<8);
}

function knightTravails(start, destination) {
	if(start[0]<0 || start[0]>7 || start[1]<0 || start[1]>7 || destination[0]<0 || destination[0]>7 || destination[1]<0 || destination[1]>7) {
		alert("Insert clear start and destination in the board");
		return;
	}
	let queue = new Queue();
	let visited = Array(8).fill().map(() => Array(8).fill(false));
	let startNode = new Node(start);
	queue.enqueue(startNode);
	visited[startNode.coordinates[0]][startNode.coordinates[1]] = true;
	
	while(queue.size() > 0) {
		let current = queue.dequeue();
		if(current.coordinates[0] === destination[0] &&
		current.coordinates[1] === destination[1]) {
			return buildPath(current);
		}
		
		let nextMoves = knightMoves(current.coordinates[0], current.coordinates[1]);
		for (let position of nextMoves) {
			let possibleNextNode = new Node(position, current);
			if(visited[possibleNextNode.coordinates[0]]
				[possibleNextNode.coordinates[1]] === false) {
						  queue.enqueue(possibleNextNode);
						  visited[possibleNextNode.coordinates[0]]
								[possibleNextNode.coordinates[1]] = true;
			}
		}
	}
}

let knightPath = knightTravails([1,9], [0,3]);

if(knightPath) {
	console.log(knightPath);
	let knigthPathString = '';
	knightPath.forEach((position, index) => {
		if(index !== knightPath.length - 1) {
			knigthPathString += `[${position}] -> `;
		} else {
			knigthPathString += `[${position}]`;
		}
	});
	console.log(knigthPathString);
}