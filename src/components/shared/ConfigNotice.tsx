import { SettingsIcon } from 'lucide-react'
import { EmptyState } from './EmptyState'

/** Shown instead of the app when Firebase env vars are missing. */
export function ConfigNotice() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <EmptyState
        icon={SettingsIcon}
        title="Configuración pendiente"
        description="Faltan las variables de entorno de Firebase. Copia .env.example a .env, completa las claves de tu proyecto y reinicia la app."
      />
    </div>
  )
}
