import {
	Pseudo3D
} from "/pseudo3dmin.js"
import {
	IO
} from "/IO.js"
import {
	scene1
} from "/scenes/scene1.js"
import {
	Textures
} from "/textures.js"
import {
	Player
} from "/player.js"
import {
	Animation
} from "/animation.js"
import {
	Projectile
} from "/projectile.js"

// holds all the game state related variables such as the player, enemies, npcs, the world data, etc.
var Game = {
	player: new Player(scene1, 1.5, 1.5),
	currentScene: scene1,
	deltaTime: 0,
};

// initialize function
Game.init = function() {

};

let previousFrameTime = 0;
let projectiles = [];
let shotProjectile = false;
let timeShot = 0;

// main update loop
Game.update = function() {
	requestAnimationFrame(Game.update);

	Game.deltaTime = (performance.now() - previousFrameTime) / 1000;
	previousFrameTime = performance.now();

	Game.player.move(Game.deltaTime);
	IO.screen.clear();
	Pseudo3D.Renderer.render(IO.screen, Game.currentScene, Game.player.camera);
	IO.screen.update();

	let playerSpeed = 5000 * Game.player.velocity.getMagSqr();

	if (playerSpeed > 15) playerSpeed = 15;

	IO.screen.drawingContext.drawImage(Textures.rightHand.htmlImageElement, 160, 100 + 2 * Math.sin(previousFrameTime / 100) * playerSpeed / 5, 75, 75);

	IO.screen.drawingContext.drawImage(Textures.leftHand.htmlImageElement, 0, 100 + 2 * Math.sin(previousFrameTime / 100) * playerSpeed / 5, 65, 65);

	IO.screen.setPixels();

	for (var i = projectiles.length - 1; i >= 0; i--) {
		projectiles[i].update(Game.deltaTime);
		// if(projectiles[i].hit == true) {
		// 	Game.currentScene.remove(projectiles[i].renderEntity);
		// 	projectiles.splice(i, 1);
		// }
	}

	if (shotProjectile) {
		let timeSinceShot = (previousFrameTime - timeShot) / 1000;
		if (timeSinceShot < Game.player.fireInterval) {
			Game.player.camera.lighting.brightness = 0.7 + 0.4 * Math.sin(timeSinceShot / Game.player.fireInterval * Math.PI);
		} else {
			shotProjectile = false;
		}
	}

};

setInterval(function() {
	if (!IO.mouseIsDown) return;
	shotProjectile = true;
	timeShot = previousFrameTime;
	let projectile = new Projectile({
		position: Game.player.orientation.position.clone(),
		velocity: Game.player.orientation.direction.clone().scale(5),
		movingAnimation: new Animation({
			frameArray: [Textures.fireBall1, Textures.fireBall2],
			repeat: true,
			animationTime: 0.25,
		}),
		hitAnimation: new Animation({
			frameArray: [
				Textures.fbA2,
				Textures.fbA3,
				Textures.fbA4,
				Textures.fbA5,
				Textures.fbA6
			],
			repeat: false,
			animationTime: 0.2,
		})
	});

	projectile.movingAnimation.onNewFrame = function(frame) {
		projectile.renderEntity.appearance = frame;
	};

	projectile.hitAnimation.onNewFrame = function(frame) {
		projectile.renderEntity.appearance = frame;
	};

	projectile.hitAnimation.addFrameEvent(0, function() {
		projectile.renderEntity.size.x = 0.6;
		projectile.renderEntity.size.y = 0.6;
		projectile.renderEntity.orientation.position.z = 0.1;
	});

	projectile.hitAnimation.addFrameEvent(4, function() {
		Game.currentScene.remove(projectile.renderEntity);
		projectiles.splice(projectiles.indexOf(projectile), 1);
	});

	console.log(projectile);

	projectiles.push(projectile);
}, Game.player.fireInterval * 1000);

Game.update();
window.Game = Game;

export {
	Game
};