objects = [];
video = null;
status = "";
object_Detector = null;

function preload() {
  video = createVideo("video.mp4");
  video.hide();
}

function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
}

function start() {
  document.getElementById("status").innerHTML = "Status: Detecting objects";
  object_Detector = ml5.objectDetector("cocossd", function () {
    status = true;
    console.log("Model loaded");
    video.loop();
    video.speed(1);
    video.volume(0);
  });
}

function draw() {
  image(video, 0, 0, 640, 420);
  console.log(status);
  if (status != "") {
    object_Detector.detect(video, function (error, results) {
      if (error) {
        console.error(error);
      } else {
        console.log(results);
        objects = results;
      }
    });
    document.getElementById("status").innerHTML = "Status: Objects detected";
    for (i = 0; i < objects.length; i++) {
      document.getElementById("no_of_objects").innerHTML =
        "Number of objects: " + objects.length;
      percent = floor(objects[i].confidence * 100);
      fill("#FF0000");
      text(
        objects[i].label + " " + percent + "%",
        objects[i].x + 15,
        objects[i].y + 15
      );
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
