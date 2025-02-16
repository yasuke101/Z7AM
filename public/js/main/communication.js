var socket = io.connect();
var circlesLayer = new L.markerClusterGroup();
var myLayer = new L.LayerGroup();
var local_users_pos={};
var has_location=false;
var users_number;


var output_circle = function (json) {
    circlesLayer.addLayer(create_circle(json.latitude,json.longitude,json.accuracy,'red',1,'red',1,'هذا شخص آخر :)'));
};

var output_circles = function (record) {
  for (i in record) {
    output_circle(record[i]); 
  }  
  
};

// initialisation of localisation array + current users number value 
  socket.on('initialisation', function(data){
    
    // curent user number value initialisation
      users_number=Object.keys(data).length;

    // initialisation of location array localy (client side)
      local_users_pos=data;

    // initialisation of visual content (map's circules)
      output_circles(data);   
      
    // output curent user number value
      document.getElementById("users_number").innerHTML = users_number;

  });

// if a user left, drop his circle from the map + update the current user number value 
  socket.on('drop_circle', function(id){

    if(has_location){
      // delete corespondent record localy
        delete local_users_pos[id];
        
      // update visual content (map circules)
        circlesLayer.clearLayers();
        output_circles(local_users_pos);
        circlesLayer.addTo(map);
    }
    // update curent user number value
      users_number--;
      document.getElementById("users_number").innerHTML = users_number;
   
  });

// if new user connect , add his circule to the map
  socket.on('add_circle', function(data){ 
    if(has_location){
      // add corespondent record localy
        local_users_pos[data.id]=data.pos;
      // add the new circule   
        output_circle(data.pos);
        circlesLayer.addTo(map);           
      } 
    // update curent user number value
      users_number++;
      document.getElementById("users_number").innerHTML = users_number;   
  });


map.locate({setView: false, watch: false}) /* This will return map so you can do chaining */
  .on('locationfound', function(e){
    
    // set this user location flag to true (does attribuated with his location)
      has_location=true;
    
    // select useful location info
      var {latitude,longitude,accuracy}=e;
    
    // set up user's location content visualisation (map marker)
      myLayer.addLayer(create_marker(latitude,longitude,'أنت هنا :)'));
      myLayer.addTo(map);

    // output of the map content (map's circules)
      circlesLayer.addTo(map);      
    
    // send proper location 
      socket.emit('send_data',{'latitude':latitude,'longitude':longitude,'accuracy':accuracy});

  })
  .on('locationerror', function(e){
    
    // if already send data, retrive it
    if(has_location){
      
      // retrive data  
        socket.disconnect();
      // remove it own location marker on map 
        myLayer.clearLayers();
      // set this user location flag to false (doesn't attribuated with his location)
        has_location=false;

    }else{
      alert(' شارك موقعك مع الاخرين حتى تتمكن من رؤية خاصتهم على الخريطة');
    }
  });