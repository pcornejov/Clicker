import type { BattleInput } from '@/types'

/**
 * Example battle created from the admin panel ("Sembrar batalla de ejemplo").
 * The app itself is theme-agnostic: any battle (food, sports, games…) works
 * by only changing Firestore data.
 */
export const SEED_BATTLE: BattleInput = {
  title: '¿Cuál es la mejor región de Chile?',
  description:
    'Dieciséis regiones, un solo título. Haz clic para apoyar a la tuya: cada clic es un voto y puedes votar todas las veces que quieras.',
  startDate: null,
  endDate: null,
}

export const SEED_OPTIONS: string[] = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana',
  "O'Higgins",
  'Maule',
  'Ñuble',
  'Biobío',
  'Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes',
]
