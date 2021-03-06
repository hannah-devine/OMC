import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { makeMesh } from "./makeMesh.js";


const createBoxes = (group, geometry, farDist, distUser, amount, width, height) => {
    for (let index = 0; index < amount; index++) {
        let material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        let cubes = makeMesh(geometry, material, farDist, distUser, width, height);
        group.add(cubes);
    }
    return group;
}
export { createBoxes };