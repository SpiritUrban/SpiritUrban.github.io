/* --- ДАННЫЕ (JSON) --- */
/* Вы можете редактировать этот список, добавлять новые книги и курсы */
const products = [
    {
        id: 1,
        type: "book",
        title: "Тайны Подсознания",
        price: "15 $",
        description: "Глубокое погружение в работу с подсознанием. Методики, практики и личный опыт.",
        // Если есть ссылка на картинку, вставьте её вместо null, например: 'images/book1.jpg'
        image: null 
    },
    {
        id: 2,
        type: "book",
        title: "Путь Воина Духа",
        price: "20 $",
        description: "Книга о том, как закалить характер и найти свой стержень в современном мире.",
        image: null
    },
    {
        id: 3,
        type: "course",
        title: "Курс 'Пробуждение'",
        price: "150 $",
        description: "4-недельный онлайн интенсив. Групповые занятия, медитации и разбор личных ситуаций.",
        image: null
    },
    {
        id: 4,
        type: "course",
        title: "Личная консультация",
        price: "100 $",
        description: "Индивидуальная работа по вашему запросу. Длительность 60 минут.",
        image: null
    }
];

/* --- ЛОГИКА САЙТА --- */
const booksContainer = document.getElementById('books-container');
const coursesContainer = document.getElementById('courses-container');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');

// Элементы модального окна
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const tgLink = document.getElementById('tgLink');

// Ваш Telegram username (без @)
const tgUsername = "SpiritUrban";

// Функция отрисовки карточек
function renderProducts() {
    products.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Если картинки нет, используем заглушку, иначе реальное фото
        const bgStyle = item.image ? `background-image: url('${item.image}')` : '';
        const imgContent = item.image ? '' : '<span>✦</span>';

        card.innerHTML = `
            <div class="card-img-placeholder" style="${bgStyle}">${imgContent}</div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="price">${item.price}</div>
            <button class="btn" onclick="openModal(${item.id})">Купить</button>
        `;

        if (item.type === 'book') {
            booksContainer.appendChild(card);
        } else {
            coursesContainer.appendChild(card);
        }
    });
}

// Открытие модального окна
window.openModal = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    modalTitle.textContent = `Покупка: ${product.title}`;
    modalPrice.textContent = product.price;
    modalDesc.textContent = `Вы выбрали "${product.title}". Нажмите кнопку ниже, чтобы перейти в Telegram. Сообщение будет сформировано автоматически.`;

    // Формируем ссылку для Telegram
    // Текст: Здравствуйте! Я хочу купить [Название] за [Цена].
    const message = `Здравствуйте, Виталий! Я хочу купить "${product.title}" за ${product.price}.`;
    const encodedMessage = encodeURIComponent(message);
    tgLink.href = `https://t.me/${tgUsername}?text=${encodedMessage}`;

    modalOverlay.classList.add('active');
}

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

// Закрытие по клику вне окна
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

// Запуск
renderProducts();
