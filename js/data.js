const menuData = [
    {
        "id": "caldeiros",
        "title": "En Nuestros <span>Caldeiros</span>",
        "description": "La esencia de Galicia preparada a fuego lento y con los mejores ingredientes.",
        "items": [
            {
                "name": "Tabla de Pulpo a la Gallega",
                "price": 18.90,
                "description": "Nuestro plato estrella. Tradicional pulpo gallego servido con cachelos, pimentón de la Vera y aceite de oliva virgen extra.",
                "image": "img/Pulpo_Gallega.png",
                "isHero": true
            },
            {
                "name": "Cuenco de Patatas",
                "price": 2.70,
                "description": "Cachelos con aceite de oliva y pimentón.",
                "image": "https://images.unsplash.com/photo-1546241072-48010ad28c2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
                "name": "Ensalada Ventresca",
                "price": 12.90,
                "description": "Tomate fresco, cebolla y ventresca de atún de alta calidad.",
                "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
                "name": "Anchoas del Cantábrico",
                "price": 16.20,
                "description": "Selección premium, 12/15 unidades.",
                "image": "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
                "name": "Torta del Casar",
                "price": 13.70,
                "description": "Ración media, cremosa e intensa.",
                "image": "https://images.unsplash.com/photo-1510629954389-c1e0da47d414?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
                "name": "Zamburiñas (8 uds.)",
                "price": 14.90,
                "description": "A la plancha con un toque de limón y perejil.",
                "image": "https://images.unsplash.com/photo-1534422298391-e4f8c170dbbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
                "name": "Calamares \"a lo Otero\"",
                "price": 15.30,
                "description": "Fritos a nuestra manera especial."
            },
            {
                "name": "Almejas en Salsa",
                "price": 21.80,
                "description": "Frescas, cocinadas en su salsa marinera."
            }
        ]
    },
    {
        "id": "bocadillos",
        "title": "Bocadillos <span>Clásicos</span>",
        "description": "",
        "items": [
            {
                "name": "Salchichas Frescas",
                "price": 6.00
            },
            {
                "name": "Magreta",
                "price": 6.00
            },
            {
                "name": "Lomo Fresco",
                "price": 6.00
            },
            {
                "name": "Bacon",
                "price": 6.00
            },
            {
                "name": "Catalana",
                "price": 6.50
            },
            {
                "name": "Calamares",
                "price": 6.00,
                "image": "https://images.unsplash.com/photo-1550507992-eb63ffee0847?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
                "name": "Mero",
                "price": 7.50
            },
            {
                "name": "Castillos",
                "price": 6.50
            },
            {
                "name": "Mollete de Oreja",
                "price": 6.50,
                "description": "Con huevo."
            }
        ]
    },
    {
        "id": "especialidades",
        "title": "Nuestras <span>Especialidades</span>",
        "description": "",
        "items": [
            {
                "name": "Tortilla Estilo Betanzos",
                "price": 9.60,
                "description": "Poco cuajada, con huevos de corral.",
                "image": "https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
                "name": "Dado de Solomillo",
                "price": 13.80,
                "description": "Con nuestra salsa especial."
            },
            {
                "name": "Chuletón Vaca Gallega",
                "price": 24.60,
                "description": "250 grs. aprox. de sabor intenso."
            },
            {
                "name": "Pimientos de Padrón",
                "price": 6.00,
                "description": "Unos pican y otros no."
            },
            {
                "name": "Patatas Fritas",
                "price": 4.90,
                "description": "Caseras y crujientes."
            }
        ]
    },
    {
        "id": "tierra-mar",
        "title": "Tierra y <span>Mar</span>",
        "description": "",
        "items": [
            {
                "name": "Jamón Ibérico (Mano)",
                "price": 21.90,
                "description": "100 grs. cortado a cuchillo."
            },
            {
                "name": "Tabla Jamón Ibérico",
                "price": 9.90,
                "description": "80 grs. en tempura."
            },
            {
                "name": "Revuelto de Morcilla",
                "price": 8.80
            },
            {
                "name": "Revuelto de Trigueros",
                "price": 9.90,
                "description": "Con gambas y ajetes."
            },
            {
                "name": "Croquetas Jamón (6uds)",
                "price": 11.90
            },
            {
                "name": "Sepia a la Plancha",
                "price": 13.20
            },
            {
                "name": "Chipirones Plancha",
                "price": 12.40
            },
            {
                "name": "Bacalao con Pisto",
                "price": 12.90
            },
            {
                "name": "Higadillas Fritas",
                "price": 9.90
            },
            {
                "name": "Higaditos de Pollo",
                "price": 9.90
            },
            {
                "name": "Mollejas de Cordero",
                "price": 14.10
            },
            {
                "name": "Alas de Pollo (4uds)",
                "price": 9.00
            },
            {
                "name": "Cascaritas de Pollo",
                "price": 11.90
            },
            {
                "name": "Oreja a la Plancha",
                "price": 11.10
            },
            {
                "name": "Cachopo Asturiano",
                "price": 16.80,
                "description": "280 grs. aprox.",
                "image": "https://images.unsplash.com/photo-1625944230945-1744a469228b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
        ]
    },
    {
        "id": "postres",
        "title": "Dulce <span>Final</span>",
        "description": "",
        "items": [
            {
                "name": "Tarta de Santiago",
                "price": 5.70,
                "description": "Clásica tarta de almendras."
            },
            {
                "name": "Coulant Chocolate",
                "price": 6.20,
                "description": "Con helado."
            },
            {
                "name": "Tarta de Queso",
                "price": 6.10
            },
            {
                "name": "Cañas de Crema",
                "price": 5.90
            },
            {
                "name": "Bola de Helado",
                "price": 2.90,
                "description": "Vainilla, fresa o chocolate."
            }
        ]
    }
];

const specialMenu = {
    active: false,
    title: "Menú del Día",
    price: "15,00€",
    description: "Incluye pan, postre y bebida.",
    firstCourses: ["Sopa de Marisco", "Ensalada Mixta"],
    secondCourses: ["Pechuga a la Plancha", "Bacalao con Pisto"],
    desserts: ["Tarta de Santiago", "Flan de Huevo"]
};

// If running in browser, expose to window
if (typeof window !== 'undefined') {
    window.menuData = menuData;
    window.specialMenu = specialMenu;
}

// Check for local storage overrides
if (typeof localStorage !== 'undefined') {
    const storedData = localStorage.getItem('siteMenuData');
    if (storedData) {
        window.menuData = JSON.parse(storedData);
    }
    const storedSpecial = localStorage.getItem('siteSpecialMenu');
    if (storedSpecial) {
        window.specialMenu = JSON.parse(storedSpecial);
    }
}
