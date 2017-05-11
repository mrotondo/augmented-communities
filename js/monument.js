// Thanks https://en.wikipedia.org/wiki/Geographic_coordinate_system#Expressing_latitude_and_longitude_as_linear_units
function latitudeDifferenceMeters(referenceLat, measurementLat)
{
    var metersPerLatDegree = 111132.92 - 559.82 * Math.cos(2 * referenceLat) + 1.175 * Math.cos(4 * referenceLat) - 0.0023 * Math.cos(6 * referenceLat);
    var degreeDifference = measurementLat - referenceLat;
    return degreeDifference * metersPerLatDegree;
}
function longitudeDifferenceMeters(referenceLat, longA, longB)
{
    var metersPerLongDegree = 111412.84 * Math.cos(referenceLat) - 93.5 * Math.cos(3 * referenceLat) + 0.118 * Math.cos(5 * referenceLat);
    var degreeDifference = longB - longA;
    return degreeDifference * metersPerLongDegree;
}

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