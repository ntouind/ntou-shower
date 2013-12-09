var deg_toggle = false; //true = of false = oc
var now_deg = -100;
var retriedTimes = 3;
$(function(){

  setInterval( function(){ main() }, 3000);
  main();

});
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}
function main(){
  $.get( "http://android.furry.pw/data.php?token=52cc0db56076cc01229a2f34ff9b9bdb&target=m2_deg", function( data ){
    now_deg = parseFloat(data);
    update_deg();
    update_time();
  }).success ( function(){
    retriedTimes = 0;
  }).error ( function(){

    retriedTimes++ ;

    if( retriedTimes > 4 ){

      now_deg=-100;
      update_deg();
      $("#now_deg time").html('no network connection')
    }
  });

}

function toggle_type(){

  deg_toggle = !deg_toggle;
  update_deg();

}

function update_deg(){

  if(now_deg == -100){

    $("#now_deg typ").html("");
    $("#now_deg deg").html("No Data");
    $("#now_deg deg").addClass("gray").removeClass("green");

  }else{

    $("#now_deg deg").removeClass("gray").addClass("green");

    if( deg_toggle ){

      $("#now_deg typ").html("℉");
      $("#now_deg deg").html((now_deg*(9/5)+32).toFixed(1));

    }else{

      $("#now_deg typ").html("℃");
      $("#now_deg deg").html(now_deg.toFixed(1));

    }
  }

}

function update_time(){

    var d = new Date();
    var curr_hour = d.getHours();
    var a_p = "AM ";
    var s = d.getMonth() + "/" + d.getDate();
    if( curr_hour < 12 ){ a_p = " AM "; }else{ a_p = " PM "; }
    if( curr_hour == 0 ){ curr_hour = 12; }
    if( curr_hour > 12 ){ curr_hour = curr_hour - 12; }
    s = s + a_p + curr_hour + ":" + d.getMinutes() + ":" + d.getSeconds();

    $("#now_deg time").html(s)

}
