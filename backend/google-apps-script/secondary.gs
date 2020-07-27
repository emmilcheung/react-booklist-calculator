function doGet(e){
  var params = {}
  if (e != null && Object.keys(e).length > 0){
    var params = e.parameter;
    }
  Logger.log(Object.keys(params))
  return getBookList(params);

//  return respond(JSON.stringify({"result": 
//    {
//      "param": Object.keys(params)
//    }
//  }));
}

function respond(response) {  
  return ContentService
  .createTextOutput(response)
  .setMimeType(ContentService.MimeType.JSON)
}


function getBookList(params){
  // spreadsheet object
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/13CBcEEq47CLStXcgDJj6ctCpUIt6-0kXPVtU-IY6VRM/edit#gid=0");
  //get school id list
  var activeSheet = ss.getSheetByName("Secondary")
  var rows = activeSheet.getRange(2,1, activeSheet.getLastRow()-1, activeSheet.getLastColumn()).getValues();
  var schoolIds = getSchoolList(rows, params);
//  rows.forEach(school => {
//    schoolIds.push(school[0])
//  })
  Logger.log(schoolIds);
  //append
  var jo = {};
  jo.bookList = {};
  schoolIds.forEach(schoolId => {
    Logger.log(schoolId)
    var sheet = ss.getSheetByName(schoolId);
    var schoolName = "";
    var schoolDiscount = 0;
    var schoolObjs = {};
    var bookBase = 4;
    rows = sheet.getRange(1,1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
//    for (var i=0, l = rows.length; i<l; i++){
//    }
    //first row
    schoolName = rows[0][1];
    //second row form name
    var formNames = rows[1][1].split(" ");
    //discount
    schoolDiscount = parseFloat(rows[2][1]);
    formNames.forEach(function(formId){
      var id = 1;
      var dataArray = [];
      while(bookBase + id < rows.length && rows[bookBase + id][0] !== ""){
        var dataRow = rows[bookBase + id]
        var record = {};
        record['id'] = id;
        record['text'] = dataRow[2];
        record['amount'] = dataRow[4];
        record['special_price'] = dataRow[5] ? true : false;
        record['isChosen'] = true;
        dataArray.push(record);
        id += 1;
      }
      schoolObjs[formId] = dataArray;
      bookBase += id + 1;
    });
    schoolObjs.discount = schoolDiscount;
    schoolObjs.schoolName = schoolName;
    jo.bookList[schoolId] = schoolObjs;
  });
  var result = JSON.stringify(jo);
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
                        
}

function getSchoolList(rows, params){
  console.log(params);
  if(Object.keys(params).length){
    return (
      [rows.find(row => row[2] == params.schoolId)[0]]
    )
  }
  else{
    return rows.map(school => school[0]);
  }
}