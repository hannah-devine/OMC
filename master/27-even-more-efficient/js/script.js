

import { createTypo } from "./functions/createTypo.js";
import { createBoxes } from "./functions/createBoxes.js";
import { createKnots } from "./functions/createKnots.js";
import { createBoxesRectangle } from "./functions/createBoxesRectangle.js";


{
    //SETTING UP 3D SCENERY
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const colors = [`#e5e5e5`, `#FFE1DB`, `#DBFFE0`, `#9DFFFB`, `#95A7F9`, `#F7C767`, `#D64619`];
    renderer.setClearColor(colors[Math.floor(Math.random() * colors.length)]);

    // en hiermee maken we een canvas aan in ons HTML
    document.body.appendChild(renderer.domElement);

    //LIGHTS
    const ambientLight = new THREE.AmbientLight(0x0f0f0f);
    scene.add(ambientLight);
    let light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);
    scene.add(light);

    // CAMERa
    camera.position.z = 800;
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();


    // .Raycasting is used for mouse picking(working out what objects in the 3d space the mouse is over) amongst other things.
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    const colorWire = '#18FFFF'; // blue

    //ARRAY POSSIBLE MATERIALS FOR TEXT
    const materials = [new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }), new THREE.MeshNormalMaterial(), new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })];
    const material = materials[Math.floor(Math.random() * materials.length)];

    console.log(material);
    //ARRAY POSSIBLE GEOMETRIES
    const geometries = [new THREE.BoxBufferGeometry(10, 10, 10), new THREE.BoxBufferGeometry(40, 60, 40), new THREE.TorusKnotGeometry(10, 3, 100, 16), new THREE.ConeBufferGeometry(15, 40, 62), new THREE.CylinderBufferGeometry(15, 15, 80, 62), new THREE.DodecahedronBufferGeometry(4, 4)];
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];



    // NAAM OPVANGEN EN 3D renderen
    const textMesh = new THREE.Mesh();
    let nameForm;
    const handleSubmitForm = e => {
        e.preventDefault();

        // let material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        scene.add(createBoxes(geometry));

        nameForm = document.querySelector(`.firstname`).value;

        const loader = new THREE.FontLoader();
        loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
            createTypo(font, nameForm, textMesh, material);
        });
    }
    scene.add(textMesh);


    const animate = () => {
        requestAnimationFrame(animate);



        renderer.render(scene, camera);


    }





    const init = () => {
        animate();

        const $form = document.querySelector(`.form-name`);
        $form.addEventListener(`submit`, handleSubmitForm);


    }




    init();


}

