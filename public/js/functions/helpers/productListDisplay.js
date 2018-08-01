//get products from api cnonected to database
const productList = [];
const productListEl = document.getElementById('products');
let cart = [];
let total = 0;
const cartEl = document.getElementById('cart');
const totalEl = document.getElementById('total');
const acceptEl = document.getElementById('acceptCart');
const clearEl = document.getElementById('clearCart');
let getAndDisplay = (()=>{
  fetch('http://localhost:4242/api/products')
    .then((res)=>{
      return res.json();
    })
    .then((products)=>{
      console.log(`fetched from mongoDB ${products}`);
      for(i = 0; i < products.length; i++){
        let product = {
          id: products[i]._id,
          btnId:[`Add${products[i]._id}`],
          name: products[i].name,
          price: products[i].price,
        };
        product.Structure = `
          <li class="col-md-4 productBox productListBox" id=list${product.id}>
            <div class="container" id=${product.btnId} onclick="cartControl('${product.id}', 'add')">
              <h4>${product.name}</h4>
              <h4>price: ${product.price}</h4>
            </div>
          </li>
        `;
        productList.push(product);
        productListEl.innerHTML += product.Structure;
      };
    });
    console.log(`product list: ${productList}`);
})();
//
function cartControl(id, manipulator){
  if (manipulator == 'remove'){
    if(cart.filter(prod => (prod._id === `${id}`)).length>0){
      console.log('object in cart');
      // quantity +-
    }else if(cart.filter(prod => (prod._id === `${id}`)).quantity === 0){
      // remove
    }else{
      // ?
    }
  }else if (manipulator == 'add'){
      // MOVE MANIPULATING PRODUCT TO API SIDE . ???
      if(cart.filter(prod => (prod.id === `${id}`)).length>0){
      //if product is in the cart - change its properties and DOM elements
      console.log(`add quantity - product id: ${id} is in cart`);
        for(var i = 0; i < cart.length; i++){
          if (cart[i].id === `${id}`){
            cart[i].quantity ++;
            cart[i].cost += cart[i].price;
            let itemCost = document.getElementById(`cost${id}`);
            let itemQuant = document.getElementById(`quant${id}`);
            itemCost.innerHTML = `cost: ${cart[i].cost}`;
            itemQuant.innerHTML = `quantity: ${cart[i].quantity}`;
          }
        }
      }else{
      //if product isn't in the cart - add it there with new properties
          for(let i = 0; i < productList.length; i++){
            if (productList[i].id === `${id}`){
              let newItem = productList[i];
              newItem.quantity = 1;
              newItem.cost = productList[i].price;
              newItem.btnId = [`Add${newItem.id}`, `Minus${newItem.id}`];
              newItem.structure = `
                <li class="col-md-4 productBox" id=${newItem.id}>
                  <h4>name: ${newItem.name}</h4>
                  <h4 id="cost${id}">cost: ${newItem.cost}</h4>
                  <p id="quant${id}">quantity: ${newItem.quantity}</p>
                </li>
              `;
              cart.push(newItem);
              console.log(`add product ${id} to cart`);
              console.log(` cart: ${cart}`);
              cartEl.innerHTML += newItem.structure;
            }
            btnsDisplay(cart,acceptEl,clearEl);
          }
        }
  }else {
    //cartControl error handling
    console.log('wrong parameters on cartControl');
  }
}
//



//cart btns display
function btnsDisplay(array, x,y){
  if(array.length > 0){
    x.style.display='inline';
    y.style.display='inline';
  }else{
    x.style.display='none';
    y.style.display='none';
  }
}
btnsDisplay(cart,acceptEl,clearEl);
//
acceptEl.addEventListener("click", ()=>{
  //save cart to history:
  //need to create api endpoint, db schema, admin view
  $.ajax({
    method: "POST",
    url: "/admin/products/record",
    data: {cart:cart}
  }).done(function(){
    //prevent double sending
    $('#acceptEl').unbind('click');
  });
  //NEED TO ADD ERROR WATCHDOG & CONSOLE LOG SUCCESS !
  cartEl.innerHTML = '';
  acceptEl.style.display='none';
  clearEl.style.display='none';
  total = 0;
  cart = [];
  console.log(`clear cart`);
});
//
clearEl.addEventListener("click", ()=>{
  total = 0;
  cart = [];
  console.log(`clear cart`);
  cartEl.innerHTML = '';
  acceptEl.style.display='none';
  clearEl.style.display='none';
});
