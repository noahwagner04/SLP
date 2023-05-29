class Projectile {
	constructor(posX, posY, velX, velY) {
		this.position = new Pseudo3D.Vector(posX, posY);
		this.velocity = new Pseudo3D.Vector(velX, velY);
	}

	update(deltaTime) {
		this.position.add(this.velocity.clone().scale(deltaTime));

		// check if we collide with wall

		// play an explosion animation if we do, and stop moving the projectile
			// set a timeout function that destroys this projectile after a certain amount of time
	}

}