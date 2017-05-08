var BIRD_COUNT = 100;
var BOUND_SIZE = 200;
var BOUND_ALTITUDE = 300;
var INIT_VELOCITY = 4;
var MAX_FORCE = 0.12;
function CreateFlock() {
    var flock = new Monument(
        // lat + lon
        37.752020, -122.418726,
        // altitude
        BOUND_ALTITUDE, // doesn't actually do shit
        // heading
        Math.PI / 2,
        // create
        function (group) {
          // make birds that this tracks
          this.birds = [];
          for (var i = 0; i < BIRD_COUNT; i++) {
            var bird = new boids.THREE.Bird();
            bird.material.color = new THREE.Color( randomColor({ luminosity: 'bright' }) );
            bird.behavior.position.x = (Math.random() - 0.5) * BOUND_SIZE;
            bird.behavior.position.y = (Math.random() - 0.5) * BOUND_SIZE;
            bird.behavior.position.z = (Math.random() - 0.5) * BOUND_SIZE;
            bird.behavior.velocity.x = (Math.random() - 0.5) * INIT_VELOCITY;
            bird.behavior.velocity.y = (Math.random() - 0.5) * INIT_VELOCITY;
            bird.behavior.velocity.z = (Math.random() - 0.5) * INIT_VELOCITY;
            bird.behavior.maxForce = Math.random() * MAX_FORCE;
            this.birds.push(bird);
            group.add(bird);
          }
        },
        // update
        function () {
          // define birds behavior in update
          for (var i = 0; i < this.birds.length; i++) {
            this.birds[i].flock(this.birds[i].behavior);
            this.birds[i].bounce(BOUND_SIZE, BOUND_SIZE, BOUND_SIZE);
            this.birds[i].update();
          }
        });
    return flock;
}
