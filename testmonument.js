function CreateTestMonument() {
    var testMonument = new Monument(
        37.730425,
        -122.442796,
        0,
        Math.PI / 2,
        function (group) {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            var redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            var ringRadius = 5;
            var numCubes = 30;

            var cubes = []
            this.angleOffset = 0;
            for (var i = 0; i < numCubes; i++) {
                var cube = new THREE.Mesh(geometry, greenMaterial);
                if (i == 0) {
                    cube.material = redMaterial;
                }
                cubes.push(cube);
                group.add(cube);
            }

            this.positionCubes = function (angleOffset) {
                for (var i = 0; i < numCubes; i++) {
                    var angle = (i / numCubes) * 2 * Math.PI + this.angleOffset;
                    var cube = cubes[i];
                    cube.position.set(
                        ringRadius * Math.cos(angle),
                        0,
                        ringRadius * Math.sin(angle));
                }
            }

            this.positionCubes(this.angleOffset);
        },
        function () {
            this.angleOffset += 0.01;
            this.positionCubes(this.angleOffset)
        });
    return testMonument;
}
