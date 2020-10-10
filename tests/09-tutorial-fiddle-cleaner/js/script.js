{



    // FORM VALUES
    const fNameTextbox = document.getElementById("textbox-fname");
    const lNameTextbox = document.getElementById("textbox-lname");
    //  Grab the render button
    const renderButton = document.getElementById("render-btn");
    //  Grab the document body
    const body = document.body;


    renderButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        let fName = fNameTextbox.value;
        let lName = lNameTextbox.value;
        let fullName = "";
        fullName += fName.charAt(0).toUpperCase() + fName.slice(1);
        fullName += " ";
        fullName += lName.charAt(0).toUpperCase() + lName.slice(1);


        //  Call the function to initialize and render the 3d scene, 
        init(fullName);
    })


    function init(fullName) {
        console.log("Full Name: ", fullName, "| Name Material Choice: ");
        let scene, camera, renderer;
        let controls, fontLoader;
        let dirLight;
        let fullNameMesh;
        scene = new THREE.Scene();
        fontLoader = new THREE.FontLoader();
        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
            //  Creates the name mesh
            fullNameMesh = createTextMesh(fullName, font);

            //  Adds the name mesh and the slogan mesh to the scene
            scene.add(fullNameMesh);

        });


        // CAMERA AND SCENE SETUP
        const nearDist = 0.1;
        const farDist = 10000;

        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            nearDist,
            farDist);

        camera.position.set(0, 0, 500);
        camera.lookAt(scene.position);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        body.appendChild(renderer.domElement);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.setScalar(10);
        scene.add(dirLight);



        //  This function automates making a mesh object, and combing a geometry object with a material to make a mesh
        function createTextMesh(text, font) {
            console.log(font);
            var geo = new THREE.TextGeometry(text, {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                material: 0,
                extrudeMaterial: 1
            });

            geo.center();
            geo.computeBoundingBox();

            return new THREE.Mesh(geo);
        }


        function render() {
            //  RequestAnimationFrame(render) starts a loop that refreshes the scene everytime the screen refreshes (typically 60hz or 60 times per second). 
            requestAnimationFrame(render);

            //  Tells the render engine to render the scene with our scene object and camera object.
            renderer.render(scene, camera);
        }





        //###############################################################
        //  Calls the render function we described above and starts the render loop.
        render();

    }
}