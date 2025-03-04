# Reconcile AI ~ An AI-Powered Financial Reconciliation

Reconcile AI is an easy-to-use reconciliation platform (web app) for comparing any two sets of financial records, like customer records (e.g., student payments, inventory sales, transaction alerts), with bank statements for any discrepancies or irregularities. It offers a simple file upload interface, AI-based matching algorithms with manual overrides, and multiple options for exporting results, thereby decreasing manual interventions by the users while increasing efficiency and accuracy.

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## <span id="features"> ✨ Core Functionality </span>

- **User Onboarding and Authentication:** Give users an excellent onboarding experience so that they may easily learn and use the product.

- **Reconciliation:** Identify discrepancies with high precision, minimizing the risk of errors in financial reporting by utilizing AI-based matching algorithms.

- **Flexibility:** Provides manual override options that would allow its users to tackle complex or peculiar cases and provide accuracy in reconciliations.

- **Optimize User Experience:** Provides an easy-to-use file upload interface for users.

- **Results Export:** Ensures users can export reconciliation results for reports and further analysis.

## <span id="tech-stack">🛠️ Tech Stack</span>

- **Framework**: Next.js 15 with App Router
- **UI Library**: Shadcn UI
- **State Management**: Zustand
- **lucide-react** – Icon library for React.
- **Styling**: Tailwind CSS

## <span id="getting-started"> 🚀 Getting Started </span>

### Prerequisites

- Node.js (v18 or higher)
- Package manager: **npm** or **yarn**

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd [project-directory]
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## <span id="project-structure">📂 Project Structure</span>

```plaintext
reconcile-ai-fe/
├── public/
|   |
│   └── favicon.ico          # Favicon
|
├── src/
|   └── app/                 # Next.js app router
│        ├── page.tsx        # Homepage
│        ├── favicon.ico     # Favicon
│        └── page.tsx
|
│
├── components/
│   ├── common/              # Reusable components (e.g., Container.tsx,)
│   └── ui/                  # Shadcn components
│
|
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
├── CONTRIBUTING.md          # Contribution guideline file
├── README.md                # Readme file
├── .env.local               # Environment variables (not committed)
└── package.json             # Project dependencies and scripts
```

## <span id="contributing"> 🤝 Contributing </span>

Please see [CONTRIBUTING](CONTRIBUTING.md)
