import { Pseudo3D } from "/pseudo3dmin.js"
import { IO } from "/IO.js"
import { scene1 } from "/scenes/scene1.js"
import { Textures } from "/textures.js"
import { Player } from "/player.js"
import { Animation } from "/animation.js"

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

	if(playerSpeed > 15) playerSpeed = 15;

	IO.screen.drawingContext.drawImage(Textures.rightHand.htmlImageElement, 160, 100 + 2 * Math.sin(previousFrameTime/100)*playerSpeed/5, 75, 75);

	IO.screen.drawingContext.drawImage(Textures.leftHand.htmlImageElement, 0, 100 + 2 * Math.sin(previousFrameTime/100)*playerSpeed/5, 65, 65);

	IO.screen.setPixels();
};

Game.update();

function test(a, b, c) {
	let d = a + b + c;
	console.log(d);
}

window.animation = new Animation({
	frameArray: [0, 1, 2, 3, 4, 5],
	repeat: true,
	animationTime: 6
});

animation.addFrameEvent(0, test, 1, 2, 3);
animation.addFrameEvent(1, () => console.log(animation.getFrame()));
animation.addFrameEvent(2, () => console.log(animation.getFrame()));
let id = animation.addFrameEvent(3, () => console.log(animation.getFrame()));
animation.addFrameEvent(4, () => console.log(animation.getFrame()));
animation.addFrameEvent(5, () => {
	animation.stop();
	animation.removeFrameEvent(id);
});
animation.play();

export { Game };