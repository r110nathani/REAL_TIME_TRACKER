const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position) => {
        const { latitude , longitude }  = position.coords;
        socket.emit("send-location" , {latitude , longitude});
    } , (error) => {
        console.log("error in fetching location");
    },
{
    enableHighAccuracy : true,
    timeout : 100,
    maximumAge : 0
});
} 

const map = L.map("map").setView([0,0] , 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution : "Raj Maps"
}).addTo(map);

const markers = {};

socket.on("recieve-location" ,  (data) => {
    const {id , latitude , longitude} = data;
    map.setView([latitude , longitude],15);
    if(markers[id]) 
    {
        markers[id].setLatLng([latitude ,longitude]);
    }
    else
    {
        markers[id] = L.marker([latitude , longitude]).addTo(map);
    }
})

