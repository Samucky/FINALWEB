document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        const cartContainer = document.getElementById('cart-container');
        const totalPriceElement = document.getElementById('total-price');
        let cartHTML = '';
        let totalPrice = 0;

        if (cart.length > 0) {
            cart.forEach(item => {
                totalPrice += item.price;
                cartHTML += `
                    <div class="cart-item bg-black rounded-lg shadow-md p-4 text-white relative group flex items-center justify-between" data-id="${item.id}">
                        <div class="flex-grow">
                            <h2 class="text-xl font-bold text-gray-200">${item.name}</h2>
                            <p class="text-gray-400 mt-1 mb-2">$${item.price.toFixed(2)}</p>
                            <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:bg-red-400 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none remove-from-cart">Eliminar</button>
                        </div>
                        <img src="${item.image}" alt="${item.name}" class="h-32 w-32 rounded-md shadow-md ml-auto">
                    </div>
                `;
            });
        } else {
            cartHTML = `
                <div class="bg-black rounded-lg shadow-md p-6 text-center">
                    <p class="text-lg font-semibold text-white">Tu carrito está vacío.</p>
                </div>
            `;
        }

        cartContainer.innerHTML = cartHTML;
        totalPriceElement.textContent = totalPrice.toFixed(2);

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const id = cartItem.getAttribute('data-id');

                const itemIndex = cart.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    cart.splice(itemIndex, 1);
                    saveCart();
                    renderCart();
                    showAlert('El producto ha sido eliminado del carrito.', 'success');
                }
            });
        });
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.getElementById('clear-cart-button').addEventListener('click', function() {
        if (cart.length > 0) {
            cart.length = 0; // Clear the cart array
            saveCart();
            renderCart();
            showAlert('El carrito ha sido vaciado.', 'success');
        } else {
            showAlert('Tu carrito está vacío.', 'info');
        }
    });

    document.getElementById('checkout-button').addEventListener('click', function() {
        if (cart.length > 0) {
            Swal.fire({
                title: 'Proceso de pago iniciado',
                text: 'Redirigiendo al proceso de pago.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = `../../checkOut/index.html`;
            });
        } else {
            showAlert('Tu carrito está vacío.', 'info');
        }
    });

    function showAlert(message, type) {
        Swal.fire({
            title: type === 'success' ? 'Éxito' : (type === 'info' ? 'Información' : 'Error'),
            text: message,
            icon: type,
            confirmButtonText: 'Aceptar',
            timer: 1500, // Ocultar la alerta después de 1.5 segundos
            timerProgressBar: true,
            showCloseButton: true
        });
    }

    renderCart();
});
