// Google Apps Script — الصقه في Extensions > Apps Script جوه الشيت
const SECRET = 'غيّر-الكلمة-دي-لسر-خاص-بيك';
const SHEET = 'Messages';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.appendRow(['التاريخ', 'الاسم', 'الرسالة']);
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm');
    sh.setColumnWidths(1, 1, 150); sh.setColumnWidths(2, 1, 160); sh.setColumnWidths(3, 1, 500);
  }
  return sh;
}
const clean_ = (v, n) => String(v || '').trim().slice(0, n).replace(/^[=+\-@]/, "'$&");
const out_ = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return out_({ ok: false });
    const name = clean_(d.name, 60), msg = clean_(d.message, 1000);
    if (!name || !msg) return out_({ ok: false });
    sheet_().appendRow([new Date(), name, msg]);
    return out_({ ok: true });
  } catch (err) { return out_({ ok: false }); }
}

function doGet(e) {
  if (e.parameter.secret !== SECRET) return out_({ ok: false });
  const rows = sheet_().getDataRange().getValues().slice(1)
    .map(r => ({ date: r[0], name: r[1], message: r[2] })).reverse();
  return out_({ ok: true, rows });
}
