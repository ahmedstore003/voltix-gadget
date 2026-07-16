export function normalizeMoroccanPhone(input: string): string {
  let clean = input.replace(/[^\d+]/g, '');

  if (clean.startsWith('+212')) {
    clean = '0' + clean.substring(4);
  } else if (clean.startsWith('212')) {
    clean = '0' + clean.substring(3);
  }

  return clean;
}

export function isValidMoroccanPhone(phone: string): boolean {
  return /^(06|07|05)\d{8}$/.test(phone);
}

export interface CheckoutFieldErrors {
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
  cart?: string;
  submit?: string;
}

interface ValidateCheckoutParams {
  name: string;
  phone: string;
  city: string;
  address: string;
  isCartMode: boolean;
  cartEmpty: boolean;
  messages: {
    validationName: string;
    validationPhone: string;
    validationPhoneFormat: string;
    validationCity: string;
    validationAddress: string;
    cartEmpty: string;
  };
}

export function validateCheckoutFields({
  name,
  phone,
  city,
  address,
  isCartMode,
  cartEmpty,
  messages,
}: ValidateCheckoutParams): CheckoutFieldErrors {
  const errors: CheckoutFieldErrors = {};
  const cleanPhone = normalizeMoroccanPhone(phone);

  if (isCartMode && cartEmpty) {
    errors.cart = messages.cartEmpty;
  }

  if (!name.trim()) {
    errors.name = messages.validationName;
  }

  if (!phone.trim()) {
    errors.phone = messages.validationPhone;
  } else if (!isValidMoroccanPhone(cleanPhone)) {
    errors.phone = messages.validationPhoneFormat;
  }

  if (!city) {
    errors.city = messages.validationCity;
  }

  if (!address.trim()) {
    errors.address = messages.validationAddress;
  }

  return errors;
}

export interface SanitizedCheckoutFields {
  name: string;
  phone: string;
  city: string;
  address: string;
  cleanPhone: string;
}

export function sanitizeCheckoutFields(
  name: string,
  phone: string,
  city: string,
  address: string,
  sanitizeName: (v: string) => string,
  sanitizePhone: (v: string) => string,
  sanitizeAddress: (v: string) => string
): SanitizedCheckoutFields {
  const safeName = sanitizeName(name);
  const safePhone = sanitizePhone(phone);
  const safeCity = sanitizeName(city).slice(0, 100);
  const safeAddress = sanitizeAddress(address);
  const cleanPhone = normalizeMoroccanPhone(safePhone);

  return {
    name: safeName,
    phone: safePhone,
    city: safeCity,
    address: safeAddress,
    cleanPhone,
  };
}
