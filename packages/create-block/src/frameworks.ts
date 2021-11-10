import {
  yellow, blue, green,
} from 'kolorist';

export interface Choice {
  name: string;
  display: string;
  color: (str: string | number) => string;
}

export type Framework = 'vanilla' | 'vite';

export type Variant = 'vanilla' | 'vanilla-ts' | 'vue2' | 'vue3';

export const FRAMEWORKS = [
  {
    name: 'vanilla',
    color: yellow,
    variants: [
      {
        name: 'vanilla',
        color: yellow,
      },
      {
        name: 'vanilla-ts',
        color: blue,
      },
    ],
  },
  {
    name: 'vite',
    color: green,
    variants: [
      {
        name: 'vue3',
        color: yellow,
      },
      {
        name: 'vue2',
        color: blue,
      },
    ],
  },
];

export const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name],
).reduce((a, b) => a.concat(b), []);
