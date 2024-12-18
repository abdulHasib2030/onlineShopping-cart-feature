
# Cart Feature Documentation

This project implements a shopping cart feature that allows users to add products, select options (image, color, size, quantity), and proceed to checkout. The cart data is stored in localStorage to persist across page reloads, and users can view product details in a modal before completing their purchase. There are two versions of this feature:

1. **Vanilla JavaScript Version:** This version is developed using basic HTML, Tailwind CSS, JavaScript and font awesome icon (without any external libraries).

2. **React Version:** This version is developed using React.js, Tailwind CSS, React-icons, leveraging the power of reusable components and the React state management.
Both versions offer the same core functionality but differ in implementation due to the distinct nature of Vanilla JavaScript and React.

# 🚀 Features

### 1.🎨 Cart Item Color Selection & Image Update 
- When a color is selected, the product image will dynamically change to reflect the selected color.
### 2.📏🔢 Size and Quantity Selection
- The system prompts users to select a size and quantity before they can add an item to the cart. 
- If the user attempts to add an item without selecting a size or quantity, a message will appear asking them to select these options.
### 3.🔒 Cart Item Permissions
- Permissions are added to ensure that a product is only added to the cart when all required selections (size and quantity) are made.

### 4✅ Handling Duplicate Items with the Same Size
- When the user adds the same item with the same size to the cart, the system will increase the quantity of the existing item in the cart instead of adding a duplicate.
- A notification message will inform the user that the quantity of the existing item has been updated.
- This feature ensures that the cart does not contain duplicate items, thereby simplifying the checkout process and improving the user's experience.

### 5.🛍️ Cart Display and Checkout Button 
- The cart button click will display the number of items added to the checkout.
- When checkout button clicked, a modal will open showing detailed information about each cart item, including:
    - Product image
    - Color
    - Size
    - Quantity
    - Price
    - Total quantity and total price
- Two buttons appear in the modal:
    - Continue Shopping button: Closes the modal and allows the user to continue adding more items to the cart.
    - Checkout button: Once the user clicks Checkout in the modal, all products in the cart are removed from the local storage.

### 6.💾 LocalStorage Cart Storage 
- All cart data (such as selected products, image, quantities, colors, etc.) is stored in local storage and can be retrieved when the page is loaded again.



## 🔗 Live Links
[HTML-Vanilla JS Version](https://cart-feature-vanilajs.netlify.app/)

[React Version](https://cart-feature-react.netlify.app/)