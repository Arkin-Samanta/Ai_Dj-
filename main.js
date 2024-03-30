function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
song="";
LeftWristX=0;
LeftWristY=0;
RightWristX=0;
RigthWristY=0;
scoreLeftwrist=0;
scoreRightwrist=0;
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#000000");
    if(scoreLeftwrist>0.2)
    {
        circle(LeftWristX, LeftWristY, 20);
        InNumberLeftWristY=Number(LeftWristY);
        remove_decimals=floor(InNumberLeftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume = "+volume;
        song.setVolume(volume);
    }
    if(scoreRightwrist>0.2){
        circle(RightWristX, RightWristY, 20);
        if(RightWristY >0 && RightWristY <=100)
        {document.getElementById("speed").innerHTML="Speed = 0.5x";
         song.rate(0.5);
        }
        else if(RightWristY >100 && RightWristY <=200)
        {document.getElementById("speed").innerHTML="Speed = 1x";
         song.rate(1);
        }
        else if(RightWristY >200 && RightWristY <=300)
        {document.getElementById("speed").innerHTML="Speed = 1.5x";
         song.rate(1.5);
        }
        else if(RightWristY >300 && RightWristY <=400)
        {document.getElementById("speed").innerHTML="Speed = 2x";
         song.rate(2);
        }
        else if(RightWristY >400 && RightWristY <=500)
        {document.getElementById("speed").innerHTML="Speed = 2.5x";
         song.rate(2.5);
        }
    }
    }
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.rate(1);
}
function modelLoaded(){
    console.log('PoseNet Is Initialized')
}
function gotPoses(results){
    if(results.length>0)
    {console.log (results);
     scoreLeftwrist=results[0].pose.keypoints[9].score;
     scoreRightwrist=results[0].pose.keypoints[10].score;
     console.log("Score Leftwrist = "+scoreLeftwrist+"Score RightWrist = "+scoreRightwrist);
     LeftWristX=results[0].pose.leftWrist.x;
     LeftWristY=results[0].pose.leftWrist.y;
     console.log("LeftWristX= "+LeftWristX+"LeftWristY= "+LeftWristY);
     RightWristX=results[0].pose.rightWrist.x;
     RightWristY=results[0].pose.rightWrist.y;
     console.log("RightWristX= "+RightWristX+"RightWristY= "+RightWristY);
    };
}
