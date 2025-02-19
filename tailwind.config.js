export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        animation: {
          "spin-slow": "spin 10s linear infinite",
          float: "float 6s ease-in-out infinite",
          bounce: "bounce 2s infinite",
        },
        keyframes: {
          float: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
          },
        },
      },
    },
    plugins: [],
  };