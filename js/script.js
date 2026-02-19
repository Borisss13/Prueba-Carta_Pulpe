// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll & Navigation with ID adjustment
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 140; // Height of sticky headers
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

// Intersection Observer for Animations and Active Link State
const observerOptions = {
    threshold: 0.1,
    rootMargin: "-100px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Update category navigation active state
            if (entry.target.classList.contains('menu-category')) {
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                const id = entry.target.id;
                const activeBtn = document.querySelector(`.category-btn[onclick*="'${id}'"]`);
                if (activeBtn) activeBtn.classList.add('active');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Image Modal Logic
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-content');
const modalCaption = document.querySelector('.modal-caption');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.menu-item').forEach(item => {
    // Prevent modal opening when clicking the "Add" button
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) return;

        const imgSrc = item.getAttribute('data-image');
        const itemNameEl = item.querySelector('.item-name');

        if (imgSrc && itemNameEl) {
            modalImg.src = imgSrc;
            modalCaption.innerText = itemNameEl.innerText;
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
    });
});

function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        modalImg.src = '';
    }, 400);
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});


// --- DYNAMIC MENU RENDERING ---
function renderMenu() {
    if (!window.menuData) return;

    window.menuData.forEach(category => {
        const categorySection = document.getElementById(category.id);
        if (!categorySection) return;

        const grid = categorySection.querySelector('.menu-grid');
        if (!grid) return;

        grid.innerHTML = '';

        category.items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = item.isHero ? 'menu-item menu-item-hero' : 'menu-item';
            if (item.image) {
                itemEl.setAttribute('data-image', item.image);
            }

            let content = '';
            if (item.isHero && item.image) {
                content = `
                    <div class="hero-image-placeholder">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <div class="item-name" style="font-size: 1.8rem; margin-bottom: 0.75rem; color: var(--color-accent);">${item.name}</div>
                        <div class="item-desc" style="margin-bottom: 1rem;">${item.description || ''}</div>
                        <div class="item-price" style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">€${item.price.toFixed(2).replace('.', ',')}</div>
                        <button class="add-btn" onclick="addToCart(this)">Añadir al Pedido</button>
                    </div>
                `;
            } else {
                const imgHtml = item.image ? `<div class="item-image-wrap"><img src="${item.image}" alt="${item.name}"></div>` : '';
                content = `
                    ${imgHtml}
                    <div class="item-header">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">€${item.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    ${item.description ? `<p class="item-desc">${item.description}</p>` : ''}
                    <button class="add-btn" onclick="addToCart(this)">Añadir al Pedido</button>
                `;
            }

            itemEl.innerHTML = content;
            grid.appendChild(itemEl);
        });
    });

    // Re-bind image modal logic for new items
    bindImageModals();
}

function bindImageModals() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-btn')) return;

            const imgSrc = item.getAttribute('data-image');
            const itemNameEl = item.querySelector('.item-name');

            if (imgSrc && itemNameEl) {
                modalImg.src = imgSrc;
                modalCaption.innerText = itemNameEl.innerText;
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderSpecialMenu();
    renderMenu();
});

// --- SPECIAL MENU RENDERING ---
function renderSpecialMenu() {
    const special = window.specialMenu;
    const container = document.getElementById('special-menu-container');
    if (!special || !special.active || !container) {
        if (container) container.style.display = 'none';
        return;
    }

    container.style.display = 'block';
    document.getElementById('special-menu-title').innerText = special.title;
    document.getElementById('special-menu-desc').innerText = special.description;
    document.getElementById('special-menu-price').innerText = special.price;

    const fillList = (id, items) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = '';
        if (items && items.length > 0) {
            items.forEach(item => {
                const li = document.createElement('li');
                li.style.cssText = 'padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 500;';
                li.innerHTML = `<i class="fas fa-chevron-right" style="color:var(--color-primary); font-size:0.75rem; margin-right:0.75rem;"></i> ${item}`;
                el.appendChild(li);
            });
        } else {
            el.innerHTML = '<li style="color:var(--color-text-dim); font-style:italic;">No disponible</li>';
        }
    };

    fillList('special-firsts', special.firstCourses);
    fillList('special-seconds', special.secondCourses);
    fillList('special-desserts', special.desserts);
}

