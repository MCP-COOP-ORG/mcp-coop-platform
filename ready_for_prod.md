# 🚀 Полный реестр исправлений перед Production-релизом (Pre-flight Checklist)

*Документ автоматически обогащен на основе полного анализа кодовой базы и обсуждения всех сущностей, абстракций, роутов и инфраструктуры.*

## ⚙️ 1. Инфраструктура, Сборка и CI/CD
- [ ] Ошибка в `package.json`: Нет зависимостей ни одного тестового фреймворка (Vitest, Jest, RTL, JSdom). Код не тестируется.
- [ ] Ошибка в `package.json`: Отсутствуют скрипты интеграции тестов (`npm run test`, `npm run test:coverage`).
- [ ] Ошибка в `.github/workflows/deploy.yml`: Сборка Docker и деплой происходят без предварительного запуска `npm run lint`.
- [ ] Ошибка в `.github/workflows/deploy.yml`: Сборка происходит без предварительной проверки типов `npx tsc --noEmit`.
- [ ] Ошибка в `.github/workflows/deploy.yml`: Пайплайн не валидируется юнит или E2E тестами.
- [ ] Отсутствие защиты Env: Динамические переменные окружения `process.env` (например, JWT_SECRET, INTERNAL_API_URL) не защищены Zod-схемой, что вызовет рантайм-сбои при их отсутствии.

## 🛡 2. Отказоустойчивость React/Next.js (Resilience)
- [ ] Отсутствие `global-error.tsx` в корне приложения (при падении Root Layout пользователь видит белый экран).
- [ ] Отсутствие `src/app/[locale]/error.tsx` (Route-level падения не перехватываются, обрушая UI).
- [ ] Отсутствие `not-found.tsx` для контролируемой обработки 404 страниц в нашем дизайне HeroUI.

## 🏗 3. Нарушение архитектурных барьеров (Clean Architecture & SOLID)
- [ ] **Pollution слоя `app/`**: Компонент `docs-sidebar.tsx` лежит в папке Next.js роутинга (`src/app/[locale]/(unauthorized)/docs/components`).
- [ ] **Pollution слоя `app/`**: Компонент `mobile-docs-nav.tsx` лежит в папке Next.js роутинга (`src/app/[locale]/(unauthorized)/docs/components`).
- [ ] **Нарушение DIP**: Файл `src/features/page-content/actions/page-content.actions.ts` обращается напрямую к БД `prisma.pageContent.findFirst()`. (Нет слоя Repository).
- [ ] **Нарушение SRP (God Component)**: Файл `src/features/auth/components/auth-form/index.tsx` раздут до 217 строк. Одна форма слила в себя Email стейп, OTP стейп, регистрацию имени и OAuth. Требуется декомпозиция.
- [ ] **Смешивание абстракций Domain / View**: Файл `src/shared/ui/components/contacts/index.tsx` жестко зашил внутри себя бизнес-константу `CONTACT_ICONS_MAP` и вычисление формата URL, хотя это слой тупого маппинга.

## 💀 4. Мертвый код и Хардкод
- [ ] **Хардкод / Mock в Production**: Файл `src/features/contact-form/actions/contact.actions.ts` содержит `TODO: Replace with real implementation` и фейковый `console.log` вместо реальной записи в базу.
- [ ] **Dead Code**: Неиспользуемый компонент `src/features/auth/components/countdown-timer/index.tsx`.
- [ ] **Dead Code**: Неиспользуемый компонент `src/shared/ui/components/card/index.tsx`.
- [ ] **Dead Code**: Неиспользуемый компонент `src/shared/ui/components/card-catalog/index.tsx`.
- [ ] **Dead Code**: Неиспользуемый компонент `src/shared/ui/components/coop-members/index.tsx`.
- [ ] **Dead Code**: Неиспользуемый компонент `src/shared/ui/components/crypto-wallets/index.tsx`.
- [ ] **Dead Code**: Неиспользуемый компонент `src/shared/ui/components/form-field-renderer/index.tsx`.
- [ ] **Dead Code**: Неиспользуемый компонент `src/shared/ui/components/skills/index.tsx`.
- [ ] **Dead Code**: Неиспользуемый компонент `src/shared/ui/layout/page-content/index.tsx`.

