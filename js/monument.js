class Monument {
    constructor (latitude, longitude, altitude, heading, create, update) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.heading = heading;
        this.create = create.bind(this);
        this.update = update.bind(this);
    }

    initialize(scene) {
        this.monumentGroup = new THREE.Group();
        this.create(this.monumentGroup);
        this.monumentGroup.rotation.set(0, this.heading, 0);
        scene.add(this.monumentGroup);
    }

    updatePositionRelativeToReferenceLatLon(referenceLat, referenceLon) {
        var zPos = latitudeDifferenceMeters(referenceLat, this.latitude);
        var xPos = longitudeDifferenceMeters(referenceLat, referenceLon, this.longitude);
        this.monumentGroup.position.set(xPos, this.altitude, -zPos);
    }
}