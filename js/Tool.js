function Tool(){
    console.log('test tool');
}
Tool.prototype.draw = function(){

}
Tool.prototype.erase = function(){

}
Tool.prototype.circ = function(x,y,r){

}
Tool.prototype.rectangle = function(x1,y1,x2,y2){
    var xdis = x2-x1;
    var xdir = (xdis/Math.abs(x1-x2));
    var ydis = y2-y1;
    var ydir = (ydis/Math.abs(y1-y2));
    var tOb = new TrigObject(x1,y1,x2,y2);
    var spacing = 1;
    var borderSize = 0;

    for(i = 0; i <= Math.abs(xdis); i += spacing){
        for(j = 0; j <= Math.abs(ydis); j += spacing){
            if(i<=borderSize || j <= borderSize || i >= Math.abs(xdis)-borderSize || j >= Math.abs(ydis)-borderSize){
                var pixOb = new pixObj(( i * xdir )+x1,( j * ydir )+y1);
            }
            if(i == 0 && j == 0){
                pixOb.color.setCol(100,100,1,.9); 
            }else{
                pixOb.color.setCol(100,200,1,.9); 
            }
            pixSet[pixOb.sID()] = pixOb;
        }
    }
    drawFromSet();
}
Tool.prototype.test = function(){
    console.log('test!');

}
Tool.prototype.line = function(x1, y1, x2,y2){
        var xdis = x2-x1;
        var xdir = (xdis/Math.abs(x1-x2));
        var ydis = y2-y1;
        var ydir = (ydis/Math.abs(y1-y2));
        var yspacing = 1;
        var xspacing = 1;

        var tOb = new TrigObject(x1,y1,x2,y2);

        if(Math.abs(xdis) >= Math.abs(ydis) || xdis == ydis){
            for(i2 = 1; i2 <= Math.abs(xdis)-1; i2+=1){
                // X position--
                // Use the distance between the starting point and the end point to create the line-- inverse it whenever the starting point > end point
                var pixOb = new pixObj( ( i2 * xdir ) + x1, xdir * tOb.getYSI(i2+x1, 'f') );

                //then move the inversion down. (there must be a more elegant way to do this...)
                if(x1 > x2){
                    pixOb.ypos += y1 * 2;
                }

                pixOb.color.setCol(0,0,0,1);
                pixSet[pixOb.sID()] = pixOb;

            }

        }else{
            for(j2 = 1; j2<= Math.abs(ydis)-1; j2+=1){
                // Y position--
                // Use the distance between the starting point and the end point to create the line-- inverse it whenever the starting point > end point
                //var pixOb = new pixObj((ydis/Math.abs(y1-y2))*Math.round(tOb.getSI2(j2+y1)), j2*(ydis/Math.abs(y1-y2))+y1);

                //CHECK IF XPOS IS A NUMBER-- TODO find a better solution to this... xposition throws NaN when getting slope intercept of 0 position.
                if( isNaN(ydir * tOb.getXSI(j2+y1,'r') ) ){
                    var pixOb = new pixObj( ydir * x1, (j2 * ydir) + y1);
                }else{
                    var pixOb = new pixObj( ydir * tOb.getXSI(j2+y1, 'r'), ( j2 * ydir ) + y1);
                }

                //then move the inversion down. (there must be a more elegant way to do this...)
                if(y1 > y2){
                    pixOb.xpos += x1 * 2;
                }
                pixOb.color.setCol(0,0,0,1);
                pixSet[pixOb.sID()] = pixOb;
            }
        }
        drawFromSet();
}
