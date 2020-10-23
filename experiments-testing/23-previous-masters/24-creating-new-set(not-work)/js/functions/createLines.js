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

    // ik maak array met punten
    // ik duw verschillende vectorpunte erin op de x,y en z-waarden
    let points = [];
    points.push(new THREE.Vector3(- 20, 0, 0)); // eerst punt 
    points.push(new THREE.Vector3(10, 10, 5)); // 2de punt
    points.push(new THREE.Vector3(10, 0, 10)); // 3de punt

    // hier set ik mijn punten
    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    // hier worden de punten aan elkaar vastgemaakt met
    // parameter de punten, en parameter een materiaal
    for (let index = 0; index < 300; index++) {
        let line = new THREE.Line(geometry, material);
        // als ik dit niet schrijf dan werkt mijn line dash niet
        line.computeLineDistances();
        group.add(line);
    }

    console.log(group);
    return group;



}

export { createLines };