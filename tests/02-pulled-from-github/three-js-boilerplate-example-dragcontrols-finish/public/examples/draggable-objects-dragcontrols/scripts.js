
// created a scene
var scene = new THREE.Scene();
// gave background color
scene.background = new THREE.Color(0xf0f0f0);
// set camera
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
// made array objects
var objects = [];

// set up renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// created canvas element
document.body.appendChild(renderer.domElement);

// put camera position
camera.position.z = 1000;

// made global array
var startColor;

function init() {
	// added lights
	scene.add(new THREE.AmbientLight(0x0f0f0f));

	var light = new THREE.SpotLight(0xffffff, 1.5);
	light.position.set(0, 500, 2000);

	scene.add(light);

	// added the objectjes
	// radius, width , height
	var geometry = new THREE.BoxGeometry(40, 40, 40);
	var geometry = new THREE.SphereGeometry(40, 40, 20);


	// create objects a 100 times
	for (var i = 0; i < 100; i++) {
		// put texture on top
		var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

		// positions objects randomly on x-axis, y-axis and z-axis
		object.position.x = Math.random() * 1000 - 500;
		object.position.y = Math.random() * 600 - 300;
		object.position.z = Math.random() * 800 - 400;

		// to put shadow on top
		object.castShadow = true;
		object.receiveShadow = true;

		// to put the objects on the scene
		scene.add(object);

		// push each object into the array objects
		objects.push(object);
		// console.log(objects);
	}

	// no idea
	var controls = new THREE.DragControls(objects, camera, renderer.domElement);
	controls.addEventListener('dragstart', dragStartCallback);
	controls.addEventListener('dragend', dragendCallback);
}

function dragStartCallback(event) {
	startColor = event.object.material.color.getHex();
	event.object.material.color.setHex(0x000000);
}

function dragendCallback(event) {
	event.object.material.color.setHex(startColor);
}

// makes the whole thing reload 60fps
function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
};

init();
animate();