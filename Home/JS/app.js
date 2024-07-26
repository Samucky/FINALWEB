document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'sk_test_575455ab0ec53162e74107638d95109373ae21b8f5f69';
    const url = 'https://api.chec.io/v1/products';

    const options = {
        method: 'GET',
        headers: {
            'X-Authorization': apiKey
        }
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del producto');
            }
            return response.json();
        })
        .then(data => {
            const products = data.data;
            let productHTML = '';

            products.forEach(product => {
                productHTML += `
                    <div class="product bg-black rounded-lg shadow-lg p-4 text-white relative flex flex-col" data-id="${product.id}" data-name="${product.name}" data-price="${product.price.raw}" data-image="${product.image.url}">
                        <img id="image-${product.id}" src="${product.image.url}" alt="${product.name}" class="transition duration-500 ease-in-out blur-lg cursor-pointer rounded-md h-48 object-cover mb-4" onclick="toggleBlur('image-${product.id}')">
                        <h2 class="text-xl font-bold text-gray-200 mb-2">${product.name}</h2>
                        <p class="text-gray-400 mb-2">${product.description}</p>
                        <p class="text-gray-400 mb-4">${product.price.formatted_with_symbol}</p>
                        <div class="mt-auto">
                            <div class="flex justify-between gap-2">
                                <button class="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 active:bg-blue-400 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none vera" data-id="${product.id}">Ver</button>
                                <button class="bg-orange-500 text-white w-full py-2 rounded-lg hover:bg-orange-800 active:bg-orange-400 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none add-to-cart">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            const productContainer = document.getElementById('most-sold');
            productContainer.innerHTML = productHTML;

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const product = this.closest('.product');
                    const id = product.getAttribute('data-id');
                    const name = product.getAttribute('data-name');
                    const price = parseFloat(product.getAttribute('data-price'));
                    const image = product.getAttribute('data-image');

                    cart.push({ id, name, price, image });
                    saveCart();
                    showAlert(`${name} ha sido agregado al carrito.`, 'success');
                });
            });

            document.querySelectorAll('.vera').forEach(button => {
                button.addEventListener('click', function() {
                    const product = this.closest('.product');
                    const id = product.getAttribute('data-id');
                    window.location.href = `../html/product.html?id=${id}`;
                });
            });

        })
        .catch(error => {
            console.error('Error:', error);
            const productContainer = document.getElementById('most-sold');
            productContainer.innerHTML = `<p>Error al cargar los productos.</p>`;
            showAlert('Error al cargar los productos.', 'error');
        });
});

const cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function toggleBlur(imageId) {
    const image = document.getElementById(imageId);
    image.classList.toggle('blur-lg'); // Toggle blur effect
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        const searchTerm = document.getElementById('searchInput').value.trim();
        if (searchTerm !== '') {
            window.location.href = `busquedas.html?q=${encodeURIComponent(searchTerm)}`;
        } else {
            showAlert('Por favor, ingresa un término de búsqueda válido.', 'error');
        }
    }
}

function showAlert(message, type) {
    Swal.fire({
        title: type === 'success' ? 'Éxito' : 'Error',
        text: message,
        icon: type,
        confirmButtonText: 'Aceptar',
        timer: 1500, // Ocultar la alerta después de 1.5 segundos
        timerProgressBar: true,
        showCloseButton: true
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');

    // Open menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close menu
    menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = ''; // Allow scrolling
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = ''; // Allow scrolling
        }
    });
});
