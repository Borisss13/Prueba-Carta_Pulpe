// ============================================
// Admin Logic for La Pulpe - Full Rewrite
// ============================================

// --- DATA INITIALIZATION ---
let localMenuData = [];
let localSpecialMenu = {};

function initData() {
    // Load from localStorage first, fallback to window globals
    const storedData = localStorage.getItem('siteMenuData');
    if (storedData) {
        localMenuData = JSON.parse(storedData);
    } else if (window.menuData) {
        localMenuData = JSON.parse(JSON.stringify(window.menuData)); // deep copy
    }

    const storedSpecial = localStorage.getItem('siteSpecialMenu');
    if (storedSpecial) {
        localSpecialMenu = JSON.parse(storedSpecial);
    } else if (window.specialMenu) {
        localSpecialMenu = JSON.parse(JSON.stringify(window.specialMenu)); // deep copy
    }
}

// --- DOM REFERENCES ---
let categoriesContainer, modalOverlay, specialMenuModal, itemForm, specialMenuForm, modalTitle, toast, toastMessage;

function initDomRefs() {
    categoriesContainer = document.getElementById('categories-container');
    modalOverlay = document.getElementById('modalOverlay');
    specialMenuModal = document.getElementById('specialMenuModal');
    itemForm = document.getElementById('itemForm');
    specialMenuForm = document.getElementById('specialMenuForm');
    modalTitle = document.getElementById('modalTitle');
    toast = document.getElementById('toast');
    toastMessage = document.getElementById('toastMessage');
}

// --- RENDER FUNCTIONS ---

