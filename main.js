const totalTitle=document.getElementById('total-title');
const totalAmount=document.getElementById('total-amount');


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
const confirmButton=document.getElementById('confirm-button');
function handleOrderButtonClick(productName, productPrice) {
    addToCard(productName, productPrice);
    styleChange(productName); 
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


const message=document.getElementById('message');
const img=document.getElementById('image-cart');
function addToCard(productName,productPrice){
    if (!cart[productName]) {
        cart[productName] = { price: productPrice, count: 0 };
    }
   
    cart[productName].count++;
    styleChange(productName)
    updateCart();
    updateCount();
};

function removeFromCart(productName){
    if (cart[productName]){
        cart[productName].count--;
        
        if(cart[productName].count<=0){
            updateCount();
            delete cart[productName];
            img.style.display='flex';
            
        }
        styleChange(productName)
        updateCart();
        
    }

}

function updateCart(){

    const cartItems=document.getElementById('cart-items');
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

function updateCount() {
    const cartPreview = document.getElementById('cart');
    let cartShowItem=0;
    for (const [productName, item] of Object.entries(cart)){
        
        if (cart[productName]){
            
            
            cartShowItem+=item.count;
            if (cartShowItem>0){
                message.style.display='none';
                totalAmount.style.display='block';
                totalTitle.style.display='block';
                confirmButton.style.display='block';


            }
            else{
                totalAmount.style.display='none';
                totalTitle.style.display='none';
                message.style.display='block';
                confirmButton.style.display='none';
            }
            cartPreview.textContent = `Your Cart  ( ${cartShowItem})`;
            const quantitySpan = document.getElementById(`count-${productName}`);
            quantitySpan.textContent = item.count;
        }
        else {
            cartPreview.textContent = `Your Cart ${0}`; 
        };
    };
    
    };
    const confrimsummary=document.getElementById('confirm-summary')
    confirmButton.addEventListener('click',()=>{
        const orderSummary=document.getElementById('order-summary');
        confrimsummary.style.display='block';
    
        for (const [productName,item] of  Object.entries(cart)){
            

        }
        
    });
