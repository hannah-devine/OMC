

{

    //SETTING UP 3D SCENERY
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#e5e5e5");
    // en hiermee maken we een canvas aan in ons HTML
    document.body.appendChild(renderer.domElement);

    //LIGHTS
    const ambientLight = new THREE.AmbientLight(0x0f0f0f);
    scene.add(ambientLight);
    let light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 0, 500);
    scene.add(light);

    camera.position.z = -500;
    camera.position.x = -500;


    // CAMERA VERANDEREN MET ORBIT
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();


    // materiaal bepalen
    let material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });

    // //audio toevoegen
    // const listener = new THREE.AudioListener();
    // camera.add(listener);

    // // create a global audio source
    // var sound = new THREE.Audio(listener);

    // // load a sound and set it as the Audio object's buffer
    // var audioLoader = new THREE.AudioLoader();
    // audioLoader.load('sounds/ambient.ogg', () => {
    //     sound.setBuffer(buffer);
    //     sound.setLoop(true);
    //     sound.setVolume(0.5);
    //     sound.play();
    // });



    // creating a box
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // a material for non shiny objects


    // scene.add(mesh);

    // this is our startpoint
    let meshX = -10;
    for (let index = 0; index < 10; index++) {
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 10;
        mesh.position.y = (Math.random() - 0.5) * 10;
        mesh.position.z = (Math.random() - 0.5) * 100;

        // console.log(mesh);
        scene.add(mesh);
        meshX++;

    }




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
            size: 80,
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
        textMesh.position.x = (Math.random() - 0.5) * 100;
        scene.add(textMesh);
    };


    const animate = () => {
        requestAnimationFrame(animate);

        textMesh.rotation.x += .014;
        textMesh.rotation.y += .0345;

        renderer.render(scene, camera);
        controls.update();
    }







    const init = () => {
        animate();



        const $form = document.querySelector(`.form-name`);
        $form.addEventListener(`submit`, handleSubmitForm);


        // to change values in canvas of width & height => check in inspector
        window.addEventListener('resize', () => {
            // the window size must adjust
            renderer.setSize(window.innerWidth, window.innerHeight);
            // camera aspect ratio veranderen
            camera.aspect = window.innerWidth, window.innerHeight
            // updates the camera along wth the browser size
            camera.updateProjectionMatrix();
        })


    }




    init();


}

