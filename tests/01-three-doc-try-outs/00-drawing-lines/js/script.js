

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

    // camera op x positie 0, op y positie 0, op z positie 100
    camera.position.set(0, 0, 100);
    // geen idee
    camera.lookAt(0, 0, 0);


    // ik maak materiaal 
    let material = new THREE.LineDashedMaterial({
        color: 0x00fff,
        linewidth: 10,
        scale: .5,
        dashSize: 1,
        gapSize: .5,
    });


    // ik maak array met punten
    // ik duw verschillende vectorpunte erin op de x,y en z-waarden
    let points = [];
    points.push(new THREE.Vector3(- 20, 0, 0)); // eerst punt 
    points.push(new THREE.Vector3(10, 10, 5)); // 2de punt
    points.push(new THREE.Vector3(10, 0, 10)); // 3de punt

    // hier set ik mijn punten
    let geometry = new THREE.BufferGeometry().setFromPoints(points);

    // hier worden de punten aan elkaar vastgemaakt met
    // parameter de punten, en parameter een materiaal
    let line = new THREE.Line(geometry, material);
    // als ik dit niet schrijf dan werkt mijn line dash niet
    line.computeLineDistances();

    // toevoegen aan de scene en renderen anders zie ik nieks
    scene.add(line);
    renderer.render(scene, camera);

    const init = () => {





    }




    init();


}

