{


    // here are your objects and scenes
    // scene is een variable 
    // THREE.Scene is een classe met bepaalde instellingen
    const scene = new THREE.Scene();

    // perspective camera 4 parameters => is most close to human eye
    // 75 for field of view, aspect ratio => based on brwser inner width en heigt, for plain ? 
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 8;



    // webGL is craziest/ with this you can create crazy stuff, the others renderers are most simplistic
    // je hebt een renderer nodig voor elk tree.js project 
    // anti-alias true is to smooth out, otherwise jagged
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // setting background color
    renderer.setClearColor("#e5e5e5");
    // based on window height en width
    renderer.setSize(window.innerWidth, window.innerHeight);


    // we need to create a canvas element with our render settings 
    document.body.appendChild(renderer.domElement);

    // to change values in canvas of width & height => check in inspector
    window.addEventListener('resize', () => {
        // the window size must adjust
        renderer.setSize(window.innerWidth, window.innerHeight);
        // camera aspect ratio veranderen
        camera.aspect = window.innerWidth, window.innerHeight
        // updates the camera along wth the browser size
        camera.updateProjectionMatrix();
    })



    // .Raycasting is used for mouse picking(working out what objects in the 3d space the mouse is over) amongst other things.
    let raycaster = new THREE.Raycaster();
    // Class representing a 2D vector.
    let mouse = new THREE.Vector2();





    // creating a box
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // a material for non shiny objects
    const material = new THREE.MeshLambertMaterial({ color: 0xF7F7FF });
    // let mesh = new THREE.Mesh(geometry, material);

    // scene.add(mesh);

    // this is our startpoint
    let meshX = -10;
    for (let index = 0; index < 10; index++) {
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 10;
        mesh.position.y = (Math.random() - 0.5) * 10;
        mesh.position.z = (Math.random() - 0.5) * 10;

        console.log(mesh);
        scene.add(mesh);
        meshX++;

    }




    // to not let object scale along but its not working yet
    const render = () => {

        requestAnimationFrame(render);

        


        renderer.render(scene, camera);
    }


    // parameter kleur, intensiteit en afstand
    const light = new THREE.PointLight(0xFFFFFF, 1, 1000);
    // light positie
    light.position.set(0, 0, 0);
    // light toevoegen aan de scene
    scene.add(light);

    // parameter kleur, intensiteit en afstand
    const light2 = new THREE.PointLight(0xFFFFFF, 2, 1000);
    // light positie
    light2.position.set(0, 0, 25);
    // light toevoegen aan de scene
    scene.add(light2);



    // je moet de renderer renderen 
    console.log(camera);
    renderer.render(scene, camera);
    console.log(scene);

    function onMouseMove(event) {
        event.preventDefault();

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        // this will return an array based on objects that have been intersected with where the mouse in the scene
        let intersects = raycaster.intersectObjects(scene.children, true);

        for (var i = 0; i < intersects.length; i++) {
            this.tl = new TimelineMax();

            this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
            this.tl.to(intersects[i].object.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
            this.tl.to(intersects[i].object.position, 0.5, { x: 2, ease: Expo.easeOut });
            // animation happens -1.5 secon\ds ahead before it normally would
            this.tl.to(intersects[i].object.rotation, 1, { y: Math.PI * 0.5, ease: Expo.easeOut }, "=-1.5");
        }


        // how to get mouse coordinate
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    }




    const init = () => {
        // render 1 keer oproepen om animatie te laten starten
        render();
        window.addEventListener('mousemove', onMouseMove);
        // window.addEventListener('mousemove', mouseMoveHandler);


    }




    init();


}

