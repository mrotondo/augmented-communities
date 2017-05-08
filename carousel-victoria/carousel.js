function CreateCarousel() {
    var testMonument = new Monument(
        37.752529, -122.418470,
        0,
        Math.PI / 2,
        function (group) {

            var ringsSceneLoader = new THREE.ObjectLoader();
            ringsSceneLoader.load(
                '/augmented-communities/models/OWLscene.json',
                function (obj) {
                    obj.position.set(-0, -8, 0);
                      obj.scale.set(.3, .3, .3);
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
