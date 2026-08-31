import { describe, expect, it } from "vitest";
import { groupProgramByDate } from "./programUtils";

describe("groupProgramByDate", () => {
  it("programları tarihlerine göre gruplar", () => {
    const data = [
      {
        id: 1,
        date: "2026-10-15",
        time: "09:00",
        title: "Açılış",
      },
      {
        id: 2,
        date: "2026-10-15",
        time: "10:00",
        title: "Oturum 1",
      },
      {
        id: 3,
        date: "2026-10-16",
        time: "09:00",
        title: "Oturum 2",
      },
    ];

    const result = groupProgramByDate(data);

    expect(Object.keys(result)).toHaveLength(2);
    expect(result["2026-10-15"]).toHaveLength(2);
    expect(result["2026-10-16"]).toHaveLength(1);
  });

  it("boş dizi gönderildiğinde boş nesne döndürür", () => {
    const result = groupProgramByDate([]);

    expect(result).toEqual({});
  });

  it("dizi olmayan veri geldiğinde hata vermez", () => {
    expect(groupProgramByDate(null)).toEqual({});
    expect(groupProgramByDate(undefined)).toEqual({});
    expect(groupProgramByDate("program")).toEqual({});
  });

  it("aynı tarihteki etkinlikleri aynı grupta tutar", () => {
    const data = [
      { id: 1, date: "2026-10-15", title: "Etkinlik 1" },
      { id: 2, date: "2026-10-15", title: "Etkinlik 2" },
      { id: 3, date: "2026-10-15", title: "Etkinlik 3" },
    ];

    const result = groupProgramByDate(data);

    expect(result["2026-10-15"]).toHaveLength(3);
    expect(result["2026-10-15"][0].title).toBe("Etkinlik 1");
    expect(result["2026-10-15"][2].title).toBe("Etkinlik 3");
  });
});