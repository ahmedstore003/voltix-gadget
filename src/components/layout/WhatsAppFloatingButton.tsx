'use client';

export function WhatsAppFloatingButton() {
  return (
    <>
      <a
        className="whatsapp-floating-button"
        href="https://wa.me/+212779117905?text=Bonjour%2C%20je%20souhaite%20plus%20d%27informations"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 .03 5.31.03 11.85c0 2.1.55 4.16 1.59 5.96L0 24l6.41-1.68A11.86 11.86 0 0012 23.7c6.63 0 12-5.31 12-11.85 0-3.17-1.24-6.14-3.48-8.37zM12 21.88c-1.8 0-3.55-.48-5.09-1.4l-.36-.21-3.81 1 1.01-3.7-.23-.38A9.84 9.84 0 011.15 11.88 9.93 9.93 0 0112.03 2c5.48 0 9.94 4.35 9.94 9.85 0 5.42-4.46 9.9-9.97 9.9zm5.45-7.5c-.3-.16-1.75-.86-2.02-.96-.27-.1-.47-.16-.67.16-.2.33-.76 1-.93 1.2-.17.2-.35.22-.65.08-.3-.14-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.12-.62.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2 0-.38-.05-.53-.05-.14-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.08-.8.38-.27.3-1.03 1.01-1.03 2.46 0 1.45 1.06 2.86 1.2 3.06.14.2 2.08 3.25 5.04 4.55.7.3 1.24.48 1.66.62.7.22 1.34.19 1.85.12.56-.08 1.75-.72 2-1.41.25-.69.25-1.28.18-1.4-.08-.12-.28-.2-.58-.35z" />
        </svg>
      </a>
      <style jsx>{`
        .whatsapp-floating-button {
          position: fixed;
          right: 1rem;
          bottom: 1rem;
          z-index: 9999;
          width: 56px;
          height: 56px;
          border-radius: 9999px;
          background: #25d366;
          color: #ffffff;
          display: grid;
          place-items: center;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
          transition: transform 0.16s ease, box-shadow 0.16s ease;
          text-decoration: none;
        }
        .whatsapp-floating-button:hover {
          transform: scale(1.08);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.24);
        }
        .whatsapp-floating-button svg {
          width: 24px;
          height: 24px;
          fill: currentColor;
        }
      `}</style>
    </>
  );
}
