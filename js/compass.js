function AddCompass(scene) {
    var loader = new THREE.FontLoader();
    var blueMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    loader.load('/fonts/gentilis_bold.typeface.json', function (font) {
        var nGeo = new THREE.TextGeometry( 'N', {
            font: font,
            size: 12,
            height: 1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1
        } );
        var n = new THREE.Mesh(nGeo, blueMaterial);
        n.position.set(0, 0, -50);
        scene.add(n);

        var eGeo = new THREE.TextGeometry( 'E', {
            font: font,
            size: 12,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 1
        } );
        var e = new THREE.Mesh(eGeo, blueMaterial);
        e.rotation.set(0, -Math.PI / 2, 0);
        e.position.set(50, 0, 0);
        scene.add(e);

        var sGeo = new THREE.TextGeometry( 'S', {
            font: font,
            size: 12,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 1
        } );
        var s = new THREE.Mesh(sGeo, blueMaterial);
        s.rotation.set(0, Math.PI, 0);
        s.position.set(0, 0, 50);
        scene.add(s);

        var wGeo = new THREE.TextGeometry( 'W', {
            font: font,
            size: 12,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 1
        } );
        var w = new THREE.Mesh(wGeo, blueMaterial);
        w.rotation.set(0, Math.PI / 2, 0);
        w.position.set(-50, 0, 0);
        scene.add(w);
    } );

}