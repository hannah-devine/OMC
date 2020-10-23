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

        // console.log(mesh);
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


    const init = () => {
        // render 1 keer oproepen om animatie te laten starten
        render();
        window.addEventListener('mousemove', onMouseMove);
        // window.addEventListener('mousemove', mouseMoveHandler);

        // luisteren naar het verzenden van het formulier
        const $form = document.querySelector(`.form-register`);
        $form.addEventListener(`submit`, handleSubmitForm);

    }




    init();


}

