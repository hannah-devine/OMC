

const meshPositionTwo = (mesh, tau) => {
    mesh.position.x = Math.random() * 400;
    mesh.position.y = Math.random() * 800;
    mesh.position.z = Math.random() * -1500;
    mesh.rotation.x = Math.random() * tau;
    mesh.rotation.y = Math.random() * tau;
    mesh.rotation.z = Math.random() * tau;

}


export { meshPositionTwo };