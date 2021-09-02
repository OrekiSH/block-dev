import {
  yellow, blue,
} from 'kolorist';

export interface Choice {
  name: string;
  color: (str: string | number) => string;
}

export type Framework = 'vanilla';

export type Variant = 'vanilla' | 'vanilla-ts';

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
];

export const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name],
).reduce((a, b) => a.concat(b), []);
