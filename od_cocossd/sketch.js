let video;
let detector;
let detections = [];
let osc;

function preload(){
    detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    detections = results;
    detector.detect(video, gotDetections);
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    detector.detect(video, gotDetections);
    osc  = new OSC();
    osc.open({ port: 8081 });
}
function draw(){
     image(video, 0, 0);

     for(let i = 0; i < detections.length; i++){
        let object = detections[i];
        const message = new OSC.Message("/test", object.label);
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(object.x, object.y, object.width, object.height);
        noStroke();
        fill(255);
        textSize(24);
        text(object.label, object.x, object.y);
        osc.send(message);
    }
    
 }