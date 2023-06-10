function preload(){}
status_ = false
function setup(){
    canvas = createCanvas(600, 600);
    canvas.position(380, 230);
    video = createCapture(VIDEO);
    video.hide()
    cocossd = ml5.objectDetector("cocossd", modelLoaded)
}

function modelLoaded(){
    console.log("modelLoaded")
}

function draw(){
    image(video, 0, 0, 600, 600);
    if(status_ == true){
        cocossd.detect(video, detected)
    }
}

function start(){
    status_ = true
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function detected(error, results){
    if(error){
        console.error(error, "Hi!");
    } else {
        console.log(results)
        onScreen = false
        for(var i = 0; i < results.length; i++){
            if(results[i].label == document.getElementById("input").value){
                onScreen = true
            }
            console.log("Hello!")
        }
        if(results.length == 0){
            onScreen = false;
        }
        if(onScreen){
            document.getElementById("a").innerHTML = "Object Detected: True"
        } else {
            document.getElementById("a").innerHTML = "Object Detected: False"
        }
    }
    document.getElementById("status").innerHTML = "Status: Objects Detected"
}