status = "";
img= "";
objects = [];
function preload() {
    img=loadImage("bedroom.jpg");
}
function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Object";
}
function modelLoaded() {
    console.log("Model is loaded");
    status = true;
    objectDetector.detect(img,gotResults);
}
function gotResults(error,results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(img,0,0,600,500);
    if (status != "") {
        for (i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Objects Detected";
            fill("#0000FF");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent +"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#0000FF");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
}