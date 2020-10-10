{


}
const init = (FName) => {

    //##################################################################################
    //  Grab the first name textbox, last name textbox, name material drop down, and name animation drop down
    const fNameTextbox = document.getElementByClass(".textbox-fname");

    //  Grab the render button
    const renderButton = document.getElementByClass(".render-btn");
    console.log(renderButton);

    //  Grab the document body
    const body = document.body;

    renderButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        let fName = fNameTextbox.value;
        init(fName);
    })



    console.log("FName", fullName);


    let scene, camera, renderer;
    let controls, fontLoader;
    let dirLight;
    let fullNameMesh, sloganMesh;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 500);
    camera.lookAt(scene.position);


    //##################################################################################
    //  Creates a new rendering engine, this takes the scene and camera data, renders everything and converts that into something the DOM can use. 
    renderer = new THREE.WebGLRenderer();
    //  Sets the size of the render to the width and height of the window containing it.
    renderer.setSize(window.innerWidth, window.innerHeight);
    //  Adds the DOM version of the render to the body of the webpage;
    body.appendChild(renderer.domElement);

    //##################################################################################
    //  These are the controls that let us zoom and orbit around the scene. Take not that it's not the meshs that are rotating  but the camera rotating around the meshes.
    controls = new THREE.OrbitControls(camera, renderer.domElement);


    //##################################################################################
    //  Adds a light to... light the scene! This type of light is directional, there are other types of lights like point lights. Directional lights send light in a specefic direction and point lights send light in all directions. Think of a directional light as a led panel or a photographer's softbox and a point light as a bare lightbulb or the sun.
    dirLight = new THREE.DirectionalLight(0xffffff);
    //  Sets the lights position and orientation.
    dirLight.position.setScalar(10);
    //  Adds the light to the scene.
    scene.add(dirLight);


    //##################################################################################
    //  Creates a fontLoader object that can load fonts from a json file
    fontLoader = new THREE.FontLoader();

    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
        //  Creates the name mesh
        fullNameMesh = createTextMesh(fullName, font, 80, materialSelector(nameMatChoice));
        //  Creates the slogan mesh.
        sloganMesh = createTextMesh(slogan, font, 50, materialSelector(sloganMatChoice));
        //  Sets the position of the slogan mesh 100 units below the y axis.
        sloganMesh.position.y = -100;

        //  Adds the name mesh and the slogan mesh to the scene
        scene.add(fullNameMesh);
        scene.add(sloganMesh);
    });

    //##################################################################################
    // We are going to make some helper functions to make some tasks more abstracted and harder to mess up. JavaScript files, especially three.js ones can get complex very fast, so it's really important to have good formatting and abstract everything you can. Comments can really help to

    //  This is the function that actually renders the scene. This is where we put our animation functions.
    function render() {
        //  RequestAnimationFrame(render) starts a loop that refreshes the scene everytime the screen refreshes (typically 60hz or 60 times per second). 
        requestAnimationFrame(render);

        //Animate our meshes
        animationSelector(nameAnimChoice)(fullNameMesh);
        animationSelector(sloganAnimChoice)(sloganMesh);

        //  Tells the render engine to render the scene with our scene object and camera object.
        renderer.render(scene, camera);
    }


    //  This function automates making a mesh object, and combing a geometry object with a material to make a mesh
    function createTextMesh(text, font, size, mat) {
        var geo = new THREE.TextGeometry(text, {
            font: font,
            size: size,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            material: 0,
            extrudeMaterial: 1
        });

        geo.center();
        geo.computeBoundingBox();

        return new THREE.Mesh(geo, mat);
    }




    //#############################################################
    render();


    init();
}