var address_control = null;

function get_state( name ) {
    var states = {
    'ALABAMA': 'AL',
    'ALASKA': 'AK',
    'AMERICAN SAMOA': 'AS',
    'ARIZONA': 'AZ',
    'ARKANSAS': 'AR',
    'CALIFORNIA': 'CA',
    'COLORADO': 'CO',
    'CONNECTICUT': 'CT',
    'DELAWARE': 'DE',
    'DISTRICT OF COLUMBIA': 'DC',
    'FEDERATED STATES OF MICRONESIA': 'FM',
    'FLORIDA': 'FL',
    'GEORGIA': 'GA',
    'GUAM': 'GU',
    'HAWAII': 'HI',
    'IDAHO': 'ID',
    'ILLINOIS': 'IL',
    'INDIANA': 'IN',
    'IOWA': 'IA',
    'KANSAS': 'KS',
    'KENTUCKY': 'KY',
    'LOUISIANA': 'LA',
    'MAINE': 'ME',
    'MARSHALL ISLANDS': 'MH',
    'MARYLAND': 'MD',
    'MASSACHUSETTS': 'MA',
    'MICHIGAN': 'MI',
    'MINNESOTA': 'MN',
    'MISSISSIPPI': 'MS',
    'MISSOURI': 'MO',
    'MONTANA': 'MT',
    'NEBRASKA': 'NE',
    'NEVADA': 'NV',
    'NEW HAMPSHIRE': 'NH',
    'NEW JERSEY': 'NJ',
    'NEW MEXICO': 'NM',
    'NEW YORK': 'NY',
    'NORTH CAROLINA': 'NC',
    'NORTH DAKOTA': 'ND',
    'NORTHERN MARIANA ISLANDS': 'MP',
    'OHIO': 'OH',
    'OKLAHOMA': 'OK',
    'OREGON': 'OR',
    'PALAU': 'PW',
    'PENNSYLVANIA': 'PA',
    'PUERTO RICO': 'PR',
    'RHODE ISLAND': 'RI',
    'SOUTH CAROLINA': 'SC',
    'SOUTH DAKOTA': 'SD',
    'TENNESSEE': 'TN',
    'TEXAS': 'TX',
    'UTAH': 'UT',
    'VERMONT': 'VT',
    'VIRGIN ISLANDS': 'VI',
    'VIRGINIA': 'VA',
    'WASHINGTON': 'WA',
    'WEST VIRGINIA': 'WV',
    'WISCONSIN': 'WI',
    'WYOMING' : 'WY'
};
    if (name.length == 2) {
        return name;
    } else if (name.length > 2) {
        if (states[name]) {
            return states[name];
        } else {
            return "";
        }
    } else {
        return "";
    }
}

function getAddressControl(){
address_control = $("#myo-order-details-buyer-address");
	//console.log("I am from amazon copy");
   // address_control = document.querySelector("table.data-display:nth-child(5) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)");
    if (!address_control) {
        setTimeout(getAddressControl, 1000);
    } else {
        var address = extractAddress();
        var productDetails = extractProductDetails();
        productDetails = productDetails || {};
        productDetails.address = address;
        self.port.emit("gotAddress", productDetails);
    }  
}

