function CreateCarousel() {
    var testMonument = new Monument(
        37.752563, -122.418222,
        0,
        Math.PI / 2,
        function (group) {

            this.fakeTime = 0;

            var onProgress = function (xhr) {
                if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    console.log(Math.round(percentComplete, 2) + '% downloaded');
                }
            };
            var onError = function (xhr) {
                console.log("error loading mtl!");
            };


            var colinSceneLoader = new THREE.ObjectLoader();
            colinSceneLoader.load(
                '/augmented-communities/models/colin-scene.json',
                function (obj) {
                      obj.position.set(0, 0, 0);
                      obj.scale.set(0.2, 0.2, 0.2);
                      console.log(obj);

                      for (var r = 0, x = -12.5, c = 0; r < 180; r += 36, x += 5, c += 0.2) {
                        var clone = obj.clone();
                        clone.children[0].material = new THREE.MeshPhongMaterial({
                          color: new THREE.Color(Math.random(), Math.random(), Math.random()),
                          specular: 0xffffff,
                          shininess: 1000,
                          shading: THREE.SmoothShading
                        });
                        clone.position.set(x, 0, 0);
                        var rotation = (r * (180 / Math.PI)) / 2;
                        clone.rotation.set(0, rotation, 0);
                        group.add(clone);
                      }

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
            this.fakeTime += 0.01;
            if (this.clones !== undefined) {
                this.positionClones(this.fakeTime)
            }
            if (this.centralObject !== undefined)
            {
                this.centralObject.position.set(0, (Math.sin(this.fakeTime * 2) + 1) * 2, 0);
            }
        });
    return testMonument;
}
