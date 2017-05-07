function CreateTestMonument() {
    var testMonument = new Monument(
        37.730734, -122.442040,
        0,
        Math.PI / 2,
        function (group) {
            this.positionClones = function (angleOffset) {
                var ringRadius = 5;
                for (var i = 0; i < this.clones.length; i++) {
                    var baseAngle = (i / this.clones.length) * 2 * Math.PI;
                    var angle = baseAngle + this.angleOffset;
                    var clone = this.clones[i];
                    clone.position.set(
                        ringRadius * Math.cos(angle),
                        0,
                        ringRadius * Math.sin(angle));
                    clone.rotation.set(0, -angle, 0);
                }
            }

            this.finishInitialization = function (group) {
                var geometry = new THREE.BoxGeometry(1, 1, 1);
                var greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                var redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                var numClones = 20;

                this.clones = []
                this.angleOffset = 0;
                for (var i = 0; i < numClones; i++) {
                    var clone = this.protoObject.clone();
                    this.clones.push(clone);
                    group.add(clone);
                }
                this.positionClones(this.angleOffset);
            }

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
            mtlLoader.setPath('models/horse/');
            mtlLoader.load('horse-obj.mtl', function (materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('models/horse/');
                objLoader.load('horse-obj.obj', function (object) {
                    object.scale.set(0.03, 0.03, 0.03);
                    this.protoObject = object;
                    this.finishInitialization(group);
                }.bind(this), onProgress, onError);
            }.bind(this));

            var archMtlLoader = new THREE.MTLLoader();
            archMtlLoader.setPath('models/arch-obj/');
            archMtlLoader.load('obj.mtl', function (materials) {
                materials.preload();
                var archObjLoader = new THREE.OBJLoader();
                archObjLoader.setMaterials(materials);
                archObjLoader.setPath('models/arch-obj/');
                archObjLoader.load('tinker.obj', function (object) {
                    object.scale.set(0.3, 0.3, 0.3);
                    object.rotation.set(-Math.PI / 2, 0, 0);
                    group.add(object);

                    var clone = object.clone();
                    clone.rotateZ(Math.PI / 2);
                    group.add(clone);
                }.bind(this), onProgress, onError);
            }.bind(this));

        },
        function () {
            if (this.clones !== undefined) {
                this.angleOffset += 0.01;
                this.positionClones(this.angleOffset)
            }
        });
    return testMonument;
}
