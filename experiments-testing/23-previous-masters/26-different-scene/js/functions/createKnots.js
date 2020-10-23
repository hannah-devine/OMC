import { makeMesh } from "./makeMesh.js";

const createKnots = () => {
    const group = new THREE.Group();
    for (let index = 0; index < 150; index++) {
        let material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        const farDist = 5000;
        let cubes = makeMesh(geometry, material, farDist);
        group.add(cubes);
    }


    console.log(group);
    return group;
}

export { createKnots };