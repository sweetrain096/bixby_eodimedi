module.exports.function = function constructDestination (business) {
  var businessGeoPoint = business.address.centroid;

  return {
    name: business.name,
    address: business.address,
    point: {
      latitude: businessGeoPoint.latitude,
      longitude: businessGeoPoint.longitude,   
    }
  }
}