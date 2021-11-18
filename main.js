img="";
status="";
objects =[];

function preload()
{
    img=loadImage('dog_cat.jpg');
}
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    objectDetector= ml5.objectDetector('cocossd' ,modelLoaded);//objectDetector is used to initiallize the cocossd model
    document.getElementById("status").innerHTML= 'status: detecting object'
   

}

function modelLoaded()
{
    console.log("Model is Loaded");
    status= true;
    
}


function gotResult(error, results)
{
    if(error)
    {
console.error(error);
    }
    else
    {
        console.log(results);
        objects =results;
    }
}
function draw()
{
    image(video, 0, 0, 380, 380);
//Manually to draw the rectangle

   // fill("#FF0000");
    //text("Dog", 45, 75);
    //noFill();
    //stroke("#FF0000");
    //rect(30, 60, 450, 350);

    //fill("#FF0000");
    //text("cat", 320, 120);
    //noFill();
    //stroke("#FF0000");
    //rect(300, 90, 270, 320)

    //Drawing the rectangle with the help of cocossd 

    if(status != "")
    {
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);//detect is a function used for object detection and gets back th result
        for(i= 0; i< objects.length; i++)
        {
            document.getElementById("Number_of_Objects").innerHTML= 'Number of objects: ' + objects.length;
            document.getElementById("status").innerHTML= "Status : Object Detected";
         fill(r, g, b);
         percent= floor(objects[i].confidence*100);
         text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y)
         noFill();
         stroke(r, g, b);
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
