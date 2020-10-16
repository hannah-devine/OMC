import { meshPosition } from "./meshPosition.js";


const makeMesh = (geometry, material, farDist) => {
    const mesh = new THREE.Mesh(geometry, material, farDist);
    const dist = farDist / 24;
    const distDouble = dist * 2;
    const tau = 2 * Math.PI; // One turn

    meshPosition(mesh, dist, distDouble, tau);

    // Manually control when 3D transformations recalculation occurs for better performance
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();


    return mesh;

}

export { makeMesh };