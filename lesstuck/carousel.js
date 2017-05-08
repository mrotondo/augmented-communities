function CreateCarousel() {
    var testMonument = new Monument(
        37.754502, -122.418595,
        0,
        // lat long, alt
        Math.PI / 2,
        function (group) {
            
            
            

            var ringsSceneLoader = new THREE.ObjectLoader();
            ringsSceneLoader.load(
                '/augmented-communities/models/test.json',
                
            
                
                function (obj) {
                    obj.position.set(0, 0, 0);
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
