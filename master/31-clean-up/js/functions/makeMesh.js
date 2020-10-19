import { meshPosition } from "./meshPosition.js";
import { meshPositionTwo } from "./meshPosition2.js";
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

const makeMesh = (geometry, material, farDist) => {
    const mesh = new THREE.Mesh(geometry, material, farDist);
    const dist = farDist / 18;
    const distDouble = dist * 2;
    const tau = 2 * Math.PI; // One turn

    meshPosition(mesh, dist, distDouble, tau);

    // Manually control when 3D transformations recalculation occurs for better performance
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();


    return mesh;

}

export { makeMesh };