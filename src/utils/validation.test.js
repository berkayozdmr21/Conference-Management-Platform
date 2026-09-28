import { describe, it, expect } from "vitest";
import {
  isBlank,
  isValidEmail,
  validateFile,
  validateSubmission,
  validateContact,
  isValid,
  MAX_FILE_SIZE_MB,
} from "./validation";

/**
 * Doğrulama kurallarının testleri — Gözde / Hafta 2
 *
 * Çalıştırmak için:  npm test
 *
 * NEDEN SADECE BU DOSYA TEST EDİLİYOR?
 * validation.js saf fonksiyonlardan oluşuyor: tarayıcıya, ağa veya React'e
 * bağımlı değil. Bu yüzden hiçbir kurulum (mock, render, DOM) gerektirmeden
 * doğrudan çağrılabiliyor. Test yazmanın en kârlı olduğu yer burasıdır:
 * hataların çoğu doğrulama kurallarında saklanır, testi ise en ucuzudur.
 *
 * Her testin kalıbı aynı:  hazırla (arrange) -> çalıştır (act) -> doğrula (assert)
 */

// Gerçek bir dosya seçmeden File nesnesi taklit eden yardımcı.
// Doğrulama yalnızca "name" ve "size" alanlarına baktığı için bu yeterli.
function fakeFile(name, sizeInMb) {
  return { name, size: sizeInMb * 1024 * 1024 };
}

const VALID_SUBMISSION = {
  firstName: "Gözde",
  lastName: "Zübari",
  email: "gozde@example.edu.tr",
  country: "Türkiye",
  studyTitle: "Konferans Yönetim Sistemlerinde Veri Modelleme",
  session: "Software Engineering",
  participationType: "Online",
  description: "",
};

describe("isBlank", () => {
  it("boş metni boş sayar", () => {
    expect(isBlank("")).toBe(true);
  });

  it("yalnızca boşluktan oluşan metni de boş sayar", () => {
    // Kullanıcı space tuşuna basıp formu geçmeye çalışırsa engellenmeli.
    expect(isBlank("     ")).toBe(true);
  });

  it("dolu metni boş saymaz", () => {
    expect(isBlank("Gözde")).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("geçerli adresi kabul eder", () => {
    expect(isValidEmail("gozde@example.edu.tr")).toBe(true);
  });

  it("@ işareti olmayan adresi reddeder", () => {
    expect(isValidEmail("gozdeexample.com")).toBe(false);
  });

  it("alan adı uzantısı olmayan adresi reddeder", () => {
    expect(isValidEmail("gozde@example")).toBe(false);
  });

  it("içinde boşluk olan adresi reddeder", () => {
    expect(isValidEmail("goz de@example.com")).toBe(false);
  });
});

describe("validateFile", () => {
  it("dosya seçilmediyse hata döndürür", () => {
    expect(validateFile(null)).not.toBeNull();
  });

  it("izin verilmeyen uzantıyı reddeder", () => {
    expect(validateFile(fakeFile("calisma.exe", 1))).toMatch(/uzantılı/);
  });

  it("büyük harfli uzantıyı kabul eder", () => {
    // "BILDIRI.PDF" gibi dosyalar yüzünden kullanıcı takılmamalı.
    expect(validateFile(fakeFile("BILDIRI.PDF", 1))).toBeNull();
  });

  it("boyut sınırını aşan dosyayı reddeder", () => {
    expect(validateFile(fakeFile("bildiri.pdf", MAX_FILE_SIZE_MB + 1))).toMatch(/MB/);
  });

  it("sınır içindeki geçerli dosyayı kabul eder", () => {
    expect(validateFile(fakeFile("bildiri.docx", 2))).toBeNull();
  });
});

describe("validateSubmission", () => {
  it("tüm alanlar doğruysa hata döndürmez", () => {
    const errors = validateSubmission(VALID_SUBMISSION, fakeFile("bildiri.pdf", 1));
    expect(isValid(errors)).toBe(true);
  });

  it("boş formda tüm zorunlu alanları işaretler", () => {
    const errors = validateSubmission(
      {
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        studyTitle: "",
        session: "",
        participationType: "",
        description: "",
      },
      null
    );

    expect(Object.keys(errors)).toEqual(
      expect.arrayContaining([
        "firstName",
        "lastName",
        "email",
        "country",
        "studyTitle",
        "session",
        "participationType",
        "file",
      ])
    );
  });

  it("çok kısa çalışma başlığını reddeder", () => {
    const errors = validateSubmission(
      { ...VALID_SUBMISSION, studyTitle: "AI" },
      fakeFile("bildiri.pdf", 1)
    );
    expect(errors.studyTitle).toBeDefined();
  });

  it("açıklama alanı boş olsa bile formu geçerli sayar", () => {
    // Açıklama proje dokümanında isteğe bağlı bir alan.
    const errors = validateSubmission(
      { ...VALID_SUBMISSION, description: "" },
      fakeFile("bildiri.pdf", 1)
    );
    expect(errors.description).toBeUndefined();
  });

  it("dosya eksikse diğer alanlar doğru olsa da formu geçersiz sayar", () => {
    const errors = validateSubmission(VALID_SUBMISSION, null);
    expect(isValid(errors)).toBe(false);
    expect(errors.file).toBeDefined();
  });
});

describe("validateContact", () => {
  const VALID_CONTACT = {
    name: "Gözde Zübari",
    email: "gozde@example.com",
    subject: "Kayıt ücretleri hakkında",
    message: "Öğrenci indirimi uygulanıyor mu?",
  };

  it("doğru doldurulmuş formu kabul eder", () => {
    expect(isValid(validateContact(VALID_CONTACT))).toBe(true);
  });

  it("10 karakterden kısa mesajı reddeder", () => {
    const errors = validateContact({ ...VALID_CONTACT, message: "Merhaba" });
    expect(errors.message).toBeDefined();
  });

  it("hatalı e-postayı yakalar", () => {
    const errors = validateContact({ ...VALID_CONTACT, email: "hatali-adres" });
    expect(errors.email).toBeDefined();
  });
});
