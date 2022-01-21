const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var peach;

var bg_img;
var food;
var rabbit;

var button,button1,button2;
var bunny;
var blink,eat,sad;

function preload()
{
  bg_img = loadImage('background.png');
  bg_img3 = loadImage('bg.jpeg');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  eating_sound = loadSound ("eating_sound.mp3");
  cutting_sound = loadSound("Cutting Through Foliage.mp3");
  rope_cut_sound = loadSound("rope_cut.mp3")
  sound1 = loadSound("sound1.mp3")
  bg_img2 = loadImage("bg_plain.png");
  mutebutton = loadImage("cut_button.png")
  peach_Img= loadImage("actuall-peach.png");
  split_peach_Img = loadImage("split_peach.png")
  basket_Img = loadImage("basket.png");

  
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  
  var isMObile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMObile)
{
  canW = displayWidth;
  canH = displayHeight
}  
else{
  canW = windowWidth; 
    canH = windowHeight; 
}
createCanvas(canW,canH);
  frameRate(80);


sound1.play();
  sound1.setVolume(0.1);
  engine = Engine.create();
  world = engine.world;
  

  // blower = createImg('blower.png');
  // blower.position(10,250);
  // blower.size(150,150)
  //blower.mouseClicked(airBlow)

  mute_btn = createImg('cut_button.png');
  mute_btn.position(20,200)
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute)

  
  rope = new Rope(8,{x:245,y:30});
  ground = new Ground(200,800,2500,10);

  rope2 = new Rope (8,{x:645,y:80});

  rope3 = new Rope (10,{x:55,y:50});

  rope4 = new Rope (10,{x:870,y:50});

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;


  // basket = createSprite(230,620,100,100);
  // basket.scale = 0.5;
  // basket.addImage(basket_Img);


  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,1,1);
  Matter.Composite.add(rope.body,fruit);



  peach = Bodies.circle(300,300,20);
  Matter.Composite.add(rope4.body,peach);




 


  

  fruit_con = new Link(rope,peach);
  fruit_con2 = new Link (rope2,peach)
  fruit_con3 = new Link (rope3,peach)
  fruit_con4 = new Link(rope4, peach);

  
  button1 = createImg('cut_btn.png');
  button1.position(220,30);
  button1.size(50,50);
  button1.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(620,80)
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(20,50)
  button3.size(50,50);
  button3.mouseClicked(drop3);

  button4 = createImg('cut_btn.png');
  button4.position(840,50)
  button4.size(50,50);
  button4.mouseClicked(drop4);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
 

}

function draw() 
{
  background(51);
  image(bg_img3,width/2,height/2,canW,canH);

  


  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  if(peach!=null){
    image(peach_Img,peach.position.x,peach.position.y,70,70);
  }

  rope.show();
  rope2.show()
  rope3.show()
  rope4.show();
  //ground.show();
  Engine.update(engine);
  // ground.show();

  if(collide(peach,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play()

 
   
    //cutting_sound.play()
  }
   
  if(collide(peach,ground.body)==true )
  {
     bunny.changeAnimation('crying');
   }

   

  //  if(collide2(peach,bunny)==true)
  // {
  //   bunny.changeAnimation('eating');
  //   eating_sound.play()
  //   //cutting_sound.play()
  // }
   
  // if(collide2(peach,ground.body)==true )
  // {
  //    bunny.changeAnimation('crying');
  //  }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  rope_cut_sound.play()
  //cutting_sound.play()
  
}
function drop2()
{
  rope2.break();
  fruit_con2.dettach();
  fruit_con2 = null; 
  rope_cut_sound.play()
  //cutting_sound.play()
  
}
function drop3()
{
  rope3.break();
  fruit_con3.dettach();
  fruit_con3 = null; 
  rope_cut_sound.play()
  //cutting_sound.play()
  
}

function drop4()
{
  rope4.break();
  fruit_con4.dettach();
  fruit_con4 = null; 
  rope_cut_sound.play()
  //cutting_sound.play()
  
}
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
             // World.remove(engine.world,fruit);
              World.remove(engine.world,peach);
              peach = null;
               peach = null;
               return true; 
            }
            else{
              return false;
            }
         }
}
// function collide2(body,sprite)
// {
//   if(body!=null)
//         {
//          var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
//           if(d<=80)
//             {
              
//               World.remove(engine.world,peach);
//               peach = null;
              
//                return true; 
//             }
//             else{
//               return false;
//             }
//          }
// }



function mute(){
  if (sound1.isPlaying()){
    sound1.stop()
  
  }
  else 
  {
    sound1.play()
  }
}
