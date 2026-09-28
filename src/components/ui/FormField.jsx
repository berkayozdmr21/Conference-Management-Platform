import "./FormField.css";

/**
 * Tek bir form alanı: etiket + giriş kutusu + hata mesajı — Gözde / Hafta 2
 *
 * NEDEN AYRI BİLEŞEN?
 * Bildiri formunda 8, iletişim formunda 4 alan var. Her birinde aynı üçlü
 * tekrar ediyor: <label>, giriş elemanı, hata metni. Bu üçlüyü tek yere
 * toplayınca hem kod kısalıyor hem de erişilebilirlik (a11y) davranışı
 * bir kez doğru yazılıp her yerde geçerli oluyor.
 *
 * PROPS
 * - as: "input" | "textarea" | "select"  (varsayılan: "input")
 * - error: hata metni; doluysa alan kırmızı çerçeveyle işaretlenir
 * - children: as="select" iken <option> listesi
 * - geri kalan tüm props (type, value, onChange, placeholder...) doğrudan
 *   giriş elemanına aktarılır -> "...rest" deseni.
 *
 * ERİŞİLEBİLİRLİK NOTU
 * aria-invalid ekran okuyucuya "bu alan hatalı" der.
 * aria-describedby hatanın metnini o alana bağlar; böylece görme engelli
 * kullanıcı alana geldiğinde hatayı da duyar. Görsel kırmızı çerçeve
 * tek başına yeterli değildir.
 */
export default function FormField({
  as = "input",
  label,
  name,
  error,
  required = false,
  hint,
  children,
  ...rest
}) {
  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;

  const sharedProps = {
    id: fieldId,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : hint ? hintId : undefined,
    className: `form-field__control ${error ? "form-field__control--error" : ""}`,
    ...rest,
  };

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={fieldId}>
        {label}
        {required && <span className="form-field__required" aria-hidden="true"> *</span>}
      </label>

      {as === "textarea" && <textarea rows={5} {...sharedProps} />}
      {as === "select" && <select {...sharedProps}>{children}</select>}
      {as === "input" && <input {...sharedProps} />}

      {hint && !error && (
        <p className="form-field__hint" id={hintId}>
          {hint}
        </p>
      )}

      {error && (
        <p className="form-field__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
