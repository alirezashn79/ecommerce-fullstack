# 🛒 Coffee Ecommerce Fullstack

A full-stack ecommerce platform for selling coffee and related products, built with **Next.js**, **MongoDB**, and a modern tech stack. This project delivers a seamless shopping experience with user authentication, cart functionality, and interactive UI components.

---

## 🌟 Features

- **Full-Stack Architecture**: Backend powered by **Next.js API routes** and database integration with **MongoDB**.
- **Authentication**: User login and registration with JWT-based authentication.
- **Interactive UI**: Built with reusable React components and styled for responsiveness.
- **Forms and Validation**: Smooth forms with `react-hook-form` and validation using `zod` and `yup`.
- **Maps Integration**: Location-based features powered by **Leaflet** and **react-leaflet**.
- **Data Visualization**: Charts and graphs using `recharts`.
- **User-Friendly Notifications**: Toast messages with **react-toastify**.

---

## 🛠️ Scripts

The following scripts are defined in `package.json`:

| Script      | Description                                     |
|-------------|-------------------------------------------------|
| `dev`       | Start the development server.                  |
| `build`     | Build the project for production.              |
| `start`     | Start the production server.                   |
| `lint`      | Run ESLint to check code quality.              |

Run any script using:

```bash
npm run <script-name>
```

---

## 🚀 Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/alirezashn79/ecommerce-fullstack.git
   cd ecommerce-fullstack
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the environment variables**:
   Create a `.env.local` file in the root directory and add the following:

   ```env
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   NEXT_PUBLIC_API_URL=<API Base URL>
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

Your app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```plaintext
src/
├── components/       # Reusable React components
├── pages/            # Next.js pages and API routes
├── hooks/            # Custom React hooks
├── models/           # Mongoose models for MongoDB
├── services/         # Services and API calls
├── utils/            # Helper functions and utilities
├── styles/           # Global and component-specific styles
public/               # Static assets (images, icons, etc.)
```

---

## 🌐 Deployment

This project can be deployed using **Vercel** or any Node.js-compatible hosting service. To deploy:

1. Push your code to a GitHub repository.
2. Link your repository to [Vercel](https://vercel.com).
3. Add your environment variables in the Vercel dashboard.
4. Deploy your project with a single click!

---

## 🔧 Technologies Used

- **Frontend**: React, Next.js, TailwindCSS
- **Backend**: MongoDB, Next.js API routes
- **Authentication**: JWT, Cookies
- **State Management**: Zustand
- **Forms**: React Hook Form, Zod, Yup
- **UI/UX Enhancements**: AOS (Animations), React Modal, SweetAlert, Swiper
- **Maps**: Leaflet, React Leaflet
- **Data Visualization**: Recharts

---

## 🤝 Contributions

Contributions are welcome! If you have ideas for new features or find a bug, feel free to:

- Open an issue.
- Fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more details.

---

✨ Built with ❤️ and ☕ for coffee lovers everywhere. Happy shopping! 🛍️
