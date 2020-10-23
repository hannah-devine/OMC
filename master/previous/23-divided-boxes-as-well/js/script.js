

import { createTypo } from "./functions/createTypo.js";
import { creatingBoxes } from "./functions/creatingBoxes.js";


{
    //SETTING UP 3D SCENERY
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#e5e5e5");
    // en hiermee maken we een canvas aan in ons HTML
    document.body.appendChild(renderer.domElement);

    //LIGHTS
    const ambientLight = new THREE.AmbientLight(0x0f0f0f);
    scene.add(ambientLight);
    let light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);
    scene.add(light);

    // CAMERA
    camera.position.z = 800;
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();




    let material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });




    scene.add(creatingBoxes());







    // NAAM OPVANGEN EN 3D renderen
    const textMesh = new THREE.Mesh();
    let nameForm;
    const handleSubmitForm = e => {
        e.preventDefault();
        nameForm = document.querySelector(`.firstname`).value;
        console.log(nameForm);
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

