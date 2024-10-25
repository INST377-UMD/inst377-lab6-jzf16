var map = L.map('map').setView([37.0902, -95.7129], 4); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

let markers = [];
for (let i = 0; i < 3; i++) {
  let latitude = getRandomInRange(30, 35, 3);
  let longitude = getRandomInRange(-90, -100, 3);
  markers.push({ latitude, longitude });
}

async function fetchLocality(latitude, longitude) {
  const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
  const data = await response.json();
  return data.locality || 'Locality not found';
}

markers.forEach(async (coords, index) => {
  L.marker([coords.latitude, coords.longitude]).addTo(map)
    .bindPopup(`Marker ${index + 1}`).openPopup();

  const locality = await fetchLocality(coords.latitude, coords.longitude);
  document.getElementById(`marker-${index + 1}`).innerText = `Marker ${index + 1}: ${locality}`;
});
