import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

import { createTypo } from "./functions/createTypo.js";
import { createBoxes } from "./functions/createBoxes.js";

{


  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

  const names = ['Benoît', 'Koen', 'Hannah', 'Ward', 'Kaj', 'Lieselot', 'Kaat', 'Tara-tessa', 'Wilma', 'Florry'];
  const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + names.join(' | ') + ' ;'

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = 'nl-BE';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const $diagnostic = document.querySelector('.output');



  const farDist = 10000;

  //SETTING UP 3D SCENERY
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, farDist);
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const colors = [`#e5e5e5`, `#FFE1DB`, `#DBFFE0`, `#9DFFFB`, `#95A7F9`, `#F7C767`, `#fceab8`];
  renderer.setClearColor(`#e5e5e5`);


  // en hiermee maken we een canvas aan in ons HTML
  document.body.appendChild(renderer.domElement);

  //LIGHTS
  const ambientLight = new THREE.AmbientLight(0x0f0f0f);
  scene.add(ambientLight);
  let light = new THREE.SpotLight(0xffffff, 1.5);
  light.position.set(0, 500, 2000);
  scene.add(light);
  const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(hemisphereLight);

  // CAMERA
  camera.position.z = 800;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  // ARRAY POSSIBLE MATERIALS FOR TEXT
  const materials = [new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }), new THREE.MeshNormalMaterial(), new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })];

  // .Raycasting is used for mouse picking(working out what objects in the 3d space the mouse is over) amongst other things.
  let raycaster = new THREE.Raycaster();
  // Class representing a 2D vector.
  let mouse = new THREE.Vector2();




  //ARRAY POSSIBLE GEOMETRIES
  const geometries = [new THREE.BoxBufferGeometry(10, 10, 10), new THREE.BoxBufferGeometry(17, 17, 17),
  new THREE.TorusKnotGeometry(10, 3, 100, 16), new THREE.ConeBufferGeometry(15, 40, 62),
  new THREE.CylinderBufferGeometry(15, 15, 50, 62), new THREE.DodecahedronBufferGeometry(18, 18),
  new THREE.CircleGeometry(15, 32), new THREE.TetrahedronBufferGeometry(15, 15),
  new THREE.TorusBufferGeometry(10, 3, 16, 100), new THREE.OctahedronBufferGeometry(3, 3), new THREE.IcosahedronBufferGeometry(15, 15), new THREE.SphereBufferGeometry(15, 32, 32)];




  // NAAM OPVANGEN EN 3D renderen
  const textMesh = new THREE.Mesh();
  let nameForm;
  const group = new THREE.Group();
  recognition.onresult = (event) => {

    nameForm = event.results[0][0].transcript;
    console.log(nameForm);
    const material = materials[Math.floor(Math.random() * materials.length)];
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];


    // console.log(scene.children[4].children);
    // if (scene.children[4].children.length > 1) {
    //   scene.remove(scene.children[4]);
    // }

    createBoxes(group, geometry, farDist);


    const loader = new THREE.FontLoader();
    loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
      createTypo(font, nameForm, textMesh, material);
    });

  }



  scene.add(textMesh);
  scene.add(group);



  const handleMouseMove = (event) => {
    event.preventDefault();
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++) {
      const randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
      intersects[i].object.material.color.set(randomColor);
      intersects[i].object.material.wireframe = true;
      // intersects[i].object.material.scale = 3;
      console.log(intersects[i].object.material);
    }


    // how to get mouse coordinate
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  }




  const animate = () => {


    requestAnimationFrame(animate);
    scene.children[0].rotation.x += 5;
    scene.rotation.x -= 0.00090;
    scene.rotation.y += 0.00090;
    // group.rotation.x = Date.now() * 0.00005;
    // group.rotation.y = Date.now() * 0.000025;
    // group.position.z += 1;

    renderer.render(scene, camera);
  }





  const init = () => {
    animate();



    window.addEventListener('mousemove', handleMouseMove);

    document.querySelector(`body`).addEventListener(`click`, () => {
      recognition.start();
      console.log('Ready to receive a name command.');
      renderer.setClearColor(colors[Math.floor(Math.random() * colors.length)]);
    })


    recognition.onspeechend = () => {
      recognition.stop();
    }

    recognition.onnomatch = () => {
      $diagnostic.textContent = "I didn't recognise that name.";
    }

    recognition.onerror = (event) => {
      $diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
    }




  }




  init();


}
