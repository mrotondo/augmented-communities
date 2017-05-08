function CreateCarousel() {
    var testMonument = new Monument(
        37.752216, -122.417725,
        0,
        Math.PI / 2,
        function (group) {
           

            var ringsSceneLoader = new THREE.ObjectLoader();
            ringsSceneLoader.load(
                '/augmented-communities/models/luvasl.json',
                function (obj) {
                    obj.position.set(0, 2, 0);
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
