# 🛡️ Post Moderation Dashboard

A fast, modern moderation dashboard built using **React**, **Redux Toolkit**, and **Tailwind CSS**, powered by **Vite**. Designed for high-performance workflows like bulk moderation, keyboard navigation, undo functionality, and infinite scroll.

- Live: [https://himanshudkp.github.io/moderation-queue-interface/]

---

## ⚙️ Tech Stack

| Tech                                           | Purpose             |
| ---------------------------------------------- | ------------------- |
| [React](https://reactjs.org)                   | UI framework        |
| [Vite](https://vitejs.dev/)                    | Fast dev/build tool |
| [Redux Toolkit](https://redux-toolkit.js.org/) | State management    |
| [Tailwind CSS](https://tailwindcss.com/)       | Styling             |
| [TypeScript](https://www.typescriptlang.org/)  | Type safety         |
| [Lucide React](https://lucide.dev/)            | Icon library        |
| [Sonner](https://sonner.emilkowal.ski/)        | Toast notifications |
| [pnpm](https://pnpm.io/)                       | Package manager     |

---

## ✨ Features

- ✅ Approve or reject individual posts
- ✅ Bulk approve/reject selected posts
- ✅ Undo actions within 5 seconds
- ✅ Confirmation dialog before critical actions
- ✅ Infinite scroll for posts
- ✅ Keyboard shortcuts for power users
- ✅ Modal to view post details (with navigation)
- ✅ Select/deselect all visible posts
- ✅ Loading and error states
- ✅ Skeleton UI while loading
- ✅ Clean, responsive design

---

## 🧪 Mock Data

This project uses mock post data for development and testing purposes.

You can find the mock data in the following file: 📁 src/data/mockPosts.ts

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) v22.17.0
- [pnpm](https://pnpm.io/) 10.12.1
- Git

---

## 🧰 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/himanshudkp/moderation-queue-interface.git
cd moderation-queue-interface
pnpm install
```

---

## ▶️ Running Locally

Start the Vite dev server:

```bash
pnpm dev
```

Then open your browser at:

[http://localhost:5173]

## 🗃️ Project Structure

````bash
├── src
│ ├── assets
│ ├── components
│ │ ├── BulkActionBar.tsx
│ │ ├── ConfirmDialog.tsx
│ │ ├── ErrorPage.tsx
│ │ ├── FilterButtons.tsx
│ │ ├── NoPosts.tsx
│ │ ├── PostRow.tsx
│ │ ├── SkeletonRow.tsx
│ │ ├── SkeletonTable.tsx
│ │ ├── TableHeader.tsx
│ │ └── ViewPostDialog.tsx
│ ├── data
│ │ └── mockPosts.ts # 👉 Mock post data lives here
│ ├── hooks
│ │ ├── useActionTimeouts.ts
│ │ ├── useConfirmationDialog.ts
│ │ ├── useDialogState.ts
│ │ ├── useInfiniteScroll.ts
│ │ └── useKeyboardShortcuts.tsx
│ ├── pages
│ │ └── ModerationQueue.tsx
│ ├── selectors
│ │ └── postsSelectors.ts
│ ├── slices
│ │ └── postsSlice.ts
│ ├── store
│ │ └── store.ts
│ ├── types.ts
│ ├── utils
│ │ └── utils.ts
│ ├── App.tsx
│ ├── index.css
│ ├── main.tsx
│ └── vite-env.d.ts
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts # Vite configuration
```

---

## 🧠 Architecture Notes

- Global post state and selection logic handled using Redux Toolkit
- Custom hooks for scroll detection, keyboard shortcuts, modals, confirmations
- Undo logic using setTimeout with toast notifications via Sonner
- Post detail modal with keyboard navigation
- Infinite scroll via scroll event tracking

## ✅ Checklist

- [x] Vite + React setup
- [x] Tailwind configured
- [x] Redux Toolkit slices and selectors
- [x] Modal and confirmation dialog
- [x] Infinite scroll
- [x] Bulk actions
- [x] Undo action support
- [x] Keyboard shortcut navigation
````