## 🗑 5. Ад Boilerplate-кода (Уровень UI-Примитивов / Нарушение DRY)
*Копипастинг паттерна `_appVariant` без его использования создает мертвые switch-конструкции и засоряет dumb-компоненты (14 ESLint warnings).*
- [ ] Удалить пустой `_appVariant` из `src/shared/ui/primitives/avatar.tsx`.
- [ ] Удалить пустой `_appVariant` из `src/shared/ui/primitives/card.tsx`.
- [ ] Удалить пустой `_appVariant` из `src/shared/ui/primitives/checkbox.tsx`.
- [ ] Удалить пустой `_appVariant` из `src/shared/ui/primitives/chip.tsx`.
- [ ] Удалить пустой `_appVariant` из `src/shared/ui/primitives/form.tsx`.
- [ ] Удалить пустой `_appVariant` из `src/shared/ui/primitives/pagination.tsx`.
- [ ] Удалить пустой `_appVariant` из `src/shared/ui/primitives/snippet.tsx`.
- [ ] Удалить пустой `_appVariant` из `src/shared/ui/primitives/spinner.tsx`.

---

## 🔎 РЕЗУЛЬТАТЫ АУДИТА: ФАЗА 1 (Общая готовность к продакшену)
*В ходе глубокого исследования обнаружены следующие критические уязвимости базового продакшен сетапа:*

- [ ] **Крит в Docker Compose (Prod)**: В файле `.github/deploy/docker-compose.prod.yml` допущена опечатка в переменных окружения. В 5 местах прописано `${MCP_COOP_PLARFORM}` вместо `PLATFORM`. Это приведет к падению БД в проде (не найдет пароль и юзера) и сломает коннект из Next.js.
- [ ] **Отсутствие валидации ENV (Zod)**: Файл `next.config.ts` абсолютно пуст с точки зрения защиты инфраструктуры. В нем нет парсинга `process.env`. Требуется создание `src/core/configs/env.config.ts` с Zod-схемой и принудительный вызов валидатора внутри `next.config.ts`.
- [ ] **Уязвимость Next.js Resilience (Graceful Degradation)**: Директория `src/app` проверена — в ней полностью отсутствуют перехватчики падений.
    - Нет `src/app/global-error.tsx`.
    - Нет `src/app/[locale]/error.tsx`.
    - Нет `src/app/[locale]/not-found.tsx`.

---

## 🔎 РЕЗУЛЬТАТЫ АУДИТА: ФАЗА 2 (Инфраструктура тестирования)
*В ходе глубокого исследования кодовой базы на предмет тестирования и сверки с Best Practices для Next.js 15 (React 19) выявлено следующее:*

- [ ] **Полное отсутствие Unit-тестов**: Глубокий скан через `grep` показал ровно 0 файлов с расширениями `.test.tsx` или `.spec.ts`. Код не проверяется нигде.
- [ ] **Архитектурный пробел (Настройка среды)**: Для Next.js 15 (App Router) категорически рекомендуется связка `Vitest` + `jsdom` + `@vitejs/plugin-react` вместо `Jest`. `Jest` слишком медленный и плохо переваривает современные ESM React-паттерны по умолчанию. Требуется внедрить `vitest.config.mts`.
- [ ] **Отсутствие Custom Render Wrapper'а**: Поскольку мы используем сложную систему провайдеров (`NextIntlClientProvider`, кастомные сессии, `HeroUIProvider`), нам необходимо создать файл `src/core/configs/tests/test-utils.tsx` с кастомным рендером, иначе ни один UI-компонент протестировать не удастся.
- [ ] **Слепая зона E2E для Server Components**: В Next.js 15 юнит-тесты хороши только для Client Components. Для проверки Асинхронных Server Components (коих в проекте много, например `layout.tsx` с запросом профиля) нам архитектурно потребуется Playwright (как End-to-End тестирование). Текущей задачей будет покрыть юнит-тестами именно критические Сlient-сайд блоки (например AuthForm).

---

## 🔎 РЕЗУЛЬТАТЫ АУДИТА: ФАЗА 3 (Пайплайны и Quality Gates)
*Анализ файла `.github/workflows/deploy.yml` выявил критическое нарушение концепции Fail-Fast:*

