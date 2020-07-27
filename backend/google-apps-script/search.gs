function doPost(e) {
  var params = {};
  if(e != null && e.postData.contents != null) {
    params = JSON.parse(e.postData.contents);
  }
  return postTextbooks(params); 
  
//  return respond(JSON.stringify({"result": 
//    {
//      "type": e.postData.type,
//      "param": params
//    }
//  }));
}

function respond(response) {  
  return ContentService
  .createTextOutput(response)
  .setMimeType(ContentService.MimeType.JSON)
}

function doGet(e) {
  var params = {};
  if (e != null && Object.keys(e.parameter).length){
    params = JSON.stringify(e.parameter);
  }
  return getTextbooks(params); 
}

//for testing without deploy gs 
function getTextbooks(param){
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/13CBcEEq47CLStXcgDJj6ctCpUIt6-0kXPVtU-IY6VRM/edit#gid=0");
  var sheet = ss.getSheetByName("シート1");
  var jo = {};
  var dataArray = [];
  var rows = sheet.getRange(1,1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  var header = rows.shift()
  var res;
  if (!Object.keys(param).length){
  
    dataArray = rows.map(row => {
      var obj = {};
      //skip empty row
      if(row[0] != ""){
        row.forEach((cell,i) => {
          obj[header[i]] = cell.toString();
        });
      }
      return obj;
    });
    var testParma = {
      "ISBN" : "",
      "Title" : "*math*",
      "Publisher" : "*教育圖書*"      
    }
    if ("Publisher" in testParma && testParma["Publisher"].length){
      testParma["Publisher"] = getPublisher(ss, testParma["Publisher"])
      console.log(testParma["Publisher"])
    }
    var conditions = Object.keys(testParma).map(attr => {
      if (testParma[attr].length){
        if (attr === "ISBN"){
          return `${attr} in ('${testParma[attr]}')`.replace(/[,]/g,"','")
        }
        if ( attr === "Publisher"){
          var choice = testParma["Publisher"].join("','")
          return `${attr} in ('${choice}')`
        }
        return `${attr} like '${testParma[attr]}'`.replace(/[*]/g,'%')
      }
    }).filter(content => content != null);
    console.log(conditions.join(" and "));
    
    res = alasql('select * from ? where ' + conditions.join(" and ") + ";",[dataArray]);
    console.log(res);
    
  }
  jo.bookList = res ;
  var result = JSON.stringify(jo);
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  
}

function postTextbooks(param){
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/13CBcEEq47CLStXcgDJj6ctCpUIt6-0kXPVtU-IY6VRM/edit#gid=0");
  var sheet = ss.getSheetByName("シート1");
  var jo = {};
  var dataArray = [];
  var rows = sheet.getRange(1,1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  var header = rows.shift()
  var res = [];
  if (Object.keys(param).length){
  
    dataArray = rows.map(row => {
      var obj = {};
      //skip empty row
      if(row[0] != ""){
        row.forEach((cell,i) => {
          obj[header[i]] = cell.toString();
        });
      }
      return obj;
    });
    if ("Publisher" in param && param["Publisher"].length){
      param["Publisher"] = getPublisher(ss, param["Publisher"])
    }
    var condition = Object.keys(param).map(attr => {
      if (param[attr].length){
        if (attr === "ISBN"){
          return `${attr} in ('${param[attr]}')`.replace(/[,]/g,"','")
        }
        if ( attr === "Publisher"){
          var choice = param["Publisher"].join("','")
          return `${attr} in ('${choice}')`
        }
        return `${attr} like '${param[attr]}'`.replace(/[*]/g,'%')
      }
    }).filter(content => content != null);
//    console.log(condition.join(" and "));
    
    res = alasql('select * from ? where ' + condition.join(" and ") + ";",[dataArray]);
  }
  console.log(res);
  jo.bookList = res ;
  var result = JSON.stringify(jo);
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  
}

function getPublisher(spreadSheet, queryString){
  var sheet = spreadSheet.getSheetByName("Publisher");
  var rows = sheet.getRange(1,1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  var header = rows.shift();
  var publisherData = rows.map(row => {
    var obj = {};
    row.forEach((cell,i) => {
      obj[header[i]] = cell.toString();
    });
    return obj
  })
  var res = alasql('select [Publisher ID] from ? where Publisher like "'+ queryString.replace(/[*]/g, '%') +'";', [publisherData]);
  console.log(
      res.map(publisher => {
        return publisher['Publisher ID']
      }));
  try{
    if (res.length){
      return(
        res.map(publisher => {
          return publisher['Publisher ID']
        })
      )
    }
    else{
      return ["NULL"]
    }
  }
  catch(err){
    return ["NULL"]
  }
}