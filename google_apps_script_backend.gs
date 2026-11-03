/**
 * =========================================================================
 * Puti-AI 學生作業收發通 - Google Apps Script (GAS) 雲端永久儲存後端
 * 屏東縣後庄國小黃朝榮老師作品，免費分享，歡迎擴散推廣
 * =========================================================================
 * 
 * 功能特點：
 * 1. 學生在平板拍的照片，自動依「日期/班級/科目」在老師 Google Drive 建立資料夾
 * 2. 檔名自動命名為「03號_王小明.jpg」，字跡無損永久保存於雲端硬碟
 * 3. 繳交紀錄自動寫入指定的 Google 試算表（或自動建立新試算表）
 * 4. 完全免費、零伺服器維護費、終身運作
 * 
 * 部署指引：
 * 1. 前往 https://script.google.com/ 建立新專案
 * 2. 清空原本的代碼，將此檔案內容全部複製貼上
 * 3. 點擊右上角【部署】➔【新增部署作業】
 * 4. 種類選擇【網頁應用程式 (Web App)】
 * 5. 存取權限務必選擇【任何人 (Anyone)】
 * 6. 點擊【部署】，複製產生的 Web App 網址
 * 7. 將網址貼入【作業收發通】➔【⚙️ AI/雲端】設定中的 GAS 網址欄位即可！
 */

function doPost(e) {
  try {
    var raw = e.postData.contents;
    var data = JSON.parse(raw);

    var classId = data.classId || 'default';
    var className = data.className || '本班';
    var date = data.date || Utilities.formatDate(new Date(), 'GMT+8', 'yyyy-MM-dd');
    var subject = data.subject || '作業1';
    var studentName = data.studentName || '未命名同學';
    var type = data.type || 'photo'; // 'photo' | 'text'
    var content = data.content || '';
    var time = data.time || Utilities.formatDate(new Date(), 'GMT+8', 'HH:mm');

    // 1. 取得或建立根目錄資料夾 【Puti-AI作業收發】
    var rootFolders = DriveApp.getFoldersByName("Puti-AI作業收發");
    var rootFolder = rootFolders.hasNext() ? rootFolders.next() : DriveApp.createFolder("Puti-AI作業收發");

    // 2. 建立日期資料夾 【YYYY-MM-DD】
    var dateFolders = rootFolder.getFoldersByName(date);
    var dateFolder = dateFolders.hasNext() ? dateFolders.next() : rootFolder.createFolder(date);

    // 3. 建立班級與科目資料夾 【501班_數學習作】
    var subFolderName = className + "_" + subject;
    var subFolders = dateFolder.getFoldersByName(subFolderName);
    var subFolder = subFolders.hasNext() ? subFolders.next() : dateFolder.createFolder(subFolderName);

    var fileUrl = "";

    // 4. 若為照片上傳，將 base64 解碼儲存為 JPG 檔案
    if (type === 'photo' && content) {
      var base64Data = content.replace(/^data:image\/\w+;base64,/, '');
      var decoded = Utilities.base64Decode(base64Data);
      var blob = Utilities.newBlob(decoded, 'image/jpeg', studentName + ".jpg");
      
      // 若已有舊檔則覆蓋或更新
      var existingFiles = subFolder.getFilesByName(studentName + ".jpg");
      while (existingFiles.hasNext()) {
        existingFiles.next().setTrashed(true);
      }
      var newFile = subFolder.createFile(blob);
      newFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = newFile.getUrl();
    }

    // 5. 將紀錄寫入試算表
    var sheetFiles = subFolder.getFilesByName("繳交紀錄總表");
    var ss;
    if (sheetFiles.hasNext()) {
      ss = SpreadsheetApp.open(sheetFiles.next());
    } else {
      ss = SpreadsheetApp.create("繳交紀錄總表");
      var file = DriveApp.getFileById(ss.getId());
      file.moveTo(subFolder);
      var initSheet = ss.getActiveSheet();
      initSheet.setName("繳交紀錄");
      initSheet.appendRow(["繳交時間", "座號/姓名", "作業項目", "繳交形式", "檔案/內容連結", "純文字內容"]);
      initSheet.getRange(1, 1, 1, 6).setBackground("#EFF6FF").setFontWeight("bold");
    }

    var sheet = ss.getActiveSheet();
    sheet.appendRow([
      date + " " + time,
      studentName,
      subject,
      type === 'photo' ? '照片圖檔' : '純文字',
      fileUrl,
      type === 'text' ? content : '請見圖檔'
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "作業已成功歸檔至 Google Drive！",
      fileUrl: fileUrl
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
