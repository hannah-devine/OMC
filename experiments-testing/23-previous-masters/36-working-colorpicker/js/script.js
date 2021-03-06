import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

import { createTypo } from "./functions/createTypo.js";
import { createBoxes } from "./functions/createBoxes.js";

{

  // ik weet het er staat hier var, maar dat komt omdat het met const of let niet werkt.
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
  const sizeText = 500;

  //SETTING UP 3D SCENERY
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, farDist);
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight - sizeText);
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
  camera.position.z = 2200;
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
  new THREE.TorusKnotGeometry(10, 3, 100, 16), new THREE.ConeBufferGeometry(15, 20, 62),
  new THREE.CylinderBufferGeometry(15, 15, 50, 62), new THREE.DodecahedronBufferGeometry(18, 18),
  new THREE.CircleGeometry(15, 15), new THREE.TetrahedronBufferGeometry(15, 15),
  new THREE.TorusBufferGeometry(10, 3, 16, 100), new THREE.OctahedronBufferGeometry(3, 3), new THREE.IcosahedronBufferGeometry(10, 10), new THREE.SphereBufferGeometry(10, 150, 32)];


  let sound;
  const handlePlayMusic = () => {
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create the PositionalAudio object (passing in the listener)
    sound = new THREE.PositionalAudio(listener);

    // load a sound and set it as the PositionalAudio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('assets/sunny.m4a', (buffer) => {
      sound.setBuffer(buffer);
      sound.setRefDistance(20);
      sound.play();
    });

    // create an object for the sound to play from
    const sphere = new THREE.SphereBufferGeometry(20, 32, 16);
    const material = new THREE.MeshPhongMaterial({ color: 0xff2200 });
    const mesh = new THREE.Mesh(sphere, material);
    scene.add(mesh);

    // finally add the sound to the mesh
    mesh.add(sound);
  }

  const handlePauseMusic = () => {
    sound.pause();
  }


  const group = new THREE.Group();
  const handleSubmitForm = e => {
    e.preventDefault();
    renderer.setClearColor(colors[Math.floor(Math.random() * colors.length)]);
    const amount = document.querySelector(`.amount`).value;
    const width = document.querySelector(`.width`).value;
    const height = document.querySelector(`.height`).value;
    const distUser = document.querySelector(`.dist`).value;
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    createBoxes(group, geometry, farDist, distUser, amount, width, height);
    scene.add(group);
  }



  // NAAM OPVANGEN EN 3D renderen
  const textMesh = new THREE.Mesh();
  let nameForm;

  recognition.onresult = (event) => {
    console.log(`a`);

    nameForm = event.results[0][0].transcript;
    console.log(nameForm);

    const material = materials[Math.floor(Math.random() * materials.length)];

    const center = -window.innerWidth / 5;
    const loader = new THREE.FontLoader();
    loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
      createTypo(font, nameForm, textMesh, material, center);
    });
    scene.add(textMesh);
  }



  const handleMouseMove = (event) => {
    event.preventDefault();
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++) {
      const randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
      intersects[i].object.material.color.set(randomColor);
      intersects[i].object.material.wireframe = true;

      // console.log(intersects[i].object.material.x);

    }

    // how to get mouse coordinate
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  }


  const handleClear = e => {
    e.preventDefault();
    if (scene.children.length >= 4) {
      // scene.remove(scene.children[0]);
      scene.remove(group.children);


      for (let i = group.children.length - 1; i >= 0; i--) {
        group.remove(group.children[i]);
      }

    }
  }


  const animate = () => {
    requestAnimationFrame(animate);
    scene.children[0].rotation.x += 5;
    scene.rotation.x += 0.00090;
    scene.rotation.y += 0.00090;
    group.rotation.x = Date.now() * 0.00005;
    group.rotation.y = Date.now() * 0.00025;



    renderer.render(scene, camera);
  }



  const init = () => {
    animate();

    let colorInput = document.querySelector('#color');

    colorInput.addEventListener('input', () => {
      let color = colorInput.value;
      renderer.setClearColor(color);
    })


    window.addEventListener('mousemove', handleMouseMove);

    document.querySelector(`.listen`).addEventListener(`click`, () => {
      recognition.start();
      console.log('Ready to receive a name command.');
    })


    const $form = document.querySelector(`.form-options`);
    $form.addEventListener(`submit`, handleSubmitForm);


    recognition.onspeechend = () => {
      recognition.stop();
    }

    recognition.onnomatch = () => {
      $diagnostic.textContent = "I didn't recognise that name.";
    }

    recognition.onerror = (event) => {
      $diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
    }


    document.querySelector(`.clear`).addEventListener(`click`, handleClear);

    document.querySelector(`.play`).addEventListener(`click`, handlePlayMusic);


    document.querySelector(`.stop`).addEventListener(`click`, handlePauseMusic);




  }




  init();


}
