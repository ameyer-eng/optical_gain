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

        reflection(mirror_list)
        {
            //for each mirror in mirror list
                //check to see if wavefront is inside mirror
                //if so.....
                    //create a new wavefront with  intensity*(1-r) amplitude traveling in current wave direction
                    //reverse the direction of wavefront and set it's amplitude to intensity*r
        }
        

    
  }



 class Table{
    constructor() {
        //scene list contains all the objects that do not move
        this.scene_list = [ ];
        this.global_speed = [];
        console.log('Table initialized');
      }

      draw_scene(canvas){
        for(const item of this.scene_list) {
          console.log(item.width);
          item.draw(canvas);
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

let mirror2 = new Reflector([500,10], 20, 400, 0.50);
light_table.scene_list.push(mirror2);

let gain_element = new Gain_element([100, 50], 250, 300, 3);
light_table.scene_list.push(gain_element);


//initialize the primary light front

let light_front_1 = new Lightfront([100, 10], 10, 400, 1, -1);


//Paint the elements (except the table) to the canvas
light_table.draw_scene(ctx);
//mirror1.draw(ctx);
//mirror2.draw(ctx);
//gain_element.draw(ctx);






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