const LAST_UPDATED = '12 de julio de 2026'

/**
 * Plain-language privacy policy. Written to be accurate whether or not ads
 * are currently enabled (see lib/ads.ts) — the section on publicidad reads
 * correctly in both states.
 */
export function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-2xl space-y-8 text-sm leading-relaxed text-muted-foreground">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Política de privacidad
        </h1>
        <p className="text-xs">Última actualización: {LAST_UPDATED}</p>
      </header>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">Quiénes somos</h2>
        <p>
          Chile Vota es un proyecto independiente. Puedes escribirnos a{' '}
          <a
            href="mailto:pablo.cornejo.v@gmail.com"
            className="underline underline-offset-2 hover:text-foreground"
          >
            pablo.cornejo.v@gmail.com
          </a>{' '}
          por cualquier duda sobre esta política.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">Qué datos recopilamos</h2>
        <p>
          Chile Vota no tiene registro ni cuentas de usuario. Al votar solo se guarda un conteo
          anónimo de clics por opción — nunca tu nombre, correo, ni ningún dato que te identifique
          directamente. No usamos Google Analytics ni Firebase Analytics.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">Cookies y almacenamiento local</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Guardamos tu preferencia de anuncios (si la indicaste) en el almacenamiento local de tu
            navegador — no en una cookie de terceros, y no sale de tu dispositivo.
          </li>
          <li>
            Usamos <strong className="text-foreground">Cloudflare Web Analytics</strong> para
            estadísticas de visitas agregadas. No utiliza cookies ni huellas digitales de tu
            dispositivo.
          </li>
          <li>
            Si en algún momento activamos publicidad, mostraremos un aviso pidiendo tu
            consentimiento antes de cargar cualquier cookie de anuncios — ver la sección siguiente.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">Publicidad</h2>
        <p>
          Chile Vota puede mostrar anuncios a través de Google Ad Manager para financiar el sitio.
          Cuando la publicidad está activa, Google puede usar cookies para mostrar anuncios
          personalizados según tus intereses; puedes rechazar esto desde el aviso que aparece la
          primera vez que visitas el sitio, sin que eso afecte tu experiencia de votación. Puedes
          revisar cómo Google usa los datos en su{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            política de socios publicitarios
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">Servicios de terceros</h2>
        <p>
          Los datos de las batallas y votos se almacenan en Firebase (Google Cloud), en servidores
          fuera de Chile. Las fotos que suben los administradores se guardan en Firebase Storage.
          Ningún dato se vende ni se comparte con terceros salvo lo descrito en esta política.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">Tus opciones</h2>
        <p>
          Puedes rechazar las cookies de publicidad desde el aviso de consentimiento, o borrar el
          almacenamiento local de tu navegador para reiniciar tu elección en cualquier momento.
        </p>
      </section>
    </article>
  )
}
