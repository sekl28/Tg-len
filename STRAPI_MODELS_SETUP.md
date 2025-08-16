# Настройка моделей Strapi CMS

## Инструкция по созданию и настройке всех необходимых моделей

### 🏗️ **1. Casino (Казино)**

**Collection Type**: `casino`

| Поле | Тип | Настройки | Описание |
|------|-----|-----------|----------|
| `name` | Text | Required, Unique | Название казино |
| `slug` | UID | Target field: name, Required | URL slug для казино |
| `description` | Rich text | Required | Полное описание казино |
| `shortDescription` | Text | Required, Max length: 200 | Краткое описание для карточек |
| `logo` | Media (Single) | Optional | Логотип казино |
| `heroImage` | Media (Single) | Optional | Главное изображение казино |
| `rating` | Decimal | Required, Min: 0, Max: 5 | Экспертный рейтинг |
| `userRating` | Decimal | Required, Min: 0, Max: 5 | Рейтинг пользователей |
| `bonusAmount` | Text | Required | Размер приветственного бонуса |
| `freeSpins` | Text | Required | Количество фриспинов |
| `isNew` | Boolean | Default: false | Новое казино |
| `fastPayouts` | Boolean | Default: false | Быстрые выплаты |
| `noDeposit` | Boolean | Default: false | Бездепозитный бонус |
| `licenseInfo` | Text | Required | Информация о лицензии |
| `websiteUrl` | Text | Required | Партнерская ссылка на сайт казино |
| `categories` | Relation | Many-to-many with Category | Категории казино |
| `paymentMethods` | Relation | Many-to-many with PaymentMethod | Методы оплаты |
| `games` | Relation | Many-to-many with Game | Доступные игры |
| `pros` | JSON | Optional | Массив преимуществ |
| `cons` | JSON | Optional | Массив недостатков |
| `minDeposit` | Text | Optional | Минимальный депозит |
| `maxPayout` | Text | Optional | Максимальная выплата |
| `withdrawalSpeed` | Text | Optional | Скорость вывода средств |
| `customerSupport` | Text | Optional | Информация о поддержке |
| `licenses` | JSON | Optional | Массив лицензий |
| `tags` | JSON | Optional | Теги для квиз-системы |

**Пример JSON для `pros`:**
```json
["Fast withdrawals", "Great game selection", "Generous bonuses", "Mobile-friendly"]
```

**Пример JSON для `cons`:**
```json
["Limited customer support languages", "High wagering requirements on some bonuses"]
```

**Пример JSON для `tags` (для 3-question quiz):**
```json
["slots", "cad", "welcome_bonus"]
```

**Возможные теги для квиз-системы:**
- **Игры**: `slots`, `table_games`, `live_casino`
- **Валюта**: `cad`, `cryptocurrency`, `any_currency` 
- **Бонусы**: `no_deposit_bonus`, `welcome_bonus`, `any_bonus`

---

### 🏷️ **2. Category (Категории)**

**Collection Type**: `category`

| Поле | Тип | Настройки | Описание |
|------|-----|-----------|----------|
| `name` | Text | Required, Unique | Название категории |
| `slug` | UID | Target field: name, Required | URL slug |
| `description` | Text | Optional, Max length: 500 | Описание категории |

**Примеры записей:**
- Live Casinos (live-casinos)
- Mobile Casinos (mobile-casinos)  
- High Roller (high-roller)
- New Casinos (new-casinos)

---

### 💳 **3. PaymentMethod (Способы оплаты)**

**Collection Type**: `payment-method`

| Поле | Тип | Настройки | Описание |
|------|-----|-----------|----------|
| `name` | Text | Required, Unique | Название метода оплаты |
| `logo` | Media (Single) | Optional | Логотип платежной системы |

**Примеры записей:**
- Visa
- Mastercard
- Interac
- Bitcoin
- Skrill
- Neteller

---

### 🎮 **4. Game (Игры)**

**Collection Type**: `game`

