
fetch ('data.json').then(response=>response.json())
.then(data=>{
    
    const desserts=document.querySelectorAll('.dessert');
    data.forEach((item, index) => {
        if (index < desserts.length) { 
            
            const div = document.createElement('div');
            const nameSpan=document.createElement('span');
            const category=document.createElement('span');
            const priceSpan=document.createElement('span');
            
            category.textContent = `${item.category}`;
            nameSpan.textContent = `${item.name}`;
            priceSpan.textContent = `$${item.price}`;
            div.classList.add('description');
            category.classList.add('category');
            nameSpan.classList.add('name');
            priceSpan.classList.add('price');
            div.appendChild(category);
            div.appendChild(nameSpan);
            div.appendChild(priceSpan);
            desserts[index].appendChild(div); 

    
        };
        
        
    });
});


const cart={};
const confirm=document.getElementById('confirm-button');
function handleOrderButtonClick(productName, productPrice) {
    addToCard(productName, productPrice);
    styleChange(productName); 
    
    confirm.style.display='inline-block';
}
function styleChange(productName) {
    const orderButton=document.getElementById(`orderButton-${productName}`);
    const countButton=document.getElementById(`counterButton-${productName}`);
    const image=document.getElementById(`image-${productName}`);
    const text=document.getElementById(`text-${productName}`);
    const targetImageId=orderButton.getAttribute('data-target');
    const targetImage=document.getElementById(targetImageId);
    const productCount = cart[productName] ? cart[productName].count : 0;

    if (productCount < 1) {
        countButton.style.display = 'none'; 
        image.style.display = 'block'; 
        text.style.display = 'block';
        targetImage.classList.remove('imageshow');
        orderButton.classList.remove('orderItem');
    } else {
        targetImage.classList.add('imageshow');
        orderButton.classList.add('orderItem');
        countButton.style.display = 'block'; 
        image.style.display = 'none'; 
        text.style.display = 'none';
    }

}
        



const img=document.getElementById('image-cart');

function addToCard(productName,productPrice){
    if (!cart[productName]) {
        cart[productName] = { price: productPrice, count: 0 };
    }
    
    cart[productName].count++;
    styleChange(productName)
    updateCart();
    updateCount(productName);
}
function removeFromCart(productName){
    if (cart[productName]){
        cart[productName].count--;
        
        if(cart[productName].count<=0){
            delete cart[productName];
            img.style.display='block';
            confirm.style.display='none';
        }
        styleChange(productName)
        updateCart();
        updateCount(productName);
    }

}

function updateCart(){

    const cartItems=document.getElementById('cart-items');
    const totalTitle=document.getElementById('total-title');
    const totalAmount=document.getElementById('total-amount');
    const message=document.getElementById('message');
    message.style.display='none';
    cartItems.innerHTML='';
    let total=0;
    
    for (const [productName, item] of Object.entries(cart)){
        img.style.display='none';
        const li=document.createElement('li');
        const span=document.createElement('span')
        const price=document.createElement('span');
        li.classList.add('product-cart');
        span.classList.add('count-span');
        price.classList.add('price-cart');
        li.textContent=`${productName}`
        span.textContent =` x ${item.count}`;
        amount=item.price*item.count;
        price.textContent=`$${item.price} ` +  `$${amount} `;
        cartItems.appendChild(li);
        cartItems.appendChild(span);
        cartItems.appendChild(price);
        total+=item.price*item.count;

    }
    totalTitle.textContent='order total';
    totalAmount.textContent=` $ ${total}`;
    
    
}

function updateCount(productName) {
    const cartP = document.getElementById('cart');
    if (cart[productName]) {
        cartP.textContent = `Your Cart  ( ${cart[productName].count})`;
        const quantitySpan = document.getElementById(`count-${productName}`);
        quantitySpan.textContent = cart[productName].count;
    } else {
        cartP.textContent = `Your Cart 0`; 
    }
}