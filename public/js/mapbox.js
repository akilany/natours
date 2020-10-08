export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2lsYW55IiwiYSI6ImNrZzE3NjM0MzA2M20yc24xaGJlMWk2aXIifQ.oq4-rNzEtgQx7YBruEwlYg'
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kilany/ckfvawysk0wdd19pep1hhxxgy',
    scrollZoom: false,
  })

  const bounds = new mapboxgl.LngLatBounds()

  locations.forEach((loc) => {
    // Create Marker
    const el = document.createElement('div')
    el.className = 'marker'

    // Add a marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map)

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map)

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates)
  })

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  })
}
