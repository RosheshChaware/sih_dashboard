


let detector;
let detectorConfig;
let poses;
let video;
let skeleton = true;
let kneeAngle = 999;
let reps = 0;
let upPosition = false;
let downPosition = false;
let highlightBack = false;
let backWarningGiven = false;

async function init() {
  detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER };
  detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
  edges = {
    '5,7': 'm',
    '7,9': 'm',
    '6,8': 'c',
    '8,10': 'c',
    '5,6': 'y',
    '5,11': 'm',
    '6,12': 'c',
    '11,12': 'y',
    '11,13': 'm',
    '13,15': 'm',
    '12,14': 'c',
    '14,16': 'c'
  };
  await getPoses();
}

async function videoReady() {}

async function setup() {
  var msg = new SpeechSynthesisUtterance('Loading, please wait...');
  window.speechSynthesis.speak(msg);
  createCanvas(640, 480);
  video = createCapture(VIDEO, videoReady);
  video.hide();
  await init();
}

async function getPoses() {
  poses = await detector.estimatePoses(video.elt);
  setTimeout(getPoses, 0);
}

function draw() {
  background(220);
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  drawKeypoints();
  if (skeleton) {
    drawSkeleton();
  }

  fill(255);
  strokeWeight(2);
  stroke(51);
  translate(width, 0);
  scale(-1, 1);
  textSize(40);

  if (poses && poses.length > 0) {
    let squatString = `Squats completed: ${reps}`;
    text(squatString, 100, 90);
  } else {
    text('Loading, please wait...', 100, 90);
  }
}

function drawKeypoints() {
  if (poses && poses.length > 0) {
    for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.3) {
        fill(255);
        stroke(0);
        strokeWeight(4);
        circle(x, y, 16);
      }
    }
    updateKneeAngle();
    updateBackAngle();
    inUpPosition();
    inDownPosition();
  }
}

function drawSkeleton() {
  confidence_threshold = 0.5;
  if (poses && poses.length > 0) {
    for (const [key, value] of Object.entries(edges)) {
      const p = key.split(",");
      const p1 = p[0];
      const p2 = p[1];
      const y1 = poses[0].keypoints[p1].y;
      const x1 = poses[0].keypoints[p1].x;
      const c1 = poses[0].keypoints[p1].score;
      const y2 = poses[0].keypoints[p2].y;
      const x2 = poses[0].keypoints[p2].x;
      const c2 = poses[0].keypoints[p2].score;

      if ((c1 > confidence_threshold) && (c2 > confidence_threshold)) {
        strokeWeight(2);
        stroke('rgb(0, 255, 0)');
        line(x1, y1, x2, y2);
      }
    }
  }
}

// Knee angle calculation: hip–knee–ankle
function updateKneeAngle() {
  var leftHip = poses[0].keypoints[11];
  var leftKnee = poses[0].keypoints[13];
  var leftAnkle = poses[0].keypoints[15];

  if (leftHip.score > 0.3 && leftKnee.score > 0.3 && leftAnkle.score > 0.3) {
    let angle = (
      Math.atan2(leftAnkle.y - leftKnee.y, leftAnkle.x - leftKnee.x) -
      Math.atan2(leftHip.y - leftKnee.y, leftHip.x - leftKnee.x)
    ) * (180 / Math.PI);

    kneeAngle = Math.abs(angle);
  }
}

function updateBackAngle() {
  var leftShoulder = poses[0].keypoints[5];
  var leftHip = poses[0].keypoints[11];
  var leftKnee = poses[0].keypoints[13];

  let angle = (
    Math.atan2(leftKnee.y - leftHip.y, leftKnee.x - leftHip.x) -
    Math.atan2(leftShoulder.y - leftHip.y, leftShoulder.x - leftHip.x)
  ) * (180 / Math.PI);

  angle = angle % 180;
  if (leftKnee.score > 0.3 && leftHip.score > 0.3 && leftShoulder.score > 0.3) {
    if ((angle < 20) || (angle > 160)) {
      highlightBack = false;
    } else {
      highlightBack = true;
      if (!backWarningGiven) {
        var msg = new SpeechSynthesisUtterance('Keep your back straight');
        window.speechSynthesis.speak(msg);
        backWarningGiven = true;
      }
    }
  }
}

// Standing position
function inUpPosition() {
  if (kneeAngle > 160) {
    if (downPosition == true) {
      var msg = new SpeechSynthesisUtterance(String(reps + 1));
      window.speechSynthesis.speak(msg);
      reps = reps + 1;
    }
    upPosition = true;
    downPosition = false;
  }
}

// Squatting position
function inDownPosition() {
  if ((highlightBack == false) && (kneeAngle < 100)) {
    if (upPosition == true) {
      var msg = new SpeechSynthesisUtterance('Up');
      window.speechSynthesis.speak(msg);
    }
    downPosition = true;
    upPosition = false;
  }
}
