// CREATE TYPOGRAPHY
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

const createTypo = (font, nameForm, textMesh, material, center) => {
    const word = nameForm;
    const typoProperties = {
        font: font,
        size: 130,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 12,
        bevelSize: 5,
        bevelOffset: 0,
        bevelSegments: 3
    };


    const text = new THREE.TextGeometry(word, typoProperties);
    textMesh.geometry = text;
    textMesh.material = material;
    textMesh.position.x = center;
    textMesh.position.z = 130;

    return textMesh;

};

export { createTypo };