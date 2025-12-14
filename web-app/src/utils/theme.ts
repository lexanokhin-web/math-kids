// Theme color schemes ported from Swift app
export interface ThemeColorScheme {
  id: string;
  name: string;
  gradient: [string, string];
  buttonColors: string[];
}

export const colorSchemes: ThemeColorScheme[] = [
  {
    id: 'classic',
    name: 'Classic',
    gradient: ['#E3F6F5', '#FFE5EC'],
    buttonColors: ['#F7D6E0', '#F9F9C5', '#D0F4DE', '#B5EAD7']
  },
  {
    id: 'mint',
    name: 'Mint',
    gradient: ['#D0F4DE', '#B5EAD7'],
    buttonColors: ['#B5EAD7', '#D0F4DE', '#C7CEEA', '#E2F0CB']
  },
  {
    id: 'sunny',
    name: 'Sunny',
    gradient: ['#FFFDE4', '#FFF1BA'],
    buttonColors: ['#FFF1BA', '#FFE5B4', '#FFF9C5', '#FFDAC1']
  },
  {
    id: 'violet',
    name: 'Violet',
    gradient: ['#E5D4ED', '#C7CEEA'],
    buttonColors: ['#E5D4ED', '#C7CEEA', '#D5AAFF', '#B5B9FF']
  },
  {
    id: 'ocean',
    name: 'Ocean',
    gradient: ['#D0F4DE', '#C7CEEA'],
    buttonColors: ['#C7CEEA', '#D0F4DE', '#B5EAD7', '#A0CED9']
  }
];

export const getScheme = (id: string): ThemeColorScheme => {
  return colorSchemes.find(s => s.id === id) || colorSchemes[0];
};

export const applyTheme = (schemeId: string) => {
  const scheme = getScheme(schemeId);
  const root = document.documentElement;
  
  root.style.setProperty('--gradient-start', scheme.gradient[0]);
  root.style.setProperty('--gradient-end', scheme.gradient[1]);
  root.style.setProperty('--button-color-1', scheme.buttonColors[0]);
  root.style.setProperty('--button-color-2', scheme.buttonColors[1]);
  root.style.setProperty('--button-color-3', scheme.buttonColors[2]);
  root.style.setProperty('--button-color-4', scheme.buttonColors[3]);
};
