function CreateCarousel() {
    var testMonument = new Monument(
        37.7556042, -122.41901,
        // 37.754426, -122.418190,
        0,
        Math.PI / 2,
        function (group) {

            var ringsSceneLoader = new THREE.ObjectLoader();
            ringsSceneLoader.load(
                '/augmented-communities/models/mission-market-scene.json',
                function (obj) {

                    window.loaded.remove()

                    obj.position.set(0, 4, 0);
                    obj.scale.set(.3,.3,.3)
                    
                    window.rootobject = obj
                    window.fakeTime = 0



                    group.add( obj );
                },
                function ( xhr ) {
                    window.loaded.innerHTML = (xhr.loaded / xhr.total * 100) + '% loaded'
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                function ( xhr ) {
                    console.error( 'An error happened' );
                }
            );

        },
        function () {
            
            window.fakeTime += 0.01;
            if ( window.rootobject !== undefined ) {
                window.rootobject.rotation.y = window.fakeTime
            }
        });
    return testMonument;
}
