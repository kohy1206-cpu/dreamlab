/* 공통 머리글·바닥글·하단 고정 바 — 모든 페이지가 이 파일 하나로 같은 메뉴를 씁니다 */
(function () {
  var LINKS = {
    freeClass: "https://docs.google.com/forms/d/e/1FAIpQLSfWcd2ucS_sU09gJhl0FLpq1i506Ifpj68sUge5fT7H38iLuA/viewform",
    openChat: "https://open.kakao.com/o/g3pg6Yqg",
    kakaoChannel: "https://pf.kakao.com/_qHhpG",
    kakaoChat: "https://pf.kakao.com/_qHhpG/chat",
    pqi: "https://pqi.or.kr/inf/qul/infQulBasDetail.do?searchQulId=117865", /* 민간자격정보서비스 · AI활용지도사 등록 확인 */
    kakaoStore: "https://store.kakao.com/dreamlab", /* 카카오 스토어 기본(강사되기) */
    storeByPage: { /* 페이지별 '카카오 스토어에서 신청' 결제창 */
      "ai-instructor.html": "https://store.kakao.com/dreamlab",
      "shopping-shorts.html": "https://store.kakao.com/dreamlab/products/760301807",
      "consulting.html": "https://store.kakao.com/dreamlab/products/685869221"
    },
    freePopup: true, /* true: 무료특강 버튼 → 홈페이지 안 신청창(구글시트 저장) / false: 기존 구글폼으로 이동 */
    inquiryEndpoint: "https://script.google.com/macros/s/AKfycbway5b3rpSJdRnVYIrIGo1CEvw5j32J5yF5k-7sboxI-3oiNjXH8n40nk-wmTXGi8h1rg/exec", /* 구글 Apps Script 웹앱 주소를 넣으면 강의 문의가 구글시트로 저장됨 */
    linkPage: "https://link.inpock.co.kr/dreamtech",
    lectureSite: "https://dreamlab.liveklass.com/",
    blog: "https://blog.naver.com/dreamtech_n",
    youtube: "https://www.youtube.com/@%EB%93%9C%EB%A6%BC%EB%9E%A9",
    tiktok: "https://www.tiktok.com/@dreamlab88",
    facebook: "https://www.facebook.com/dreamlab8833"
  };
  window.KAIA_LINKS = LINKS;

  var MENU = [
    ["instructors.html", "소속강사소개"],
    ["inquiry.html", "강의 문의"],
    ["ai-instructor.html", "AI강사되기"],
    ["shopping-shorts.html", "유튜브 쇼핑쇼츠"],
    ["consulting.html", "1:1 컨설팅"],
    ["archive.html", "AI 자료실"]
  ];
  var here = location.pathname.split("/").pop() || "index.html";

  var nav = MENU.map(function (m) {
    return '<a href="' + m[0] + '"' + (m[0] === here ? ' aria-current="page"' : "") + ">" + m[1] + "</a>";
  }).join("");

  var head = document.getElementById("site-head");
  if (head) {
    head.className = "site-head";
    head.innerHTML =
      '<div class="wrap head-row">' +
      '<a class="logo" href="index.html"><img class="logo-mark" src="img/dreamlab-mark.png" width="96" height="96" alt="">' +
      '<span class="logo-text"><b>한국AI활용지도사교육연구협회</b><small>DREAMLAB · 드림랩</small></span></a>' +
      '<nav class="nav" id="main-nav" aria-label="주 메뉴">' + nav + "</nav>" +
      '<button class="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav">메뉴</button>' +
      "</div>";
  }

  var foot = document.getElementById("site-foot");
  if (foot) {
    foot.className = "site-foot";
    foot.innerHTML =
      '<div class="wrap"><div class="foot-grid">' +
      "<div><img class=\"foot-logo\" src=\"img/dreamlab-logo.jpg\" width=\"120\" height=\"120\" alt=\"드림랩 로고\"><h4>한국AI활용지도사교육연구협회</h4><p>경력을 쉬었던 분, 은퇴 후 인생 2막을 준비하는 분이<br>AI강사와 크리에이터로 다시 일하도록 돕습니다.</p></div>" +
      "<div><h4>바로가기</h4><ul>" + MENU.map(function (m) { return '<li><a href="' + m[0] + '">' + m[1] + "</a></li>"; }).join("") + "</ul></div>" +
      "<div><h4>채널</h4><ul>" +
      '<li><a href="' + LINKS.youtube + '" target="_blank" rel="noopener">유튜브 · 드림랩</a></li>' +
      '<li><a href="' + LINKS.blog + '" target="_blank" rel="noopener">네이버 블로그</a></li>' +
      '<li><a href="' + LINKS.kakaoChannel + '" target="_blank" rel="noopener">드림랩 카카오톡 채널</a></li>' +
      '<li><a href="' + LINKS.openChat + '" target="_blank" rel="noopener">드림랩 오픈톡방</a></li>' +
      '<li><a href="' + LINKS.tiktok + '" target="_blank" rel="noopener">틱톡</a></li>' +
      '<li><a href="' + LINKS.lectureSite + '" target="_blank" rel="noopener">드림랩 강의실</a></li>' +
      "</ul></div></div>" +
      '<div class="foot-legal">' +
      '<div class="legal-block"><h5>한국AI활용지도사교육연구협회 <em>비영리 단체</em></h5><ul>' +
      '<li>협회장 고현미(지니쌤)</li>' +
      '<li>고유번호 558-82-76612</li>' +
      '<li>민간자격 AI활용지도사 등록번호 2024-005198 (<a href="' + LINKS.pqi + '" target="_blank" rel="noopener">등록 확인</a>)</li>' +
      '<li>소재지 경기도 용인시 기흥구 공세로 150-29, B01-G432호(공세동, 테라스가든)</li>' +
      '<li>문의 010-6779-8833 (강의 중일 수 있어 문자 주시면 답변드려요)</li>' +
      '<li>이메일 dreamlab8833@gmail.com</li></ul></div>' +
      '<div class="legal-block"><h5>이즈원주식회사 <em>수익사업 · 교육상품 판매</em></h5><ul>' +
      '<li>대표 고현미</li>' +
      '<li>사업자등록번호 244-87-03480</li>' +
      '<li>통신판매업 신고 제2025-용인기흥-0878호</li>' +
      '<li>주소 경기도 용인시 기흥구 금화로 3, 202-에프25호(상갈동)</li></ul></div>' +
      '<p class="legal-note">협회 과정의 수강료 결제와 판매는 이즈원주식회사가 카카오 스토어에서 진행합니다.<br>© 한국AI활용지도사교육연구협회</p></div></div>';
  }

  var dock = document.getElementById("dock");
  if (dock) {
    dock.className = "dock";
    var custom = dock.getAttribute("data-buttons");
    dock.innerHTML = '<div class="wrap">' + (custom ||
      ('<a class=\"btn btn-primary js-free\" href=\"' + (LINKS.freePopup ? "#free-apply" : LINKS.freeClass) + '\"' + (LINKS.freePopup ? "" : ' target=\"_blank\" rel=\"noopener\"') + '>무료특강 신청</a>' +
       '<a class=\"btn btn-kakao\" href=\"' + LINKS.kakaoChannel + '\" target=\"_blank\" rel=\"noopener\"><span class="lbl-lg">채널 추가하고 소식받기</span><span class="lbl-sm">카톡 소식받기</span></a>')) + "</div>";
  }

  /* 카카오 스토어 신청 버튼 */
  document.querySelectorAll(".js-store").forEach(function (a) { a.href = a.getAttribute("data-store") || LINKS.storeByPage[here] || LINKS.kakaoStore || LINKS.kakaoChat; a.target = "_blank"; a.rel = "noopener"; });

  /* PC에서 문자 버튼: 문자 앱이 없으므로 번호 팝업 + 복사 */
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (window.matchMedia && matchMedia("(pointer: coarse)").matches);
  if (!isMobile) {
    var pop = document.createElement("div");
    pop.className = "sms-pop"; pop.setAttribute("role", "dialog"); pop.setAttribute("aria-modal", "true"); pop.setAttribute("aria-labelledby", "sms-pop-t");
    pop.innerHTML =
      '<div class="sms-box">' +
      '<button type="button" class="sms-x" aria-label="닫기">×</button>' +
      '<p class="sms-ic" aria-hidden="true">💬</p>' +
      '<h3 id="sms-pop-t">휴대폰으로 문자 주세요</h3>' +
      '<p class="sms-sub">강의 중일 수 있어 문자 주시면 확인 후 답변드립니다.</p>' +
      '<div class="sms-num"><b>010-6779-8833</b><button type="button" class="btn btn-primary sms-copy">번호 복사</button></div>' +
      '<p class="sms-msg" aria-live="polite"></p>' +
      '<p class="sms-or">또는 PC에서 바로 <a href="' + LINKS.kakaoChat + '" target="_blank" rel="noopener">카카오톡으로 상담하기</a></p>' +
      "</div>";
    document.body.appendChild(pop);
    var msg = pop.querySelector(".sms-msg"), lastFocus = null, body = "";
    function closePop() { pop.classList.remove("open"); if (lastFocus) lastFocus.focus(); }
    function copyText(t) {
      if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t);
      return new Promise(function (ok, no) {
        var ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy") ? ok() : no(); } catch (e) { no(e); }
        document.body.removeChild(ta);
      });
    }
    pop.querySelector(".sms-copy").addEventListener("click", function () {
      copyText("010-6779-8833").then(function () { msg.textContent = "✔ 번호를 복사했어요. 휴대폰 문자에 붙여 넣어 보내 주세요." + (body ? " (내용 예: " + body + ")" : ""); })
        .catch(function () { msg.textContent = "복사가 안 되면 번호를 직접 적어 주세요: 010-6779-8833"; });
    });
    pop.querySelector(".sms-x").addEventListener("click", closePop);
    pop.addEventListener("click", function (e) { if (e.target === pop) closePop(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && pop.classList.contains("open")) closePop(); });
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="sms:"]'); if (!a) return;
      e.preventDefault(); lastFocus = a; msg.textContent = "";
      var m = a.getAttribute("href").match(/body=([^&]*)/); body = m ? decodeURIComponent(m[1]) : "";
      pop.classList.add("open"); pop.querySelector(".sms-copy").focus();
    });
  }

  /* ---------- 무료특강 신청창 ---------- */
  (function () {
    /* 처음 들어온 경로 기억: 짧은 주소(dreamlabai.org/ig 등) → ?from=ig → 이 브라우저에 90일간 저장.
       여러 페이지를 둘러보다가 며칠 뒤 신청해도 '처음 알게 된 곳'이 그대로 기록됩니다. */
    var SRC = { ig: "인스타그램", yt: "유튜브", tt: "틱톡", fb: "페이스북", dg: "당근", blog: "네이버 블로그", kt: "카카오톡 채널", oc: "오픈톡방", live: "실시간 온라인 강의", off: "오프라인 강의", qr: "QR코드" };
    function srcName(v) { return SRC[v] || v; }
    try {
      var q = new URLSearchParams(location.search), code = q.get("from") || q.get("utm_source") || "", saved = null;
      try { saved = JSON.parse(localStorage.getItem("kaia_src") || "null"); } catch (x) {}
      if (saved && Date.now() - saved.t > 90 * 864e5) saved = null;
      var ref = "";
      if (!code && document.referrer) { var rh = new URL(document.referrer).hostname.replace(/^www\./, ""); if (rh && rh !== location.hostname.replace(/^www\./, "")) ref = rh; }
      if (!saved && (code || ref)) localStorage.setItem("kaia_src", JSON.stringify({ s: code ? srcName(code) : ref + " (링크)", t: Date.now() }));
      else if (!saved) localStorage.setItem("kaia_src", JSON.stringify({ s: "직접 방문", t: Date.now() }));
      if (code && history.replaceState) { q.delete("from"); history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : "") + location.hash); }
    } catch (e) {}
    function getSrc() { try { var v = JSON.parse(localStorage.getItem("kaia_src") || "null"); if (v) return [v.s, new Date(v.t).toLocaleDateString("ko-KR")]; } catch (e) {} return ["알 수 없음", ""]; }
    if (!LINKS.freePopup || !LINKS.inquiryEndpoint) return;
    var box = document.createElement("div");
    box.className = "fc-pop"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-labelledby", "fc-t");
    box.innerHTML =
      '<div class="fc-box"><button type="button" class="fc-x" aria-label="닫기">×</button>' +
      '<form class="fc-form" novalidate>' +
      '<p class="fc-badge">매월 무료 · Zoom 실습</p>' +
      '<h3 id="fc-t">매월 열리는 <em>최신 AI 실습 무료특강</em>에 초대해 드립니다</h3>' +
      '<p class="fc-sub">이름과 연락처를 남겨 주시면 특강 일정이 정해질 때 문자·카톡, 이메일로 줌링크를 보내 드려요.</p>' +
      '<label class="fc-f"><span>이름 <i>*</i></span><input name="이름" autocomplete="name" required></label>' +
      '<label class="fc-f"><span>전화번호 <i>*</i></span><input name="전화번호" type="tel" inputmode="tel" autocomplete="tel" placeholder="010-0000-0000" required></label>' +
      '<label class="fc-f"><span>이메일 <i>*</i></span><input name="이메일" type="email" inputmode="email" autocomplete="email" placeholder="example@naver.com" required></label>' +
      '<div class="fc-agree">' +
      '<label><input type="checkbox" name="개인정보동의"> <b>[필수]</b> 개인정보 수집·이용에 동의합니다.</label>' +
      '<details><summary>내용 보기</summary><p>수집 항목: 이름, 전화번호, 이메일, 방문 경로 · 목적: 무료특강 안내와 초대장 발송 · 보관: 동의 철회 시 또는 수집일로부터 1년 후 파기 · 동의를 거부할 수 있으나 이 경우 특강 초대를 받을 수 없습니다.</p></details>' +
      '<label><input type="checkbox" name="안내수신동의"> <b>[필수]</b> 무료특강 일정 안내(문자·카톡·이메일) 수신에 동의합니다.</label>' +
      "</div>" +
      '<p class="fc-err" aria-live="polite"></p>' +
      '<button type="submit" class="btn btn-primary fc-go">무료특강 초대 신청하기</button>' +
      "</form>" +
      '<div class="fc-done" hidden><p class="fc-ic">🎉</p><h3>신청이 완료되었습니다!</h3><p>특강 일정이 정해지면 문자·카톡, 이메일로 줌링크를 보내 드릴게요.<br>오픈톡방에 들어오시면 소식을 가장 먼저 받을 수 있어요.</p>' +
      '<a class="btn btn-kakao" href="' + LINKS.openChat + '" target="_blank" rel="noopener">드림랩 오픈톡방 입장</a></div>' +
      "</div>";
    document.body.appendChild(box);
    var form = box.querySelector(".fc-form"), err = box.querySelector(".fc-err"), done = box.querySelector(".fc-done"), last = null, from = "";
    function open(a) { last = a; from = document.title.split(" · ")[0]; form.hidden = false; done.hidden = true; err.textContent = ""; box.classList.add("open"); document.body.style.overflow = "hidden"; setTimeout(function () { form.querySelector("input").focus(); }, 50); }
    function close() { box.classList.remove("open"); document.body.style.overflow = ""; if (last) last.focus(); }
    box.querySelector(".fc-x").addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && box.classList.contains("open")) close(); });
    /* 전화번호 입력하면 자동으로 010-0000-0000 모양으로 */
    var telIn = form.elements["전화번호"];
    telIn.addEventListener("input", function () { var d = telIn.value.replace(/[^0-9]/g, "").slice(0, 11); telIn.value = d.length < 4 ? d : d.length < 8 ? d.slice(0, 3) + "-" + d.slice(3) : d.slice(0, 3) + "-" + d.slice(3, d.length - 4) + "-" + d.slice(-4); });
    function bad(el, msg) { err.textContent = msg; el.classList.add("fc-bad"); el.focus(); }
    form.addEventListener("input", function (e) { e.target.classList && e.target.classList.remove("fc-bad"); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements, name = f["이름"].value.trim(), tel = f["전화번호"].value.replace(/[^0-9]/g, ""), mail = f["이메일"].value.trim();
      if (name.length < 2) return bad(f["이름"], "이름을 적어 주세요.");
      if (!/^01[016789][0-9]{7,8}$/.test(tel)) return bad(f["전화번호"], "휴대폰 번호를 010-0000-0000 형식으로 적어 주세요.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) return bad(f["이메일"], "이메일 주소를 정확히 적어 주세요. (예: example@naver.com)");
      if (!f["개인정보동의"].checked || !f["안내수신동의"].checked) { err.textContent = "필수 동의 2가지에 체크해 주세요."; return; }
      var src = getSrc();
      var data = { "구분": "무료특강", "접수시각": new Date().toLocaleString("ko-KR"), "이름": name, "전화번호": tel.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3"), "이메일": mail, "유입경로": src[0], "첫 방문일": src[1], "신청페이지": from, "개인정보동의": "동의", "안내수신동의": "동의" };
      var go = form.querySelector(".fc-go"); go.disabled = true; go.textContent = "보내는 중…"; err.textContent = "";
      fetch(LINKS.inquiryEndpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data) })
        .then(function () { form.reset(); form.hidden = true; done.hidden = false; })
        .catch(function () { err.innerHTML = '전송이 되지 않았어요. <a href="' + LINKS.freeClass + '" target="_blank" rel="noopener">신청서 페이지</a>로 신청해 주세요.'; })
        .then(function () { go.disabled = false; go.textContent = "무료특강 초대 신청하기"; });
    });
    /* 모든 '무료특강 신청' 버튼을 이 창으로 — 구글폼 주소를 버튼에서 아예 떼어 내서 폼이 같이 열리지 않게 */
    var FORM = LINKS.freeClass.split("?")[0];
    function isFree(a) { return !box.contains(a) && ((a.href || "").indexOf(FORM) === 0 || a.classList.contains("js-free") || a.id === "free-link"); }
    function tame() { document.querySelectorAll("a[href]").forEach(function (a) { if (isFree(a)) { a.setAttribute("href", "#free-apply"); a.removeAttribute("target"); a.classList.add("js-free"); } }); }
    tame(); document.addEventListener("DOMContentLoaded", tame); window.addEventListener("load", tame);
    window.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]"); if (!a || !isFree(a)) return;
      e.preventDefault(); e.stopImmediatePropagation(); tame(); open(a);
    }, true);
  })();

  /* 바깥 사이트로 가는 링크는 새 창으로 (홈페이지 안 이동은 그대로) — 나중에 생긴 링크까지 클릭 순간에 한 번 더 확인 */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]"); if (!a) return;
    if (/^https?:/.test(a.getAttribute("href") || a.href) && a.hostname && a.hostname !== location.hostname) { a.target = "_blank"; a.rel = "noopener"; }
  }, true);
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    if (a.hostname && a.hostname !== location.hostname) { a.target = "_blank"; a.rel = "noopener"; }
  });

  /* 스크롤 모션: .reveal(나타나기), [data-count](숫자 세기), .on-view(보이면 .in 추가) */
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function countUp(el) {
    var end = parseFloat(el.getAttribute("data-count")), suf = el.getAttribute("data-suffix") || "", t0 = null;
    if (reduce) { el.textContent = end + suf; return; }
    function step(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  var targets = document.querySelectorAll(".reveal, [data-count], .on-view");
  if ("IntersectionObserver" in window && !reduce) {
    document.documentElement.classList.add("motion");
    var vh = window.innerHeight;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.classList.remove("pre"); el.classList.add("in");
        if (el.hasAttribute("data-count") && !el.dataset.done) { el.dataset.done = "1"; countUp(el); }
        io.unobserve(el);
      });
    }, { threshold: 0.2 });
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top > vh * 0.9) { if (el.classList.contains("reveal")) el.classList.add("pre"); io.observe(el); }
      else { el.classList.add("in"); }
    });
    setTimeout(function () { document.querySelectorAll(".reveal.pre").forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.remove("pre"); }); }, 3000);
  } else {
    targets.forEach(function (el) { el.classList.add("in"); });
  }

  /* 모바일 메뉴 */
  var mb = document.getElementById("menu-btn"), mn = document.getElementById("main-nav");
  if (mb && mn) mb.addEventListener("click", function () {
    var open = mn.classList.toggle("open");
    mb.setAttribute("aria-expanded", open ? "true" : "false");
    mb.textContent = open ? "닫기" : "메뉴";
  });
})();
