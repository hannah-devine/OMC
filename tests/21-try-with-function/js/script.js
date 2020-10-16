
import { makeMesh } from "./Makemesh.js";


{
    const farDist = 10000;

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





    let material = new THREE.MeshNormalMaterial();


    const group = new THREE.Group();
    // let cubes;
    for (let index = 0; index < 100; index++) {

        let material = new THREE.MeshNormalMaterial();
        let geometry = new THREE.BoxGeometry(10, 10, 10);
        const farDist = 10000;
        let cubes = makeMesh(geometry, material, farDist);

        console.log(cubes);
        group.add(cubes);
    }
    scene.add(group);



    // CAMERA VERANDEREN MET ORBIT
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();


    // let material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });


    let nameForm;
    const handleSubmitForm = e => {
        e.preventDefault();

        nameForm = document.querySelector(`.firstname`).value;
        console.log(nameForm);



        const loader = new THREE.FontLoader();
        loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
            createTypo(font, nameForm);
        });

    }


    // CREATE TYPOGRAPHY
    const textMesh = new THREE.Mesh();
    const createTypo = (font, nameForm) => {
        const word = nameForm;
        const typoProperties = {
            font: font,
            size: 100,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        };

        const text = new THREE.TextGeometry(word, typoProperties);
        textMesh.geometry = text;
        textMesh.material = material;
        textMesh.position.x = -130;;
        scene.add(textMesh);
    };


    const animate = () => {
        requestAnimationFrame(animate);
        const t = Date.now() * 0.001; // Return the number of milliseconds since 1970 / 01 / 01:
        const rx = Math.sin(t * 0.7) * 0.5;
        const ry = Math.sin(t * 0.3) * 0.5;
        const rz = Math.sin(t * 0.2) * 0.5;
        renderer.render(scene, camera);
    }




    const init = () => {
        animate();

        const $form = document.querySelector(`.form-name`);
        $form.addEventListener(`submit`, handleSubmitForm);


    }




    init();


}

