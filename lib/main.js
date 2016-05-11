console.log("I am working...");

var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var windows = require("sdk/windows").browserWindows;
var data = require("sdk/self").data;
var address_object = null;
var order = {};
console.log("from addon",'Wroking....')
var processOrder = function(orderObj) {
    console.log('Order Object', orderObj);
    if (orderObj.skuNumber) {
        order.skuNumber = orderObj.skuNumber;
        console.log('SKU Number',order.skuNumber);
        order.qty = orderObj.qty;
        order.status = "New";
        order.address = copyAddress(orderObj.address);
        address_object = orderObj.address;
        console.log('Address Object', address_object);
    }
};

function copyAddress(address) {
    //set phone number to 844-274-9801
    address.p_num = "844";
    address.p_num2 = "274";
    address.p_num3 = "9801";
    address_object = address;
    console.log("Address Object during copy", address);
}

function initialize(options) {
    // Initialize ebay address copy functionality
    pageMod.PageMod({
            include: [ "https://postage.ebay.com/*" ],
            contentScriptWhen: 'ready',
            contentScriptFile: [ data.url("ebay_copy.js") ],
            onAttach: function(worker) {
                worker.port.on("gotAddress", copyAddress);
            }
        }
    );

    // Initialize amazon address copy functionality
    pageMod.PageMod({
            include: [ "https://sellercentral.amazon.com/hz/orders/details*" ],
            contentScriptWhen: 'ready',
            contentScriptFile: [ data.url("jquery.js") , data.url("amazon_copy.js") ],
            onAttach: function(worker) {
                worker.port.on("gotAddress", processOrder);
                //open a new tab

tabs.open("https://www.befrugal.com/coupons/cashbacksignuppopup/?rtr=4366");


            }
        }
    );


    

     // Initialize address pasting functionality
    pageMod.PageMod({
            include: [ "https://www.samsclub.com/sams/cart/cart.jsp*" ],
            contentScriptWhen: 'ready',
            contentScriptFile: [data.url("jquery.js") ,data.url("cart.js") ],
            onAttach: function(worker) {
               //
            }
        }
    );



    // Initialize address pasting functionality
    pageMod.PageMod({
            include: [ "https://www.samsclub.com/sams/checkout/shipping/shipping.jsp*" ],
             exclude: [ "https://www.samsclub.com/sams/cart/cart.jsp*" ], 
            contentScriptWhen: 'ready',
            contentScriptFile: [data.url("paste.js") ],
            onAttach: function(worker) {
                if (address_object) {
                    worker.port.emit("Address", address_object);
                }
            }
        }
    );





    // Initialize search functionality
    pageMod.PageMod({
            include: [ "*.samsclub.com" ],
            exclude: [ "https://www.samsclub.com/sams/checkout/shipping/shipping.jsp*","https://www.samsclub.com/sams/cart/cart.jsp*" ],            
            contentScriptWhen: 'ready',
            contentScriptFile: [  data.url("jquery.js") ,  data.url("search.js") ],
            onAttach: function(worker) {
                if (order && order.status == "New") {
                    worker.port.emit("Search", order.skuNumber);
                    worker.port.on("Searched", function(skuNumber){
                        if(order.skuNumber == skuNumber){
                            order.status = "Searched";
                        }
		    });
                } else if (order && order.status == "Searched") {
		    worker.port.on("GetQty", function(skuNumber){
                console.log("SKU Number on GET QTY",order.skuNumber)
                        if(order.skuNumber == skuNumber){
                            worker.port.emit("QtyProvided", order);
                            order.status = "QtyProvided";
                        }
                    });
                    worker.port.on("QtyOrdered", function(skuNumber){
                        if(order.skuNumber == skuNumber){
                            order.status = "QtyOrdered";
                        }
                    });
                }
            }
        }
    );     
}

exports.main = function (options, callbacks) {
    initialize(options);
};