| Поле | Тип | Настройки | Описание |
|------|-----|-----------|----------|
| `name` | Text | Required | Название игры |
| `provider` | Text | Required | Провайдер игры |
| `image` | Media (Single) | Optional | Скриншот игры |
| `gameType` | Enumeration | Required | Тип игры |

**Варианты для `gameType`:**
- slots
- blackjack  
- roulette
- poker
- baccarat
- live_dealer
- other

**Примеры записей:**
- Book of Dead (Play'n GO, slots)
- Lightning Roulette (Evolution Gaming, live_dealer)
- Blackjack Pro (NetEnt, blackjack)

---

### 📰 **5. NewsArticle (Статьи блога)**

**Collection Type**: `news-article`

| Поле | Тип | Настройки | Описание |
|------|-----|-----------|----------|
| `title` | Text | Required | Заголовок статьи |
| `slug` | UID | Target field: title, Required | URL slug |
| `excerpt` | Text | Required, Max length: 300 | Краткое описание |
| `content` | Rich text | Required | Полный текст статьи |
| `featuredImage` | Media (Single) | Optional | Главное изображение |
| `category` | Enumeration | Required | Категория статьи |
| `publishedDate` | Date | Required | Дата публикации |
| `author` | Text | Optional | Автор статьи |
| `readTime` | Number | Optional | Время чтения в минутах |

**Варианты для `category`:**
- Bonuses
- Security  
- Payments
- Mobile
- Reviews
- News
- Guides

**Примеры статей:**
- "Top Casino Welcome Bonuses for Canadian Players in 2025"
- "How to Choose Safe and Licensed Online Casinos in Canada"
- "Fastest Withdrawal Methods for Canadian Online Casino Players"

---

### 👥 **6. TeamMember (Команда)**

**Collection Type**: `team-member`

| Поле | Тип | Настройки | Описание |
|------|-----|-----------|----------|
| `name` | Text | Required | Имя и фамилия |
| `role` | Text | Required | Должность |
| `expertise` | Text | Required | Область экспертизы |
| `description` | Rich text | Required | Описание эксперта |
| `avatar` | Media (Single) | Optional | Фото сотрудника |
| `yearsExperience` | Number | Required | Лет опыта |

**Примеры записей:**
- John Smith, Casino Expert, Online Gaming, 8 лет опыта
- Sarah Johnson, Security Analyst, Payment Security, 5 лет опыта

---

### ⭐ **7. Testimonial (Отзывы)**

**Collection Type**: `testimonial`

| Поле | Тип | Настройки | Описание |
|------|-----|-----------|----------|
| `name` | Text | Required | Имя клиента |
| `review` | Rich text | Required | Текст отзыва |
| `rating` | Number | Required, Min: 1, Max: 5 | Рейтинг |
| `city` | Text | Optional | Город |
| `isVerified` | Boolean | Default: false | Проверенный отзыв |
| `casino` | Text | Optional | Казино о котором отзыв |

**Пример записи:**
- Michael T., Toronto, 5 stars, "Great service and fast withdrawals!"

---

### ❓ **8. FAQItem (Частые вопросы)**

**Collection Type**: `faq-item`

| Поле | Тип | Настройки | Описание |
|------|-----|-----------|----------|
| `question` | Text | Required | Вопрос |
| `answer` | Rich text | Required | Ответ |
| `category` | Enumeration | Required | Категория FAQ |
| `order` | Number | Default: 0 | Порядок отображения |
| `isExpanded` | Boolean | Default: false | Развернут по умолчанию |

**Варианты для `category`:**
- general
- legal
- payments
- bonuses
- account
- responsible-gambling

**Примеры FAQ:**
- "What is the minimum age to play at online casinos in Canada?"
- "How long do withdrawals take?"
- "Are online casinos safe and secure?"

---

### ⚙️ **9. SiteSettings (Настройки сайта)**

**Single Type**: `site-setting`

| Поле | Тип | Настройки | Описание |
|------|-----|-----------|----------|
| `siteName` | Text | Required | Название сайта |
| `siteDescription` | Text | Required | Описание сайта |
| `contactEmail` | Email | Required | Email для связи |
| `supportEmail` | Email | Required | Email поддержки |
| `phone` | Text | Optional | Телефон |
| `address` | Text | Optional | Адрес |
| `socialMedia` | JSON | Optional | Социальные сети |
| `responseTime` | Text | Required | Время ответа |
| `licenseInfo` | Rich text | Required | Информация о лицензии |

**Пример JSON для `socialMedia`:**
```json
{
  "facebook": "https://facebook.com/myhighroller",
  "twitter": "https://twitter.com/myhighroller",
  "instagram": "https://instagram.com/myhighroller",
  "linkedin": "https://linkedin.com/company/myhighroller",
  "youtube": "https://youtube.com/@myhighroller"
}
```

---

### 📝 **10. ContactSubmission (Обращения)**

**Collection Type**: `contact-submission`

| Поле | Тип | Настройки | Описание |
|------|-----|-----------|----------|
| `name` | Text | Required | Имя отправителя |
| `email` | Email | Required | Email отправителя |
| `subject` | Text | Optional | Тема сообщения |
| `message` | Rich text | Required | Текст сообщения |
| `type` | Enumeration | Default: contact | Тип обращения |
| `city` | Text | Optional | Город |
| `rating` | Number | Optional, Min: 1, Max: 5 | Рейтинг (для отзывов) |
| `isProcessed` | Boolean | Default: false | Обработано |

**Варианты для `type`:**
- contact
- review
- complaint
- suggestion

---

## 🔧 **Настройка API**

### **API Permissions**

Для каждой модели настройте права доступа:

#### **Public роль:**
- **Casino**: find, findOne ✅
- **Category**: find, findOne ✅  
- **PaymentMethod**: find, findOne ✅
- **Game**: find, findOne ✅
- **NewsArticle**: find, findOne ✅
- **TeamMember**: find, findOne ✅
- **Testimonial**: find, findOne ✅
- **FAQItem**: find, findOne ✅
- **SiteSettings**: find ✅
- **ContactSubmission**: create ✅

#### **Authenticated роль:**
- Те же права + возможность создавать отзывы

### **API Routes**

Убедитесь что следующие endpoints доступны:

```
GET /api/casinos
GET /api/casinos/:id
GET /api/categories  
GET /api/payment-methods
GET /api/games
GET /api/news-articles
GET /api/team-members
GET /api/testimonials
GET /api/faq-items
GET /api/site-settings
POST /api/contact-submissions
```

### **Примеры запросов с populate**

```javascript
// Казино с категориями и методами оплаты
GET /api/casinos?populate=*

// Статьи с изображениями
GET /api/news-articles?populate=featuredImage

// FAQ по категории
GET /api/faq-items?filters[category][$eq]=legal
```

---

## 📊 **Рекомендуемые начальные данные**

### **Categories:**
- Live Casinos  
- Mobile Casinos
- High Roller Casinos
- New Casinos
- Crypto Casinos

### **PaymentMethods:**
- Visa, Mastercard, Interac, Bitcoin, Ethereum, Skrill, Neteller, PaySafeCard

### **Games (минимум):**
- 10-15 популярных слотов
- 5-7 настольных игр
- 3-5 live dealer игр

### **FAQ Categories:**
- General, Legal, Payments, Bonuses, Account, Responsible Gaming

### **Article Categories:**
- Bonuses, Security, Payments, Mobile, Reviews, News, Guides

---

## ✅ **Проверка настройки**

После настройки всех моделей:

1. ✅ Создайте тестовые записи для каждой модели
2. ✅ Проверьте что API endpoints работают
3. ✅ Убедитесь что populate работает для связанных данных
4. ✅ Проверьте что сайт корректно отображает данные из Strapi
5. ✅ Протестируйте fallback на mock данные при отключении Strapi

Все модели настроены для работы с существующим фронтенд кодом и обеспечивают полную функциональность сайта онлайн казино.
