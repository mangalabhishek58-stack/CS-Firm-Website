import { isPlaceholder } from '../data/firm.js'

// Shows a firm detail, highlighting it when it is still a placeholder.
export default function Detail({ value }) {
  if (isPlaceholder(value)) {
    return (
      <span className="placeholder" title="Placeholder - replace with real details">
        {value}
      </span>
    )
  }
  return value
}
