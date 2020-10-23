// this is our startpoint

const createBoxesRectangle = (material, geometry) => {
    const group = new THREE.Group();
    // const geometry = new THREE.BoxGeometry(80, 70, 80);
    let meshX = -10;
    for (let index = 0; index < 100; index++) {
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 400;
        mesh.position.y = (Math.random() - 0.5) * 300;
        mesh.position.z = (Math.random() - 0.5) * 300;
        group.add(mesh);
        meshX++;

    }
    console.log(group);
    return group;
}

export { createBoxesRectangle };