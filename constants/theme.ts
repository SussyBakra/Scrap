export { fontSizes } from './fonts';

export const colors = {
    // Background
    cream: '#FBF8F1',
    paper: '#FFFFFF',

    // Core
    black: '#1A1A1A',
    ink: '#333333',

    // Pastels (used as accent fills)
    lilac: '#D8C8F5',
    mint: '#B5EAD7',
    bubblegum: '#FFBED0',
    peach: '#FFDAB9',
    sky: '#B8DFF9',

    // Functional
    white: '#FFFFFF',
    gray: '#8E8E93',
    lightGray: '#E5E5EA',
    border: '#1A1A1A',

    // Priority
    priorityHigh: '#FF6B6B',
    priorityMed: '#FFB347',
    priorityLow: '#77DD77',

    // Status
    success: '#4CD964',
    error: '#FF3B30',
    warning: '#FF9500',
} as const;

export const shadows = {
    brutal: {
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 8,
    },
    small: {
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
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
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
} as const;

export type ColorKey = keyof typeof colors;
