var address = null;
var interval = null;
console.log("I am from paste");
function copyAddress (address_to_use) {
    address = address_to_use;
    interval = setInterval (pasteAddress, 1000);
}

function pasteAddress () {
    var div = document.querySelector("div.addrOverlay")
    if ( div.style.display == "block" ){
        clearInterval(interval);
        document.querySelector("input#fName").value = address.first_name;
        document.querySelector("input#lName").value = address.last_name;
        document.querySelector("input#stAdd").value = address.address_one;
        document.querySelector("input#city").value = address.city;
        document.querySelector("input#zip").value = address.zip_code;

        document.querySelector("input#p_num").value = address.p_num;
        document.querySelector("input#p_num2").value = address.p_num2;
        document.querySelector("input#p_num3").value = address.p_num3;
        console.log('address on paste',address);
        if (address.state) {
            document.querySelector("select#states > option[value=" + address.state.toUpperCase() + "]").selected = true;
        }
        if (address.address_two !== undefined) {
            document.querySelector("input#add2").value = address.address_two;
        }
        document.querySelector("#addNewAddress > div:nth-child(3) > dl:nth-child(1) > dd:nth-child(22) > input:nth-child(1)").checked = false;
//        document.querySelector("a.cnc_mainSprite:nth-child(9)").click();
    }
}


var shippingAddressCbo = document.querySelector("#defaultAddrsId");

if (shippingAddressCbo.selectedIndex == 0) {
    self.port.on("Address", copyAddress);
} else {
    var taxExemption = document.querySelectorAll("input.check-exempt");
    if (taxExemption && taxExemption.length > 0){
        if (!taxExemption[0].checked) {
            for (var i=0; i<taxExemption.length ; i++){
                taxExemption[i].click();
            }
            document.querySelector("p.tRight:nth-child(12) > a:nth-child(3)").click();
        }
    }
}
clickAddressLink(300);
console.log("I am from paste");
function clickAddressLink(time){
    setTimeout(function(){
        var addressLink = document.querySelector("a#addNewAddressToAllLink");
        return addressLink.click();
    }, time);

}



