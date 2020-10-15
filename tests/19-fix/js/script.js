

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


    // // let geometry = new THREE.TorusKnotGeometry(50, 15, 500, 80);
    // let material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    let material = new THREE.MeshNormalMaterial();
    // let cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);


    const group = new THREE.Group();
    for (let index = 0; index < 100; index++) {
        let geometry = new THREE.BoxGeometry(10, 10, 10);
        let cubes = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

        cubes.position.x = Math.random() * 1000 - 500;
        cubes.position.y = Math.random() * 900 - 500;
        cubes.position.z = Math.random() * 400 - 300;
        // cube.rotation.x += 0.1;

        const dist = farDist / 15; // 6666
        const distDouble = dist * 2; // 3000 * 2
        const tau = 2 * Math.PI; // One turn


        // dit zet de positie random
        cubes.position.x = Math.random() * distDouble - dist;
        cubes.position.y = Math.random() * distDouble - dist;
        cubes.position.z = Math.random() * distDouble - dist;
        // dit draait de kubusjes random op de x, y,z waarden
        cubes.rotation.x = Math.random() * tau;
        cubes.rotation.y = Math.random() * tau;
        cubes.rotation.z = Math.random() * tau;


        cubes.matrixAutoUpdate = false;
        cubes.updateMatrix();

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



        const t = Date.now() * 0.001; // Return the number of milliseconds since 1970 / 01 / 01:
        // console.log(t);
        const rx = Math.sin(t * 0.7) * 0.5;
        // console.log(rx);
        const ry = Math.sin(t * 0.3) * 0.5;
        const rz = Math.sin(t * 0.2) * 0.5;

        // // dit zijn de kubussen
        // group.rotation.x = rx;
        // group.rotation.y = ry;
        // group.rotation.z = rz;


        // textMesh.rotation.x = rx;
        // textMesh.rotation.y = ry;
        // textMesh.rotation.z = rz;

        // cube.rotation.x += .1;
        // cube.rotation.y += .01;
        renderer.render(scene, camera);
    }




    const init = () => {
        animate();



        const $form = document.querySelector(`.form-name`);
        $form.addEventListener(`submit`, handleSubmitForm);


    }




    init();


}

