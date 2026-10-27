/**
 * EV Smart Cockpit v2.0 — 3-Page Swipeable Modern Bright UI
 * Trang 1: Đồng hồ, Lịch Âm Dương, Thời tiết thời gian thực (GPS + 10 ngày), Báo thức sạc xe
 * Trang 2: YouTube Không Quảng Cáo
 * Trang 3: Truyền Hình VTV Trực Tuyến
 */

const App = (() => {
  const CITIES = [
    { id: "hanoi", name: "Hà Nội", lat: 21.0285, lon: 105.8542 },
    { id: "hcm", name: "TP. Hồ Chí Minh", lat: 10.8231, lon: 106.6297 },
    { id: "danang", name: "Đà Nẵng", lat: 16.0544, lon: 108.2022 },
    { id: "haiphong", name: "Hải Phòng", lat: 20.8449, lon: 106.6881 },
    { id: "cantho", name: "Cần Thơ", lat: 10.0452, lon: 105.7469 },
    { id: "nhatrang", name: "Nha Trang", lat: 12.2388, lon: 109.1967 },
    { id: "dalat", name: "Đà Lạt", lat: 11.9404, lon: 108.4583 },
    { id: "hue", name: "Huế", lat: 16.4637, lon: 107.5909 },
    { id: "vungtau", name: "Vũng Tàu", lat: 10.3460, lon: 107.0843 },
    { id: "halong", name: "Hạ Long (Quảng Ninh)", lat: 20.9599, lon: 107.0425 },
    { id: "vinh", name: "Vinh (Nghệ An)", lat: 18.6796, lon: 105.6813 },
    { id: "buonmathuot", name: "Buôn Ma Thuột", lat: 12.6667, lon: 108.0500 }
  ];

  const TV_CHANNELS = [
    {
      id: "vtv1",
      code: "VTV1",
      name: "VTV1 - Thời Sự & Chính Trị",
      color: "#e11d48",
      webUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv1-1.html",
      embedUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv1-1.html",
      hlsUrl: "https://live.vtvgo.vn/vtv1.m3u8"
    },
    {
      id: "vtv2",
      code: "VTV2",
      name: "VTV2 - Khoa Học & Đời Sống",
      color: "#059669",
      webUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv2-2.html",
      embedUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv2-2.html",
      hlsUrl: "https://live.vtvgo.vn/vtv2.m3u8"
    },
    {
      id: "vtv3",
      code: "VTV3",
      name: "VTV3 - Giải Trí & Thể Thao",
      color: "#2563eb",
      webUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv3-3.html",
      embedUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv3-3.html",
      hlsUrl: "https://live.vtvgo.vn/vtv3.m3u8"
    },
    {
      id: "vtv4",
      code: "VTV4",
      name: "VTV4 - Đối Ngoại Toàn Cầu",
      color: "#7c3aed",
      webUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv4-4.html",
      embedUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv4-4.html",
      hlsUrl: "https://live.vtvgo.vn/vtv4.m3u8"
    },
    {
      id: "vtv5",
      code: "VTV5",
      name: "VTV5 - Tiếng Dân Tộc",
      color: "#db2777",
      webUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv5-5.html",
      embedUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv5-5.html",
      hlsUrl: "https://live.vtvgo.vn/vtv5.m3u8"
    },
    {
      id: "vtv7",
      code: "VTV7",
      name: "VTV7 - Giáo Dục Quốc Gia",
      color: "#0891b2",
      webUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv7-27.html",
      embedUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv7-27.html",
      hlsUrl: "https://live.vtvgo.vn/vtv7.m3u8"
    },
    {
      id: "vtv8",
      code: "VTV8",
      name: "VTV8 - Miền Trung & Tây Nguyên",
      color: "#ea580c",
      webUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv8-36.html",
      embedUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv8-36.html",
      hlsUrl: "https://live.vtvgo.vn/vtv8.m3u8"
    },
    {
      id: "vtv9",
      code: "VTV9",
      name: "VTV9 - Khu Vực Nam Bộ",
      color: "#d97706",
      webUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv9-39.html",
      embedUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv9-39.html",
      hlsUrl: "https://live.vtvgo.vn/vtv9.m3u8"
    },
    {
      id: "vtvcantho",
      code: "VTVCT",
      name: "VTV Cần Thơ - Miền Tây",
      color: "#0d9488",
      webUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv-can-tho-6.html",
      embedUrl: "https://vtvgo.vn/xem-truc-tuyen-kenh-vtv-can-tho-6.html",
      hlsUrl: "https://live.vtvgo.vn/vtv6.m3u8"
    },
    {
      id: "vtvgo",
      code: "VTVGo",
      name: "Cổng VTVGo Chính Thức",
      color: "#dc2626",
      webUrl: "https://vtvgo.vn/trang-chu.html",
      embedUrl: "https://vtvgo.vn/trang-chu.html",
      hlsUrl: ""
    },
    {
      id: "vtvbaodientu",
      code: "VTV.vn",
      name: "Báo Điện Tử VTV News",
      color: "#1d4ed8",
      webUrl: "https://vtv.vn/truyen-hinh-truc-tuyen.htm",
      embedUrl: "https://vtv.vn/truyen-hinh-truc-tuyen.htm",
      hlsUrl: ""
    },
    {
      id: "vtv24yt",
      code: "VTV24",
      name: "VTV24 Tin Tức (Stream Sạch)",
      color: "#4f46e5",
      webUrl: "https://www.youtube.com/@vtv24",
      embedUrl: "https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=1",
      hlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    }
  ];

  const YT_PRESETS = {
    music: [
      {
        id: "lofi_chill_1",
        ytId: "jfKfPfyJRdk",
        searchQuery: "Lofi Hip Hop Chill Beats Study Relax Music",
        title: "Lofi Hip Hop Radio — Nhạc Thư Giãn Khi Lái Xe Điện",
        author: "Lofi Girl • Cloud HD",
        thumb: "https://i.ytimg.com/vi/jfKfPfyJRdk/mqdefault.jpg",
        audioStream: "https://streams.ilovemusic.de/iloveradio17.mp3"
      },
      {
        id: "synthwave_2",
        ytId: "4xDzrJKXOOY",
        searchQuery: "Synthwave Chillwave Retrowave Night Drive Music",
        title: "Synthwave Radio — Nhạc Điện Tử Lái Xe Đêm Cực Chill",
        author: "Night Drive Synthwave",
        thumb: "https://i.ytimg.com/vi/4xDzrJKXOOY/mqdefault.jpg",
        audioStream: "https://stream.nightride.fm/chillsynth.mp3"
      },
      {
        id: "chillhop_3",
        ytId: "5yx6BWlEVcY",
        searchQuery: "Chillhop Jazz Lofi Beats Coffee Lounge Music",
        title: "Chillhop & Jazz Beats — Nhạc CaféÊm Dịu Cho Hành Trình Dài",
        author: "Chillhop Music",
        thumb: "https://i.ytimg.com/vi/5yx6BWlEVcY/mqdefault.jpg",
        audioStream: "https://streams.ilovemusic.de/iloveradio10.mp3"
      },
      {
        id: "piano_relax_4",
        ytId: "rUxyKA_-grg",
        searchQuery: "Relaxing Piano Music Stress Relief Instrumental",
        title: "Relaxing Piano — Nhạc Không Lời Nghỉ Ngơi Khi Đang Sạc Xe",
        author: "Soothing Relaxation",
        thumb: "https://i.ytimg.com/vi/rUxyKA_-grg/mqdefault.jpg",
        audioStream: "https://live.musopen.org:8085/streamvbr0"
      }
    ],
    bolero: [
      {
        id: "bolero_1",
        ytId: "ceqgwo7U28Y",
        searchQuery: "Liên khúc nhạc trữ tình Bolero hay nhất chọn lọc",
        title: "Liên Khúc Nhạc Trữ Tình Bolero Chọn Lọc Nghe Trên Xe",
        author: "Bolero Trữ Tình",
        thumb: "https://i.ytimg.com/vi/ceqgwo7U28Y/mqdefault.jpg"
      },
      {
        id: "bolero_2",
        ytId: "2OEL4P1Rz04",
        searchQuery: "Nhạc Acoustic Chill nhẹ nhàng sâu lắng Việt Nam",
        title: "Tuyển Tập Acoustic & Ballad Việt Nhẹ Nhàng Sâu Lắng",
        author: "Acoustic Việt",
        thumb: "https://i.ytimg.com/vi/2OEL4P1Rz04/mqdefault.jpg"
      },
      {
        id: "bolero_3",
        ytId: "1ZYbU82GVz4",
        searchQuery: "Hòa tấu Guitar Vô Thường Không Tên Bolero",
        title: "Độc Tấu Guitar & Saxophone Không Lời Tuyệt Đỉnh",
        author: "Guitar Hòa Tấu",
        thumb: "https://i.ytimg.com/vi/1ZYbU82GVz4/mqdefault.jpg"
      }
    ],
    vpop: [
      {
        id: "vpop_1",
        ytId: "abPmZCZZrFA",
        searchQuery: "Nhạc trẻ Vpop Remix hay nhất hiện nay",
        title: "Tuyển Tập Nhạc Trẻ V-Pop & Chill Hay Nhất Hiện Nay",
        author: "V-Pop Hits",
        thumb: "https://i.ytimg.com/vi/abPmZCZZrFA/mqdefault.jpg"
      },
      {
        id: "vpop_2",
        ytId: "knW7-x7Y7RE",
        searchQuery: "Nhạc trẻ Lofi Chill TikTok nhẹ nhàng dễ nghe",
        title: "Nhạc Trẻ Lofi Chill Nhẹ Nhàng Nghe Khi Lái Xe",
        author: "Lofi V-Pop",
        thumb: "https://i.ytimg.com/vi/knW7-x7Y7RE/mqdefault.jpg"
      },
      {
        id: "vpop_3",
        ytId: "32sYGCOYJUM",
        searchQuery: "Nonstop Vinahouse Nhạc Điện Tử Sôi Động Lái Xe",
        title: "EDM & Remix Sôi Động Chống Buồn Ngủ Khi Lái Xe Đường Dài",
        author: "EDM Driving Mix",
        thumb: "https://i.ytimg.com/vi/32sYGCOYJUM/mqdefault.jpg"
      }
    ],
    radio: [
      {
        id: "radio_lofi",
        type: "radio",
        audioStream: "https://streams.ilovemusic.de/iloveradio17.mp3",
        title: "📻 I Love Chillhop & Lofi 24/7 (Luồng HTML5 Trực Tiếp)",
        author: "HTML5 Direct Audio • Không bao giờ bị chặn",
        thumb: "https://i.ytimg.com/vi/jfKfPfyJRdk/mqdefault.jpg"
      },
      {
        id: "radio_synth",
        type: "radio",
        audioStream: "https://stream.nightride.fm/chillsynth.mp3",
        title: "📻 Nightride ChillSynth FM — Nhạc Lái Xe Đêm 24/7",
        author: "HTML5 Direct Audio • Chuẩn Hi-Fi",
        thumb: "https://i.ytimg.com/vi/4xDzrJKXOOY/mqdefault.jpg"
      },
      {
        id: "radio_top100",
        type: "radio",
        audioStream: "https://streams.ilovemusic.de/iloveradio1.mp3",
        title: "📻 Top 100 Pop & Dance Hits Radio 24/7",
        author: "HTML5 Direct Audio • Sôi Động",
        thumb: "https://i.ytimg.com/vi/5yx6BWlEVcY/mqdefault.jpg"
      },
      {
        id: "radio_classical",
        type: "radio",
        audioStream: "https://live.musopen.org:8085/streamvbr0",
        title: "📻 Giao Hưởng & Piano Không Lời 24/7 (Musopen Radio)",
        author: "HTML5 Direct Audio • Thư Giãn Sạc Pin",
        thumb: "https://i.ytimg.com/vi/rUxyKA_-grg/mqdefault.jpg"
      }
    ],
    news: [
      {
        id: "news_1",
        ytId: "9Auq9mYxFEE",
        searchQuery: "Bản tin thời sự VTV tin tức mới nhất hôm nay",
        title: "Tin Tức Thời Sự & Giao Thông Cập Nhật Mới Nhất",
        author: "Tin Tức 24/7",
        thumb: "https://i.ytimg.com/vi/9Auq9mYxFEE/mqdefault.jpg"
      },
      {
        id: "news_2",
        ytId: "pykpO5kQJ98",
        searchQuery: "Đánh giá xe điện VinFast VF7 VF8 VF6 mới nhất",
        title: "Chuyên Mục Ô Tô Điện & Kinh Nghiệm Lái Xe VinFast",
        author: "Car & EV Review",
        thumb: "https://i.ytimg.com/vi/pykpO5kQJ98/mqdefault.jpg"
      },
      {
        id: "news_3",
        ytId: "gCNeDWCI0vo",
        searchQuery: "Euronews Sky News World News Live",
        title: "Tin Tức Quốc Tế & Thế Giới Toàn Cảnh",
        author: "World News",
        thumb: "https://i.ytimg.com/vi/gCNeDWCI0vo/mqdefault.jpg"
      }
    ]
  };

  let state = {
    currentPage: 0, // 0: Tiện ích, 1: YouTube, 2: Truyền hình VTV
    selectedCity: CITIES[0],
    useLiveGPS: true,
    customCoords: null,
    gpsWatchId: null,
    lastWeatherFetchCoords: null,
    lastWeatherFetchTime: 0,
    calMonth: new Date().getMonth(),
    calYear: new Date().getFullYear(),
    calSelectedDate: new Date(),
    currentYTId: "lofi_chill_1",
    currentYTTitle: "Lofi Hip Hop Radio — Nhạc Thư Giãn Khi Lái Xe Điện",
    currentYTItem: null,
    ytListItems: [],
    ytEngine: "auto",
    ytHlsInstance: null,
    currentTVChannel: TV_CHANNELS[0],
    tvMode: "embed",
    hlsInstance: null,
    alarmTargetTimestamp: null,
    alarmInterval: null,
    audioCtx: null,
    alarmBeepInterval: null,
    calculatedRecommendMins: 33
  };

  function getWeatherInfo(code) {
    const map = {
      0: { text: "Trời quang đãng", icon: "☀️" },
      1: { text: "Ít mây, nắng đẹp", icon: "🌤️" },
      2: { text: "Có mây rải rác", icon: "⛅" },
      3: { text: "Nhiều mây", icon: "☁️" },
      45: { text: "Có sương mù", icon: "🌫️" },
      48: { text: "Sương mù dày", icon: "🌫️" },
      51: { text: "Mưa phùn nhẹ", icon: "🌦️" },
      53: { text: "Mưa phùn vừa", icon: "🌦️" },
      55: { text: "Mưa phùn nặng hạt", icon: "🌧️" },
      61: { text: "Mưa nhỏ rải rác", icon: "🌦️" },
      63: { text: "Mưa vừa", icon: "🌧️" },
      65: { text: "Mưa to", icon: "🌧️" },
      71: { text: "Tuyết rơi nhẹ", icon: "❄️" },
      80: { text: "Mưa rào nhẹ", icon: "🌦️" },
      81: { text: "Mưa rào vừa", icon: "🌧️" },
      82: { text: "Mưa rào rất to", icon: "⛈️" },
      95: { text: "Có dông sét", icon: "⛈️" },
      96: { text: "Dông kèm mưa lớn", icon: "⛈️" },
      99: { text: "Dông bão mạnh", icon: "🌩️" }
    };
    return map[code] || { text: "Thời tiết ổn định", icon: "⛅" };
  }

  const WEEKDAYS_VN = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const WEEKDAYS_SHORT = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  // 1. KHỞI TẠO HỆ THỐNG
  function init() {
    if (window.lucide) {
      lucide.createIcons();
    }
    initSwipeGesture();
    initCitySelectors();
    startClock();
    renderCalendarMonth();
    selectCalendarDate(new Date());
    startLiveGPSTracking();
    loadYTCategory("music", false);
    renderTVChannels();
    calculateChargingTime();
    restoreAlarmFromStorage();

    if (window.location.protocol === "file:") {
      const notice = document.getElementById("ytFileProtocolNotice");
      if (notice) notice.classList.remove("hidden");
    }

    goToPage(0);

    setInterval(() => fetchWeather(true), 5 * 60 * 1000);
  }

  // 2. ĐIỀU HƯỚNG 3 TRANG & CỬ CHỈ GẠT TAY TRÁI / PHẢI (ZERO-DRIFT SWIPE ENGINE)
  let ytInitialized = false;
  let tvInitialized = false;

  function goToPage(pageIdx) {
    const clamped = Math.max(0, Math.min(2, pageIdx));
    state.currentPage = clamped;

    const viewport = document.getElementById("swipeViewport");
    const track = document.getElementById("swipeTrack");
    if (viewport) viewport.scrollLeft = 0;
    if (track) {
      track.style.transform = "none";
      track.scrollLeft = 0;
    }

    // Bật trang đang chọn bằng class .active-page (cố định 100% khung nhìn, không bao giờ lệch trang)
    for (let i = 0; i < 3; i++) {
      const pageEl = document.getElementById(`page-${i}`);
      if (pageEl) {
        if (i === clamped) {
          pageEl.classList.add("active-page");
        } else {
          pageEl.classList.remove("active-page");
        }
      }
    }

    // Tự động nạp trình phát Video/Nhạc ngay khi người dùng gạt sang Trang 2
    if (clamped === 1 && !ytInitialized) {
      ytInitialized = true;
      if (state.ytListItems.length > 0) {
        playYTByIndex(0, true);
      } else {
        loadYTCategory("music", true);
      }
    }

    // Chỉ khởi chạy luồng Tivi khi người dùng thực sự chuyển sang Trang 3
    if (clamped === 2 && !tvInitialized) {
      tvInitialized = true;
      selectTVChannel(state.currentTVChannel.id, false);
    }

    // Cập nhật nút điều hướng trên Header & chấm chỉ báo dưới đáy
    for (let i = 0; i < 3; i++) {
      const btn = document.getElementById(`navBtn-${i}`);
      const dot = document.getElementById(`dot-${i}`);
      if (btn) {
        if (i === clamped) {
          btn.className = "page-tab-btn flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-white text-blue-600 shadow-xs";
        } else {
          btn.className = "page-tab-btn flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all";
        }
      }
      if (dot) {
        dot.className = i === clamped
          ? "h-2.5 w-8 rounded-full bg-blue-600 transition-all"
          : "h-2.5 w-2.5 rounded-full bg-slate-300 hover:bg-slate-400 transition-all";
      }
    }
  }

  function initSwipeGesture() {
    const viewport = document.getElementById("swipeViewport");

    let startX = 0;
    let startY = 0;
    let currentDeltaX = 0;
    let isSwiping = false;
    let isHorizontalLock = null;

    function isInteractiveControl(target) {
      if (!target) return false;
      return Boolean(target.closest("input, select, textarea, button, iframe, video"));
    }

    function onStart(clientX, clientY, target) {
      if (isInteractiveControl(target)) return;
      startX = clientX;
      startY = clientY;
      currentDeltaX = 0;
      isSwiping = true;
      isHorizontalLock = null;
    }

    function onMove(clientX, clientY) {
      if (!isSwiping) return;
      const dx = clientX - startX;
      const dy = clientY - startY;

      if (isHorizontalLock === null) {
        if (Math.abs(dx) > 12 || Math.abs(dy) > 12) {
          isHorizontalLock = Math.abs(dx) > Math.abs(dy) * 1.25;
        }
      }

      if (isHorizontalLock) {
        currentDeltaX = dx;
      }
    }

    function onEnd() {
      if (!isSwiping) return;
      isSwiping = false;

      if (isHorizontalLock) {
        const threshold = Math.min(80, window.innerWidth * 0.1);
        if (currentDeltaX < -threshold && state.currentPage < 2) {
          goToPage(state.currentPage + 1);
          return;
        } else if (currentDeltaX > threshold && state.currentPage > 0) {
          goToPage(state.currentPage - 1);
          return;
        }
      }
    }

    // Touch events cho màn hình cảm ứng xe điện / điện thoại
    viewport.addEventListener("touchstart", e => {
      if (e.touches.length === 1) {
        onStart(e.touches[0].clientX, e.touches[0].clientY, e.target);
      }
    }, { passive: true });

    viewport.addEventListener("touchmove", e => {
      if (e.touches.length === 1) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    viewport.addEventListener("touchend", onEnd);
    viewport.addEventListener("touchcancel", onEnd);

    // Mouse drag cho máy tính
    viewport.addEventListener("mousedown", e => {
      if (e.button === 0) onStart(e.clientX, e.clientY, e.target);
    });
    window.addEventListener("mousemove", e => {
      if (isSwiping) onMove(e.clientX, e.clientY);
    });
    window.addEventListener("mouseup", onEnd);

    // Phím mũi tên Trái / Phải
    window.addEventListener("keydown", e => {
      if (document.activeElement && ["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        return;
      }
      if (e.key === "ArrowRight") goToPage(state.currentPage + 1);
      if (e.key === "ArrowLeft") goToPage(state.currentPage - 1);
    });
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  // Helper cập nhật nhãn trạng thái (Hoàn thành / Đang chờ / Lỗi)
  function setStatusBadge(badgeId, dotId, textId, statusType, message, pulse = false) {
    const badge = document.getElementById(badgeId);
    const dot = dotId ? document.getElementById(dotId) : null;
    const txt = textId ? document.getElementById(textId) : null;
    if (!badge) return;

    const classes = {
      success: "badge-status badge-success",
      pending: "badge-status badge-pending",
      error: "badge-status badge-error",
      info: "badge-status badge-info"
    };
    const dotColors = {
      success: "status-dot bg-emerald-500",
      pending: "status-dot bg-amber-500",
      error: "status-dot bg-rose-500",
      info: "status-dot bg-blue-500"
    };

    badge.className = classes[statusType] || classes.info;
    if (dot) {
      dot.className = `${dotColors[statusType] || dotColors.info}${pulse ? " dot-pulse" : ""}`;
    }
    if (txt) {
      txt.textContent = message;
    } else {
      badge.textContent = message;
    }
  }

  // 3. ĐỒNG HỒ THỜI GIAN THỰC & LỊCH ÂM HÔM NAY
  function startClock() {
    function tick() {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");

      document.getElementById("topClock").textContent = `${hh}:${mm}:${ss}`;
      document.getElementById("heroHM").textContent = `${hh}:${mm}`;
      document.getElementById("heroSec").textContent = `:${ss}`;

      const hr = now.getHours();
      let greet = "Thượng lộ bình an";
      if (hr >= 5 && hr < 11) greet = "☀️ Chào buổi sáng";
      else if (hr >= 11 && hr < 14) greet = "🌤️ Chào buổi trưa";
      else if (hr >= 14 && hr < 18) greet = "⛅ Chào buổi chiều";
      else greet = "🌙 Lái xe tối an toàn";
      document.getElementById("greetingBadge").innerHTML = `<span class="status-dot bg-blue-500"></span><span>${greet}</span>`;

      const wd = WEEKDAYS_VN[now.getDay()];
      const d = now.getDate();
      const m = now.getMonth() + 1;
      const y = now.getFullYear();
      document.getElementById("heroSolarDate").textContent = `${wd}, ${d} Tháng ${m}, ${y}`;

      const info = LunarCalendar.getFullInfo(now);
      const lDay = String(info.lunar.day).padStart(2, "0");
      const lMonth = String(info.lunar.month).padStart(2, "0");
      document.getElementById("dashLunarDate").textContent = `${lDay}/${lMonth}`;
      document.getElementById("dashTietKhi").textContent = `Tiết khí: ${info.canChi.tietKhi}`;
      document.getElementById("dashCanChi").innerHTML =
        `Năm <strong class="text-slate-900">${info.canChi.year}</strong><br/>Tháng ${info.canChi.month}<br/>Ngày ${info.canChi.day}`;
    }
    tick();
    setInterval(tick, 1000);
  }

  // 4. THỜI TIẾT THỜI GIAN THỰC THEO VỊ TRÍ XE ĐANG ĐI (LIVE GPS + 10 NGÀY)
  function initCitySelectors() {
    const dashSel = document.getElementById("dashCitySelect");
    const gpsOption = `<option value="gps_live">🛰️ Tự động theo GPS xe đang đi</option>`;
    dashSel.innerHTML = gpsOption + CITIES.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    dashSel.value = "gps_live";
  }

  function changeCity(cityId) {
    if (cityId === "gps_live") {
      state.useLiveGPS = true;
      startLiveGPSTracking(true);
      return;
    }
    const found = CITIES.find(c => c.id === cityId);
    if (found) {
      state.useLiveGPS = false;
      state.selectedCity = found;
      state.customCoords = null;
      fetchWeather(true);
    }
  }

  function getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  async function resolveExactLocationName(lat, lon) {
    try {
      const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=16&accept-language=vi`;
      const res = await fetch(osmUrl, { headers: { "Accept-Language": "vi" } });
      if (res.ok) {
        const data = await res.json();
        const addr = data.address || {};
        const road = addr.road || addr.pedestrian || "";
        const ward = addr.suburb || addr.quarter || addr.village || addr.town || "";
        const district = addr.city_district || addr.district || addr.county || "";
        const city = addr.city || addr.state || addr.province || "";
        const parts = [road, ward, district, city].filter(Boolean);
        const uniqueParts = parts.filter((item, idx) => parts.indexOf(item) === idx);
        if (uniqueParts.length >= 2) return uniqueParts.slice(0, 3).join(", ");
        if (uniqueParts.length === 1) return uniqueParts[0];
      }
    } catch (e) {}

    try {
      const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=vi`;
      const res = await fetch(bdcUrl);
      if (res.ok) {
        const data = await res.json();
        const locality = data.locality || "";
        const city = data.city || data.principalSubdivision || "";
        if (locality && city && locality !== city) return `${locality}, ${city}`;
        if (city || locality) return city || locality;
      }
    } catch (e) {}

    return `GPS (${lat.toFixed(3)}, ${lon.toFixed(3)})`;
  }

  async function fallbackIPGeolocation() {
    try {
      const res = await fetch("https://ipwho.is/");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.latitude && data.longitude) {
          const placeName = await resolveExactLocationName(data.latitude, data.longitude);
          state.customCoords = {
            name: `📍 ${placeName}`,
            lat: data.latitude,
            lon: data.longitude
          };
          fetchWeather(true);
          return;
        }
      }
    } catch (e) {}
    fetchWeather(true);
  }

  function startLiveGPSTracking(forceRefresh = false) {
    state.useLiveGPS = true;
    document.getElementById("dashCitySelect").value = "gps_live";
    setStatusBadge("weatherStatusBadge", "weatherStatusDot", "weatherStatusText", "pending", "Đang định vị GPS", true);

    if (!navigator.geolocation) {
      fallbackIPGeolocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async pos => {
        await handleGPSUpdate(pos, true);
      },
      () => {
        fallbackIPGeolocation();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );

    if (state.gpsWatchId !== null) {
      navigator.geolocation.clearWatch(state.gpsWatchId);
    }

    state.gpsWatchId = navigator.geolocation.watchPosition(
      async pos => {
        if (!state.useLiveGPS) return;
        await handleGPSUpdate(pos, forceRefresh);
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 15000, timeout: 15000 }
    );
  }

  async function handleGPSUpdate(pos, force = false) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const speedMs = pos.coords.speed;
    const speedKmh = speedMs && speedMs > 0.5 ? Math.round(speedMs * 3.6) : 0;

    let shouldUpdate = force || !state.lastWeatherFetchCoords;
    if (!shouldUpdate && state.lastWeatherFetchCoords) {
      const movedKm = getDistanceKm(state.lastWeatherFetchCoords.lat, state.lastWeatherFetchCoords.lon, lat, lon);
      const elapsedMs = Date.now() - state.lastWeatherFetchTime;
      if (movedKm >= 1.0 || elapsedMs >= 5 * 60 * 1000) {
        shouldUpdate = true;
      }
    }

    if (shouldUpdate) {
      state.lastWeatherFetchCoords = { lat, lon };
      state.lastWeatherFetchTime = Date.now();
      const exactPlace = await resolveExactLocationName(lat, lon);
      state.customCoords = {
        name: `🛰️ ${exactPlace}`,
        lat,
        lon,
        speedKmh
      };
      await fetchWeather(true);
    }
  }

  function detectGPS() {
    startLiveGPSTracking(true);
  }

  async function fetchWeather() {
    const loc = (state.useLiveGPS && state.customCoords) ? state.customCoords : (state.customCoords || state.selectedCity);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&forecast_days=10&timezone=Asia%2FBangkok`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      renderWeatherUI(loc.name, data, loc);
      setStatusBadge("weatherStatusBadge", "weatherStatusDot", "weatherStatusText", "success", "Đã đồng bộ GPS", false);
      const topGpsText = document.getElementById("gpsTopBadgeText");
      if (topGpsText) topGpsText.textContent = loc.name.replace("🛰️ ", "").replace("📍 ", "");
    } catch (err) {
      setStatusBadge("weatherStatusBadge", "weatherStatusDot", "weatherStatusText", "error", "Lỗi kết nối mạng", false);
      document.getElementById("dashWeatherDesc").textContent = "Không thể tải thời tiết, vui lòng kiểm tra mạng.";
    }
  }

  function renderWeatherUI(cityName, data, locObj = null) {
    const cur = data.current;
    const daily = data.daily;
    const hourly = data.hourly;
    const wInfo = getWeatherInfo(cur.weather_code);

    const tempNow = Math.round(cur.temperature_2m);
    const feels = Math.round(cur.apparent_temperature);
    const todayMax = Math.round(daily.temperature_2m_max[0]);
    const todayMin = Math.round(daily.temperature_2m_min[0]);
    const uvMax = daily.uv_index_max[0] !== undefined ? daily.uv_index_max[0].toFixed(1) : "--";
    const rainProb = daily.precipitation_probability_max[0] ?? 0;
    const nowTime = new Date().toTimeString().slice(0, 5);

    document.getElementById("dashWeatherCityName").textContent = `${cityName} • Cập nhật ${nowTime}`;
    document.getElementById("dashTempNow").textContent = `${tempNow}°C`;
    document.getElementById("dashWeatherDesc").textContent = `${wInfo.text} • Cảm giác như ${feels}°C`;
    document.getElementById("dashWeatherBigIcon").textContent = wInfo.icon;
    document.getElementById("dashTempHighLow").textContent = `Cao: ${todayMax}° • Thấp: ${todayMin}°`;
    document.getElementById("dashHumidity").textContent = `${cur.relative_humidity_2m}%`;
    document.getElementById("dashWind").textContent = `${Math.round(cur.wind_speed_10m)} km/h`;
    document.getElementById("dashRainProb").textContent = `${rainProb}%`;
    document.getElementById("dashUV").textContent = uvMax;

    if (locObj && locObj.lat) {
      document.getElementById("weatherCoordHint").textContent =
        `${locObj.lat.toFixed(3)}, ${locObj.lon.toFixed(3)}${locObj.speedKmh ? ` • 🚘 ${locObj.speedKmh} km/h` : ""}`;
    }

    // Dự báo theo giờ (6 mốc)
    const nowHour = new Date().getHours();
    let hourlyHtml = "";
    let count = 0;
    for (let i = 0; i < hourly.time.length && count < 6; i++) {
      const hrDate = new Date(hourly.time[i]);
      if (hrDate.getHours() >= nowHour || i > 0) {
        if (i % 2 === 0) {
          const hStr = `${String(hrDate.getHours()).padStart(2, "0")}:00`;
          const hIcon = getWeatherInfo(hourly.weather_code[i]).icon;
          const hTemp = Math.round(hourly.temperature_2m[i]);
          hourlyHtml += `
            <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-2 text-center">
              <div class="text-[11px] font-bold text-slate-500">${hStr}</div>
              <div class="text-lg my-0.5">${hIcon}</div>
              <div class="text-xs font-extrabold text-slate-800">${hTemp}°</div>
            </div>
          `;
          count++;
        }
      }
    }
    document.getElementById("hourlyForecastRow").innerHTML = hourlyHtml;

    // Dự báo 10 ngày tới dạng lưới Icon ngắn gọn (5 cột x 2 hàng, không chữ dài dòng)
    let dash10Html = "";
    for (let i = 0; i < daily.time.length; i++) {
      const dObj = new Date(daily.time[i] + "T00:00:00");
      const dayLabel = i === 0 ? "H.Nay" : `${WEEKDAYS_SHORT[dObj.getDay()]} ${dObj.getDate()}`;
      const info = getWeatherInfo(daily.weather_code[i]);
      const tMax = Math.round(daily.temperature_2m_max[i]);
      const tMin = Math.round(daily.temperature_2m_min[i]);
      const rProb = daily.precipitation_probability_max[i] ?? 0;

      dash10Html += `
        <div title="${dayLabel}: ${info.text} (${tMin}° - ${tMax}°, mưa ${rProb}%)"
             class="flex flex-col items-center justify-between py-1.5 px-1 rounded-xl border ${i === 0 ? "bg-blue-50/90 border-blue-300 shadow-2xs" : "bg-slate-50/80 border-slate-200/70"} text-center">
          <span class="text-[9.5px] font-bold ${i === 0 ? "text-blue-700" : "text-slate-600"} leading-tight truncate w-full">${dayLabel}</span>
          <div class="text-base leading-none my-1">${info.icon}</div>
          <div class="text-[9.5px] font-extrabold leading-tight">
            <span class="text-slate-500">${tMin}°</span><span class="text-slate-300">/</span><span class="text-amber-600">${tMax}°</span>
          </div>
        </div>
      `;
    }
    document.getElementById("dashForecast10List").innerHTML = dash10Html;
  }

  // 5. LỊCH ÂM DƯƠNG VIỆT NAM
  function changeCalendarMonth(delta) {
    state.calMonth += delta;
    if (state.calMonth > 11) {
      state.calMonth = 0;
      state.calYear++;
    } else if (state.calMonth < 0) {
      state.calMonth = 11;
      state.calYear--;
    }
    renderCalendarMonth();
  }

  function goToTodayCalendar() {
    const now = new Date();
    state.calMonth = now.getMonth();
    state.calYear = now.getFullYear();
    selectCalendarDate(now);
    renderCalendarMonth();
  }

  function selectCalendarDate(dateObj) {
    state.calSelectedDate = dateObj;
    const info = LunarCalendar.getFullInfo(dateObj);
    const lDay = String(info.lunar.day).padStart(2, "0");
    const lMonth = String(info.lunar.month).padStart(2, "0");

    document.getElementById("calDetailSelectedTitle").textContent =
      `📅 ${WEEKDAYS_VN[dateObj.getDay()]}, ${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    document.getElementById("calDetailSelectedLunar").textContent =
      `🌕 Âm: ${lDay}/${lMonth} (${info.canChi.day})`;
    document.getElementById("calDetailGioHD").textContent =
      `✨ Giờ Hoàng Đạo: ${info.canChi.gioHoangDao.slice(0, 4).join(" • ")}`;
  }

  function renderCalendarMonth() {
    const year = state.calYear;
    const month = state.calMonth;
    document.getElementById("calMonthHeaderTitle").textContent = `Tháng ${month + 1} / ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();
    const today = new Date();
    let html = "";

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const dateObj = new Date(year, month - 1, d);
      const l = LunarCalendar.convertSolar2Lunar(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear());
      html += `
        <div class="cal-day-cell is-muted">
          <span class="text-sm sm:text-base font-bold text-slate-400">${d}</span>
          <span class="text-xs text-slate-400 self-end font-semibold">${l.day}/${l.month}</span>
        </div>
      `;
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const l = LunarCalendar.convertSolar2Lunar(d, month + 1, year);
      const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const isSelected =
        state.calSelectedDate &&
        d === state.calSelectedDate.getDate() &&
        month === state.calSelectedDate.getMonth() &&
        year === state.calSelectedDate.getFullYear();

      const isSpecial = l.day === 1 || l.day === 15;
      const lunarLabel = l.day === 1 || d === 1 ? `${l.day}/${l.month}` : `${l.day}`;

      html += `
        <div class="cal-day-cell ${isToday ? "is-today" : ""} ${isSelected ? "is-selected" : ""}"
             onclick="App.onCalCellClick(${year}, ${month}, ${d})">
          <div class="flex items-center justify-between">
            <span class="text-base sm:text-xl font-extrabold leading-none ${isToday ? "text-blue-700" : "text-slate-900"}">${d}</span>
            ${isSpecial ? `<span class="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-extrabold text-[10px]">${l.day === 1 ? "M1" : "Rằm"}</span>` : ""}
          </div>
          <span class="text-xs sm:text-sm font-extrabold self-end leading-none ${isSpecial ? "text-rose-600" : "text-amber-600"}">${lunarLabel}</span>
        </div>
      `;
    }

    document.getElementById("calendarGridBody").innerHTML = html;
  }

  function onCalCellClick(y, m, d) {
    selectCalendarDate(new Date(y, m, d));
    renderCalendarMonth();
  }

  // 6. TRANG 2: TRÌNH PHÁT VIDEO & NHẠC ĐA LUỒNG (CHẠY 100% TRÊN CẢ FILE:// VÀ GITHUB PAGES)
  function extractYouTubeId(input) {
    if (!input) return null;
    const reg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = input.match(reg);
    if (match && match[1]) return match[1];
    if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) return input.trim();
    return null;
  }

  function stopAllYTPlayers() {
    const directVideo = document.getElementById("ytDirectVideo");
    const directAudio = document.getElementById("ytDirectAudio");
    const radioOverlay = document.getElementById("ytRadioOverlay");
    if (directVideo) {
      directVideo.pause();
      directVideo.removeAttribute("src");
      directVideo.classList.add("hidden");
    }
    if (directAudio) {
      directAudio.pause();
      directAudio.removeAttribute("src");
    }
    if (radioOverlay) {
      radioOverlay.classList.add("hidden");
    }
  }

  async function playYTItem(item, autoplay = true) {
    if (!item) return;
    state.currentYTItem = item;
    state.currentYTId = item.id;
    state.currentYTTitle = item.title || "Video đang phát";

    const titleEl = document.getElementById("ytCurrentTitle");
    if (titleEl) titleEl.textContent = state.currentYTTitle;
    renderYTList(state.ytListItems);

    const iframe = document.getElementById("ytIframe");
    const directAudio = document.getElementById("ytDirectAudio");
    const radioOverlay = document.getElementById("ytRadioOverlay");
    const radioTitle = document.getElementById("ytRadioTitle");
    const radioSub = document.getElementById("ytRadioSub");
    const badgeText = document.getElementById("ytEngineBadgeText");

    stopAllYTPlayers();

    const isFileProtocol = window.location.protocol === "file:";

    // 1. Luồng Radio HTML5 trực tiếp (MP3 / Icecast) - Không bao giờ bị chặn ở bất kỳ đâu
    if (item.type === "radio" || state.ytEngine === "direct_stream") {
      const streamUrl = item.audioStream || "https://streams.ilovemusic.de/iloveradio17.mp3";
      iframe.src = "about:blank";
      iframe.classList.add("hidden");
      if (radioOverlay) radioOverlay.classList.remove("hidden");
      if (radioTitle) radioTitle.textContent = item.title;
      if (radioSub) radioSub.textContent = item.author || "Luồng âm thanh HTML5 trực tiếp • Không quảng cáo";
      if (badgeText) badgeText.textContent = "Đang phát: Radio HTML5";
      if (directAudio) {
        directAudio.src = streamUrl;
        if (autoplay) {
          directAudio.play().catch(() => {});
        }
      }
      setStatusBadge("ytSearchStatusBadge", null, null, "success", "Đang phát Radio");
      return;
    }

    // 2. Luồng YouTube Embed gốc (hoạt động tốt khi chạy qua http://localhost hoặc https:// GitHub Pages)
    const useYouTubeEmbed =
      state.ytEngine === "youtube" ||
      (state.ytEngine === "auto" && !isFileProtocol && item.ytId && !item.dmId);

    if (useYouTubeEmbed && item.ytId) {
      iframe.classList.remove("hidden");
      iframe.src = `https://www.youtube.com/embed/${item.ytId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&playsinline=1`;
      if (badgeText) badgeText.textContent = "Đang phát: YouTube Clean";
      setStatusBadge("ytSearchStatusBadge", null, null, "success", "Đang phát");
      return;
    }

    // 3. Luồng Cloud Video HD (Dailymotion Geo Player) - Chạy mượt 100% cả trên file:// ổ cứng lẫn trên Web!
    iframe.classList.remove("hidden");
    if (badgeText) badgeText.textContent = "Đang phát: Cloud Video HD";

    if (item.dmId) {
      iframe.src = `https://geo.dailymotion.com/player.html?video=${item.dmId}&autoplay=${autoplay ? "1" : "0"}`;
      setStatusBadge("ytSearchStatusBadge", null, null, "success", "Đang phát HD");
      return;
    }

    // Tự động tìm mã Cloud Video HD tương ứng theo tên bài hát / chủ đề
    const query = item.searchQuery || item.title || "Lofi hip hop chill music";
    setStatusBadge("ytSearchStatusBadge", null, null, "pending", "Đang nạp video...");
    try {
      const apiUrl = `https://api.dailymotion.com/videos?search=${encodeURIComponent(query)}&fields=id,title,thumbnail_240_url,owner.screenname&limit=5`;
      const res = await fetch(apiUrl);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.list) && data.list.length > 0) {
          item.dmId = data.list[0].id;
          iframe.src = `https://geo.dailymotion.com/player.html?video=${item.dmId}&autoplay=${autoplay ? "1" : "0"}`;
          setStatusBadge("ytSearchStatusBadge", null, null, "success", "Đang phát HD");
          return;
        }
      }
    } catch (e) {}

    // Dự phòng cuối cùng: nếu mất kết nối API thì chuyển sang phát Radio HTML5 trực tiếp
    if (item.audioStream) {
      playYTItem({ ...item, type: "radio" }, autoplay);
    } else if (item.ytId) {
      iframe.src = `https://www.youtube.com/embed/${item.ytId}?autoplay=${autoplay ? 1 : 0}&rel=0`;
    }
  }

  function playYTByIndex(idx, autoplay = true) {
    const item = state.ytListItems[idx];
    if (item) {
      playYTItem(item, autoplay);
    }
  }

  async function playYT(videoId, title) {
    const found = state.ytListItems.find(x => x.id === videoId || x.ytId === videoId || x.dmId === videoId);
    if (found) {
      await playYTItem(found, true);
      return;
    }
    await playYTItem({
      id: videoId,
      ytId: /^[a-zA-Z0-9_-]{11}$/.test(videoId) ? videoId : null,
      dmId: /^[a-zA-Z0-9]{6,8}$/.test(videoId) ? videoId : null,
      title: title || `Video: ${videoId}`,
      searchQuery: title || videoId
    }, true);
  }

  function openYTSearchPreset(query) {
    goToPage(1);
    document.getElementById("ytSearchInput").value = query;
    searchYouTube();
  }

  function switchYTPlayerEngine(engine) {
    state.ytEngine = engine;
    const sel = document.getElementById("ytServerSelect");
    if (sel) sel.value = engine;
    if (state.currentYTItem) {
      playYTItem(state.currentYTItem, true);
    } else if (state.ytListItems.length > 0) {
      playYTItem(state.ytListItems[0], true);
    }
  }

  function openYTExternal() {
    const item = state.currentYTItem;
    if (item && item.ytId) {
      window.open(`https://www.youtube.com/watch?v=${item.ytId}`, "_blank", "noopener");
    } else if (item && item.dmId) {
      window.open(`https://www.dailymotion.com/video/${item.dmId}`, "_blank", "noopener");
    } else {
      const q = encodeURIComponent(state.currentYTTitle || "Nhạc lái xe");
      window.open(`https://www.youtube.com/results?search_query=${q}`, "_blank", "noopener");
    }
  }

  async function playCustomYTUrl() {
    const input = prompt("Dán link YouTube, Video ID hoặc nhập tên bài hát muốn phát ngay:");
    if (!input || !input.trim()) return;
    document.getElementById("ytSearchInput").value = input.trim();
    await searchYouTube();
  }

  async function loadYTCategory(cat, autoplayFirst = true) {
    const presets = (YT_PRESETS[cat] || YT_PRESETS.music).map(x => ({ ...x }));
    state.ytListItems = presets;
    renderYTList(state.ytListItems);

    if (autoplayFirst && state.ytListItems.length > 0) {
      ytInitialized = true;
      playYTItem(state.ytListItems[0], true);
    } else if (!state.currentYTItem && state.ytListItems.length > 0) {
      state.currentYTItem = state.ytListItems[0];
      state.currentYTId = state.ytListItems[0].id;
      state.currentYTTitle = state.ytListItems[0].title;
      const titleEl = document.getElementById("ytCurrentTitle");
      if (titleEl) titleEl.textContent = state.currentYTTitle;
    }

    // Bổ sung thêm danh sách video thực tế từ Cloud API cho danh mục đang chọn
    if (cat !== "radio") {
      const catQueryMap = {
        music: "Lofi Hip Hop Chill Beats Study Music",
        bolero: "Liên khúc nhạc trữ tình Bolero hay nhất",
        vpop: "Nhạc trẻ Vpop Lofi Chill Remix hay nhất",
        news: "Bản tin thời sự VTV tin tức mới nhất"
      };
      const q = catQueryMap[cat] || "Nhạc thư giãn lái xe";
      try {
        const res = await fetch(`https://api.dailymotion.com/videos?search=${encodeURIComponent(q)}&fields=id,title,thumbnail_240_url,owner.screenname&limit=8`);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.list) && data.list.length > 0) {
            const extra = data.list.map(v => ({
              id: `dm_${v.id}`,
              dmId: v.id,
              title: v.title,
              author: v["owner.screenname"] ? `${v["owner.screenname"]} • Cloud HD` : "Cloud Video HD",
              thumb: v.thumbnail_240_url
            }));
            state.ytListItems = [...presets, ...extra];
            renderYTList(state.ytListItems);
          }
        }
      } catch (e) {}
    }
  }

  function renderYTList(items) {
    const container = document.getElementById("ytResultsList");
    if (!container) return;
    container.innerHTML = items
      .map((item, idx) => {
        const isActive = item.id === state.currentYTId;
        const thumbUrl = item.thumb || (item.ytId ? `https://i.ytimg.com/vi/${item.ytId}/mqdefault.jpg` : "");
        return `
      <div onclick="App.playYTByIndex(${idx}, true)"
           class="flex items-center gap-3 p-2.5 rounded-2xl border ${isActive ? "bg-blue-50/90 border-blue-400 shadow-xs" : "bg-slate-50/80 hover:bg-slate-100 border-slate-200/70"} cursor-pointer transition">
        <div class="w-24 aspect-video rounded-xl overflow-hidden bg-slate-800 shrink-0 relative flex items-center justify-center">
          ${thumbUrl ? `<img src="${thumbUrl}" alt="thumb" class="w-full h-full object-cover" loading="lazy" />` : `<span class="text-white text-xs font-bold">▶ HD</span>`}
          <span class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-white text-[9px] font-bold">
            ${item.type === "radio" ? "LIVE AUDIO" : "HD"}
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <div class="font-bold text-xs sm:text-sm ${isActive ? "text-blue-700" : "text-slate-800"} line-clamp-2 leading-snug">${item.title}</div>
          <div class="text-[11px] font-semibold text-slate-500 mt-1 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-blue-400"}"></span>
            <span class="truncate">${item.author || "Cloud Video HD"}</span>
          </div>
        </div>
      </div>
    `;
      })
      .join("");
  }

  async function searchYouTube() {
    const raw = document.getElementById("ytSearchInput").value.trim();
    if (!raw) return;

    setStatusBadge("ytSearchStatusBadge", null, null, "pending", "Đang tìm...");

    // Kiểm tra nếu người dùng dán trực tiếp Link YouTube hoặc Video ID (11 ký tự)
    const directId = extractYouTubeId(raw);
    if (directId) {
      let resolvedTitle = `YouTube Video (${directId})`;
      try {
        const oembedRes = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${directId}`);
        if (oembedRes.ok) {
          const oembedData = await oembedRes.json();
          if (oembedData && oembedData.title) {
            resolvedTitle = oembedData.title;
          }
        }
      } catch (e) {}

      const customItem = {
        id: `yt_${directId}`,
        ytId: directId,
        title: resolvedTitle,
        searchQuery: resolvedTitle,
        author: "YouTube Link",
        thumb: `https://i.ytimg.com/vi/${directId}/mqdefault.jpg`
      };
      state.ytListItems = [customItem, ...state.ytListItems];
      renderYTList(state.ytListItems);
      await playYTItem(customItem, true);
      setStatusBadge("ytSearchStatusBadge", null, null, "success", "Hoàn thành");
      return;
    }

    // Tìm kiếm danh sách Video HD qua Dailymotion Official Public API (100% CORS, không cần API key, chạy mượt trên cả file://)
    try {
      const apiUrl = `https://api.dailymotion.com/videos?search=${encodeURIComponent(raw)}&fields=id,title,thumbnail_240_url,owner.screenname&limit=15`;
      const res = await fetch(apiUrl);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.list) && data.list.length > 0) {
          const list = data.list.map(v => ({
            id: `dm_${v.id}`,
            dmId: v.id,
            title: v.title,
            author: v["owner.screenname"] ? `${v["owner.screenname"]} • Cloud HD` : "Cloud Video HD",
            thumb: v.thumbnail_240_url
          }));
          state.ytListItems = list;
          renderYTList(list);
          await playYTItem(list[0], true);
          setStatusBadge("ytSearchStatusBadge", null, null, "success", `Tìm thấy ${list.length} video`);
          return;
        }
      }
    } catch (e) {}

    setStatusBadge("ytSearchStatusBadge", null, null, "error", "Không tìm thấy");
  }

  // 7. TRANG 3: TRUYỀN HÌNH VTV TRỰC TUYẾN
  function renderTVChannels() {
    const grid = document.getElementById("tvChannelGrid");
    grid.innerHTML = TV_CHANNELS.map(
      ch => `
      <div id="ch-card-${ch.id}"
           onclick="App.selectTVChannel('${ch.id}', false)"
           class="min-w-0 overflow-hidden flex items-center gap-2.5 p-2.5 rounded-2xl border ${ch.id === state.currentTVChannel.id ? "bg-indigo-50/90 border-indigo-300 shadow-xs" : "bg-slate-50/80 hover:bg-slate-100 border-slate-200/80"} cursor-pointer transition">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-[11px] text-white shrink-0 shadow-xs" style="background:${ch.color};">
          ${ch.code}
        </div>
        <div class="min-w-0 flex-1 overflow-hidden">
          <div class="font-bold text-xs text-slate-800 truncate">${ch.name}</div>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span class="text-[11px] font-semibold text-slate-500 truncate">VTV Digital • Live</span>
          </div>
        </div>
      </div>
    `
    ).join("");
  }

  function selectTVChannel(chId, autoGoPage = true) {
    if (autoGoPage) goToPage(2);
    const ch = TV_CHANNELS.find(c => c.id === chId) || TV_CHANNELS[0];
    state.currentTVChannel = ch;
    renderTVChannels();

    document.getElementById("tvCurrentChannelTitle").textContent = ch.name;
    if (!ch.hlsUrl) {
      switchTVMode("embed");
    } else {
      switchTVMode(state.tvMode);
    }
  }

  function switchTVMode(mode) {
    state.tvMode = mode;
    const videoEl = document.getElementById("tvVideoElement");
    const iframeEl = document.getElementById("tvIframeElement");
    const ch = state.currentTVChannel;

    if (state.hlsInstance) {
      state.hlsInstance.destroy();
      state.hlsInstance = null;
    }

    if (mode === "embed" || !ch.hlsUrl) {
      videoEl.pause();
      videoEl.classList.add("hidden");
      iframeEl.classList.remove("hidden");
      iframeEl.src = ch.embedUrl;
    } else {
      iframeEl.src = "about:blank";
      iframeEl.classList.add("hidden");
      videoEl.classList.remove("hidden");
      playHlsStream(ch.hlsUrl, ch.embedUrl);
    }
  }

  function playHlsStream(streamUrl, fallbackEmbedUrl) {
    const videoEl = document.getElementById("tvVideoElement");
    if (window.Hls && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      state.hlsInstance = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoEl.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal && fallbackEmbedUrl) {
          switchTVMode("embed");
        }
      });
    } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = streamUrl;
      videoEl.play().catch(() => {});
    }
  }

  function playCustomM3u8() {
    const url = document.getElementById("customM3u8Input").value.trim();
    if (!url) return;
    state.tvMode = "hls";
    document.getElementById("tvIframeElement").classList.add("hidden");
    const videoEl = document.getElementById("tvVideoElement");
    videoEl.classList.remove("hidden");
    playHlsStream(url, null);
  }

  function openTVExternal() {
    window.open(state.currentTVChannel.webUrl, "_blank", "noopener");
  }

  // 8. BÁO THỨC & MÁY TÍNH HẸN GIỜ SẠC XE ĐIỆN (MẶC ĐỊNH VF 7 ECO 60 KWH)
  function onEVModelChange() {
    calculateChargingTime();
  }

  function calculateChargingTime() {
    const capacity = parseFloat(document.getElementById("evModelSelect").value) || 60;
    const powerKw = parseFloat(document.getElementById("chargerPowerSelect").value) || 60;
    let curSoc = parseInt(document.getElementById("curSocInput").value, 10);
    let targetSoc = parseInt(document.getElementById("targetSocInput").value, 10);

    if (targetSoc <= curSoc) {
      targetSoc = Math.min(100, curSoc + 10);
      document.getElementById("targetSocInput").value = targetSoc;
    }

    document.getElementById("curSocLabel").textContent = `${curSoc}%`;
    document.getElementById("targetSocLabel").textContent = `${targetSoc}%`;

    const kwhNeeded = (capacity * (targetSoc - curSoc)) / 100;
    const efficiencyFactor = targetSoc > 85 ? 0.78 : 0.88;
    const hours = kwhNeeded / (powerKw * efficiencyFactor);
    const totalMinutes = Math.max(5, Math.round(hours * 60));
    const recommendMinutes = Math.max(1, totalMinutes - 5);

    state.calculatedRecommendMins = recommendMinutes;

    document.getElementById("calcKwhNeeded").textContent = `${kwhNeeded.toFixed(1)} kWh`;
    document.getElementById("calcTotalMinutes").textContent = `${totalMinutes} phút`;
    document.getElementById("calcRecommendMinutes").textContent = `${recommendMinutes} phút`;
  }

  function applyCalculatedAlarm() {
    startQuickAlarm(state.calculatedRecommendMins);
  }

  function startCustomMinuteAlarm() {
    const mins = parseInt(document.getElementById("customMinutesInput").value, 10);
    if (!mins || mins <= 0) return;
    startQuickAlarm(mins);
  }

  function startExactTimeAlarm() {
    const val = document.getElementById("exactAlarmTimeInput").value;
    if (!val) return;
    const [hh, mm] = val.split(":").map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(hh, mm, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    setAlarmTimestamp(target.getTime());
  }

  function startQuickAlarm(minutes) {
    ensureAudioContext();
    const targetTs = Date.now() + minutes * 60 * 1000;
    setAlarmTimestamp(targetTs);
  }

  function setAlarmTimestamp(targetTs) {
    state.alarmTargetTimestamp = targetTs;
    localStorage.setItem("ev_alarm_target", String(targetTs));

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }

    if (state.alarmInterval) clearInterval(state.alarmInterval);
    updateAlarmUI();
    state.alarmInterval = setInterval(updateAlarmUI, 1000);
  }

  function restoreAlarmFromStorage() {
    const saved = localStorage.getItem("ev_alarm_target");
    if (saved) {
      const ts = parseInt(saved, 10);
      if (ts > Date.now()) {
        setAlarmTimestamp(ts);
      } else {
        localStorage.removeItem("ev_alarm_target");
      }
    }
  }

  function updateAlarmUI() {
    const mainCountdown = document.getElementById("alarmMainCountdown");
    const targetLabel = document.getElementById("alarmTargetTimeLabel");

    if (!state.alarmTargetTimestamp) {
      mainCountdown.textContent = "00:00:00";
      targetLabel.textContent = "Chưa kích hoạt bộ đếm";
      setStatusBadge("alarmCardStatusBadge", "alarmCardStatusDot", "alarmCardStatusText", "info", "Đang chờ đặt giờ", false);
      setStatusBadge("topChargeStatusBadge", "topChargeDot", "topChargeText", "info", "Sẵn sàng hẹn sạc", false);
      return;
    }

    const diffMs = state.alarmTargetTimestamp - Date.now();
    if (diffMs <= 0) {
      triggerAlarmRinging();
      return;
    }

    const totalSec = Math.ceil(diffMs / 1000);
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSec % 60).padStart(2, "0");
    const timeFormatted = `${hrs}:${mins}:${secs}`;

    const targetDate = new Date(state.alarmTargetTimestamp);
    const targetHM = `${String(targetDate.getHours()).padStart(2, "0")}:${String(targetDate.getMinutes()).padStart(2, "0")}`;

    mainCountdown.textContent = timeFormatted;
    targetLabel.textContent = `🔔 Sẽ báo rút sạc lúc ${targetHM}`;

    setStatusBadge("alarmCardStatusBadge", "alarmCardStatusDot", "alarmCardStatusText", "pending", `Đang sạc • Báo lúc ${targetHM}`, true);
    setStatusBadge("topChargeStatusBadge", "topChargeDot", "topChargeText", "pending", `⚡ Đang sạc: ${timeFormatted}`, true);
  }

  function stopAlarmTimer() {
    state.alarmTargetTimestamp = null;
    localStorage.removeItem("ev_alarm_target");
    if (state.alarmInterval) {
      clearInterval(state.alarmInterval);
      state.alarmInterval = null;
    }
    stopSoundLoop();
    updateAlarmUI();
  }

  function ensureAudioContext() {
    if (!state.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) state.audioCtx = new AudioContextClass();
    }
    if (state.audioCtx && state.audioCtx.state === "suspended") {
      state.audioCtx.resume();
    }
  }

  function playBeepPattern() {
    ensureAudioContext();
    if (!state.audioCtx) return;

    const now = state.audioCtx.currentTime;
    const freqs = [880, 1174.66, 880, 1318.5];
    freqs.forEach((f, idx) => {
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, now + idx * 0.16);
      gain.gain.setValueAtTime(0.45, now + idx * 0.16);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.16 + 0.14);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start(now + idx * 0.16);
      osc.stop(now + idx * 0.16 + 0.15);
    });
  }

  function testAlarmSound() {
    playBeepPattern();
  }

  function triggerAlarmRinging() {
    if (state.alarmInterval) {
      clearInterval(state.alarmInterval);
      state.alarmInterval = null;
    }
    state.alarmTargetTimestamp = null;
    localStorage.removeItem("ev_alarm_target");

    setStatusBadge("alarmCardStatusBadge", "alarmCardStatusDot", "alarmCardStatusText", "error", "Đã đến giờ rút sạc!", true);
    setStatusBadge("topChargeStatusBadge", "topChargeDot", "topChargeText", "error", "⚠️ RÚT SẠC NGAY!", true);

    document.getElementById("alarmModal").classList.add("show");
    playBeepPattern();
    if (state.alarmBeepInterval) clearInterval(state.alarmBeepInterval);
    state.alarmBeepInterval = setInterval(playBeepPattern, 1200);
  }

  function stopSoundLoop() {
    if (state.alarmBeepInterval) {
      clearInterval(state.alarmBeepInterval);
      state.alarmBeepInterval = null;
    }
  }

  function dismissAlarm() {
    stopSoundLoop();
    document.getElementById("alarmModal").classList.remove("show");
    setStatusBadge("alarmCardStatusBadge", "alarmCardStatusDot", "alarmCardStatusText", "success", "Hoàn thành sạc", false);
    setStatusBadge("topChargeStatusBadge", "topChargeDot", "topChargeText", "success", "Hoàn thành sạc", false);
  }

  function snoozeAlarm(mins) {
    dismissAlarm();
    startQuickAlarm(mins);
  }

  window.addEventListener("DOMContentLoaded", init);

  return {
    goToPage,
    toggleFullScreen,
    changeCity,
    detectGPS,
    fetchWeather,
    changeCalendarMonth,
    goToTodayCalendar,
    onCalCellClick,
    playYT,
    playYTByIndex,
    playYTItem,
    openYTSearchPreset,
    switchYTPlayerEngine,
    openYTExternal,
    playCustomYTUrl,
    loadYTCategory,
    searchYouTube,
    selectTVChannel,
    switchTVMode,
    playCustomM3u8,
    openTVExternal,
    onEVModelChange,
    calculateChargingTime,
    applyCalculatedAlarm,
    startCustomMinuteAlarm,
    startExactTimeAlarm,
    startQuickAlarm,
    stopAlarmTimer,
    testAlarmSound,
    dismissAlarm,
    snoozeAlarm
  };
})();