- [ ] **Скрытые ошибки (Отсутствие Quality Gate Jobs)**: Механизм деплоя сразу же запускает джобу `build-and-push` через `docker build`. И хотя Next.js внутри контейнера запускает `tsc` и `eslint`, это происходит *внутри образа* на позднем этапе. Ошибки размазаны по логам Docker.
- [ ] **Нарушение Best Practices (Fail-Fast)**: В идеале должна быть создана независимая легковесная джоба `quality-gate`, которая до старта Docker-билда проверяет код через `npm run lint`, `npx tsc --noEmit` и `npm run test` нативно в Ubuntu-раннере. Если `quality-gate` падает, дорогостоящий `build-and-push` даже не запускается.
- [ ] **Отсутствие PR-чеков**: Файл `deploy.yml` работает только при push'е в `main`. В проекте полностью отсутствует файл `ci.yml` (или пайплайн проверок для Pull Requests). Это означает, что разработчик может влить сломанный код в `main`, и узнаем мы об этом только при падении деплоя. Требуется создать `ci.yml` для защиты веток.

---

## 🔎 РЕЗУЛЬТАТЫ АУДИТА: ФАЗА 4 (Глубокий аудит папки shared и слоев абстракций)
*Кросс-анализ зависимостей (`grep` по импортам) показал, что директория `shared`, которая обязана быть 100% независимой (тупой), грубо нарушает архитектурные барьеры, втягивая в себя бизнес-фичи и сущности:*

- [ ] **Cyclic Dependency (Shared -> Feature)**: Файл `src/shared/ui/layout/page-content/index.tsx` делает прямой импорт Server Action из фичей: `import { getPageContent } from "@/features/page-content/actions/page-content.actions"`. Слой `shared` не имеет права фетчить бизнес-данные. Этот Layout должен быть перенесен в `src/features/page-content/ui`.
- [ ] **Протекание бизнес-сущностей в мапперы (Shared -> Entities)**: Вся папка `src/shared/mappers/*` (такие файлы как `profile-full.mapper.ts`, `coop-card.mapper.ts`) импортируют типы DTO из `@/entities`. Мапперы конкретных бизнес-доменов не должны лежать в `shared`. Их нужно перенести в `src/entities/<name>/mappers/`.
- [ ] **Протекание логики фичи в shared-схемы**: Файл `src/shared/validation/contact.ts` импортирует логику из `@/features`. Специфичная Zod-схема валидации контактной формы должна лежать внутри папки фичи, а не в глобальном `shared`.

---

## 🔎 РЕЗУЛЬТАТЫ АУДИТА: ФАЗА 6 (Нарушения DRY, KISS, SOLID)
*Анализ файлов слоя бизнес-логики (`src/features`) выявил нарушения принципа единой ответственности и инверсии зависимостей:*

- [ ] **Нарушение DIP (Dependency Inversion Principle)**: Файл `src/features/page-content/actions/page-content.actions.ts` жестко связан с инфраструктурным слоем БД (импортирует Prisma и делает прямые вызовы `prisma.pageContent.findFirst()`). Слой фичей не должен ничего знать о том, как устроена ORM. Это блокирует возможность написания нормальных Unit/Integration тестов. Необходимо внедрить `PageContentRepository` внутри `src/infrastructure/`.
- [ ] **Заглушка в Production**: В файле `src/features/contact-form/actions/contact.actions.ts` Server Action `submitContactForm` содержит комментарий `TODO: Replace with real implementation` и делает простой `console.log(data)`. Если пользователь отправит форму на проде, данные просто сгорят в логах. Требуется реализовать реальную запись в БД или проксировать запрос через BFF на backend.
---

## 🔎 РЕЗУЛЬТАТЫ АУДИТА: ФАЗА 7 (Смешивание абстракций Domain и View)
*Глубокий анализ сложных UI-компонентов в слое `shared` вскрыл проблему, где "глупые" элементы отображения берут на себя роли контроллеров и Data-мапперов:*

- [ ] **Data-маппинг во время Render-цикла (Contacts)**: Компонент `src/shared/ui/components/contacts/index.tsx` содержит хардкод бизнес-правил `CONTACT_ICONS_MAP`. Прямо внутри React-компонента происходит фильтрация `activeKeys = Object.keys...filter()` и вызов доменного форматтера URL'ов. Component сцеплен с бизнес-логикой. Необходимо вынести подготовку пропсов в слой Feature (Controller) и передавать в UI чистый массив готовых кнопок.
- [ ] **Business Logic внутри UI (Crypto Wallets)**: Файл `src/shared/ui/components/crypto-wallets/index.tsx` самостоятельно определяет "defaultNetwork" и "primary-кошелек" с помощью логики `wallets![k]?.isPrimary`. View-слой не должен вычислять первичность сущностей. Он так же хардкодит список иконок `NETWORK_ICONS_MAP` и нарушает принцип инверсии. Это делает компонент не переиспользуемым вне оригинального домена.

