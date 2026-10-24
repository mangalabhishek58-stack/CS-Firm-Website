// Labelled form control with accessible hint and error text.
// `as` can be "input", "textarea" or "select".
export default function FormField({ id, label, as: Control = 'input', required = false, hint, error, children, ...props }) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {required ? (
          <span className="field__required" aria-hidden="true"> *</span>
        ) : (
          <span className="field__optional"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}
      <Control
        id={id}
        name={id}
        className="field__control"
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      >
        {children}
      </Control>
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </div>
  )
}
