import { Pseudo3D } from "/pseudo3dmin.js"

let Textures = {};

Textures.redbrick = new Pseudo3D.Texture({
	path: "/assets/redbrick.png",
});

Textures.eagle = new Pseudo3D.Texture({
	path: "/assets/eagle.png"
});

Textures.mossy = new Pseudo3D.Texture({
	path: "/assets/mossy.png"
});

Textures.wood = new Pseudo3D.Texture({
	path: "/assets/wood.png",
});

Textures.blueStone = new Pseudo3D.Texture({
	path: "/assets/blueStone.png",
});

Textures.greyStone = new Pseudo3D.Texture({
	path: "/assets/greystone.png",
});

Textures.barrel = new Pseudo3D.Texture({
	path: "/assets/barrel.png",
});

Textures.skybox = new Pseudo3D.Texture({
	path: "/assets/skyBoxTest.png",
	height: 400,
	width: 1200
});

Textures.rightHand = new Pseudo3D.Texture({
	path: "/assets/rightHand.png",
});

Textures.leftHand = new Pseudo3D.Texture({
	path: "/assets/leftHand.png",
});

Textures.groundTexture = new Pseudo3D.Texture({
	path: "/assets/groundTexture.jpeg",
	height: 128,
	width: 128
});

Textures.tree = new Pseudo3D.Texture({
	path: "/assets/tree.png",
});

export { Textures };