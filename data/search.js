

// Search and order the product on samsclub site

var searchProduct = function(skuNumber) {
    if (skuNumber){
        var searchBox = document.querySelector("input#searchBar");
        var searchBox2 = document.querySelector("input#id-search-bar");

        if(searchBox){
        searchBox.value = skuNumber;
        var searchButton = document.querySelector("form#searchFormId input[type=image]");
    if (searchButton){
            self.port.emit("Searched", skuNumber);
        setTimeout(function(){
            searchButton.click();
        }, 1200);

        }
        }

    }
};
self.port.on("Search", searchProduct);


    var qtyInputBox =  $("input#delqty");


    if (qtyInputBox.length) {
        // qtyInputBox.val(10);
        var skuNumberContainer = $("span[itemprop='productID']");
        var skuNumber;
       // console.log("SKU COntainer",skuNumberContainer);
        if (skuNumberContainer.length){
            skuNumber = skuNumberContainer.text();
            console.log("SKU Number On Search",skuNumber);
            self.port.emit("GetQty", skuNumber);
            self.port.on("QtyProvided", function(order){
                console.log("Order Info",order);
                console.log("condition debug ",order.skuNumber + " | " +   skuNumber);
              //  if (order && order.skuNumber === skuNumber) {

                if(1){

                    console.log("I am from success order");
                    qtyInputBox.val(order.qty); 


                    var orderButton = $("button#addtocartsingleajaxonline");

                    console.log('Order Button',orderButton );
                    if (orderButton) {
                        self.port.emit("QtyOrdered", skuNumber);

                            orderButton.click();
                            /* setTimeout(function(){
                console.log("Order timeour triggered");
                            var viewCartCheckoutButton = $(".btnWOtext > a");
                            //viewCartCheckoutButton.prop( "onclick", null );
                            console.log("View Cart Button", viewCartCheckoutButton);
                             console.log("View Cart Button", viewCartCheckoutButton.attr("href"));
                             //window.location = viewCartCheckoutButton.attr("href");
                            viewCartCheckoutButton.click();
                        }, 5000); */

                        

                    }

                }
            });
        }
    }









  



$("button#addtocartsingleajaxonline").on('click',function() {
    var existCondition = setInterval(function() {
        console.log("Check View Cartt button");
         var viewCartCheckoutButton = $(".btnWOtext > a > span");
 if (viewCartCheckoutButton.length) {
    console.log("Exists!");

        console.log("viewCartCheckoutButton",viewCartCheckoutButton);
        viewCartCheckoutButton.click();

 clearInterval(existCondition);
   
 }
}, 100); // check every 100ms
  
});
//checkout click









/***function clickCheckOut(time){
    var checkOutButton = document.querySelector('button#addtocartsingleajaxonline');
    document.contains(someReferenceToADomElement);
}**/


