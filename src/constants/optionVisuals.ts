import {
  AnchorIcon,
  Building2Icon,
  CompassIcon,
  DropletsIcon,
  FlameIcon,
  GrapeIcon,
  LeafIcon,
  MoonIcon,
  MountainIcon,
  SailboatIcon,
  SnowflakeIcon,
  SparklesIcon,
  SunIcon,
  TelescopeIcon,
  TreesIcon,
  WavesIcon,
  WheatIcon,
  type LucideIcon,
} from 'lucide-react'

export interface OptionVisual {
  icon: LucideIcon
  /** Tailwind gradient classes for the avatar background. */
  gradient: string
}

/**
 * Curated icon + gradient per Chilean region, chosen to evoke its
 * geography (desert north → wine valleys → forests/lakes → glaciers south).
 * Purely a presentational lookup — the data model has no image field, so
 * this never blocks a future battle on a different topic.
 */
const REGION_VISUALS: Record<string, OptionVisual> = {
  'Arica y Parinacota': { icon: MountainIcon, gradient: 'from-orange-400 to-amber-600' },
  Tarapacá: { icon: SunIcon, gradient: 'from-amber-400 to-orange-500' },
  Antofagasta: { icon: MoonIcon, gradient: 'from-orange-500 to-rose-600' },
  Atacama: { icon: TelescopeIcon, gradient: 'from-indigo-500 to-violet-700' },
  Coquimbo: { icon: GrapeIcon, gradient: 'from-fuchsia-500 to-purple-700' },
  Valparaíso: { icon: AnchorIcon, gradient: 'from-sky-500 to-blue-700' },
  Metropolitana: { icon: Building2Icon, gradient: 'from-slate-400 to-slate-600' },
  "O'Higgins": { icon: WheatIcon, gradient: 'from-yellow-400 to-lime-600' },
  Maule: { icon: TreesIcon, gradient: 'from-lime-500 to-emerald-600' },
  Ñuble: { icon: LeafIcon, gradient: 'from-green-400 to-emerald-600' },
  Biobío: { icon: WavesIcon, gradient: 'from-teal-500 to-cyan-700' },
  Araucanía: { icon: FlameIcon, gradient: 'from-red-500 to-orange-700' },
  'Los Ríos': { icon: DropletsIcon, gradient: 'from-cyan-500 to-sky-700' },
  'Los Lagos': { icon: SailboatIcon, gradient: 'from-blue-500 to-indigo-700' },
  Aysén: { icon: SnowflakeIcon, gradient: 'from-cyan-300 to-blue-600' },
  Magallanes: { icon: CompassIcon, gradient: 'from-slate-500 to-indigo-900' },
}

const FALLBACK_VISUALS: OptionVisual[] = [
  { icon: SparklesIcon, gradient: 'from-amber-400 to-red-500' },
  { icon: FlameIcon, gradient: 'from-orange-400 to-rose-600' },
  { icon: WavesIcon, gradient: 'from-sky-400 to-blue-600' },
  { icon: LeafIcon, gradient: 'from-emerald-400 to-teal-600' },
]

/** Deterministic hash so the same option name always gets the same fallback. */
function hashName(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0
  return Math.abs(hash)
}

/** Looks up a known region's visual, or derives a stable one from the name. */
export function getOptionVisual(name: string): OptionVisual {
  return REGION_VISUALS[name] ?? FALLBACK_VISUALS[hashName(name) % FALLBACK_VISUALS.length]
}