function extractProductDetails(){
  /**  var details = {};
    var quantityContainer = document.querySelector("tr.list-row-odd:nth-child(2) > td:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)");
    if (quantityContainer){
        details.qty = quantityContainer.innerHTML;
    }
    var skuNumberContainer = document.querySelector("tr.list-row-odd:nth-child(2) > td:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)");
    if (skuNumberContainer){
        var skuStr = skuNumberContainer.innerHTML;
        console.log('Char',skuStr.slice(0, 1)); //cut off al other string except first character
        if(skuStr.slice(0, 1) == '*'){ //if first character is `*`
            details.skuNumber  = skuStr.substring(1); //Trip the first character which is `*`
        }else{
            //check the sku string matches these strings
            switch(skuStr){
                case 'EZ-CEG6-AUUC':
                    details.skuNumber = '118156';
                    break;
                case 'E6-WBL2-XZA0':
                    details.skuNumber = '712494';
                    break;
                case '8K-FGKK-W8W2':
                    details.skuNumber = '712620';
                    break;
                case '9N-40RK-VY6Y':
                    details.skuNumber = '712830';
                    break;
                default:
                    details.skuNumber =   skuStr;
            }

        }

        console.log('Detail SKU Number', details.skuNumber);
    }
    console.log('Copy details', details);
    return details;  */
    var details = {};
    var qtySelector = $("#myo-order-details-item-quantity-ordered");
    var skuSelector = $("#myo-order-details-product-sku");
    if(qtySelector.length){
            details.qty = parseInt(qtySelector.text()).toString();
    }

    if(skuSelector.length){
            details.skuNumber = skuSelector.text().replace(/ /g,'').replace(/^\s+|\s+$/g, '');
    }

    return details;
   
}

function extractAddress(){

var address_control = $("#myo-order-details-buyer-address");
address_control.find("br").remove();
address_control.find("span").remove();


var addressLine = address_control.text().split("\n");

//console.log(addressLine);
var AddrNew = new Array();
$(addressLine).each(function(key, value){
value = value.replace( /[\s\n\r]+/g, ' ' );
if(value != " " && value != ""){
value = ltrim(value);
value = rtrim(value);
if(value == "Phone:"){

}else{
AddrNew.push(value);
}

}
});

console.log("Line Length",AddrNew.length);
var address_object = new Object();
if(AddrNew.length == 6 || AddrNew.length == 6 ){

var name = AddrNew[0].split(" ");
address_object.first_name  = name[0];
address_object.last_name  = name[1];
address_object.address_one = AddrNew[1];
if(AddrNew.length == 6){
address_object.address_two = AddrNew[2] + " " +  AddrNew[3]+ " " + AddrNew[4] ;
address_object.city = AddrNew[2];
address_object.state = get_state(AddrNew[3]);
address_object.zip_code = AddrNew[4];
address_object.phone = AddrNew[5]
}
}

console.log("adress array after slice",AddrNew);
console.log("Address Object",address_object);
	
 /*var address_array = new Array();
    for (var i=0 ; i < address_control.childNodes.length ; i++ ) {
        if (address_control.childNodes[i].nodeType == address_control.TEXT_NODE) {
            address_array.push(address_control.childNodes[i]); 
        }
    }
    console.log('array address length',address_array.length);
    if (address_array.length == 4 || address_array.length == 5 ) {
        var address_object = new Object();
        var name = address_array[0].textContent;
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
        seperator_index = city_line.indexOf(String.fromCharCode(160));
        address_object.state = get_state(city_line.substr(0, seperator_index).toUpperCase());
        address_object.zip_code = city_line.substr(seperator_index + 1);
        seperator_index = address_object.zip_code.indexOf("-");
        if (seperator_index > 0){
            address_object.zip_code = address_object.zip_code.substr(0, seperator_index);
        }

        seperator_index = address_array[3].textContent.indexOf(":");
        address_object.phone = address_array[3].textContent.substr(seperator_index + 1);


    }else if(address_array.length == 3 || address_array.length == 4){
        var address_object = new Object();
        var name = address_array[0].textContent;
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
        seperator_index = city_line.indexOf(String.fromCharCode(160));
        address_object.state = get_state(city_line.substr(0, seperator_index).toUpperCase());
        address_object.zip_code = city_line.substr(seperator_index + 1);
        seperator_index = address_object.zip_code.indexOf("-");
        if (seperator_index > 0){
            address_object.zip_code = address_object.zip_code.substr(0, seperator_index);
        }


        address_object.phone = 'xxx-xxx-xxx';
    }else{
        console.log('Error occured on address');
    }
    //console.log('phone check', address_object);*/
    return address_object; 
	//return null;
}


///Model functions
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}
//end of model functions


getAddressControl();
