function CreateCarousel() {
    var testMonument = new Monument(
        37.752409, -122.418262,
        0,
        Math.PI / 2,
        function (group) {
            this.positionClones = function (angleOffset) {
                var ringRadius = 5;
                for (var i = 0; i < this.clones.length; i++) {
                    var baseAngle = (i / this.clones.length) * 2 * Math.PI;
                    var angle = baseAngle + angleOffset;
                    var clone = this.clones[i];
                    clone.position.set(
                        ringRadius * Math.cos(angle),
                        0,
                        ringRadius * Math.sin(angle));
                    clone.rotation.set(0, -angle, 0);
                }
            }

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
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath('/augmented-communities/models/horse/');
            mtlLoader.load('horse-obj.mtl', function (materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('/augmented-communities/models/horse/');
                objLoader.load('horse-obj.obj', function (object) {
                    object.scale.set(0.03, 0.03, 0.03);
                    group.add(object);
                }.bind(this), onProgress, onError);
            }.bind(this));

            var archMtlLoader = new THREE.MTLLoader();
            archMtlLoader.setPath('/augmented-communities/models/arch-obj/');
            archMtlLoader.load('obj.mtl', function (materials) {
                materials.preload();
                var archObjLoader = new THREE.OBJLoader();
                archObjLoader.setMaterials(materials);
                archObjLoader.setPath('/augmented-communities/models/arch-obj/');
                archObjLoader.load('tinker.obj', function (object) {
                    object.scale.set(0.2, 0.2, 0.2);
                    object.rotation.set(-Math.PI / 2, 0, 0);
                    group.add(object);

                    var clone = object.clone();
                    clone.rotateZ(Math.PI / 2);
                    group.add(clone);

                    var clone2 = object.clone();
                    clone2.rotateZ(Math.PI / 4);
                    group.add(clone2);

                    var clone3 = object.clone();
                    clone3.rotateZ(-Math.PI / 4);
                    group.add(clone3);
                }.bind(this), onProgress, onError);
            }.bind(this));

            var trainLoader = new THREE.ColladaLoader();
            trainLoader.options.convertUpAxis = true;
            trainLoader.load( '/augmented-communities/models/train.dae', function ( collada ) {
                var object = collada.scene;
                object.scale.set(0.5, 0.5, 0.5);
                object.rotateZ(Math.PI / 2);
                this.centralObject = object;
                group.add( object );
            }.bind(this) );

            var ringsSceneLoader = new THREE.ObjectLoader();
            ringsSceneLoader.load(
                '/augmented-communities/models/rings-scene.json',
                function (obj) {
                    obj.position.set(0, 12, 0);
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
