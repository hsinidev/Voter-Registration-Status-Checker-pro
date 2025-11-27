
# Voter Registration Status Checker (UI Showcase)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)

A modern, high-fidelity web application designed to simulate the voter registration checking process. This project emphasizes **privacy-first architecture**, **immersive UI/UX**, and **SEO optimization**.

### 🚀 LIVE DEMO
**[doodax.com](https://doodax.com/tools/registration-status/index.html)**

---

## 📖 Project Description

The **Voter Registration Status Checker** is a portfolio piece built by **HSINI MOHAMED**. It demonstrates how critical civic tools can be built with a focus on user experience (UX) without compromising security.

The application features a custom HTML5 Canvas galaxy background, glassmorphism UI elements, and a fully responsive layout. It includes a comprehensive SEO strategy with JSON-LD structured data for "Article" and "FAQPage" schemas.

**Note:** This is a frontend simulation. No data is sent to any server.

## 🌟 Key Features

-   **🌌 Immersive Galaxy Background**: A custom-coded, multi-colored particle system simulating a deep space nebula.
-   **🔒 Privacy-First**: All data entered remains in the browser's memory and is cleared on refresh.
-   **📱 Fully Responsive**: Optimized for Mobile, Tablet, and Desktop experiences.
-   **♿ Accessible**: Built with semantic HTML and ARIA labels.
-   **🔍 SEO Optimized**: Includes `sitemap.xml`, `robots.txt`, and extensive meta tags.
-   **📚 Educational Content**: Features a collapsible 3,500-word guide on voting rights.

## 📂 Project Structure

```bash
/
├── index.html                  # Main entry point with SEO Meta & Schema
├── index.tsx                   # React DOM root
├── App.tsx                     # Main application layout assembly
├── types.ts                    # TypeScript interfaces
├── constants.ts                # Static datasets (US States)
├── favicon.svg                 # Vector branding icon
├── robots.txt                  # Search engine directives
├── sitemap.xml                 # SEO site map
├── components/
│   ├── Layout.tsx              # App wrapper, Footer, Galaxy Canvas, Modals
│   ├── RegistrationCheckerUI.tsx # Interactive Form logic
│   └── SeoArticle.tsx          # Collapsible long-form content
└── lib/
    └── formValidation.ts       # Input validation utilities
```

## 🚀 Getting Started

This project is built for standard modern browser environments using ES Modules.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/hsinidev/voter-registration-ui.git
    ```

2.  **Install Dependencies** (If converting to a build process)
    ```bash
    npm install
    ```

3.  **Run Locally**
    You can serve the root directory with any static server:
    ```bash
    npx http-server .
    ```

## 👨‍💻 Author

**HSINI MOHAMED**

-   **Website:** [doodax.com](https://doodax.com)
-   **Email:** [hsini.web@gmail.com](mailto:hsini.web@gmail.com)
-   **GitHub:** [@hsinidev](https://github.com/hsinidev)

## 📄 License

This project is licensed under the MIT License.
