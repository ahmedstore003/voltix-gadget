const CONTROL_CHARS = /[\0\x08\x0B\x0C\x0E-\x1F\x7F]/g;
const HTML_TAG = /<[^>]*>/g;
const SCRIPT_PROTOCOL = /javascript\s*:/gi;

/** Strip control chars, HTML tags, and script protocols from free-text fields. */
export function sanitizeTextInput(value: string, maxLength = 500): string {
  return value
    .replace(CONTROL_CHARS, '')
    .replace(HTML_TAG, '')
    .replace(SCRIPT_PROTOCOL, '')
    .trim()
    .slice(0, maxLength);
}

/** Allow digits, spaces, plus and hyphen only (Moroccan phone formats). */
export function sanitizePhoneInput(value: string): string {
  return value.replace(/[^\d+\s-]/g, '').slice(0, 20);
}

export function sanitizeCustomerName(value: string): string {
  return sanitizeTextInput(value, 120);
}

export function sanitizeAddress(value: string): string {
  return sanitizeTextInput(value, 500);
}
