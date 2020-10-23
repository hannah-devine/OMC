const farDist = 10000;
const createKnots = (scene, material) => {
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    // let material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });

    const ambientLight = new THREE.AmbientLight(0x0f0f0f);
    scene.add(ambientLight);

    // als ik dit niet plaatse dan had zag ik mijn kleuren niet
    let light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);

    scene.add(light);
    const group = new THREE.Group();
    for (let i = 0; i < 350; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        const dist = farDist / 3;
        const distDouble = dist * 2;
        const tau = 3 * Math.PI; // One turn

        mesh.position.x = Math.random() * distDouble - dist;
        mesh.position.y = Math.random() * distDouble - dist;
        mesh.position.z = Math.random() * distDouble - dist;
        console.log(distDouble);
        console.log(dist);
        mesh.rotation.x = Math.random() * tau;
        mesh.rotation.y = Math.random() * tau;
        mesh.rotation.z = Math.random() * tau;
        console.log(tau);
        mesh.scale.x = 4;
        mesh.scale.y = 4;
        mesh.scale.z = 4;
        console.log(mesh);

        // Manually control when 3D transformations recalculation occurs for better performance
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();

        group.add(mesh);
    }

    scene.add(group);
}

export { createKnots };