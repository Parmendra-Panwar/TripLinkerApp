// src/constants/theme.ts
// TRIPLINKER Design System – Refined Travel Luxury

export const Colors = {
  // Primary Palette
  ocean: {
    deep: '#0D1B2A',
    mid: '#1B3A5C',
    light: '#2E6DA4',
    mist: '#A8C8E8',
  },
  sand: {
    dark: '#C4956A',
    mid: '#E8C99A',
    light: '#F5E6C8',
    pale: '#FAF5ED',
  },
  // Neutrals
  ink: '#0D1B2A',
  slate: '#4A5568',
  stone: '#8A9BB0',
  mist: '#CBD5E0',
  fog: '#EDF2F7',
  white: '#FFFFFF',
  // Functional
  success: '#2D9E6B',
  warning: '#E6A817',
  error: '#D64045',
  // Accent
  coral: '#E85D4A',
  sage: '#6B9E7A',
};

export const Typography = {
  // Display font: Playfair-inspired, elegant
  display: {
    hero: { fontSize: 42, fontWeight: '800' as const, letterSpacing: -1.5 },
    h1: { fontSize: 32, fontWeight: '700' as const, letterSpacing: -1 },
    h2: { fontSize: 24, fontWeight: '700' as const, letterSpacing: -0.5 },
    h3: { fontSize: 20, fontWeight: '600' as const, letterSpacing: -0.3 },
  },
  // Body text
  body: {
    lg: { fontSize: 17, fontWeight: '400' as const, lineHeight: 26 },
    md: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
    sm: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  },
  // UI Labels
  label: {
    md: { fontSize: 14, fontWeight: '600' as const, letterSpacing: 0.3 },
    sm: { fontSize: 12, fontWeight: '600' as const, letterSpacing: 0.5 },
    xs: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 1 },
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 999,
};

export const Shadow = {
  sm: {
    shadowColor: '#0D1B2A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#0D1B2A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0D1B2A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
};
