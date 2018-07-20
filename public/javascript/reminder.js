
var checkBox = document.getElementById("myCheck");
var d = new Date();
var hr = d.getHours();
var mt = d.getMinutes();
var set = hr + ":" + mt
document.getElementById("dems").innerHTML = set;
function remindr(){
    if (checkBox.checked == true){
        alert("To set the diary reminder to  7:30pm every day");
        var time = 19 + ":" + 30
        if (set === time){
            alert("it is 7:30pm, You need to add an entry into the diary.");
        }
    }else{
        alert("You have canceled the reminder settings")
    } 
}    
