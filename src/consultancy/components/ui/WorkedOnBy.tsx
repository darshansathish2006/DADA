/** Preserve project credits without duplicating the main site's team roster. */
export default function WorkedOnBy({ names }: { names?: string[] }) {
  return <span className="font-semibold">{names?.join(', ')}</span>;
}
