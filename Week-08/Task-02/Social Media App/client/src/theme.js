// color design tokens export

//Soft Pastel Theme
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F7F7F7",
    50: "#E8E8E8",
    100: "#D0D0D0",
    200: "#B3B3B3",
    300: "#8C8C8C",
    400: "#666666",
    500: "#4F4F4F",
    600: "#3A3A3A",
    700: "#2C2C2C",
    800: "#1E1E1E",
    900: "#121212",
    1000: "#000000",
  },
  primary: {
    50: "#F8E8E8",
    100: "#F3C6C6",
    200: "#E88D8D",
    300: "#E06464",
    400: "#D73D3D",
    500: "#C81F1F",
    600: "#A91414",
    700: "#870F0F",
    800: "#5D0707",
    900: "#320404",
  },
};

// Vibrant Cool Theme
// export const colorTokens = {
//   grey: {
//     0: "#FFFFFF",
//     10: "#F0F4F8",
//     50: "#E1E8EF",
//     100: "#D0DCE5",
//     200: "#B0B7C8",
//     300: "#8D9BB5",
//     400: "#6A7C8D",
//     500: "#475A6F",
//     600: "#324756",
//     700: "#1F2C3B",
//     800: "#0F161D",
//     900: "#020307",
//     1000: "#000000",
//   },
//   primary: {
//     50: "#E0F7FA",
//     100: "#B2EBF2",
//     200: "#80DEEA",
//     300: "#4DD0E1",
//     400: "#26C6DA",
//     500: "#00BCD4",
//     600: "#00A4C3",
//     700: "#0085A1",
//     800: "#005C77",
//     900: "#003C4F",
//   },
// };

// Elegant Dark Theme
// export const colorTokens = {
//   grey: {
//     0: "#F5F5F5",
//     10: "#E0E0E0",
//     50: "#B0B0B0",
//     100: "#8C8C8C",
//     200: "#707070",
//     300: "#545454",
//     400: "#404040",
//     500: "#2D2D2D",
//     600: "#1C1C1C",
//     700: "#0D0D0D",
//     800: "#050505",
//     900: "#000000",
//     1000: "#000000",
//   },
//   primary: {
//     50: "#D7D9E3",
//     100: "#B2B6C7",
//     200: "#8D93A6",
//     300: "#6A7386",
//     400: "#4B5868",
//     500: "#2C3F4A",
//     600: "#1C2D3A",
//     700: "#0D1C2A",
//     800: "#00101C",
//     900: "#000000",
//   },
// };

// Warm Earthy Theme
// export const colorTokens = {
//   grey: {
//     0: "#FFFFFF",
//     10: "#F4F2F0",
//     50: "#E0D8CE",
//     100: "#D1B9A5",
//     200: "#B79880",
//     300: "#9A6F50",
//     400: "#6F4F3F",
//     500: "#4E3A2A",
//     600: "#3A2C1D",
//     700: "#2A1F13",
//     800: "#1B1308",
//     900: "#0C0602",
//     1000: "#000000",
//   },
//   primary: {
//     50: "#FFEDE0",
//     100: "#FFC6B5",
//     200: "#FF9E8B",
//     300: "#FF7A64",
//     400: "#FF5B3E",
//     500: "#FF3D20",
//     600: "#E62E1A",
//     700: "#C81F15",
//     800: "#A2130F",
//     900: "#710C07",
//   },
// };

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
