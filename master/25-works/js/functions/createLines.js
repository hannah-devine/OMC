const createLines = () => {
    // ik maak materiaal 
    const group = new THREE.Group();

    let material = new THREE.LineDashedMaterial({
        color: 0x00fff,
        linewidth: 10,
        scale: .5,
        dashSize: 1,
        gapSize: .5,
    });

    for (let index = 0; index < 100; index++) {
        let points = [];
        points.push(new THREE.Vector3(Math.random(), 600, 0)); // eerst punt 
        points.push(new THREE.Vector3(10, Math.random(), 50)); // 2de punt
        points.push(new THREE.Vector3(500, Math.random(), 10)); // 3de punt
        // hier set ik mijn punten
        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        let line = new THREE.Line(geometry, material);
        line.computeLineDistances();
        console.log(line);
        group.add(line);
    }

    console.log(group);
    return group;



}

export { createLines };