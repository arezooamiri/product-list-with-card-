const buttonActions=document.getElementsByClassName('orderButton');
const calcButton=document.getElementById('calc');
let count = 0;
for (let buttonAction of buttonActions){
    buttonAction.addEventListener('click',()=>{
        const targetImageId=buttonAction.getAttribute('data-target');
        const targetImage=document.getElementById(targetImageId);
        
        if (targetImage) {
            targetImage.classList.toggle('imageshow');
        }
    });
}
