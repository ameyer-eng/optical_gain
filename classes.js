let speed_limit_c = 4;

class Reflector {
    constructor(origin, width, height, reflectivity) {
      this.origin = origin;
      this.width = width;
      this.height = height;
      this.reflectivity = reflectivity;
      console.log('Reflector initialized');
    }

    draw(canvas){
      ctx.fillStyle = RGB2Hex(100, 100, 100);
      canvas.fillRect(this.origin[0], this.origin[1], this.width, this.height)

    }
  }




  //gain to be given in terms of gain per unit length
  //total gain may be added later?

  class Gain_element {
    constructor(origin, width, height, gain) {
      this.origin = origin;
      this.width = width;
      this.height = height;
      this.gain = gain;
      console.log('Gain element initialized');
    }
    draw(canvas){
      ctx.fillStyle = RGB2Hex(100, 200, 150);
      canvas.fillRect(this.origin[0], this.origin[1], this.width, this.height)
    }
  }


  class Lightfront {
    constructor(origin, width, height, intensity, direction) {
        this.origin = origin;
        this.width = width;
        this.height = height;
        this.gain = intensity;
        this.direction = direction
        console.log('Lightfront initialized');
    }

        check_reflection(left_mirror, right_mirror, table)
        {
          //check reflections in the left mirror
          if (this.origin[0] < left_mirror.origin[0] + left_mirror.width){
            //reverse the direction and change intensity of current wave
              this.direction = 1;
              this.intensity = this.intensity * left_mirror.reflectivity; 
              this.origin = [left_mirror.origin[0]+25, 10];
            //create a new wave with no loss remaining intensity to travel
            table.light_list.push(new Lightfront([left_mirror.origin[0]-25, 10], 10, 400, 1, -1));
          }

          //check reflections in the right mirror
          if (this.origin[0] > right_mirror.origin[0]){
            //reverse the direction and change intensity of current wave
            this.direction = -1;
            this.intensity = this.intensity * right_mirror.reflectivity; 
            this.origin = [right_mirror.origin[0]-25, 10];
            //create a new wave with no loss remaining intensity to travel
            table.light_list.push(new Lightfront([right_mirror.origin[0]+25, 10], 10, 400, 1, 1));
          }


        }
        
        draw(canvas){
          ctx.fillStyle = RGB2Hex(200, 50, 150);
          canvas.fillRect(this.origin[0], this.origin[1], this.width, this.height)
        } 

        move(){
          this.origin[0] += this.direction*speed_limit_c;
        }

    
  }



 class Table{
    constructor() {
        //scene list contains all the objects that do not move
        this.scene_list = [ ];
        this.light_list = [];
        console.log('Table initialized');
      }

      draw_scene(canvas){
        for(const item of this.scene_list) {
          console.log(item.width);
          item.draw(canvas);
        }

      }

      draw_lights(canvas){
        for(const item of this.light_list) {
          item.draw(canvas);
        }
      }
      
      move_waves(){
        for(const item of this.light_list) {
          item.move();
        }
      }
    
    check_bounds(){
      for(const item of this.light_list) {
        if( item.origin[0]< 10 || item.origin[0] > 790){
          
          const index = this.light_list.indexOf(item);
          if (index > -1){
            this.light_list.splice(index, 1);  //remove the item from the light list
          }
        } 
      }
    }

 }

//Get the canvas to draw the componets onto 
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//Make the background of the canvas black
ctx.fillStyle = "black";
ctx.fillRect(0, 0, c.width, c.height);


//initialize the "table" and it's mirror setup
let light_table = new Table();

let mirror1 = new Reflector([50,10], 20, 400, 0.99);
light_table.scene_list.push(mirror1);

let mirror2 = new Reflector([250, 10], 20, 400, 0.50);
light_table.scene_list.push(mirror2);

let gain_element = new Gain_element([100, 50], 100, 300, 3);
light_table.scene_list.push(gain_element);


//initialize the primary light front

let light_front_1 = new Lightfront([100, 10], 10, 400, 1, -1);
light_table.light_list.push(light_front_1);


//Paint the elements (except the table) to the canvas
light_table.draw_scene(ctx);
light_table.draw_lights(ctx);


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//main loop//

function Update()
{
  //clear the screen for updates
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, c.width, c.height);

  //check to see if any light fronts are off screen and eliminate them from the list
  light_table.check_bounds();

  //check for reflections
  light_front_1.check_reflection(mirror1, mirror2, light_table);
  
  //move the light front(s) 
  light_table.move_waves();

  //paint the scene
  light_table.draw_scene(ctx);

  //paint the light fronts on top of the scene
  light_table.draw_lights(ctx);


  //add a delay...just cause...
  console.log("loop executed")

}
















function RGB2Hex(R,G,B)
{
   var hexcolor;
   var rs;
   var gs;
   var bs;
     if( R < 0){R=0;}
     if( G < 0){G=0;}
     if( B < 0){B=0;}
    
     if( R > 255){R=255;}
     if( G > 255){G=255;}
     if( B > 255){B=255;}
      if( R < 10)
      { rs ="0" + R.toString(16); }
      else
       {rs = R.toString(16);}
     if( G < 10)
      { gs = "0" + G.toString(16); }
      else
       {gs = G.toString(16);}
      if( B < 10)
      { bs = "0" + B.toString(16); }
      else
       {bs = B.toString(16);}
hexcolor = "#"+ rs + gs + bs;
return hexcolor;
}