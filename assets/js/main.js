/* --- ДАННЫЕ (JSON) --- */
/* Вы можете редактировать этот список, добавлять новые книги и курсы */
const products = [
    {
        id: 1,
        type: "book",
        title: "Пропускная способность человека",
        price: "15 $",
        description: "Главная книга о внутренней архитектуре внимания, блоках и человеческой пропускной способности. Глубокий разбор тела, психики и энергии. Автор: Виталий Дячук.",
        image: "assets/img/content/b-01/3.webp"
    },
    // {
    //     id: 1,
    //     type: "book",
    //     title: "Тайны Подсознания",
    //     price: "15 $",
    //     description: "Глубокое погружение в работу с подсознанием. Методики, практики и личный опыт.",
    //     image: null 
    // },
    // {
    //     id: 2,
    //     type: "book",
    //     title: "Путь Воина Духа",
    //     price: "20 $",
    //     description: "Книга о том, как закалить характер и найти свой стержень в современном мире.",
    //     image: null
    // },
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
        price: "15 $",
        description: "Индивидуальная работа по вашему запросу. Длительность 60 минут.",
        image: null
    }
];


/* --- ЛОГИКА --- */
const booksContainer = document.getElementById('books-container');
const coursesContainer = document.getElementById('courses-container');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');

const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const tgLink = document.getElementById('tgLink');
const toast = document.getElementById('toast');

// Ваш Telegram username
const tgUsername = "SpiritUrban";

// Переменная для хранения текущего сообщения
let currentMessage = "";

// Отрисовка
function renderProducts() {
    products.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

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
window.openModal = function (id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    modalTitle.textContent = `Покупка: ${product.title}`;
    modalPrice.textContent = product.price;
    modalDesc.textContent = `Вы выбрали "${product.title}". Нажмите кнопку, чтобы перейти в Telegram. Текст заказа будет скопирован автоматически.`;

    // Формируем сообщение
    currentMessage = `Здравствуйте, Виталий! Я хочу купить "${product.title}" за ${product.price}.`;

    // Формируем ссылку (на всякий случай оставляем параметр text)
    const encodedMessage = encodeURIComponent(currentMessage);
    tgLink.href = `https://t.me/${tgUsername}?text=${encodedMessage}`;

    modalOverlay.classList.add('active');
}



// Обработка клика по кнопке Telegram с задержкой
tgLink.addEventListener('click', (e) => {
    // 1. Останавливаем мгновенный переход
    e.preventDefault();

    // Сохраняем ссылку, куда надо перейти
    const targetUrl = tgLink.href;

    // 2. Копируем текст
    navigator.clipboard.writeText(currentMessage).then(() => {
        // Меняем текст уведомления, чтобы было понятно, что сейчас будет переход
        toast.textContent = "Текст скопирован! Открываю Telegram...";
        showToast();

        // 3. Ждем 2 секунды и переходим
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 2000);

    }).catch(err => {
        // Если вдруг копирование не сработало, все равно переходим, чтобы не ломать кнопку
        console.error('Ошибка копирования: ', err);
        window.location.href = targetUrl;
    });
});

// Функция показа уведомления
function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // Убираем через 3 секунды
}

closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

renderProducts();
