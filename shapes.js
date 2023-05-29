import {
	Pseudo3D
} from "/pseudo3dmin.js"

class Rectangle {
	constructor(position, width, height) {
		this.position = position;
		this.width = width;
		this.height = height;
	}
}

class Circle {
	constructor(position, radius) {
		this.position = position;
		this.radius = radius;
	}
}

export { Rectangle, Circle };