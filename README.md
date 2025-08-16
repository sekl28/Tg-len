# 🎰 High Roller Casino - Агрегатор казино для Канады

Современный веб-сайт агрегатора онлайн казино, построенный на **Next.js 15** и **TailwindCSS**, с интеграцией **Strapi CMS**.

## 🚀 Возможности

- **🎨 Полностью адаптивный дизайн** - идеально работает на всех устройствах
- **⚡ Next.js 15** с App Router
- **🎯 TailwindCSS** для стилизации
- **📊 Интеграция со Strapi CMS** для управления контентом
- **🔍 Система фильтров и поиска** казино
- **📱 PWA Ready** - готов к установке как приложение
- **🌐 SEO оптимизирован** с метатегами и структурированными данными

## 📋 Страницы

- **Главная страница** (`/`) - Hero секция, популярные казино, новости
- **Страница категорий** (`/casinos/categories`) - Фильтры и список всех казино
- **Детальная страница казино** (`/casinos/[slug]`) - Полная информация о казино
- **FAQ секция** с аккордеоном
- **Секция доверия** с преимуществами
- **Квиз для подбора казино**

## 🛠 Технологии

- **Next.js 15.1.1** - React фреймворк
- **React 18.2.0** - UI библиотека
- **TypeScript 5.3.3** - Типизация
- **TailwindCSS 3.4.1** - CSS фреймворк
- **Strapi CMS** - Headless CMS
- **Google Fonts** - Radio Canada, Inter, Onest

## 📦 Установка и запуск

### 1. Клонирование проекта
```bash
git clone <repository-url>
cd my-high-roller
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка переменных окружения
Создайте файл `.env.local`:
```bash
# Strapi API Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token-here

# Для продакшена используйте ваши реальные данные
# NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
# NEXT_PUBLIC_STRAPI_API_TOKEN=your-production-api-token
```

### 4. Запуск в режиме разработки
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### 5. Сборка для продакшена
```bash
npm run build
npm start
```

## 🔧 Настройка Strapi CMS

### Структура данных в Strapi

#### Collection Types:

1. **Casinos** (`casinos`)
   - name (Text) - Название казино
   - slug (UID) - URL slug
   - description (Rich Text) - Полное описание
   - shortDescription (Text) - Краткое описание
   - logo (Media) - Логотип
   - heroImage (Media) - Главное изображение
   - rating (Decimal) - Рейтинг (1-5)
   - userRating (Decimal) - Рейтинг пользователей
   - bonusAmount (Text) - Сумма бонуса
   - freeSpins (Text) - Количество фри-спинов
   - isNew (Boolean) - Новое казино
   - fastPayouts (Boolean) - Быстрые выплаты
   - noDeposit (Boolean) - Без депозита
   - licenseInfo (Text) - Информация о лицензии
   - websiteUrl (Text) - Ссылка на сайт казино
   - minDeposit (Text) - Минимальный депозит
   - maxPayout (Text) - Максимальная выплата
   - withdrawalSpeed (Text) - Скорость вывода
   - customerSupport (Text) - Поддержка
   - pros (JSON) - Преимущества
   - cons (JSON) - Недостатки
   - featured (Boolean) - Рекомендуемое

2. **Categories** (`categories`)
   - name (Text) - Название категории
   - slug (UID) - URL slug
   - description (Text) - Описание

3. **Payment Methods** (`payment-methods`)
   - name (Text) - Название метода
   - logo (Media) - Логотип

4. **Articles** (`articles`)
   - title (Text) - Заголовок
   - slug (UID) - URL slug
   - excerpt (Text) - Краткое описание
   - content (Rich Text) - Содержание
   - featuredImage (Media) - Изображение
   - category (Text) - Категория
   - publishedDate (DateTime) - Дата публикации

### Relations:
- Casinos → Categories (Many-to-Many)
- Casinos → Payment Methods (Many-to-Many)

## 🎨 Компоненты

- **CasinoCard** - Карточка казино
- **FilterSidebar** - Боковая панель фильтров
- **Pagination** - Компонент пагинации
- **CasinoHeader** - Заголовок страницы казино
- **ReviewCard** - Карточка отзыва

## 🌍 API Endpoints

### Основные функции:
- `getCasinos(filters, page, pageSize)` - Получение списка казино
- `getCasinoBySlug(slug)` - Получение казино по slug
- `getFeaturedCasinos(limit)` - Рекомендуемые казино
- `getCategories()` - Категории
- `getPaymentMethods()` - Методы оплаты
- `getNewsArticles(page, pageSize)` - Статьи

## 📱 Адаптивность

Сайт полностью адаптивен для всех размеров экранов:
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🚀 Деплой

### Vercel (Рекомендуется)
1. Подключите ваш репозиторий к Vercel
2. Добавьте переменные окружения
3. Деплойте автоматически

### Другие платформы
- Netlify
- Railway
- DigitalOcean App Platform

## 📊 SEO и производительность

- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ Оптимизация изображений
- ✅ Мета-теги и Open Graph
- ✅ Structured Data (JSON-LD)
- ✅ Sitemap автогенерация

## 🔍 Mock Data

Если Strapi недоступен, система автоматически переключается на mock данные для разработки.

## 📄 Лицензия

MIT License

## 🤝 Поддержка

Если у вас есть вопросы или предложения:
1. Создайте Issue в GitHub
2. Отправьте Pull Request
3. Свяжитесь с разработчиком

---

**Примечание**: Для полной функциональности необходима настройка и запуск Strapi CMS с соответствующей структурой данных.