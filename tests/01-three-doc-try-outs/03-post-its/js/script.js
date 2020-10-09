

{

    // Three.js kan niks doen zonder scene, camer en renderer.
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    // we gaan de renderer een size meegeven
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#e5e5e5");
    // en hiermee maken we een canvas aan in ons HTML
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x0f0f0f);
    scene.add(ambientLight);

    // als ik dit niet plaatse dan had zag ik mijn kleuren niet
    let light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);

    scene.add(light);




    let geometry = new THREE.BoxGeometry();



    camera.position.y = -20;
    camera.position.z = 100;


    for (let index = 0; index < 100; index++) {
        let cube = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

        cube.position.x = Math.random() * 100 - 50;
        cube.position.y = Math.random() * 60 - 50;
        cube.position.z = Math.random() * 40 - 30;
        // cube.rotation.x += 0.1;
        // cube.rotation.y += 0.1;

        scene.add(cube);
    }


    const animate = () => {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }


    const init = () => {
        animate();




        animate();




    }




    init();


}

