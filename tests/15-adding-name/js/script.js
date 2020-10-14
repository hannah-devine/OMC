

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
    light.position.set(0, 500, 2000);
    scene.add(light);

    // CAMERA
    camera.position.z = 800;


    // CAMERA VERANDEREN MET ORBIT
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();


    let geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);

    let material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);


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
        textMesh.position.x = -120;;
        scene.add(textMesh);
    };


    const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += .1;
        cube.rotation.y += .01;

        textMesh.rotation.x += .01;
        textMesh.rotation.y += .01;
        

        renderer.render(scene, camera);
    }


    const init = () => {
        animate();



        const $form = document.querySelector(`.form-name`);
        $form.addEventListener(`submit`, handleSubmitForm);


    }




    init();


}

