function CreateCarousel() {
    var testMonument = new Monument(
        37.754426, -122.418190,
        0,
        Math.PI / 2,
        function (group) {
            
            var ringsSceneLoader = new THREE.ObjectLoader();
            ringsSceneLoader.load(
                '/augmented-communities/models/Jess_scene.json',
                function (obj) {
                    obj.position.set(0, 1, 0);
                    group.add( obj );
                },
                function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                function ( xhr ) {
                    console.error( 'An error happened' );
                }
            );

        },
        function () {

        });
    return testMonument;
}
