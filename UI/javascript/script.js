var modal = document.getElementById('add');
var modalView = document.getElementById('view');

var title = document.getElementById("see").textContent;
var dateTime = document.getElementById('time').value;
var story = document.getElementById("story").textContent;

var title2 = document.getElementById("see2").textContent;
var dateTime2 = document.getElementById('time2').value;
var story2 = document.getElementById("story2").textContent;

var title3 = document.getElementById("see3").textContent;
var dateTime3 = document.getElementById('time3').value;
var story3 = document.getElementById("story3").textContent;

var title4 = document.getElementById("see4").textContent;
var dateTime4 = document.getElementById('time4').value;
var story4 = document.getElementById("story4").textContent;


function modalAdd (){
    modal.style.display='block'
}
function cancel(){
    modal.style.display='none'
    modalView.style.display='none'
}
function modalDisplay(){
    modalView.style.display='block'
    
    document.getElementById("displayTime").innerHTML = dateTime;
    document.getElementById("displayStory").innerHTML = story;
    document.getElementById("displayTitle").innerHTML = title;
}
function modalDisplay2(){
    modalView.style.display='block'
    
    document.getElementById("displayTime").innerHTML = dateTime2;
    document.getElementById("displayStory").innerHTML = story2;
    document.getElementById("displayTitle").innerHTML = title2;
} 
function modalDisplay3(){
    modalView.style.display='block'
    
    document.getElementById("displayTime").innerHTML = dateTime3;
    document.getElementById("displayStory").innerHTML = story3;
    document.getElementById("displayTitle").innerHTML = title3;
} 
function modalDisplay4(){
    modalView.style.display='block'
    
    document.getElementById("displayTime").innerHTML = dateTime4;
    document.getElementById("displayStory").innerHTML = story4;
    document.getElementById("displayTitle").innerHTML = title4;
}