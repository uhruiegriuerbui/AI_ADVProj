objects = [];
Status = "";


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
  Status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name = document.getElementById("object_name").value;
}

function draw(){
image(video , 0 , 0 , 380 , 380)
if(Status!=""){
objectDetector.detect(video , gotResults);
for(i=0; i<objects.length; i++){
document.getElementById("status").innerHTML="Status ; Objects Detecting";
fill("#FF0000");
percent=floor(objects[i].confidence*100);
text(objects[i].label+""+percent+"%" , objects[i].x+15 , objects[i].y+15);
noFill();
stroke("#FF0000");
rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

if(objects[i].length=object_name){
video.stop();
objectDetector.detect(gotResults);
document.getElementById("in-put").innerHTML=object_name+"Found";
synth=window.speechSynthesis;
utterThis= new SpeechSynthesisUtterance(object_name+"Found");
synth.speak(utterThis);
}
else{
document.getElementById("in-put").innerHTML=object_name+"Not Found";
}
}
}
}

function gotResults(error , results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}