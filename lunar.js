/**
 * Thuật toán Lịch Âm Dương Việt Nam (Dựa trên thuật toán Hồ Ngọc Đức)
 * Tính chính xác ngày Âm lịch, Can Chi (Năm, Tháng, Ngày), Giờ Hoàng Đạo, Tiết Khí
 */

const LunarCalendar = (() => {
  const PI = Math.PI;
  const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  const GIO_HD = [
    [1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0], // Tý, Ngọ
    [0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1], // Sửu, Mùi
    [1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0], // Dần, Thân
    [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0], // Mão, Dậu
    [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1], // Thìn, Tuất
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1]  // Tỵ, Hợi
  ];
  const TIET_KHI = [
    "Xuân phân", "Thanh minh", "Cốc vũ", "Lập hạ", "Tiểu mãn", "Mang chủng",
    "Hạ chí", "Tiểu thử", "Đại thử", "Lập thu", "Xử thử", "Bạch lộ",
    "Thu phân", "Hàn lộ", "Sương giáng", "Lập đông", "Tiểu tuyết", "Đại tuyết",
    "Đông chí", "Tiểu hàn", "Đại hàn", "Lập xuân", "Vũ thủy", "Kinh trập"
  ];

  function INT(d) {
    return Math.floor(d);
  }

  function jdFromDate(dd, mm, yy) {
    const a = INT((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    }
    return jd;
  }

  function getNewMoonDay(k, timeZone) {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    let deltat;
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
      deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    const JdNew = Jd1 + C1 - deltat;
    return INT(JdNew + 0.5 + timeZone / 24);
  }

  function getSunLongitude(jdn, timeZone) {
    const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    const T2 = T * T;
    const dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - PI * 2 * INT(L / (PI * 2));
    return INT((L / PI) * 6);
  }

  function getSunLongitudeTietKhi(jdn, timeZone) {
    const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    const T2 = T * T;
    const dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - PI * 2 * INT(L / (PI * 2));
    return INT((L / PI) * 12);
  }

  function getLunarMonth11(yy, timeZone) {
    const off = jdFromDate(31, 12, yy) - 2415021;
    const k = INT(off / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    const sunLong = getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
      nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }

  function getLeapMonthOffset(a11, timeZone) {
    const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
  }

  function convertSolar2Lunar(dd, mm, yy, timeZone = 7) {
    const dayNumber = jdFromDate(dd, mm, yy);
    const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = getNewMoonDay(k, timeZone);
    }
    let a11 = getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = getLunarMonth11(yy + 1, timeZone);
    }
    const lunarDay = dayNumber - monthStart + 1;
    const diff = INT((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    return {
      day: lunarDay,
      month: lunarMonth,
      year: lunarYear,
      leap: lunarLeap,
      jd: dayNumber
    };
  }

  function getCanChi(lunar) {
    const canYear = CAN[(lunar.year + 6) % 10];
    const chiYear = CHI[(lunar.year + 8) % 12];

    const canMonth = CAN[(lunar.year * 12 + lunar.month + 3) % 10];
    const chiMonth = CHI[(lunar.month + 1) % 12];

    const canDay = CAN[(lunar.jd + 9) % 10];
    const chiDayIndex = (lunar.jd + 1) % 12;
    const chiDay = CHI[chiDayIndex];

    // Giờ Hoàng Đạo
    const hdFlags = GIO_HD[chiDayIndex % 6];
    const gioHoangDao = [];
    const khungGio = [
      "23h-01h", "01h-03h", "03h-05h", "05h-07h",
      "07h-09h", "09h-11h", "11h-13h", "13h-15h",
      "15h-17h", "17h-19h", "19h-21h", "21h-23h"
    ];
    for (let i = 0; i < 12; i++) {
      if (hdFlags[i] === 1) {
        gioHoangDao.push(`${CHI[i]} (${khungGio[i]})`);
      }
    }

    const tietKhi = TIET_KHI[getSunLongitudeTietKhi(lunar.jd + 1, 7)];

    return {
      year: `${canYear} ${chiYear}`,
      month: `${canMonth} ${chiMonth}${lunar.leap ? " (Nhuận)" : ""}`,
      day: `${canDay} ${chiDay}`,
      gioHoangDao,
      tietKhi
    };
  }

  function getFullInfo(dateObj) {
    const dd = dateObj.getDate();
    const mm = dateObj.getMonth() + 1;
    const yy = dateObj.getFullYear();
    const lunar = convertSolar2Lunar(dd, mm, yy, 7);
    const canChi = getCanChi(lunar);
    return {
      solar: { day: dd, month: mm, year: yy, dayOfWeek: dateObj.getDay() },
      lunar,
      canChi
    };
  }

  return {
    convertSolar2Lunar,
    getCanChi,
    getFullInfo
  };
})();
