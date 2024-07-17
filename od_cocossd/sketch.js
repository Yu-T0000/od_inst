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
    for(let i = 0; i < detections.length; i++){
        let object = detections[i];
        let posx = Math.round((object.width/2 + object.x));
        let posx_map = Math.round(map(posx, 70, 550, -1, 1)*10)/10.0;
        if(posx_map > 1.0){
            posx_map = 1;
        }
        else if(posx_map < -1.0){
            posx_map = -1;
        };
        let address = "/object/" + object.label;
        const message = new OSC.Message(address,posx_map);
        osc.send(message);
    }
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    osc  = new OSC();
    osc.open({ port: 8081 });
    setInterval(() => {
        detector.detect(video, gotDetections);
      }, 500);
}
function draw(){
     image(video, 0, 0);

     for(let i = 0; i < detections.length; i++){
        let object = detections[i];
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(object.x, object.y, object.width, object.height);
        noStroke();
        fill(255);
        textSize(24);
        text(object.label, object.x, object.y);
    }
    
 }