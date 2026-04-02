# Схемы данных для API (ProfileCard)

Ниже приведены две JSON-схемы (структуры ответа), которые твой бекенд должен возвращать для отрисовки карточек кооперативов (`/coops`) и специалистов (`/members`).

> [!NOTE]
> Компонент `ProfileCard` спроектирован так, что он сам понимает, как отрисовывать UI в зависимости от переданного пропа `type="coop" | "profile"`. Тебе не нужно передавать тип внутри самого JSON ответа, просто отдавай правильную структуру данных, а фронтенд подставит нужный тип при рендере карточки на странице. На стороне клиента объект типизируется как `ProfileCardData`.

---

## 1. Схема для Специалиста (Profile)

Для отрисовки карточки специалиста (мембера) бекенд должен отдавать следующий объект (`id` обязателен). Карточка будет ожидать массив `skills` для заполнения футера.

```json
{
  "id": "user_123xyz",
  "name": "Vitali Shpakowski",
  "description": "Experienced Web3 specialist focusing on frontend architecture and smart contract integration.",
  "avatarUrl": "https://example.com/avatars/vitali.png", // может быть null
  
  "categories": ["IT", "Web3"], 
  
  "skills": [ // Скиллы (скроллятся). Из их `category` собирается синий блок над списком
    { "id": "react", "name": "React", "category": "Frontend" },
    { "id": "next", "name": "Next.js", "category": "Frontend" },
    { "id": "nest", "name": "NestJS", "category": "Backend" }
  ],

  "contacts": { // Контакты (если чего-то нет, передавать null или вообще не передавать поле)
    "telegram": "https://t.me/example",
    "whatsapp": null,
    "viber": null,
    "phone": null,
    "email": "mailto:test@example.com",
    "instagram": "https://instagram.com/example",
    "facebook": null,
    "linkedin": "https://linkedin.com/in/example"
  },

  "wallets": { // Адреса кошельков
    "solana": { "address": "HN7cABqLq46Es1jh92dQQisAq...", "isPrimary": true },
    "bitcoin": { "address": "bc1qxy2kgdygjrsqtzq2n0yrf..." },
    "ethereum": { "address": "0x71C7656EC7ab88b098defB7..." },
    "ton": { "address": "EQBvW8Z5huBkMJYdnfAEM5JqCot..." }
  }
}
```

---

## 2. Схема для Кооператива (Coop)

Для отрисовки карточки кооператива (организации) бекенд должен отдавать следующий объект. 
В этом варианте массив `skills` игнорируется кодом компонента. Вместо него ожидается массив `members`, из которого карточка **сама** агрегирует компетенции (`role`) и строит красивые аватарки в футере.

```json
{
  "id": "coop_999abc",
  "name": "MCP COOP DAO",
  "description": "Decentralized cooperative ecosystem built on mutual value creation.",
  "avatarUrl": "https://example.com/avatars/coop-logo.png", // Логотип кооператива
  
  "categories": ["IT", "Consulting", "Finance Legal"], // Отраслевые категории кооператива (выводятся под названием)
  
  "contacts": {
    "telegram": "https://t.me/mcp_coop",
    "email": "mailto:hello@mcpcoop.com"
  },

  "wallets": {
    "solana": { "address": "HN7cABqLq46Es1jh9...", "isPrimary": true },
    "ethereum": { "address": "0x71C7656EC7ab8..." }
  },

  "members": [ // Массив участников кооператива
    { 
      "id": "m1", 
      "name": "Vitali Shpakowski", 
      "avatarUrl": "https://i.pravatar.cc/150?u=1", 
      "role": "Frontend" // Важно! Из этих ролей соберется синий блок над аватарками
    },
    { 
      "id": "m2", 
      "name": "Alex", 
      "avatarUrl": "https://i.pravatar.cc/150?u=2", 
      "role": "Backend" 
    },
    { 
      "id": "m3", 
      "name": "Elena", 
      "avatarUrl": null, // Если аватарки нет, нарисует инициалы EL
      "role": "UI/UX" 
    }
  ]
}
```

> [!TIP]
> Объекты `contacts` и `wallets` абсолютно идентичны для обоих типов. Если у профиля или кооператива нет какого-то кошелька или контакта — просто не передавай ключ этого кошелька/контакта (или отдай его как `null`), и фронтенд автоматически уберет иконку.


docker run --rm \
  --network mcp-network \
  -v "$(pwd)/prisma:/app/prisma" \
  -v "$(pwd)/prisma.config.ts:/app/prisma.config.ts" \
  -v "$(pwd)/tsconfig.json:/app/tsconfig.json" \
  -v "$(pwd)/node_modules:/app/node_modules" \
  -w /app \
  -e DATABASE_URL="postgresql://postgres:CHANGE_ME@postgres-backend:5432/mcp_task_micro_app?schema=public" \
  node:22-alpine \
  sh -c "node_modules/.bin/ts-node -r tsconfig-paths/register prisma/seed.ts"
