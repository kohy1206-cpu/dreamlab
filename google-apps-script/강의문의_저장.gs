/**
 * 한국AI활용지도사교육연구협회 · 홈페이지 '강의 문의' → 구글시트 저장
 *
 * 설치 방법
 * 1) 문의를 모을 구글시트를 열고  [확장 프로그램] → [Apps Script]
 * 2) 이 코드를 통째로 붙여넣고 저장
 * 3) [배포] → [새 배포] → 유형: 웹 앱
 *      - 실행 사용자: 나
 *      - 액세스 권한: 모든 사용자
 * 4) 나온 '웹 앱 URL'(https://script.google.com/macros/s/…/exec)을
 *    홈페이지 js/site.js 의 inquiryEndpoint 에 넣으면 끝
 */

var SHEET_NAME = '강의문의';
var NOTIFY_EMAIL = 'dreamlab8833@gmail.com';   // 새 문의 알림 받을 메일 (원치 않으면 '' 로)
var COLUMNS = ['접수시각', '단체명', '담당자명', '연락처', '이메일', '희망일정', '진행시간',
               '장소', '예상인원', '대상연령', '진행방식', '관심주제', '문의사항', '보낸곳', '처리상태'];

function doPost(e) {
  var data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) { data = e.parameter || {}; }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(COLUMNS);
    sh.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold').setBackground('#0f2350').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  data['처리상태'] = data['처리상태'] || '신규';
  sh.appendRow(COLUMNS.map(function (c) { return data[c] || ''; }));

  if (NOTIFY_EMAIL) {
    MailApp.sendEmail(NOTIFY_EMAIL, '[강의 문의] ' + (data['단체명'] || '') + ' · ' + (data['담당자명'] || ''),
      COLUMNS.map(function (c) { return c + ': ' + (data[c] || ''); }).join('\n'));
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
