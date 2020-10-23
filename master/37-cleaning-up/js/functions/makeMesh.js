import { meshPosition } from "./meshPosition.js";
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

const makeMesh = (geometry, material, farDist, distUser, width, height) => {
    const mesh = new THREE.Mesh(geometry, material, farDist);
    const dist = farDist / distUser;
    const distDouble = dist * 2;
    const tau = 1 * Math.PI; // One turn

    meshPosition(mesh, dist, distDouble, tau, width, height);

    // Manually control when 3D transformations recalculation occurs for better performance
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();


    return mesh;

}

export { makeMesh };