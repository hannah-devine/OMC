import { makeMesh } from "./makeMesh.js";

const createBoxes = (geometry, farDist) => {
    const group = new THREE.Group();
    for (let index = 0; index < 300; index++) {
        let material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        // let geometry = new THREE.BoxGeometry(10, 10, 10);

        let cubes = makeMesh(geometry, material, farDist);
        group.add(cubes);
    }

    console.log(group);
    return group;
}

export { createBoxes };