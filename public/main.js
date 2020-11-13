const url = 'http://0.0.0.0:7900'
const socket = io(url)

const point = {
  lng: 52.56,
  lat: 45.12
}

// 创建地图
const map = L.map('map', {
    center: [52, 45],
    // center,
    minZoom: 5,
    maxZoom: 8,
    zoom: 6,
    // doubleClickZoom: false,
    // zoomControl: false, // 默认不显示缩放按钮
    attributionControl: false, // 不显示leaflet 图标logo
    markerZoomAnimation: false,
    zoomAnimation: false,
})
const imgBounds = [[32, 15], [75, 98]]
const imgUrl = './img/map.jpg'
const imageOverlay = L.imageOverlay(imgUrl, imgBounds)
imageOverlay.addTo(map)

// 添加车
const carImg = './img/car-blue.png'
const icon = L.icon({
  iconUrl: carImg,
  iconAnchor: [15 / 2, 31 / 2],
  iconSize: [15, 31]
})
const marker = L.Marker.movingMarker([[point.lng, point.lat]], 500, {
  rotate: true,
  icon,
  initialRotationAngle: 0,
})
marker.addTo(map)

// 向socket服务器发送事件
socket.emit('setPoint', point)

// 接收来自socket服务器的事件
socket.on('newPoint', (data) => {
  console.log(data)
  marker.moveTo([data.lng, data.lat], 500, 60)
})