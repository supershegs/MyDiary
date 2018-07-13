var modal = document.getElementById('add');
var modalView = document.getElementById('view');
var modalEdits = document.getElementById('edit');

var title = document.getElementById("see").innerText;
var dateTime = document.getElementById('time').value;
var story = document.getElementById("story").innerText;

var title2 = document.getElementById("see2").innerText;
var dateTime2 = document.getElementById('time2').value;
var story2 = document.getElementById("story2").innerText;

var title3 = document.getElementById("see3").innerText;
var dateTime3 = document.getElementById('time3').value;
var story3 = document.getElementById("story3").innerText;

var title4 = document.getElementById("see4").innerText;
var dateTime4 = document.getElementById('time4').value;
var story4 = document.getElementById("story4").innerText;


function modalAdd (){
    modal.style.display='block';
}

function cancel(){
    modal.style.display='none';
    modalView.style.display='none';
    modalEdits.style.display='none';
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
function modalEdit1(){
    modalEdits.style.display='block';
    document.getElementById("editTitle").innerHTML = title;
    document.getElementById("editStory").innerHTML = story;
    document.getElementById("editTime").innerHTML = dateTime;
}
function modalEdit2(){
    modalEdits.style.display='block';
    document.getElementById("editTitle").innerHTML = title2;
    document.getElementById("editStory").innerHTML = story2;
    document.getElementById("editTime").innerHTML = dateTime2;
    document.ge
}
function modalEdit3(){
    modalEdits.style.display='block';
    document.getElementById("editTitle").innerHTML = title3;
    document.getElementById("editStory").innerHTML = story3;
    document.getElementById("editTime").innerHTML = dateTime3;
    document.ge
}
function modalEdit4(){
    modalEdits.style.display='block';
    document.getElementById("editTitle").innerHTML = title4;
    document.getElementById("editStory").innerHTML = story4;
    document.getElementById("editTime").innerHTML = dateTime4;
    document.ge
}
