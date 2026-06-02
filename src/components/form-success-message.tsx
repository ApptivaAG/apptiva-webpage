export function FormSuccessMessage(props: {
  name?: string
  email: string
  onCorrect: () => void
}) {
  return (
    <div className="space-y-4 pt-4">
      <p>Vielen Dank{props.name && ` ${props.name}`}! </p>
      <p className="leading-4">
        Deine Anfrage wurde erfolgreich an <strong>{props.email}</strong>{' '}
        versendet.&ensp;
        <button onClick={props.onCorrect} className="mt-2 text-sm underline">
          Angaben korrigieren
        </button>
      </p>
      <p>Wir werden uns so schnell wie möglich bei dir melden.</p>
      <div className="pb-2 text-5xl">👍</div>
    </div>
  )
}
