export const dispalyMap = () => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2lsYW55IiwiYSI6ImNrZnZhazlxZDFlYTcyem16YmN4dDNpZnEifQ.Vp4rzn1_npeJQyMJxNMx8Q'
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
  })
}
