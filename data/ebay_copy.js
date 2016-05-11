var address_control = document.querySelector("a#changeshipTo");
console.log('myaddon','working....');
if (address_control) {
    address_control = address_control.parentNode;
    var address_array = new Array();
    for (var i=0 ; i < address_control.childNodes.length ; i++ ) {
        if (address_control.childNodes[i].nodeType == address_control.TEXT_NODE) {
            address_array.push(address_control.childNodes[i]); 
        } 
    }
    if (address_array.length >= 4) {
        var address_object = new Object();
        var name = address_array[0].textContent;
        var name = name.trim();
        var seperator_index = name.lastIndexOf(" ");
        address_object.first_name = name.substr(0, seperator_index);
        address_object.last_name = name.substr(seperator_index + 1);
        address_object.address_one = address_array[1].textContent;
        if (address_array.length == 5 ) {
            address_object.address_two = address_array[2].textContent;
            address_array.splice(2,1);
        }
        var city_line = address_array[2].textContent;
        seperator_index = city_line.indexOf(",");
        address_object.city = city_line.substr(0, seperator_index);
        city_line = city_line.substr(seperator_index + 2);
        seperator_index = city_line.indexOf(" ");
        address_object.state = city_line.substr(0, seperator_index);
        address_object.zip_code = city_line.substr(seperator_index + 1);
        address_object.country = address_array[3].textContent; 
    }
    self.port.emit("gotAddress", address_object);
}


