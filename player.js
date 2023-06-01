import {
	Pseudo3D
} from "/pseudo3dmin.js"
import {
	IO
} from "/IO.js"

class Player {
	constructor(scene, x, y) {

		this.scene = scene;

		this.camera = new Pseudo3D.Camera({
			position: {
				x: x,
				y: y,
			},
			direction: {
				x: 0,
				y: 1,
			},
			focalLength: 1,
			pitch: 0,
			lighting: {
				brightness: 0.7,
				maxBrightness: 1.3,
				color: new Pseudo3D.Color(250, 230, 200, 255),
			},
		});

		this.orientation = this.camera.orientation;

		this.fireInterval = 0.25;

		this.maxSpeed = 4.5;
		this.accSpeed = 50;
		this.friction = 17.5;

		this.collisionCheckDist = 0.3;

		this.headBobVal = 0.5;
		this.headBobHeight = 0.032;
		this.headBobSpeed = 12;

		this.headBobOffset = 0;

		this.accelerationX = 0;
		this.accelerationY = 0;

		this.velocityXLocal = 0;
		this.velocityYLocal = 0;

		this.velocity = new Pseudo3D.Vector(0, 0);
	}

	move(deltaTime) {
		this.accelerationX = 0;
		this.accelerationY = 0;

		if (IO.keysDown["a"]) {
			this.accelerationX -= this.accSpeed;
		}
		if (IO.keysDown["d"]) {
			this.accelerationX += this.accSpeed;
		}
		if (IO.keysDown["w"]) {
			this.accelerationY += this.accSpeed;
		}
		if (IO.keysDown["s"]) {
			this.accelerationY -= this.accSpeed;
		}

		if (this.accelerationY || this.accelerationX) {
			this.headBobOffset += this.headBobSpeed * deltaTime;
		} else {
			this.headBobOffset -= Math.cos(this.headBobOffset) * deltaTime * 10;
		}

		this.headBobVal = Math.sin(this.headBobOffset) * this.headBobHeight;


		// forward calculations
		if (this.velocityYLocal !== 0) {
			this.velocityYLocal -= (this.velocityYLocal / Math.abs(this.velocityYLocal)) * this.friction * deltaTime;
		}

		if (Math.abs(this.velocityYLocal) >= this.maxSpeed) {
			this.accelerationY = 0;
		}

		this.velocityYLocal += this.accelerationY * deltaTime;

		if (Math.abs(this.velocityYLocal * deltaTime) < deltaTime * 0.3) {
			this.velocityYLocal = 0;
		}

		let velocityYGlobal = this.camera.orientation.direction.clone().normalize().scale(this.velocityYLocal * deltaTime);

		// side calculations
		if (this.velocityXLocal !== 0) {
			this.velocityXLocal -= (this.velocityXLocal / Math.abs(this.velocityXLocal)) * this.friction * deltaTime;
		}

		if (Math.abs(this.velocityXLocal) >= this.maxSpeed) {
			this.accelerationX = 0;
		}

		this.velocityXLocal += this.accelerationX * deltaTime;

		if (Math.abs(this.velocityXLocal * deltaTime) < deltaTime * 0.3) {
			this.velocityXLocal = 0;
		}

		let velocityXGlobal = this.camera.plane.clone().normalize().scale(this.velocityXLocal * deltaTime);

		this.velocity = velocityYGlobal.add(velocityXGlobal);

		if (this.velocity.getMag() > this.maxSpeed * deltaTime) this.velocity.setMag(this.maxSpeed * deltaTime);

		this.camera.orientation.position.z = this.headBobVal + 0.5 + this.headBobHeight;

		// temporary variables to make following collision code shorter
		let camX = this.camera.orientation.position.x;
		let camY = this.camera.orientation.position.y;

		let worldWidth = this.scene.worldMap.width;

		let xCheck = this.velocity.x / Math.abs(this.velocity.x) * this.collisionCheckDist;
		let yCheck = this.velocity.y / Math.abs(this.velocity.y) * this.collisionCheckDist;

		// collision detection
		if (this.scene.worldMap.data[Math.floor(camX + xCheck) + Math.floor(camY) * worldWidth] == 0) {
			this.camera.orientation.position.x += this.velocity.x;
		}
		if (this.scene.worldMap.data[Math.floor(camX) + Math.floor(camY + yCheck) * worldWidth] == 0) {
			this.camera.orientation.position.y += this.velocity.y;
		}
	}
}

export {
	Player
};