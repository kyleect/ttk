/**
 * Trims multiline strings
 */
export default function multilineStringTrim (text) {
  /** Array of lines from trimmed text */
  const lines = text.trim().split("\n");
  /** Shortest count of whitespace at beginning of lines */
  const shortestLead = Math.min.apply(null, lines.map(l => l.search(/^\S/)));
  /** String of n spaces to remove for normalization */
  const search = Array(shortestLead + 1).join(' ');
  /** Lines joined in to return string */
  const trimmedString = lines.map(l => l.replace(search, '')).join("\n");
  return trimmedString;
}
