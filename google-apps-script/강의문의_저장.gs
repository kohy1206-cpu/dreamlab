/**
 * 한국AI활용지도사교육연구협회 · 홈페이지 신청서 → 구글시트 저장
 *   - '강의 문의' 양식      → '강의문의' 탭
 *   - '무료특강 신청' 창    → '무료특강신청' 탭 + 신청자에게 안내 메일(줌 링크) 자동 발송
 *
 * 코드를 바꾼 뒤에는 꼭: [배포] → [배포 관리] → 연필(수정) → 버전: '새 버전' → [배포]
 * (이렇게 하면 웹 앱 주소가 그대로라 홈페이지는 고칠 필요가 없습니다)
 */

var NOTIFY_EMAIL = 'dreamlab8833@gmail.com';   // 새 신청 알림 받을 메일 (원치 않으면 '' 로)

/* ───── 무료특강 안내 메일 ─────
   신청자에게 안내 메일(줌 링크)을 보내고, 내 메일(NOTIFY_EMAIL)에는
   '신청자 정보 + 신청자에게 보낸 안내 메일 내용'을 한 통으로 합쳐서 보냅니다. */
var FREE_CLASS = {
  senderName: '드림랩 · 한국AI활용지도사교육연구협회',
  topic:    '최신 AI실습',
  zoomUrl:  'https://us06web.zoom.us/j/85426167730?pwd=Yhg2zwbnQqKhTdBEyDevvUkneLVUL0.1',
  zoomId:   '854 2616 7730',
  zoomPw:   '253007',
  openChat: 'https://open.kakao.com/o/g3pg6Yqg'
};

/* 다음 특강 날짜: 매월 첫째 주 일요일 저녁 8시 30분(한국 시간). 이번 달 특강이 이미 지났으면 다음 달 */
function nextFreeClass(now) {
  now = now || new Date();
  var y = Number(Utilities.formatDate(now, 'Asia/Seoul', 'yyyy'));
  var m = Number(Utilities.formatDate(now, 'Asia/Seoul', 'M'));
  for (var i = 0; i < 3; i++) {
    var wd = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();      // 1일의 요일 (0=일)
    var d = 1 + (7 - wd) % 7;                                   // 첫째 주 일요일
    var start = new Date(Date.UTC(y, m - 1, d, 11, 30));        // 한국 20:30 = 세계표준 11:30
    if (start.getTime() > now.getTime()) {
      return String(y).slice(2) + '년 ' + ('0' + m).slice(-2) + '월 ' + ('0' + d).slice(-2) + '일(일요일) 저녁 8시 30분';
    }
    m++; if (m > 12) { m = 1; y++; }
  }
}