## 🔎 РЕЗУЛЬТАТЫ АУДИТА: ФАЗА 5 (Уровень бойлерплейта и Cargo-Cult)
*Исследование UI-примитивов (`src/shared/ui/primitives`) подтвердило критический уровень бессмысленного копипаста:*

- [ ] **Cargo-Cult Паттерн (Анти-YAGNI)**: Практически во всех обертках над HeroUI (Avatar, Checkbox, Pagination и др.) разработчики вслепую скопировали механизм кастомных вариантов `appVariant: _appVariant = "default"`. Однако эта переменная деструктурируется и полностью игнорируется в рендере (она ни во что не преобразуется). Это рождает сотни строк мертвого кода и 14 ESLint warnings (Unused vars).
- [ ] **Бессмысленные абстракции-пустышки**: Из-за того что `appVariant` не используется, файлы вроде `checkbox.tsx` просто принимают `props` и пробрасывают их в `HeroCheckbox` 1 в 1. Такие обертки не делают абсолютно ничего (zero-value wrappers). Если не планируется кастомный Tailwind-merging для вариантов дизайна, эти обертки нужно превратить в простые ре-экспорты `export { Checkbox } from "@heroui/react"` (или вырезать `appVariant` и оставить только `"use client"` барьеры, если они нужны).

---

## 🔎 РЕЗУЛЬТАТЫ АУДИТА: ФАЗА 8 (Мешанина во View и God-Объекты)
*Тщательный аудит структуры компонентов выявил наличие "Божественных Компонентов" (God Objects), которые нарушают принцип единой ответственности (SRP) и усложняют читаемость:*

- [ ] **Перегруженный AuthForm (God Object)**: Файл `src/features/auth/components/auth-form/index.tsx` перегружен. В 217 строк кода упакованы 4 различных состояния: ввод Email, слайд-оверлей с проверкой OTP, fade-in блок для ввода имени нового юзера и блок OAuth кнопок, перевязанные inline-анимациями Framer Motion. Этот компонент не поддается точечному тестированию (нельзя отрендерить только OTP без прохождения первого этапа). Его необходимо декомпозировать на независимые шаги (`StepEmail`, `StepOTP`, `StepRegister`), а сам `AuthForm` превратить в простую State-машину.
- [ ] **Избыточные Inline-стили в UI**: В компоненте `src/features/header/index.tsx` кнопка мобильного меню содержит десятки inline-классов Tailwind для вычисления поворота линий бургера (`before:content-[''] before:block before:h-px before:w-6...`). Это загрязняет View сложной CSS-математикой. Эту кнопку следует вынести в отдельный изолированный Dumb-компонент `BurgerButton` в слое `shared/ui`.

---

## 🔎 РЕЗУЛЬТАТЫ АУДИТА: ФАЗА 9 (Уязвимости Локализации и i18n)
*Анализ интеграции `next-intl` показал опасные паттерны смешивания языков в рамках переиспользуемых компонентов:*

- [ ] **Скрытый Английский Fallback в Shared-компонентах**: В компоненте `crypto-wallets/index.tsx` переводы передаются через пропсы, однако захардкожены дефолтными значениями на английском: `texts = { selectNetwork: "Select Network", noAddress: "No address" }`. Это грубое нарушение безопасности локализации. Если разработчик забудет передать переведенный объект, Typescript промолчит, и русские юзеры увидят обрывки английского интерфейса. Default-тексты в UI-слое должны быть строго запрещены (обязательные пропсы `texts: { ... }` без fallback-значений).
- [ ] **Отсутствие форматеров Дат/Валют**: В проекте активно используется `useTranslations` для строк, но при этом отсутствует системная настройка форматеров через `next-intl` (`Intl.DateTimeFormat` / `Intl.NumberFormat`). Любые даты или балансы кошельков будут рендериться хаотично, без привязки к текущей локали пользователя. Требуется внедрить глобальные форматеры в `NextIntlClientProvider`.

---

