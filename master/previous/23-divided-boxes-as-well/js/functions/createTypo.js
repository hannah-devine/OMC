// CREATE TYPOGRAPHY

const createTypo = (font, nameForm, textMesh, material) => {
    const word = nameForm;
    const typoProperties = {
        font: font,
        size: 100,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
    };

    const text = new THREE.TextGeometry(word, typoProperties);
    textMesh.geometry = text;
    textMesh.material = material;
    textMesh.position.x = -130;;

    return textMesh;

};

export { createTypo };