import {
	Pseudo3D
} from "/pseudo3dmin.js"
import {
	Rectangle,
	Circle
} from "/shapes.js"
import { Game } from "/game.js"

// this object stores various handy collision check functions between pirimitive shapes
var Collision = {};

Collision.rectToRect = function(rect1, rect2) {
	if (rect1.position.x + rect1.width >= rect2.position.x && // r1 right edge past r2 left
		rect1.position.x <= rect2.position.x + rect2.with && // r1 left edge past r2 right
		rect1.position.y + rect1.h >= rect2.position.y && // r1 top edge past r2 bottom
		rect1.position.y <= rect2.position.y + rect2.with) { // r1 bottom edge past r2 top
		return true;
	}
	return false;
};

Collision.rectToCircle = function(rect, circle) {
	let circleDist = new Pseudo3D.Vector(
		Math.abs(circle.x - rect.x + rect.width / 2),
		Math.abs(circle.y - rect.y - rect.height / 2)
	);

	if (circleDist.x > (rect.width / 2 + circle.r)) {
		return false;
	}
	if (circleDist.y > (rect.height / 2 + circle.r)) {
		return false;
	}

	if (circleDist.x <= (rect.width / 2)) {
		return true;
	}
	if (circleDist.y <= (rect.height / 2)) {
		return true;
	}

	cornerDistance_sq = (circleDist.x - rect.width / 2) ** 2 +
		(circleDist.y - rect.height / 2) ** 2;

	return (cornerDistance_sq <= (circle.r ** 2));
};

Collision.circleToCircle = function(circle1, circle2) {
	let collisionDist = circle1.radius + circle2.radius;
	if(circle1.position.getDistBtw(circle2.position) > collisionDist) {
		return false;
	}
	return true;
};

Collision.checkInWall = function(position) {
	let mapPosX = Math.floor(position.x);
	let mapPosY = Math.floor(position.y);

	return Game.currentScene.worldMap.data[mapPosX + mapPosY * Game.currentScene.worldMap.width] === 0 ? false : true;
};

export { Collision };