## 🔎 РЕЗУЛЬТАТЫ АУДИТА: ФАЗА 9 (Мертвые участки кода / Dead Code)
*Глубокий анализ через AST-парсер `knip` (с полноценной поддержкой Next.js роутинга и алиасов) вскрыл реальную картину мертвых зон в проекте. Вопреки ожиданиям, "висячих" UI-компонентов не найдено (все они жестко вшиты в дерево импортов). Зато вскрыт мертвый инфраструктурный груз:*

- [ ] **Real Dead File**: Файл `src/shared/constants/query.ts` не импортируется ни одной сущностью в кодовой базе и должен быть удален.
- [ ] **Garbage Dependencies (8)**: В `package.json` найдены тяжелые библиотеки, импортов которых больше нет в коде. Они раздувают сборку и тормозят `npm install`. Следует вырезать из prod-зависимостей: `@prisma/client`, `@prisma/extension-accelerate`, `@tailwindcss/vite`, `@types/set-cookie-parser`, `bcryptjs`, `jose`, `motion`, `motion-dom`.
- [ ] **Мертвые Экспорты Логики**: Функции `isNavLinkActive` (header hook), константы `AUTH_ERRORS` и ряд API-маршрутизаторов (`getCoopsControllerFindAllUrl`, `sessionControllerRefresh`) лежат без ссылок в проекте.
- [ ] ОЖИДАЕТ УТОЧНЕНИЯ В ФАЗЕ РЕФАКТОРИНГА: (Пользователь сообщил о наличии еще 3-х UI компонентов для удаления. Поскольку AST-парсер видит, что они куда-то импортируются, их необходимо вырезать вручную).

> **Архитектурный итог:** Эти рудименты не просто лежат "до лучших времен" — они ломают общую читабельность. Их необходимо полностью стереть из кодовой базы, а в случае надобности в будущем — вытащить из истории Git.


---

## 🏆 10. EXECUTIVE SUMMARY (Финальный отчет и приоритезация)

**PRODUCTION READINESS SCORE: 🔴 15/100 (НЕ ГОТОВО К РЕЛИЗУ)**
*Текущее состояние архитектуры и инфраструктуры платформы несет неприемлемые риски для пользователей и бизнеса. Релиз в текущем виде приведет к падению БД, потере заявок и нестабильности.*

### Приоритеты исправления (Roadmap для рефакторинга):

#### 🚨 P0 (Критичные блокираторы релиза - исправить НЕМЕДЛЕННО)
1. **Docker Compose Typo**: Исправить опечатку `${MCP_COOP_PLARFORM}`, иначе база данных не запустится в проде.
2. **Contact Form Data Loss**: Реализовать логику `submitContactForm` вместо `console.log`, иначе заявки клиентов сгорят.
3. **Zod ENV Validation**: Внедрить валидацию `.env`, иначе рантайм ошибки положат сервер из-за пропущенных ключей API.

#### 🟠 P1 (Высокий приоритет - стабильность кодовой базы)
1. **Next.js Resilience**: Добавить `global-error.tsx` и `not-found.tsx` для предотвращения "Белых экранов смерти".
2. **Quality Gates & CI/CD**: Вынести `lint` и `tsc` в отдельную Fail-Fast джобу. Создать `ci.yml` для защиты PR веток от сломанного кода.
3. **Vitest + RTL Integration**: Настроить среду для тестов. Проект не имеет права запускаться без базовых юнит-тестов для `AuthForm`.

#### 🟡 P2 (Архитектурный и технический долг)
1. **Dependency Inversion**: Перенести логику обращения к `Prisma` из `features` в независимый `infrastructure` репозиторий.
2. **Декомпозиция AuthForm**: Распилить "God Component" авторизации на изолированные шаги для простоты тестирования.
3. **Смешивание абстракций**: Удалить доменные форматтеры и хардкод-константы (`CONTACT_ICONS_MAP`) из `shared/ui`.
4. **Утечки в Shared**: Перенести все мапперы сущностей и валидацию Zod в родные папки `entities/` и `features/`.

#### 🟢 P3 (Очистка от мусора)
1. Убить Cargo-Cult `_appVariant` из всех UI-примитивов (`avatar.tsx`, `checkbox.tsx` и др.).
2. Удалить все неиспользуемые Dead Code компоненты из `ready_for_prod.md` (пункт 4).
