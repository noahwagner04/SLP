import { Collision } from "/collision.js"
import { Animation } from "/animation.js"
import { Pseudo3D } from "/pseudo3dmin.js"
import { Textures } from "/textures.js"
import { Game } from "/game.js"

class Projectile {
	constructor(config) {
		this.position = config.position;
		this.velocity = config.velocity;

		this.movingAnimation = config.movingAnimation;
		this.hitAnimation = config.hitAnimation;

		this.movingAnimation.play();
		this.hit = false;

		this.renderEntity = new Pseudo3D.Entity({
			appearance: Textures.barrel
		});
		Game.currentScene.add("entity", this.renderEntity);
		this.renderEntity.orientation.position = this.position;
		this.renderEntity.size.x = 0.5;
		this.renderEntity.size.y = 0.5;

		this.renderEntity.orientation.position.z = 0.25;
	}

	update(deltaTime) {
		// check if we collide with wall
		if(!Collision.checkInWall(this.position)) {
			this.position.add(this.velocity.clone().scale(deltaTime));
		} else if(this.hit == false) {
			this.velocity = new Pseudo3D.Vector(0, 0);
			this.movingAnimation.stop();
			this.hitAnimation.play();
			this.hit = true;
		}
	}

}

export { Projectile };