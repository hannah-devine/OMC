

{

    // Three.js kan niks doen zonder scene, camer en renderer.
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    // we gaan de renderer een size meegeven
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#e5e5e5");
    // en hiermee maken we een canvas aan in ons HTML
    document.body.appendChild(renderer.domElement);

    // hiermee maken we een doos
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // mesh is adding material to it
    const cube = new THREE.Mesh(geometry, material);
    // we voegen de kubus toe aan de scene
    scene.add(cube);
    // camera staat nu op zelfde plek als de cubus dus verplaatsen we de kubus een beetje 
    camera.position.z = 5;

    // we kunnen nog niks zien, we moeten eerst renderen 60fps, we renderen de scenen met de box en de camera
    const animate = () => {
        requestAnimationFrame(animate);
        // roteren van de cubus door iedere 60fps .01 rotatie toe te voegen
        cube.rotation.x += 0.01; cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        console.log(cube.rotation.x);
    }





    const init = () => {
        animate();




    }




    init();


}

