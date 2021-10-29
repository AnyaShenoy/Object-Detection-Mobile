img= ""
status=""
objects=[]
function preload(){
    img= loadImage("dog_cat.jpg")
}

function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    object_detector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML= "Status:Detecting objects"
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function modelLoaded(){
    console.log("Model loaded")
    status= true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects= results;
    }
}

function draw(){
    image(video,0,0,380,380)
    /*
    fill('#e6000f');
    text("Dog",100,70);
    noFill();
    stroke('#e6000f');
    rect(30,55,560,355);

    fill('#e6000f');
    text("Cat", 340,100);
    noFill();
    stroke('#e6000f');
    rect(290,70,280,325);
    */
   if (status!=""){
       red= random(255);
       blue= random(255);
       green= random(255);
    object_detector.detect(video,gotResult);
    document.getElementById("number_of_objects").innerHTML= "Number of Objects= "+objects.length;
       for (i=0;i<objects.length;i++){
           document.getElementById("status").innerHTML= "Status: Objects Detected";
           fill(red,green,blue);
           percent= floor(objects[i].confidence*100)
           text(objects[i].label+" "+percent+"%", objects[i].x+10, objects[i].y+20);
           noFill()
           stroke(red,green,blue);
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
           
   }
}