/* --- SHOPPING CART LOGIC --- */

let cart = [];
const DELIVERY_PHONE = "34664566191"; // Replace with real WhatsApp Business number

const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartFloatBtn = document.getElementById('cartFloatBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalDisplay = document.getElementById('cartTotalDisplay');

// Toggle Cart
function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

cartFloatBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Parser helper
function parsePrice(priceStr) {
    // Remove currency symbol and replace comma with dot
    return parseFloat(priceStr.replace(/[€\s]/g, '').replace(',', '.'));
}

// Add Handler
function addToCart(btnElement) {
    // Find parent container
    const parent = btnElement.parentElement;

    // Find name and price within the parent
    // Note: Structure differs slightly between hero item and regular items
    // But both have .item-name and .item-price classes as children of parent or parent's previous sibling container

    // Try finding directly in parent (Works for Hero item and Bocadillos)
    let nameEl = parent.querySelector('.item-name');
    let priceEl = parent.querySelector('.item-price');

    // If not found, try finding in .item-header sibling (Works for standard items)
    if (!nameEl) {
        const header = parent.querySelector('.item-header');
        if (header) {
            nameEl = header.querySelector('.item-name');
            priceEl = header.querySelector('.item-price');
        }
    }

    if (nameEl && priceEl) {
        const name = nameEl.innerText;
        const price = parsePrice(priceEl.innerText);

        // Check if item exists
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        renderCart();

        // Optional: Show feedback
        const originalText = btnElement.innerText;
        btnElement.innerText = "¡Añadido!";
        btnElement.style.background = "#25D366";
        btnElement.style.color = "#fff";
        setTimeout(() => {
            btnElement.innerText = originalText;
            btnElement.style.background = "";
            btnElement.style.color = "";
        }, 1000);
    }
}

// Render Cart
function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); margin-top: 2rem;">Tu cesta está vacía</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            totalItems += item.quantity;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-info">
                    <span class="cart-item-title">${item.name}</span>
                    <span class="cart-item-price">€${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}</span>
                </div>
                <div class="cart-item-actions">
                    <button class="cart-qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="cart-qty-btn" style="color: #ff4d4d; margin-left: 0.5rem;" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    // Update Totals
    const formattedTotal = '€' + total.toFixed(2).replace('.', ',');
    cartTotalDisplay.innerText = formattedTotal;

    // Update Floating Button
    cartFloatBtn.innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        <span>${formattedTotal} (${totalItems})</span>
    `;
}

// Update Quantity
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        renderCart();
    }
}

// Remove Item
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// Checkout WhatsApp
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Tu cesta está vacía");
        return;
    }

    const name = document.getElementById('customerName').value.trim();
    const address = document.getElementById('customerAddress').value.trim();

    if (!name || !address) {
        alert("Por favor, completa tu nombre y dirección para el delivery.");
        return;
    }

    let message = `Hola, quiero realizar un pedido a domicilio:%0A%0A`;
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `- ${item.quantity}x ${item.name} (€${itemTotal.toFixed(2).replace('.', ',')})%0A`;
    });

    message += `%0A*TOTAL: €${total.toFixed(2).replace('.', ',')}*%0A%0A`;
    message += `*Datos de Entrega:*%0A`;
    message += `Nombre: ${name}%0A`;
    message += `Dirección: ${address}`;

    const url = `https://wa.me/${DELIVERY_PHONE}?text=${message}`;
    window.open(url, '_blank');

    // Clear Cart and Close Sidebar
    cart = [];
    renderCart();
    toggleCart();

    // Optional: Reset form fields?
    // document.getElementById('customerName').value = '';
    // document.getElementById('customerAddress').value = '';
}
