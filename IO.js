import { Pseudo3D } from "/pseudo3dmin.js"
import { Game } from "/game.js"

// stores input output related variables such as the screen, keyboard state, mouse positions, etc.
let IO = {
	screen: new Pseudo3D.Screen(300, 200, 0.75),
	keysDown: [],
	mouseX: 0,
	mouseY: 0,
};

// just attach the screen to the body for now
IO.screen.setParent(document.body);

window.addEventListener("keydown", (e) => {
	IO.keysDown[e.key] = true;
});

window.addEventListener("keyup", (e) => {
	delete IO.keysDown[e.key];
});

IO.screen.htmlCanvasElement.onclick = function() {
	IO.screen.htmlCanvasElement.requestPointerLock();
};

IO.screen.htmlCanvasElement.addEventListener("mousemove", (e) => {
	IO.mouseX += e.movementX;
	IO.mouseY += e.movementY;

	var angle = Pseudo3D.Math.remap(IO.mouseX, 0, IO.screen.width, -Math.PI / 8, Math.PI / 8);
	Game.player.camera.setRotation(angle);
	Game.player.camera.pitch = (IO.screen.height / 2 - IO.mouseY) * 0.5;
});

export { IO };