
var iMax = 200;
var jMax = 200;
var red = new Array();
var heatmap = new Array();
for (i=0;i<iMax;i++) 
{
 red[i]=new Array();
 heatmap[i]=new Array();
  for (j=0;j<jMax;j++) {
   red[i][j]=64;
   heatmap[i][j]=64;
 }
}
heatblock(50, 50, 30, 30, 255);
heatblock(50, 100, 30, 30, 255);
heatblock(100, 50, 30, 30, 255);
heatblock(100, 100, 30, 30, 255);
function Myfunction()
{

for(n=1; n<20; n++)
{

    for(i = 0; i < 1; ++i)
    {
     heattransfer();
	 
     redtoheatmap();
    }
     paint();
}
     return;
   
}

function heattransfer()
{
  var up;
  var down;
  var left;
  var right;
  
  var current;
  var flowleft;
  var flowright;
  var flowup;
  var flowdown;
  var flowrate;
   flowrate = 0.5;
  //////////////////////////////
  // copy the current state into the new state
    for (i=5;i<197;i++) 
   {
     for (j=5;j<197;j++) 
         {
			red[i][j] = heatmap[i][j];
		}
	}
	// update the new state with the flow
    for (i=5;i<197;i++) 
   {
     for (j=5;j<197;j++) 
         {
           left = heatmap[i-1][j];
           right = heatmap[i+1][j]
           up = heatmap[i][j-1];
		   down = heatmap[i][j+1];
           current = heatmap[i][j];
          flowleft = (current-left)*flowrate / 4;
          flowright = (current-right)*flowrate / 4;
          flowup = (current-up)*flowrate / 4;
          flowdown = (current-down)*flowrate / 4;
         
          red[i][j] += -1*(flowleft + flowright + flowup + flowdown);
		  red[i-1][j] += flowleft;
		  red[i+1][j] += flowright;
		  red[i][j-1] += flowup;
		  red[i][j+1] += flowdown;
         }
   }
  
return;
}
function paint()
{
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var color;
 for (i=0;i<iMax;i++) {
       for (j=0;j<jMax;j++) {
               color = Math.round(red[i][j]);
               ctx.fillStyle = RGB2Hex(color,color,color);
               ctx.fillRect(i, j, 1, 1);
        }  
     }
  return;
    
}
function redtoheatmap()
{
 for (i=0;i<iMax;i++) {
       for (j=0;j<jMax;j++) {
           heatmap[i][j] = red[i][j];
        }  
     }
return;
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
function heatblock (x, y, width, height, heat)
{
  for (i=x;i<x+width;i++) 
   {
     for (j=y;j<y+height;j++) 
         {
          heatmap[i][j]=heat;
         }
   }
  return;
}