

const meshPosition = (mesh, dist, distDouble, tau, width) => {
    mesh.position.x = Math.random() * distDouble - dist;
    mesh.position.y = Math.random() * distDouble - dist;
    mesh.position.z = Math.random() * distDouble - dist;
    mesh.rotation.x = Math.random() * tau;
    mesh.rotation.y = Math.random() * tau;
    mesh.rotation.z = Math.random() * tau;
    mesh.geometry.scale.x = width;
    console.log(mesh.geometry.scale.x);




}


export { meshPosition };