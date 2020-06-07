var socket = io.connect();
var circlesLayer = new L.markerClusterGroup();
var myLayer = new L.LayerGroup();
var local_users_pos={};
var has_location=false;
var users_number;


var output_circle = function (json) {
    circlesLayer.addLayer(create_circle(json.latitude,json.longitude,json.accuracy,'red',1,'red',1,'that someone else !'));
    circlesLayer.addTo(map);
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
     
      if(has_location){
        
        // initialisation of location array localy (client side)
          local_users_pos=data;

        // initialisation of visual content (map's circules)
          output_circles(data);   

        // increment mine and output curent users number value
        users_number++
        document.getElementById("users_number").innerHTML = users_number;
        
        console.log(local_users_pos);  
      }else{
      // output curent user number value
      document.getElementById("users_number").innerHTML = users_number;
      }


    console.log('! initialisation !'); 
  });

// if a user left, drop his circle from the map + update the current user number value 
  socket.on('drop_circle', function(id){

    if(has_location){
      // delete corespondent record localy
        delete local_users_pos[id];
        
      // update visual content (map circules)
        circlesLayer.clearLayers();
        output_circles(local_users_pos);

    console.log(local_users_pos); 
    }
    // update curent user number value
      users_number--;
      document.getElementById("users_number").innerHTML = users_number;
 
    console.log('! user disconnected and content updated !');  
  });

// if new user connect , add his circule to the map
  socket.on('add_circle', function(data){ 
    if(has_location){
      // add corespondent record localy
        local_users_pos[data.id]=data.pos;
      // add the new circule   
        output_circle(data.pos);


      console.log(local_users_pos);       
      } 
    // update curent user number value
      users_number++;
      document.getElementById("users_number").innerHTML = users_number;
  

    console.log('! user connected and content updated !');    
  });


map.locate({setView: false, watch: false}) /* This will return map so you can do chaining */
  .on('locationfound', function(e){
    
    // set this user location flag to true (does attribuated with his location)
      has_location=true;
    
    // select useful location info
      var {latitude,longitude,accuracy}=e;
    
    // set up user's location content visualisation (map marker)
      myLayer.addLayer(create_marker(latitude,longitude,'Your are here :)'));
      myLayer.addTo(map);
    
    // send proper location 
      socket.emit('send_data',{'latitude':latitude,'longitude':longitude,'accuracy':accuracy});
    
    console.log('! location sent !');
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

        console.log('! acces to location interupted !'); 
    }else{
      console.log('! no given location !');  
    }
  });