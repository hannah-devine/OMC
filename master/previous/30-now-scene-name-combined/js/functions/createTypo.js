// CREATE TYPOGRAPHY

const createTypo = (font, nameForm, textMesh, material) => {
    const word = nameForm;
    const typoProperties = {
        font: font,
        size: 100,
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
    textMesh.position.x = -130;;
    textMesh.position.z = 130;

    return textMesh;

};

export { createTypo };