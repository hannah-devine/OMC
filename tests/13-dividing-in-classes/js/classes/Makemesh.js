

class MakeMesh {
    constructor(geometry, material, fardist) {
        this.mesh = new THREE.Mesh(geometry, material);
        this.dist = farDist / 3;
        this.distDouble = dist * 2;
        this.tau = 2 * Math.PI; // One turn
    }
    meshAnimation() {
        this.mesh.position.x = Math.random() * distDouble - dist;
        this.mesh.position.y = Math.random() * distDouble - dist;
        this.mesh.position.z = Math.random() * distDouble - dist;
        this.mesh.rotation.x = Math.random() * tau;
        this.mesh.rotation.y = Math.random() * tau;
        this.mesh.rotation.z = Math.random() * tau;

        // Manually control when 3D transformations recalculation occurs for better performance
        this.mesh.matrixAutoUpdate = false;
        this.mesh.updateMatrix();

        return this.mesh;
    }
}

export default MakeMesh;