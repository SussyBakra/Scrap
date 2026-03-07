export const fonts = {
    // Brutalist Headers - Bold, blocky sans-serif
    header: {
        regular: 'System',
        bold: 'System',
    },

    // Handwritten-style for notes
    handwritten: {
        regular: 'System',
    },
} as const;

export const fontSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 48,
} as const;

export const fontWeights = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    black: '900' as const,
};

export const letterSpacing = {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    extraWide: 2,
} as const;
