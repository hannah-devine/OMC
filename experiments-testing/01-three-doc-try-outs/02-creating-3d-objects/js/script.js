

{

    // Three.js kan niks doen zonder scene, camer en renderer.
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ antialias: true });
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

    camera.position.z = 100;





    let geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    // let material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    let material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);


    const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += .1;
        cube.rotation.y += .01;

        renderer.render(scene, camera);
    }


    const init = () => {
        animate();







    }




    init();


}

