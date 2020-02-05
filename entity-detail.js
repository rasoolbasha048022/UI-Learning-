var rowData;
var table;
var akasTable;
$('document').ready(function(){
  var dataResultLength=data.result.length;
  if((dataResultLength == 1) && !(data.result[0].meta)){
    $('#mainTable').DataTable( {
      
    });
  }else{
  table=$('#mainTable').DataTable({
    'data':data.result,
     columns:[
       {"data":"meta._id"},
       {"data":"phrase"},
       {"data":"meta.name"},
       {"data":"meta.all_types"},
       {"data":AKasStyle}
    ]
  });
  }
});

                    
function AKasStyle(data,type,dataToSet){
  var akas=data.meta.akas;
  var akasLength;
  akasLength=akas.length;
  if(akas.length>5){
    akasLength=5;
  }
  var res="<ol>";
  for(var i=0;i<akasLength;i++){
    res+='<li>'+akas[i]+'</li>';
  }
  res+="</ol>";
  res+='<a href="" class="aka-info" data-toggle="modal" data-target="#akas-info">See More</a>';
  return res;
}

$(document).on("click",".aka-info",function(){
  rowData = table.row( $(this).parents('tr') ).data();
  $("#akas-info-modal").modal("show");
});

$("#akas-info-modal").on('show.bs.modal', function(){
   akasTable=$("#akas-table").DataTable( {
     data:rowData.meta.akas_info,
     "columns": [
       { "data" : shortenName },
       { "data" : minimalizeDecimal},
       { "data" : minimalizeDecimal1},
       { "data" : getSourceNames}
        ]
    } );
});


$("#akas-info-modal").on('hide.bs.modal', function() { 
   akasTable.destroy();
}); 

function shortenName(data, type, dataToSet){
  var name = data.name;
  
  var res = "";
  
  if (name.length > 15 ){
    res += "<p class='pointer' data-toggle='tooltip' title='" + name + "'><b>" + name.slice(0, 15) + "...</b></p>";
    
    return res;
  }
  else{
    return name;
  }
}

function getSourceNames(data, type, dataToSet){
 //console.log("Row data for source names is", data); 
  var sources = data.sources;
  
  var res = "<ol>";
  
  for(var i=0;i<sources.length;i++){
    res += "<li>" + sources[i].name + "</li>";
  }  
  
  res += "</ol>";
  
  return res;
}

function minimalizeDecimal(data, type, dataToSet){
  pteCtrials = data["p(t|e)_ctrials"];
  return pteCtrials.toFixed(5);
}

function minimalizeDecimal1(data, type, dataToSet){
  pteCtrials = data["p(t|e)_pubmed"];
  return pteCtrials.toFixed(5);
}
