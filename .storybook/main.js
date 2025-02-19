// import { mergeConfig } from "vite";
// import { defineConfig } from "vite";

// export default {
//   stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
//   addons: [
//     "@storybook/addon-onboarding",
//     "@storybook/addon-essentials",
//     "@chromatic-com/storybook",
//     "@storybook/addon-interactions",
//   ],
//   framework: {
//     name: "@storybook/react-vite",
//     options: {},
//   },
//   async viteFinal(config) {
//     return mergeConfig(config, defineConfig({
//       resolve: {
//         alias: {
//           "@": "/src",
//         },
//       },
//     }));
//   },
// };

export default {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
};
