const cartBtn = document.querySelector('#cart-btn')
const chectoutBtn = document.querySelector('#checkout-btn')
const chectoutValue = document.querySelector('#checkout-value')
const productImg = document.querySelector('#product-img')

// error msg //
const notification = document.querySelector('#notification')


let cartCount = 0;
let size = "";
// --------------- size choose ----------------//
const sizeChoose = (id) => {
    const sizeBtn = document.querySelector(`.sizeAdd-${id}`)
    sizeBtn.classList.add('border-[#6576FF]')

    for (let i = 1; i < 5; i++) {

        const sizeBtnInner = document.querySelector(`.sizeAdd-${i}`)
        if (id === i) {
            if (id == 1) size = 's'
            if (id == 2) size = 'm'
            if (id == 3) size = 'l'
            if (id == 4) size = 'xl'
            continue;
        }
        console.log(sizeBtnInner);
        sizeBtnInner.classList.remove('border-[#6576FF]')

    }
}

// --------------- cart increase Decrease ------------//
let count = 0;
const cartDecreaseIncrease = (value) => {
    const cartValue = document.getElementById('cart-value')
    if (value === 'misus') {
        if (count > 0) {
            count -= 1
        }
    }
    else {
        count += 1
    }
    cartValue.innerText = count
}

// -------------- size wise price pixed function --------------//
const sizePrice = (s) =>{
    if (s === 's'){
        return 69;
    }
    else if(s === 'm'){
        return 79
    }
    else if (s=== 'l') return 89
    else if (s === 'xl') return 99
}



cartBtn.addEventListener('click', () => {
    if (!size) {
        notification.classList.remove('hidden')
    
        notification.innerHTML = `
         <div class="bg-red-50 border-b border-red-400 text-red-800 text-sm p-4 flex justify-between">
            <div>
                <div class="flex items-center gap-4 text-lg">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <p >
                    Selecy size.
                    </p>
                    <i class="fa-solid fa-xmark" onclick="closeError()"></i>
                </div>
            </div>
           
        </div>
        `


        return 
    }
   else if (count < 1) {
        notification.classList.remove('hidden')
        notification.innerHTML = `
        <div class="bg-red-50 border-b border-red-400 text-red-800 text-sm p-4 flex justify-between">
           <div>
               <div class="flex items-center gap-4 text-lg">
                   <i class="fa-solid fa-circle-exclamation"></i>
                   <p id="error-msg">
                   Selecy quantity.
                   </p>
                   <i class="fa-solid fa-xmark" onclick="closeError()"></i>
               </div>
           </div>
          
       </div>
       `
        return 
    }
   else{
    notification.classList.add('hidden')
   }


    let productData = []
    let flag = true;
    const item = localStorage.getItem('product')
    if (item) {
        productData = JSON.parse(item)
        productData.map(ite => {
            if (ite.color === localStorage.getItem('color') && ite.size === size) {
                ite.qnt += count;
                ite.price = ite.qnt * sizePrice(size)
                flag = false

            }
        })
         

        const product = {
            color: localStorage.getItem('color'),
            img: localStorage.getItem('imgSrc'),
            qnt: count,
            size: size,
            price: count * sizePrice(size)
        }

        if (flag) {
            productData.push(product)
        }
    }
    else {
        const localColor = localStorage.getItem('color') 
        const imglocal = localStorage.getItem('imgSrc')
        if (!localColor ){
            localStorage.setItem('color','Purple' )
        }
        if(!imglocal){
            localStorage.setItem('imgSrc', "./assets/img3.jpeg")
        }
        const product = {
            color: localStorage.getItem('color'),
            img: localStorage.getItem('imgSrc'),
            qnt: count,
            size: size,
            price: count * sizePrice(size)
            
        }
        productData.push(product)

    }


    localStorage.setItem('product', JSON.stringify(productData))

    // console.log();
    chectoutBtn.classList.remove('hidden')
    chectoutValue.textContent =JSON.parse(localStorage.getItem('product')).length;
})



// close error 
// const closeError = document.querySelector('#close-error')
// closeError.addEventListener('click', ()=>{
//     notification.classList.add('hidden')
// })
const closeError = () =>{
    notification.classList.add('hidden')
}


// ---------- color change image change ---------------//
const img = localStorage.getItem('imgSrc', '')
if (img) {
    productImg.src = img
}
else {
    localStorage.setItem('color', "Purple")
    localStorage.setItem('imgSrc', "./assets/img3.jpeg")

}


