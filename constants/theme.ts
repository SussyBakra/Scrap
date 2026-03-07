export { fontSizes } from './fonts';

export const colors = {
    // Paper & Background
    cream: '#FAF7F0',
    creamDark: '#F5F0E6',
    paper: '#FFFEF9',

    // Neo-Brutalist Black
    black: '#000000',
    ink: '#1A1A1A',

    // Pastel Accents
    lilac: '#D4BBF7',
    lilacDark: '#B8A0E0',
    mint: '#A8E6CF',
    mintDark: '#8CD4B0',
    bubblegum: '#FFB7D5',
    bubblegumDark: '#FF9FC5',
    peach: '#FFDAB3',
    peachDark: '#FFC999',
    sky: '#B3E5FC',
    skyDark: '#90D4F0',

    // Functional
    white: '#FFFFFF',
    gray: '#888888',
    lightGray: '#DDDDDD',

    // Status
    success: '#7FD8A8',
    warning: '#FFD966',
    error: '#FF8A8A',
} as const;

export const shadows = {
    // Hard Neo-Brutalist Shadows
    small: {
        shadowColor: colors.black,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    medium: {
        shadowColor: colors.black,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 8,
    },
    large: {
        shadowColor: colors.black,
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 12,
    },
    pressed: {
        shadowColor: colors.black,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,
    },
} as const;

export const borders = {
    thick: {
        borderWidth: 3,
        borderColor: colors.black,
    },
    medium: {
        borderWidth: 2,
        borderColor: colors.black,
    },
    thin: {
        borderWidth: 1,
        borderColor: colors.black,
    },
} as const;

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

export const borderRadius = {
    small: 4,
    medium: 8,
    large: 12,
    round: 9999,
} as const;

export type ColorKey = keyof typeof colors;
