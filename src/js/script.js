import image1 from '../../images/image-product-1.jpg';
import image2 from '../../images/image-product-2.jpg';
import image3 from '../../images/image-product-3.jpg';
import image4 from '../../images/image-product-4.jpg';
import deleteIcon from '../../images/icon-delete.svg';

const imagePaths = [image1, image2, image3, image4];
const imageContainer = document.querySelector('.images');
const imageLarge = document.querySelector('.images__img--large--n');
const imageSmall = document.querySelectorAll('.images__img--small--n');
const imageBox = document.querySelectorAll('.images__img__box--n');

// Non-popup arrows that appear below 800px of viewport width
const arrowLeft = document.querySelector('.arrow--left');
const arrowRight = document.querySelector('.arrow-right');



// Popup elements
const imageBoxP = document.querySelectorAll('.images__img__box--y')
const imageLargeP = document.querySelector('.images__img--large--y');
const imageSmallP = document.querySelectorAll('.images__img--small--y');
const arrowLeftPopup = document.querySelector('.popup__arrow--left');
const arrowRightPopup = document.querySelector('.popup__arrow--right');
const btnClose = document.querySelector('.images__popup--content__close');
const popup = document.querySelector('.images__popup');

const popupClose = ['.images__popup--content__close', '.images__popup--opacity'];

let curSlide = 1;
const maxSlide = imageBoxP.length;

imageSmall.forEach((image, i) => image.setAttribute("data-imglarge", imagePaths[i]))
imageSmallP.forEach((image, i) => image.setAttribute("data-imglarge", imagePaths[i]))

const boxClick = function(parent, element){
    if(parent)
        parent.forEach(box => box.classList.remove('images__img__box--clicked'));

    element.classList.add('images__img__box--clicked');
}
boxClick(null, imageBox[curSlide-1]);
boxClick(null, imageBoxP[curSlide-1]);

popupClose.forEach(className => {
    document.querySelector(className).addEventListener('click', function(){
        popup.classList.add('hidden--img');
    })
})

imageContainer.addEventListener('click', function(e){
    const click = e.target;

    if(click.classList.contains('images__img__box')){
        if(click.classList.contains('images__img__box--n')){

            boxClick(imageBox, click);
        }
        
        if(click.classList.contains('images__img__box--y')){
            boxClick(imageBoxP, click);
            curSlide = click.dataset.curslide;
        }

        

        if(click.classList.contains('images__img__box--n'))
            imageLarge.src = click.previousElementSibling.dataset.imglarge;
        
        if(click.classList.contains('images__img__box--y'))
            imageLargeP.src = click.previousElementSibling.dataset.imglarge;
    }
    if(click.classList.contains('images__img--large--n')){
        popup.classList.remove('hidden--img');
    }
})



const arrowDisplayImage = function(){
    boxClick(imageBoxP, imageBoxP[curSlide - 1])
    imageLargeP.src = imageSmallP[curSlide - 1].dataset.imglarge;
} 
arrowLeftPopup.addEventListener('click', function(){
    if(curSlide <= 1)
        curSlide = maxSlide;
    else curSlide--;

    arrowDisplayImage();
    
})

arrowRightPopup.addEventListener('click', function(){
    if(curSlide >= maxSlide)
        curSlide = 1;
    else curSlide++;

    arrowDisplayImage();
    
})

// Add to cart


const itemTitle = document.querySelector('.about--h1');
const itemPrice = document.querySelector('.about__price--new-p');
const quantityParent = document.querySelector('.about__quantity');
const quantityMinus = document.querySelector('.about__quantity--number-div--1');
const quantityPlus = document.querySelector('.about__quantity--number-div--3');
const quantityEl = document.querySelector('.about__quantity--number-div--2');
const cartItems = document.querySelector('.nav__dropdown--content--items');
const cartCheckout = document.querySelector('.nav__dropdown--content--checkout');
const emptyMessage = '<p class="nav__dropdown--empty">Your cart is empty.</p>';
const cartQuantity = document.querySelector('.nav__dropdown--cart--quantity');
let quantity = Number(quantityEl.textContent);
let quantityAll = 0;
let itemCount = 0;

quantityParent.addEventListener('click', function(e){
    const click = e.target;
    if(click.closest('.about__quantity--number-div--1')){
        if(quantity === 1) return;

        quantity--;
        quantityEl.textContent = quantity;
    }
    if(click.closest('.about__quantity--number-div--3')){
        quantity++;
        quantityEl.textContent = quantity;
    }
    if(click.closest('.about__quantity--cart')){
    
        
        const htmlItem = `
            <div class="nav__dropdown__checkout">
                <div class="nav__dropdown__checkout--item">
                    <div class="nav__dropdown__checkout--item__div nav__dropdown__checkout--item__div--1">
                        <img src="${image1}" alt="Item" class="nav__dropdown--img">
                    </div>
                    <div class="nav__dropdown__checkout--item__div nav__dropdown__checkout--item__div--2">
                        <p class="nav__dropdown--content--title">${itemTitle.textContent}</p>
                        <p class="nav__dropdown--content--price">${itemPrice.textContent} x ${quantity} <span class="bold">$${Number(itemPrice.textContent.slice(1)) * quantity}.00</span></p>
                    </div>
                    <div class="nav__dropdown__checkout--item__div nav__dropdown__checkout--item__div--3 dropdown--deleteicon" data-quantity="${quantity}">
                        <img class="nav__dropdown__checkout--item__div--3--icon" src="${deleteIcon}" alt="Delete">
                    </div>
                </div>
            </div>
        `
        const htmlCheckout = `
            <div class="nav__dropdown__checkout--btn">Checkout</div>
        `
        if(itemCount === 0) cartItems.textContent = '';
        
        itemCount++;
        cartItems.insertAdjacentHTML('afterbegin', htmlItem);
        
        if(!document.querySelector('.nav__dropdown__checkout--btn')){
            cartCheckout.insertAdjacentHTML('beforeend', htmlCheckout);
        }
        quantityAll += quantity;
        if(quantityAll > 0){
            if(cartQuantity.classList.contains('hidden')){
                cartQuantity.classList.remove('hidden');
            }
            cartQuantity.textContent = quantityAll;
        }

    }
})

cartItems.addEventListener('click', function(e){
    const click = e.target;

    if(click.closest('.dropdown--deleteicon')){
        cartItems.removeChild(click.closest('.nav__dropdown__checkout'));
        itemCount--;
        quantityAll -= Number(click.closest('.dropdown--deleteicon').dataset.quantity);
        cartQuantity.textContent = quantityAll;
        if(itemCount <= 0){
            cartItems.insertAdjacentHTML('beforeend', emptyMessage);
            cartCheckout.textContent = '';
            quantityAll = 0;
            cartQuantity.textContent = quantityAll;
            cartQuantity.classList.add('hidden');
        }
    }
})

// Sidebar
const tabIcon = document.querySelector('.nav--tab');
const tabContent = document.querySelector('.nav__ul');
const tabOpacity = document.querySelector('.nav__opacity');
const tabClose = document.querySelector('.nav--close');

tabIcon.addEventListener('click', function(e){
    tabContent.classList.remove('move-left');
    tabOpacity.style.height = '100vh';
    tabOpacity.style.opacity = '1';
});

[tabClose, tabOpacity].forEach(el => {
    el.addEventListener('click', function(){
        tabContent.classList.add('move-left');
        tabOpacity.style.height = '0';
        tabOpacity.style.opacity = '0';
    })
})