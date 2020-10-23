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
  // const material = materials[Math.floor(Math.random() * materials.length)];

  let points = [];
  for (let i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
  }

  //ARRAY POSSIBLE GEOMETRIES
  const geometries = [new THREE.BoxBufferGeometry(10, 10, 10), new THREE.BoxBufferGeometry(12, 12, 12),
  new THREE.TorusKnotGeometry(10, 3, 100, 16), new THREE.ConeBufferGeometry(15, 40, 62),
  new THREE.CylinderBufferGeometry(15, 15, 50, 62), new THREE.DodecahedronBufferGeometry(4, 4),
  new THREE.CircleGeometry(15, 32), new THREE.TetrahedronBufferGeometry(15, 15),
  new THREE.TorusBufferGeometry(10, 3, 16, 100), new THREE.OctahedronBufferGeometry(3, 3), new THREE.IcosahedronBufferGeometry(10, 10), new THREE.LatheBufferGeometry(points), new THREE.SphereBufferGeometry(15, 32, 32)];



  // NAAM OPVANGEN EN 3D renderen
  const textMesh = new THREE.Mesh();
  let shapes;
  let nameForm;
  recognition.onresult = (event) => {
    nameForm = event.results[0][0].transcript;
    console.log(nameForm);
    // let material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    const material = materials[Math.floor(Math.random() * materials.length)];
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    
    shapes = createBoxes(geometry, farDist)
    scene.add(shapes);
    // nameForm = document.querySelector(`.firstname`).value;

    renderer.setClearColor(colors[Math.floor(Math.random() * colors.length)]);

    const loader = new THREE.FontLoader();
    loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
      createTypo(font, nameForm, textMesh, material);
    });

  }
  scene.add(textMesh);




  const animate = () => {
    requestAnimationFrame(animate);
    scene.children[0].rotation.x += 5;
    scene.rotation.x -= 0.00090;
    scene.rotation.y += 0.00090;

    renderer.render(scene, camera);
  }





  const init = () => {
    animate();


    document.querySelector(`body`).addEventListener(`click`, () => {
      recognition.start();
      console.log('Ready to receive a name command.');
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