function sendFreeClassMail(d) {
  var to = String(d['이메일'] || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return;
  var when = nextFreeClass();
  var name = d['이름'] ? d['이름'] + '님, ' : '';
  var text =
    name + '특강 신청을 감사드립니다.\n\n' +
    '1. 일시 : ' + when + '\n' +
    '(이메일로 줌링크가 전송되었습니다. 강의 당일 문자로 줌링크가 전송됩니다.)\n\n' +
    '2. 주제 : ' + FREE_CLASS.topic + '\n\n' +
    '3. Zoom 회의 참가\n' + FREE_CLASS.zoomUrl + '\n' +
    '회의 ID: ' + FREE_CLASS.zoomId + '\n' +
    '암호: ' + FREE_CLASS.zoomPw + '\n\n' +
    '4. 오픈 톡방에 오시면 다양한 정보가 있습니다.\n' + FREE_CLASS.openChat + '\n';
  var html =
    '<div style="font-family:Apple SD Gothic Neo,Malgun Gothic,sans-serif;font-size:16px;line-height:1.8;color:#1b2440;max-width:560px">' +
    '<p style="font-size:18px;font-weight:bold">' + name + '특강 신청을 감사드립니다.</p>' +
    '<p><b>1. 일시 :</b> ' + when + '<br><span style="color:#5a6380;font-size:14px">(이메일로 줌링크가 전송되었습니다. 강의 당일 문자로 줌링크가 전송됩니다.)</span></p>' +
    '<p><b>2. 주제 :</b> ' + FREE_CLASS.topic + '</p>' +
    '<p><b>3. Zoom 회의 참가</b><br><a href="' + FREE_CLASS.zoomUrl + '" style="display:inline-block;margin:6px 0;padding:10px 18px;background:#2350b0;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold">Zoom 입장하기</a><br>' +
    '<span style="font-size:14px;color:#5a6380">' + FREE_CLASS.zoomUrl + '</span><br>회의 ID: ' + FREE_CLASS.zoomId + '<br>암호: ' + FREE_CLASS.zoomPw + '</p>' +
    '<p><b>4. 오픈 톡방에 오시면 다양한 정보가 있습니다.</b><br><a href="' + FREE_CLASS.openChat + '" style="display:inline-block;margin:6px 0;padding:10px 18px;background:#fee500;color:#191919;border-radius:8px;text-decoration:none;font-weight:bold">오픈톡방 입장하기</a><br>' +
    '<span style="font-size:14px;color:#5a6380">' + FREE_CLASS.openChat + '</span></p>' +
    '<p style="font-size:13px;color:#8a90a6;margin-top:24px">한국AI활용지도사교육연구협회 · 드림랩 | dreamlabai.org</p></div>';
  MailApp.sendEmail(to, '[드림랩] 무료특강 신청 완료 · ' + when, text, { name: FREE_CLASS.senderName, htmlBody: html });
  d['안내메일'] = '발송 (' + when + ')';
  return { text: text, html: html };
}

var FORMS = {
  '강의문의': {
    sheet: '강의문의',
    columns: ['접수시각', '단체명', '담당자명', '연락처', '이메일', '희망일정', '진행시간',
              '장소', '예상인원', '대상연령', '진행방식', '관심주제', '문의사항', '보낸곳', '처리상태', '처음 유입경로', '최근 유입경로', '첫 방문일'],
    subject: function (d) { return '[강의 문의] ' + (d['단체명'] || '') + ' · ' + (d['담당자명'] || '') + ' · ' + (d['최근 유입경로'] || ''); }
  },
  '무료특강': {
    sheet: '무료특강신청',
    columns: ['접수시각', '이름', '전화번호', '이메일', '처음 유입경로', '최근 유입경로', '첫 방문일',
              '신청페이지', '개인정보동의', '안내수신동의', '처리상태', '안내메일'],
    subject: function (d) { return '[무료특강 신청] ' + (d['이름'] || '') + ' · ' + (d['최근 유입경로'] || ''); }
  }
};

function doPost(e) {
  var data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) { data = e.parameter || {}; }

  var form = FORMS[data['구분']] || FORMS['강의문의'];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(form.sheet) || ss.insertSheet(form.sheet);
  if (sh.getLastRow() === 0) {
    sh.appendRow(form.columns);
    sh.getRange(1, 1, 1, form.columns.length).setFontWeight('bold').setBackground('#0f2350').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  data['처리상태'] = data['처리상태'] || '신규';
  var guide = null;
  if (data['구분'] === '무료특강') {
    try { guide = sendFreeClassMail(data); } catch (err) { data['안내메일'] = '실패: ' + err; }
    if (!guide && !data['안내메일']) data['안내메일'] = '미발송 (이메일 주소 확인 필요)';
  }
  sh.appendRow(form.columns.map(function (c) { return data[c] || ''; }));

  if (NOTIFY_EMAIL) {
    var info = form.columns.map(function (c) { return c + ': ' + (data[c] || ''); }).join('\n');
    if (data['구분'] === '무료특강') {
      /* 신청 정보 + 신청자에게 보낸 안내 메일을 한 통으로 */
      var rows = form.columns.map(function (c) { return '<tr><td style="padding:4px 12px 4px 0;color:#5a6380;white-space:nowrap">' + c + '</td><td style="padding:4px 0">' + (data[c] || '') + '</td></tr>'; }).join('');
      var line = '\n\n──────── 신청자에게 보낸 안내 메일 ────────\n\n';
      MailApp.sendEmail(NOTIFY_EMAIL, form.subject(data),
        info + (guide ? line + guide.text : '\n\n※ 신청자에게 안내 메일을 보내지 못했습니다: ' + data['안내메일']),
        { htmlBody: '<div style="font-family:Apple SD Gothic Neo,Malgun Gothic,sans-serif;font-size:15px;color:#1b2440"><p style="font-size:17px;font-weight:bold">새 무료특강 신청</p><table style="border-collapse:collapse">' + rows + '</table>' +
          (guide ? '<hr style="margin:24px 0;border:0;border-top:2px dashed #c9d1e6"><p style="color:#5a6380;font-size:14px">아래는 신청자에게 보낸 안내 메일입니다.</p>' + guide.html : '<p style="color:#c0392b;margin-top:20px">※ 신청자에게 안내 메일을 보내지 못했습니다: ' + data['안내메일'] + '</p>') + '</div>' });
    } else {
      MailApp.sendEmail(NOTIFY_EMAIL, form.subject(data), info);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