function renderAdminCategories() {
    if (!categoriesContainer) return;
    categoriesContainer.innerHTML = '';

    localMenuData.forEach(category => {
        const categoryEl = document.createElement('section');

        let itemsHtml = '';
        category.items.forEach((item, index) => {
            const heroTag = item.isHero ? '<span class="hero-badge">DESTACADO</span>' : '';
            const thumbSrc = item.image || '';
            const thumbHtml = thumbSrc
                ? `<img src="${thumbSrc}" class="item-thumb" alt="" onerror="this.style.display='none'">`
                : `<div class="item-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:var(--color-text-dim);"><i class="fas fa-utensils"></i></div>`;

            itemsHtml += `
                <tr>
                    <td>
                        <div class="item-info-cell">
                            ${thumbHtml}
                            <div>
                                <div style="font-weight: 600;">${item.name}${heroTag}</div>
                                <div style="font-size: 0.75rem; color: var(--color-text-dim);">${item.description || 'Sin descripción'}</div>
                            </div>
                        </div>
                    </td>
                    <td>€${item.price.toFixed(2).replace('.', ',')}</td>
                    <td>
                        <div class="actions-cell">
                            <button class="action-btn" onclick="editItem('${category.id}', ${index})" title="Editar"><i class="fas fa-edit"></i></button>
                            <button class="action-btn" style="color:var(--color-danger)" onclick="deleteItem('${category.id}', ${index})" title="Eliminar"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });

        categoryEl.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin: 2rem 0 1rem; border-bottom:1px solid var(--color-border); padding-bottom:0.5rem;">
                <h2 style="font-size: 1.5rem;">${category.title.replace(/<[^>]*>/g, '')}</h2>
                <span style="color:var(--color-text-dim); font-size:0.8rem;">${category.items.length} platos</span>
            </div>
            <table class="items-table">
                <thead>
                    <tr><th>Plato</th><th>Precio</th><th style="text-align:right">Acciones</th></tr>
                </thead>
                <tbody>${itemsHtml}</tbody>
            </table>
        `;
        categoriesContainer.appendChild(categoryEl);
    });
}

function renderSpecialMenuStatus() {
    const titleEl = document.getElementById('adminSpecialTitle');
    const descEl = document.getElementById('adminSpecialDesc');
    const statusEl = document.getElementById('specialMenuStatus');

    if (titleEl) titleEl.innerText = localSpecialMenu.title || 'Menú del Día';
    if (descEl) descEl.innerText = localSpecialMenu.active ? '✅ Activo — ' + (localSpecialMenu.description || '') : '❌ Desactivado';
    if (statusEl) statusEl.checked = localSpecialMenu.active || false;
}

// --- ITEM MANAGEMENT ---

function openAddModal() {
    modalTitle.innerText = "Nuevo Plato";
    itemForm.reset();
    document.getElementById('editCategoryId').value = '';
    document.getElementById('editItemIndex').value = '';
    document.getElementById('itemIsHero').checked = false;
    modalOverlay.style.display = 'flex';
}

function editItem(categoryId, index) {
    const category = localMenuData.find(c => c.id === categoryId);
    if (!category) { alert('Error: categoría no encontrada'); return; }

    const item = category.items[index];
    if (!item) { alert('Error: plato no encontrado'); return; }

    modalTitle.innerText = "Editar Plato";
    document.getElementById('itemCategory').value = categoryId;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemDesc').value = item.description || '';
    document.getElementById('itemImage').value = item.image || '';
    document.getElementById('itemIsHero').checked = item.isHero || false;
    document.getElementById('editCategoryId').value = categoryId;
    document.getElementById('editItemIndex').value = index;
    modalOverlay.style.display = 'flex';
}

function closeModal() {
    modalOverlay.style.display = 'none';
}

function handleItemSubmit(e) {
    e.preventDefault();

    const catId = document.getElementById('itemCategory').value;
    const newItem = {
        name: document.getElementById('itemName').value.trim(),
        price: parseFloat(document.getElementById('itemPrice').value),
        description: document.getElementById('itemDesc').value.trim(),
        image: document.getElementById('itemImage').value.trim(),
        isHero: document.getElementById('itemIsHero').checked
    };

    // Validation
    if (!newItem.name || isNaN(newItem.price)) {
        alert('Por favor rellena nombre y precio.');
        return;
    }

    const editCatId = document.getElementById('editCategoryId').value;
    const editIdx = document.getElementById('editItemIndex').value;

    if (editCatId && editIdx !== '') {
        // Editing existing item
        const oldCat = localMenuData.find(c => c.id === editCatId);
        if (editCatId === catId) {
            // Same category, update in place
            oldCat.items[parseInt(editIdx)] = newItem;
        } else {
            // Changed category, remove from old and add to new
            oldCat.items.splice(parseInt(editIdx), 1);
            const newCat = localMenuData.find(c => c.id === catId);
            newCat.items.push(newItem);
        }
        showToast("Plato actualizado ✓");
    } else {
        // Adding new item
        const targetCat = localMenuData.find(c => c.id === catId);
        targetCat.items.push(newItem);
        showToast("Nuevo plato añadido ✓");
    }

    closeModal();
    renderAdminCategories();
}

function deleteItem(categoryId, index) {
    if (confirm('¿Seguro que quieres eliminar este plato?')) {
        const category = localMenuData.find(c => c.id === categoryId);
        if (category) {
            category.items.splice(index, 1);
            renderAdminCategories();
            showToast("Plato eliminado ✓");
        }
    }
}

// --- SPECIAL MENU LOGIC ---

function openSpecialMenuModal() {
    document.getElementById('specialTitle').value = localSpecialMenu.title || '';
    document.getElementById('specialPrice').value = localSpecialMenu.price || '';
    document.getElementById('specialDesc').value = localSpecialMenu.description || '';
    document.getElementById('specialFirsts').value = (localSpecialMenu.firstCourses || []).join('\n');
    document.getElementById('specialSeconds').value = (localSpecialMenu.secondCourses || []).join('\n');
    document.getElementById('specialDesserts').value = (localSpecialMenu.desserts || []).join('\n');
    specialMenuModal.style.display = 'flex';
}

function closeSpecialModal() {
    specialMenuModal.style.display = 'none';
}

function handleSpecialMenuSubmit(e) {
    e.preventDefault();
    localSpecialMenu.title = document.getElementById('specialTitle').value.trim();
    localSpecialMenu.price = document.getElementById('specialPrice').value.trim();
    localSpecialMenu.description = document.getElementById('specialDesc').value.trim();
    localSpecialMenu.firstCourses = document.getElementById('specialFirsts').value.split('\n').filter(d => d.trim() !== '');
    localSpecialMenu.secondCourses = document.getElementById('specialSeconds').value.split('\n').filter(d => d.trim() !== '');
    localSpecialMenu.desserts = document.getElementById('specialDesserts').value.split('\n').filter(d => d.trim() !== '');

    renderSpecialMenuStatus();
    closeSpecialModal();
    showToast("Menú del día actualizado ✓");
}

function toggleSpecialMenu() {
    localSpecialMenu.active = document.getElementById('specialMenuStatus').checked;
    renderSpecialMenuStatus();
    showToast(localSpecialMenu.active ? "Menú del día ACTIVADO ✅" : "Menú del día DESACTIVADO ❌");
}

// --- SYSTEM ---

function saveAllChanges() {
    localStorage.setItem('siteMenuData', JSON.stringify(localMenuData));
    localStorage.setItem('siteSpecialMenu', JSON.stringify(localSpecialMenu));
    showToast("¡TODO GUARDADO! Cambios aplicados a la web. ✓");
}

function logout() {
    sessionStorage.removeItem('admin_token');
    window.location.href = 'login.html';
}

function showToast(msg) {
    if (!toastMessage || !toast) return;
    toastMessage.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    initDomRefs();
    initData();

    // Bind form events
    if (itemForm) {
        itemForm.addEventListener('submit', handleItemSubmit);
    }
    if (specialMenuForm) {
        specialMenuForm.addEventListener('submit', handleSpecialMenuSubmit);
    }

    // Close modals on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
    if (specialMenuModal) {
        specialMenuModal.addEventListener('click', (e) => {
            if (e.target === specialMenuModal) closeSpecialModal();
        });
    }

    // Initial render
    renderAdminCategories();
    renderSpecialMenuStatus();

    console.log('✅ Admin panel initialized. Categories:', localMenuData.length, '| Special menu:', localSpecialMenu.active ? 'Active' : 'Inactive');
});