if (localStorage.getItem('color') === 'Purple') {
    const changeColor = document.querySelector(`.change-1`)
    changeColor.classList = `border-2 border-[#816BFF] p-1 rounded-full change-1`
}
else if (localStorage.getItem('color') === 'Blue') {
    const changeColor = document.querySelector(`.change-2`)
    changeColor.classList = `border-2 border-[#1FCEC9] p-1 rounded-full change-2`
}
else if (localStorage.getItem('color') === 'Cyan') {
    const changeColor = document.querySelector(`.change-3`)
    changeColor.classList = `border-2 border-[#4B97D3] p-1 rounded-full change-3`
}
else if (localStorage.getItem('color') === 'Black') {
    const changeColor = document.querySelector(`.change-4`)
    changeColor.classList = `border-2 border-[#3B4747] p-1 rounded-full change-4`
}


const colorChoose = (id, exectItem) => {

    if (id == 1) {
        localStorage.setItem('imgSrc', "./assets/img3.jpeg")
        productImg.src = localStorage.getItem('imgSrc')
        localStorage.setItem('color', 'Purple')
        exectItem.classList = `border-2 border-[#816BFF] p-1 rounded-full change-1`

    }
    else if (id === 2) {
        localStorage.setItem('imgSrc', "./assets/img2.jpeg")
        productImg.src = localStorage.getItem('imgSrc')
        localStorage.setItem('color', 'Blue')
        exectItem.classList = `border-2 border-[#1FCEC9] p-1 rounded-full change-2`

    }
    else if (id === 3) {
        localStorage.setItem('imgSrc', "./assets/img4.jpeg")
        productImg.src = localStorage.getItem('imgSrc')
        localStorage.setItem('color', 'Cyan')
        exectItem.classList = `border-2 border-[#4B97D3] p-1 rounded-full change-3`
    }
    else if (id === 4) {
        localStorage.setItem('imgSrc', "./assets/img1.jpeg")
        productImg.src = localStorage.getItem('imgSrc')
        localStorage.setItem('color', 'Black')
        exectItem.classList = `border-2 border-[#3B4747] p-1 rounded-full change-4`
    }

    for (let i = 1; i < 5; i++) {
        const changeColor = document.querySelector(`.change-${i}`)
        if (i === id) {
            continue
        }
        else {
            changeColor.classList = `change-${i}`
        }

    }

}


// --------------- open and close modal ------------//
const modal = document.querySelector('#modal')
const showModal = document.querySelector('#showModal')


const tableTbody = document.querySelector('#table-tbody')
const totalCartItem = document.querySelector('#total-cart-item')
const totalPrice = document.querySelector('#total-price')
showModal.addEventListener('click', () => {
    modal.classList.remove('hidden')
     let totalP = 0
     let totalItem = 0;
    const cartProduct = JSON.parse(localStorage.getItem('product'))

    if(cartProduct){
 
    cartProduct.map(item => {
        
        const tr = document.createElement('tr')

        tr.classList = 'border-b space-x-12'
        const { color, img, qnt, size, price } = item;
        totalP += price
        totalItem += qnt;
        tr.innerHTML = `
        <td class="py-2 px-4">
        <div class="flex items-center">
            <div class="flex-shrink-0 mr-2 sm:mr-3"><img class="w-16 rounded-md" src=${img}  alt="img not found"></div>
            <div class="font-medium text-gray-400">Classy Modern Smart Watch</div>
        </div>
    </td>
    <td class="py-2 px-4">
        <div class="text-left font-semibold ">${color}</div>
    </td>
    <td class="py-2 px-4">
        <div class="text-left font-bold uppercase" >${size}</div>
    </td>
    <td class="py-2 px-4">
        <div class=" text-center font-bold">${qnt}</div>
    </td>
    <td class="py-2 px-4">
        <div class="text-center font-bold">$ ${price}</div>
    </td>
        `

        tableTbody.appendChild(tr)


    })

    totalCartItem.innerText = totalItem
    totalPrice.innerText = `$ ${totalP}`
           
}
  else{
    
  }

})

const closeModal = () => {
    modal.classList.add('hidden')
    tableTbody.innerHTML = ''
}

const checkOut = () =>{
    localStorage.clear('product')
    modal.classList.add('hidden')
    chectoutValue.textContent = 0
    totalCartItem.innerText = 0
    totalPrice.innerText = 0
    tableTbody.innerHTML = ''
    notification.classList.remove('hidden')
    notification.innerHTML =`
    <div class="bg-red-50 border-b border-green-400 text-green-800 text-sm p-4 flex justify-between">
            <div>
                <div class="flex items-center gap-4 text-lg">
                    <i class="fa-solid fa-check"></i>
                    <p >
                     Thanks you are purchase our product.
                    </p>
                    <i class="fa-solid fa-xmark" onclick="closeError()"></i>
                </div>
            </div>
           
        </div>
    `
}
