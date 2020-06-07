var create_circle = function (latitude,longitude,accuracy,color,weight,fillcolor,opacity,message) {
    var circle = L.circle([latitude, longitude], accuracy/(accuracy-500), {
        weight: weight,
        color: color,
        fillColor: fillcolor,
        fillOpacity: opacity
    }).bindPopup(message);
    return circle;
};

var create_marker = function (latitude,longitude,message) {
    var marker = L.marker([latitude,longitude]).bindPopup(message);
    return marker;
};

var map = L.map('map').setView([35, -5.7], 7);


// initialisation layer (the tile map)
var tile_url = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieWFzdWtlIiwiYSI6ImNrYW0yeGdrMjAydjcyenBmaTYwcmNvajgifQ.OSEClk0nr4NqqxTKnqaKKA';
var attribution_content = '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a>';    

//creating the tile of the normal map 
var layer = L.tileLayer(tile_url, {
attribution: attribution_content,
maxZoom: 18,
id: 'mapbox/dark-v10',
tileSize: 512,
zoomOffset: -1,
accessToken: 'pk.eyJ1IjoieWFzdWtlIiwiYSI6ImNrYW0yeGdrMjAydjcyenBmaTYwcmNvajgifQ.OSEClk0nr4NqqxTKnqaKKA'
});


//creating the tile of satilite map 
var GRaster = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: ' © <a href="https://earth.google.com/">GoogleMaps</a>'
});

//location button 
L.control.locate({setView:false,drawCircle:false,watch:false}).addTo(map);

//add the normal map tile, and he tiles list option on the map
var OSMRoads =  layer.addTo(map);

L.control.layers({
'خريطة عادية':OSMRoads,    
'صورة الأقمار الصناعية' :GRaster
}).addTo(map);



        