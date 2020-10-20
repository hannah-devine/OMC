

const meshPosition = (mesh, dist, distDouble, tau, width, height) => {
    mesh.position.x = Math.random() * distDouble - dist;
    mesh.position.y = Math.random() * distDouble - dist;
    mesh.position.z = Math.random() * distDouble - dist;
    mesh.rotation.x = Math.random() * tau;
    mesh.rotation.y = Math.random() * tau;
    mesh.rotation.z = Math.random() * tau;
    mesh.scale.x = width;
    mesh.scale.y = height;
    // mesh.scale.z = 50;
    // console.log(mesh.geometry.scale.x);




}


export { meshPosition };