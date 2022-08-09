mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxvYWFtIiwiYSI6ImNsNm1ncXB6djBsaGcza3EycHVna3R4bzkifQ.VvurtSVzxu6VhnnbG1WNoA";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.104081, 42.357575],
  zoom: 1,
});

var marker = new mapboxgl.Marker()
  .setLngLat([-71.091542, 42.358862])
  .addTo(map);

async function run() {
  // get bus data
  const coordinates = await getBusLocations();
  console.log(new Date());
  console.log(coordinates);

  let longTemp = coordinates["longitude"];
  let latTemp = coordinates["latitude"];
  marker.setLngLat([longTemp, latTemp]);

  // timer
  setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations() {
  // const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const url = "http://api.open-notify.org/iss-now.json";
  const response = await fetch(url);
  const json = await response.json();
  return json.iss_position;
}

run();
