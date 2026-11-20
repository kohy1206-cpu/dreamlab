/**
 * 한국AI활용지도사교육연구협회 · 홈페이지 신청서 → 구글시트 저장
 *   - '강의 문의' 양식      → '강의문의' 탭
 *   - '무료특강 신청' 창    → '무료특강신청' 탭
 *
 * 코드를 바꾼 뒤에는 꼭: [배포] → [배포 관리] → 연필(수정) → 버전: '새 버전' → [배포]
 * (이렇게 하면 웹 앱 주소가 그대로라 홈페이지는 고칠 필요가 없습니다)
 */

var NOTIFY_EMAIL = 'dreamlab8833@gmail.com';   // 새 신청 알림 받을 메일 (원치 않으면 '' 로)

var FORMS = {
  '강의문의': {
    sheet: '강의문의',
    columns: ['접수시각', '단체명', '담당자명', '연락처', '이메일', '희망일정', '진행시간',
              '장소', '예상인원', '대상연령', '진행방식', '관심주제', '문의사항', '보낸곳', '처리상태', '유입경로'],
    subject: function (d) { return '[강의 문의] ' + (d['단체명'] || '') + ' · ' + (d['담당자명'] || ''); }
  },
  '무료특강': {
    sheet: '무료특강신청',
    columns: ['접수시각', '이름', '전화번호', '이메일', '유입경로', '첫 방문일',
              '신청페이지', '개인정보동의', '안내수신동의', '처리상태'],
    subject: function (d) { return '[무료특강 신청] ' + (d['이름'] || '') + ' · ' + (d['유입경로'] || ''); }
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
  sh.appendRow(form.columns.map(function (c) { return data[c] || ''; }));

  if (NOTIFY_EMAIL) {
    MailApp.sendEmail(NOTIFY_EMAIL, form.subject(data),
      form.columns.map(function (c) { return c + ': ' + (data[c] || ''); }).join('\n'));
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
