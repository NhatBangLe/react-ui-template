# React 19 + TypeScript + Vite

This template provides a comprehensive setup for building modern, production-ready web applications. It's pre-configured with **Vite**, **React 19**, and **TypeScript**, and includes a powerful, opinionated stack:

- **Core:** React 19, TypeScript, and Vite.
- **Routing:** **React Router (Data Mode)** using `createBrowserRouter` for modern routing, data loading, and mutations.
- **Data Fetching:** **RTK Query** for efficient data fetching, caching, and state management, integrated with Redux Toolkit.
- **UI Toolkit:** **MUI (Material-UI)** for a rich, pre-built component library.
- **Internationalization:** **react-i18next** for handling translations.
- **HTTP Client:** **Axios**, available for standalone HTTP requests or as a potential `baseQuery` for RTK Query.

It includes Hot Module Replacement (HMR) and a robust ESLint configuration.

## 🚀 React Compiler

This template uses **React 19** and has the **React Compiler enabled by default**.

See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## ⚡ Vite Plugin Options

This template uses one of the two official plugins for React Fast Refresh. You can choose which one to use:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)).
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/).

## 🛠️ Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			// Other configs...

			// Remove tseslint.configs.recommended and replace with this
			tseslint.configs.recommendedTypeChecked,
			// Alternatively, use this for stricter rules
			tseslint.configs.strictTypeChecked,
			// Optionally, add this for stylistic rules
			tseslint.configs.stylisticTypeChecked,

			// Other configs...
		],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			// Other configs...
			// Enable lint rules for React
			reactX.configs['recommended-typescript'],
			// Enable lint rules for React DOM
			reactDom.configs.recommended,
		],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
]);
```
