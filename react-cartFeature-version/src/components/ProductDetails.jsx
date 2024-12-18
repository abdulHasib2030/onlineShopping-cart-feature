import React, { useState } from 'react';
import img1 from '../assets/img3.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img1.jpeg';
import img4 from '../assets/img4.jpeg';

const ProductDetails = () => {
    const [img, setImg] = useState(localStorage.getItem('img') ||  localStorage.setItem('img', img1))
    const [color, setColor] = useState(localStorage.getItem('color') || localStorage.setItem('color', "Purple"))
    const [size, setSize] = useState('')
    const [cartCnt, setCartCnt] = useState(0)
    const [error, setError] = useState('')
   
    
//  ----------- Image Change when click color btn -------------------//
    const handleImg = (color) =>{
        setColor(color)
        if(color === 'Purple'){
            localStorage.setItem('color', color)
            localStorage.setItem('img', img1)
            setImg(img1)
            
        }
        else if (color === 'Blue'){
            localStorage.setItem('color', color)
            localStorage.setItem('img', img2)
            setImg(img2)
        }
        else if (color === 'Cyan'){
            localStorage.setItem('color', color)
            localStorage.setItem('img', img3)
            setImg(img3)
        }
        else if (color === 'Black'){
            localStorage.setItem('color', color)
            localStorage.setItem('img', img4)
            setImg(img4)
        }
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

// ------------- Add To cart Btn --------------------//
const handleAddtoCart = () => {
    if (!size){
        document.getElementById('notification').classList.remove('hidden')
        setError('Selsect size.')
        return 
    }
    else if(cartCnt< 1){
        document.getElementById('notification').classList.remove('hidden')
        setError("Select quantity.")
        return
    }
    else{
        document.getElementById('notification').classList.add('hidden')
    }

    let productData = []
    let flag = true;
    const item = localStorage.getItem('product')
    if (item) {
        productData = JSON.parse(item)
        productData.map(ite => {
            if (ite.color === localStorage.getItem('color') && ite.size === size) {
                ite.qnt += cartCnt;
                ite.price = ite.qnt * sizePrice(size)
                flag = false

            }
        })
         

        const product = {
            color: localStorage.getItem('color'),
            img: localStorage.getItem('img'),
            qnt: cartCnt,
            size: size,
            price: cartCnt * sizePrice(size)
        }

        if (flag) {
            productData.push(product)
        }
    }
    else {
        const localColor = localStorage.getItem('color') 
        const imglocal = localStorage.getItem('img')
        if (!localColor ){
            localStorage.setItem('color','Purple' )
        }
        if(!imglocal){
            localStorage.setItem('img', img1)
        }
        const product = {
            color: localStorage.getItem('color'),
            img: localStorage.getItem('img'),
            qnt: cartCnt,
            size: size,
            price: cartCnt * sizePrice(size)
            
        }
        productData.push(product)
    }

    localStorage.setItem('product', JSON.stringify(productData))
    document.getElementById("checkout-btn").classList.remove('hidden')
    document.getElementById('checkout-value').textContent =JSON.parse(localStorage.getItem('product')).length;

}

const closeNotfication = () =>{
    document.getElementById('notification').classList.add('hidden')
}


//  ------------ show Modal -----------------//
const showModal = ()=>{
    document.getElementById('modal').classList.remove('hidden')
}

    return (
        <div  >
            {/* <!-- notification --> */}
            <div id="notification" className="top-4 left-[40%] hidden fixed">
                {/* <!-- Error --> */}
                <div className="bg-red-50 border-b border-red-400 text-red-800 text-sm p-4 flex justify-between">
            <div>
                <div className="flex items-center gap-4 text-lg">
                    <i className="fa-solid fa-check"></i>
                    <p >
                     {error && error}
                    </p>
                   <p onClick={closeNotfication} className='cursor-pointer'>x</p>
                </div>
            </div>
           
        </div>
            </div>

            {/* <!-- modal --> */}
            <div id="modal"
                className="min-h-screen absolute h-full w-full mx-auto bg-black bg-opacity-50 flex items-center justify-center z-50 hidden overflow-auto">

                <div className="mx-auto bg-white py-8 px-4 rounded-md  border-gray-200 ">
                    <header className="px-5 py-4 border-gray-100">
                        <h2 className="font-semibold text-gray-800">Your Cart</h2>
                    </header>
                    <div className="p-3">
                        <div className="">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-semibold  text-gray-400 border-b ">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Item</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Color</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Size</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Qnt</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Price</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="table-tbody" className="text-sm divide-y divide-gray-100">
                                    {/* <!-- table row  --> */}

                                </tbody>
                            </table>
                            <div className="flex justify-between py-4 border-t">
                                <h3 className="font-bold text-lg ">Total</h3>
                                <div className="flex gap-8 tex-xl font-bold">
                                    <h4 id="total-cart-item"></h4>
                                    <h4 id="total-price"></h4>
                                </div>
                            </div>
                            {/* <!-- modal btn --> */}
                            <div className="flex gap-4 justify-end pt-4">
                                <button 
                                    className="border py-2 px-6 font-semibold text-black rounded-md">Continue Shopping</button>
                                <button 
                                    className="bg-[#6576ff] py-2 px-6 rounded-md text-white font-semibold">Checkout</button>
                            </div>

                        </div>
                    </div>
                </div>


            </div>


            <section className="min-h-screen w-11/12 mx-auto flex justify-center  items-center">
                <div className="lg:flex items-center gap-8 my-10 ">
                    <div className="md:w-1/2 w-full">
                        <img id="product-img" src={img} className="rounded-md" alt="" />
                    </div>
                    <div className="space-y-4 text-start">
                        {/* product title  */}
                        <h1 className="font-bold text-3xl">Classy Modern Smart watch</h1>
                        {/* product rating  */}
                        {/* <div className="rating rating-md rating-half items-center ">
                    <input type="radio" name="rating-10" className="rating-hidden" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400"
                        checked="checked" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />

                    <p className="text-sm text-gray-500 ml-4">(2 Reviews)</p>
                </div>  */}
                        {/* product price */}
                        <h4 className="text-3xl text-[#6576ff] font-bold "><del
                            className="text-xl font-normal text-gray-500">$99.00</del> $79.00</h4>
                        {/* product Description */}
                        <p className="md:w-4/5 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quod
                            pariatur, dignissimos deleniti,
                            voluptate alias, doloribus ducimus facere cum animi enim! Ipsum quos veritatis perferendis odit id
                            iure quo quasi!</p>
                        {/* product model type  */}
                        <div className="flex gap-14">
                            <div>
                                <h4 className="text-lg text-gray-500">Type</h4>
                                <h3 className="font-bold text-xl">Watch</h3>
                            </div>
                            <div>
                                <h4 className="text-lg text-gray-500">Model Number</h4>
                                <h3 className="font-bold text-xl">Forerunner 290XT</h3>
                            </div>
                        </div>
                        {/* product brand color  */}
                        <div className="space-y-2">
                            <h1 className="text-xl font-bold text-start">Band Color</h1>
                            <div className="flex gap-4 items-center">
                                <div onClick={()=>handleImg('Purple')} className={`${color === 'Purple' && 'border-2 p-1 rounded-full border-[#816bff]' }`}>
                                    <div className="w-5 rounded-full bg-[#816bff] h-5 "></div>
                                </div>
                                <div onClick={()=> handleImg('Blue')} className={`${color === 'Blue' && 'border-2 p-1 rounded-full border-[#1FCEC9]' }`}>
                                    <div className="w-5 rounded-full bg-[#1FCEC9] h-5"></div>
                                </div>
                                <div onClick={() => handleImg('Cyan')} className={`${color === 'Cyan' && 'border-2 p-1 rounded-full border-[#4b97d3]' }`}>
                                    <div className="w-5 rounded-full bg-[#4b97d3] h-5"></div>
                                </div>
                                <div onClick={() => handleImg('Black')}  className={`${color === 'Black' && 'border-2 p-1 rounded-full border-[#3b4747]' }`}>
                                    <div className="w-5 rounded-full bg-[#3b4747] h-5"></div>
                                </div>

                            </div>
                        </div>

                        {/* product size section */}
                        <div className="space-y-2 text-start">
                            <h1 className="text-xl font-bold ">Wrist Size</h1>
                            <div className="space-x-4">
                                <button onClick={()=>setSize('s')}
                                    className={`${size === 's' && 'border-[#6576FF]'} px-6 py-2 border rounded-md font-bold text-lg`}>S <span
                                        className="text-gray-500 font-normal ml-2 text-base">$69</span></button>
                                <button onClick={()=>setSize('m')}
                                    className={`${size === 'm' && 'border-[#6576FF]'} px-6 py-2 border rounded-md font-bold text-lg`}>M <span
                                        className="text-gray-500 font-normal ml-2 text-base">$79</span></button>
                                <button onClick={()=>setSize('l')}
                                    className={`${size === 'l' && 'border-[#6576FF]'} px-6 py-2 border rounded-md font-bold text-lg`}>L <span
                                        className="text-gray-500 font-normal ml-2 text-base">$89</span></button>
                                <button onClick={()=>setSize('xl')}
                                    className={`${size === 'xl' && 'border-[#6576FF]'} px-6 py-2 border rounded-md font-bold text-lg`}>XL <span
                                        className="text-gray-500 font-normal ml-2 text-base">$99</span></button>
                            </div>
                        </div>

                        {/* product card add section  */}
                        <div className="flex gap-4 items-center">
                            <div className="border rounded-md">
                                <button onClick={()=> setCartCnt(cartCnt === 0 ? 0 : cartCnt - 1)} className=" px-4 text-xl">-</button>
                                <button id="cart-value" className="border-l border-r px-4 py-1">{cartCnt}</button>
                                <button onClick={()=> setCartCnt(cartCnt +1)} className="px-4 text-xl">+</button>
                            </div>
                            <div>
                                <button onClick={handleAddtoCart}
                                    className="font-semibold text-lg py-1 px-4 bg-[#6576ff] rounded-md text-white">Add to
                                    Cart</button>
                            </div>
                            <i className="fa-regular fa-heart text-[#6576ff]"></i>
                        </div>

                    </div>
                </div>

                {/* floting checkout btn */}

            </section>


            <div className="hidden fixed bottom-2 left-[45%] " id="checkout-btn">
                <button onClick={showModal} className="bg-[#ffbb5a]  text-center  rounded-full py-3 texl-xl px-7 font-semibold">Checkout
                    <span className="py-1 px-2 bg-white rounded-md text-black" id="checkout-value"></span></button>
            </div>

        </div>
    );
};

export default ProductDetails;