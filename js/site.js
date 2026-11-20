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
  if (!document.querySelector('link[rel="icon"]')) {
    var ic = document.createElement("link"); ic.rel = "icon"; ic.type = "image/png"; ic.href = "img/favicon.png"; document.head.appendChild(ic);
  }
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
      '<li><a href="' + LINKS.youtube + '">유튜브 · 드림랩</a></li>' +
      '<li><a href="' + LINKS.blog + '">네이버 블로그</a></li>' +
      '<li><a href="' + LINKS.kakaoChannel + '">드림랩 카카오톡 채널</a></li>' +
      '<li><a href="' + LINKS.openChat + '">드림랩 오픈톡방</a></li>' +
      '<li><a href="' + LINKS.tiktok + '">틱톡</a></li>' +
      '<li><a href="' + LINKS.lectureSite + '">드림랩 강의실</a></li>' +
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
      ('<a class="btn btn-primary" href="' + LINKS.freeClass + '">무료특강 신청</a>' +
       '<a class="btn btn-kakao" href="' + LINKS.kakaoChannel + '"><span class="lbl-lg">채널 추가하고 소식받기</span><span class="lbl-sm">카톡 소식받기</span></a>')) + "</div>";
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
