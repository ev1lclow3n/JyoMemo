export type ThemeKey = 'peach' | 'gold' | 'lavender' | 'mint' | 'periwinkle' | 'rose';

export type IconKey = 'leaf' | 'star' | 'heart' | 'moon' | 'sparkles' | 'feather';

export interface NoteItem {
  id: string;
  title: string;
  content: string; // Bullet items or poetic paragraph
  iconType: IconKey;
  theme: ThemeKey;
  isFavorite?: boolean;
  createdAt: number;
  updatedAt: number;
}

export type DeviceMode = 'auto' | 'desktop' | 'tablet' | 'mobile';

export interface ThemeConfig {
  key: ThemeKey;
  name: string;
  cardBg: string;
  borderColor: string;
  titleColor: string;
  bodyColor: string;
  mutedColor: string;
  accentColor: string;
  iconBg: string;
}
