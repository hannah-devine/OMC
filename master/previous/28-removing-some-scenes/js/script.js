

import { createTypo } from "./functions/createTypo.js";
import { createBoxes } from "./functions/createBoxes.js";



{

    const farDist = 10000;

    //SETTING UP 3D SCENERY
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const colors = [`#e5e5e5`, `#FFE1DB`, `#DBFFE0`, `#9DFFFB`, `#95A7F9`, `#F7C767`, `#fceab8`];

    renderer.setClearColor(colors[Math.floor(Math.random() * colors.length)]);

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


    // .Raycasting is used for mouse picking(working out what objects in the 3d space the mouse is over) amongst other things.
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    //ARRAY POSSIBLE MATERIALS FOR TEXT
    const materials = [new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }), new THREE.MeshNormalMaterial(), new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })];
    const material = materials[Math.floor(Math.random() * materials.length)];

    console.log(material);
    //ARRAY POSSIBLE GEOMETRIES
    const geometries = [new THREE.BoxBufferGeometry(10, 10, 10), new THREE.BoxBufferGeometry(30, 30, 30), new THREE.TorusKnotGeometry(10, 3, 100, 16), new THREE.ConeBufferGeometry(15, 40, 62), new THREE.CylinderBufferGeometry(15, 15, 50, 62), new THREE.DodecahedronBufferGeometry(4, 4), new THREE.CircleGeometry(50, 32), new THREE.TetrahedronBufferGeometry(15, 15), new THREE.TorusBufferGeometry(10, 3, 16, 100), new THREE.OctahedronBufferGeometry(3, 3)];
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];



    // NAAM OPVANGEN EN 3D renderen
    const textMesh = new THREE.Mesh();
    let test;
    let nameForm;
    const handleSubmitForm = e => {
        e.preventDefault();

        // let material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        test = createBoxes(geometry, farDist)
        console.log(test);
        scene.add(test);
        nameForm = document.querySelector(`.firstname`).value;


        const loader = new THREE.FontLoader();
        loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
            createTypo(font, nameForm, textMesh, material);
        });


    }
    scene.add(textMesh);


    function onMouseMove(event) {
        event.preventDefault();

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        // this will return an array based on objects that have been intersected with where the mouse in the scene
        let intersects = raycaster.intersectObjects(scene.children, true);
        console.log(intersects);

        for (let i = 0; i < intersects.length; i++) {
            this.tl = new TimelineMax();
            console.log(tl);

            this.tl.to(intersects[i].object.scale, 0.2, { x: 2, ease: Expo.easeOut });
            this.tl.to(intersects[i].object.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
            this.tl.to(intersects[i].object.position, 0.5, { x: 2, ease: Expo.easeOut });
            // animation happens -1.5 secon\ds ahead before it normally would
            this.tl.to(intersects[i].object.rotation, 1, { y: Math.PI * 0.5, ease: Expo.easeOut }, "=-1.5");
        }


        // how to get mouse coordinate
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    }

    const animate = () => {

        requestAnimationFrame(animate);
        // console.log(test);
        console.log(scene);
        scene.children[0].rotation.x += 5
        scene.rotation.x -= 0.00090;
        scene.rotation.y += 0.00090;
        renderer.render(scene, camera);


    }






    // als nameForm leeg is dan clear ik het canvas
    // if (nameForm !== ``) {
    //     while (scene.children.length > 0) {
    //         scene.remove.apply(scene, scene.children);
    //     }
    // }

    // na iedere handlesubmit form, nee want dan verschijnt er niks op mijn scherm,
    // je moet uw naam kunnne ingeven, er moet een scene gemaakt worden en dan als men opnieuw 
    // submit mag het pas leeggemaakt worden!


    const init = () => {
        animate();

        const $form = document.querySelector(`.form-name`);
        $form.addEventListener(`submit`, handleSubmitForm);
        window.addEventListener('mousemove', onMouseMove);


    }




    init();


}

