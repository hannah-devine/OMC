
import MakeMesh from "./classes/Makemesh.js";
import Vector from "./classes/Makemesh.js";


{


    const nearDist = 0.1;
    const farDist = 10000;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        nearDist,
        farDist);

    camera.position.x = farDist * -2;
    camera.position.z = 500;

    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#4DD0E1"); // Backgrond Color - Blue
    renderer.setClearColor("#e5e5e5");
    renderer.setPixelRatio(window.devicePixelRatio); // For HiDPI devices to prevent bluring output canvas
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.querySelector("#canvas-wrapper").appendChild(renderer.domElement);
    // we need to create a canvas element with our render settings 
    document.body.appendChild(renderer.domElement);


    let cubeSize;
    let material;
    cubeSize = 120;
    // material = new THREE.MeshNormalMaterial(); // Maps the normal vectors to RGB colors

    let meshes = [];

    const createcubes = (material) => {
        const geometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize); // BufferAttribute allows for more efficient passing of data to the GPU
        const group = new THREE.Group();
        for (let i = 0; i < 350; i++) {
            meshes = new MakeMesh(geometry, material, 10000);
            group.add(meshes);
        }

        scene.add(group);
    }



    // CREATE TYPOGRAPHY
    const textMesh = new THREE.Mesh();
    console.log(textMesh);
    const createTypo = (font, nameForm) => {
        console.log(font);
        console.log(nameForm);
        const word = nameForm;
        const typoProperties = {
            font: font,
            size: cubeSize,
            height: cubeSize / 2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 6,
            bevelOffset: 1,
            bevelSegments: 8
        };

        const text = new THREE.TextGeometry(word, typoProperties);
        textMesh.geometry = text;
        textMesh.material = material;
        textMesh.position.x = cubeSize * -2;
        textMesh.position.z = cubeSize * -1;
        scene.add(textMesh);
    };


    const createKnots = () => {
        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        // let material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        material = new THREE.MeshDepthMaterial({ wireframe: true });

        const ambientLight = new THREE.AmbientLight(0x0f0f0f);
        scene.add(ambientLight);

        // als ik dit niet plaatse dan had zag ik mijn kleuren niet
        let light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 500, 2000);

        scene.add(light);
        const group = new THREE.Group();
        for (let i = 0; i < 350; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            const dist = farDist / 3;
            const distDouble = dist * 3;
            const tau = 2 * Math.PI; // One turn

            mesh.position.x = Math.random() * distDouble - dist;
            mesh.position.y = Math.random() * distDouble - dist;
            mesh.position.z = Math.random() * distDouble - dist;
            mesh.rotation.x = Math.random() * tau;
            mesh.rotation.y = Math.random() * tau;
            mesh.rotation.z = Math.random() * tau;

            // Manually control when 3D transformations recalculation occurs for better performance
            mesh.matrixAutoUpdate = false;
            mesh.updateMatrix();

            group.add(mesh);
        }

        scene.add(group);
    }

    // CREATE PART OF THE MOUSE/TOUCH OVER EFFECT
    let mouseX = 0;
    let mouseY = 0;
    const mouseFX = {
        windowHalfX: window.innerWidth / 2,
        windowHalfY: window.innerHeight / 2,
        coordinates: function (coordX, coordY) {
            mouseX = (coordX - mouseFX.windowHalfX) * 10;
            mouseY = (coordY - mouseFX.windowHalfY) * 10;
        },
        onMouseMove: function (e) {
            mouseFX.coordinates(e.clientX, e.clientY);
        },
        onTouchMove: function (e) {
            mouseFX.coordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
    };





    let nameForm;

    const handleSubmitForm = e => {
        e.preventDefault();
        nameForm = document.querySelector(`.firstname`).value;
        console.log(nameForm);


        if (nameForm.includes(`P`)) {
            renderer.setClearColor("#FFFFFF");
            material = new THREE.MeshNormalMaterial({ opacity: 0.34 });
            // material = new THREE.MeshDepthMaterial({ wireframe: true });
            createcubes(material);

            const loader = new THREE.FontLoader();
            loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
                createTypo(font, nameForm);
            });

        } else if (nameForm.includes(`A`)) {
            renderer.setClearColor("#b9c2ff");

            createKnots();
            const loader = new THREE.FontLoader();
            loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
                createTypo(font, nameForm);
            });

        }

        document.addEventListener("mousemove", mouseFX.onMouseMove, false);
        document.addEventListener("touchmove", mouseFX.onTouchMove, false);

    }






    // RENDER 3D GRAPHIC
    const render = () => {
        requestAnimationFrame(render);

        // Camera animation
        // Works with onMouseMove and onTouchMove functions
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (mouseY * -1 - camera.position.y) * 0.05;
        camera.lookAt(scene.position); // Rotates the object to face a point in world space

        const t = Date.now() * 0.001;
        const rx = Math.sin(t * 0.7) * 0.5;
        const ry = Math.sin(t * 0.3) * 0.5;
        const rz = Math.sin(t * 0.2) * 0.5;
        // group.rotation.x = rx;
        // group.rotation.y = ry;
        // group.rotation.z = rz;
        textMesh.rotation.x = rx;
        textMesh.rotation.y = ry;
        textMesh.rotation.z = rx; // Happy accident :) 

        renderer.render(scene, camera);
    };
    // render();



    const init = () => {
        // je moete sowieso renderen
        render();

        const $form = document.querySelector(`.form-name`);
        $form.addEventListener(`submit`, handleSubmitForm);

    }




    init();


}

