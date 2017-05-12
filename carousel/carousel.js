function CreateMonument() {
    var testMonument = new Monument(
        // LAT/LON COORDINATES
        37.752409, -122.418262,
        // ALTITUDE
        0,
        // HEADING
        Math.PI / 2,
        // INIT FUNCTION
        function (group) {
            // EXAMPLE OF OBJ/MTL LOADING, CLONING & STORING IN AN ARRAY
            var onProgress = function (xhr) {
                if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    console.log(Math.round(percentComplete, 2) + '% downloaded');
                }
            };
            var onError = function (xhr) {
                console.log("error loading mtl!");
            };
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath('/augmented-communities/models/horse/');
            mtlLoader.load('horse-obj.mtl', function (materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('/augmented-communities/models/horse/');
                objLoader.load('horse-obj.obj', function (object) {
                    object.scale.set(0.03, 0.03, 0.03);
                    var numClones = 20;
                    this.clones = []
                    for (var i = 0; i < numClones; i++) {
                        var clone = object.clone();
                        this.clones.push(clone);
                        group.add(clone);
                    }
                }.bind(this), onProgress, onError);
            }.bind(this));
            // END EXAMPLE

            // EXAMPLE OF DAE LOADING
            var trainLoader = new THREE.ColladaLoader();
            trainLoader.options.convertUpAxis = true;
            trainLoader.load( '/augmented-communities/models/train.dae', function ( collada ) {
                var object = collada.scene;
                object.scale.set(0.3, 0.3, 0.3);
                object.rotateZ(Math.PI / 2);
                this.centralObject = object;
                group.add( object );
            }.bind(this));
            // END EXAMPLE

            // EXAMPLE OF THREE.JS EDITOR SCENE LOADING
            var ringsSceneLoader = new THREE.ObjectLoader();
            ringsSceneLoader.load(
                '/augmented-communities/models/rings-scene.json',
                function (object) {
                    object.position.set(0, 1.5, 0);
                    group.add( object );
                },
                function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                function ( xhr ) {
                    console.error( 'An error happened' );
                }
            );
            // END EXAMPLE

        },
        // UPDATE FUNCTION
        function () {
            if (this.fakeTime === undefined) {
                this.fakeTime = 0;
            }
            this.fakeTime += 0.01;
            if (this.clones !== undefined) {
                var ringRadius = 5;
                for (var i = 0; i < this.clones.length; i++) {
                    var baseAngle = (i / this.clones.length) * 2 * Math.PI;
                    var angle = baseAngle + this.fakeTime;
                    var clone = this.clones[i];
                    clone.position.set(
                        ringRadius * Math.cos(angle),
                        0,
                        ringRadius * Math.sin(angle));
                    clone.rotation.set(0, -angle, 0);
                }
            }
            if (this.centralObject !== undefined)
            {
                this.centralObject.position.set(0, (Math.sin(this.fakeTime * 2) + 1) * 2, 0);
            }
        });
    return testMonument;
}
