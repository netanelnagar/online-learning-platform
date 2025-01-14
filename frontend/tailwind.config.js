/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0ea5e9",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#7C3AED",
          foreground: "#ffffff",
        },
        great: {
          DEFAULT: "#00c853",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 0 10px rgba(0, 0, 0, 0.1)",
        button: "0 0 10px rgba(0, 0, 0, 0.2)",
        dropdown: "0 0 10px rgba(0, 0, 0, 0.15)",
        input: "0 0 10px rgba(0, 0, 0, 0.1)",
      }
    },
  },
  plugins: [],
}

