function Layer(_w, _h, _p, _layerNum){
    this.canvas;
    this.ctx;
    this.width = _w;
    this.height = _h;
    this.parentEl = _p;
    this.layerNum = _layerNum;
    this.layerName = 'Layer'+this.layerNum;
    this.zIndex = _layerNum;
    this.pixSet = Object.create(null);
    this.layerAlpha = 1;

    this.lastPixOb;

    this.create();
}
Layer.prototype.remove = function(){
    //console.log(this.parentEl, this.canvas);
    this.parentEl.removeChild(this.canvas);
}
Layer.prototype.setAlpha = function(_alpha){
    this.ctx.globalAlpha = _alpha;
    this.draw();
}
Layer.prototype.remPixel = function(_x,_y){
    var pixX = Math.round(_x/cGrid.size);
    var pixY = Math.round(_y/cGrid.size);

    delete this.pixSet["x"+pixY+"y"+pixX];
    console.log(this.pixSet);
}

Layer.prototype.addPixel = function(_x,_y, _col){
    var pixX = Math.round(_x/cGrid.size);
    var pixY = Math.round(_y/cGrid.size);

        var pixl = new Pixel(pixX,pixY);
            //pixl.color.setCol(col.r, col.g, col.b, col.a);
            this.pixSet[pixl.sID()] = pixl;
            //this.lastPixOb = pixl.sID();
            pixl.col = _col;
            //pixl.col = Helper.color.rand().ret();
    /*
    console.log(this.lastPixOb);
    console.log(this.pixSet[pixl.sID()]);
    console.log(_x,_y);
    */

    //console.log(pixl.xPos, pixl.yPos, this.pixSet[this.lastPixOb].xPos,this.pixSet[this.lastPixOb].yPos);
    //console.log(this.distance(pixl.xPos, pixl.yPos, this.pixSet[this.lastPixOb].xPos, this.pixSet[this.lastPixOb].yPos));

            /*
    if(this.distance(pixl.xPos, pixl.yPos, this.pixSet[this.lastPixOb].xPos, this.pixSet[this.lastPixOb].yPos)){
        drawLine(pixl.xPos, pixl.yPos, this.pixSet[this.lastPixOb].xPos, this.pixSet[this.lastPixOb].yPos);
        this.lastPixOb = pixl.sID();
    }
    */
    if(!Object.prototype.hasOwnProperty.apply(this.pixSet, ['x'+pixX+'y'+pixY])){
    }else{
        //OverWrite Pixel in set here...
    }
}
Layer.prototype.draw = function(){
    this.ctx.clearRect(0,0,this.width, this.height);
    for(pixID in this.pixSet){
        var curPix = this.pixSet[pixID];
            curPixX = curPix.xPos*cGrid.size; 
            curPixY = curPix.yPos*cGrid.size; 
        this.ctx.fillStyle = curPix.col;
        //this.ctx.fillStyle = curPix.col.getColor();
        this.ctx.fillRect(curPixY,curPixX,cGrid.size, cGrid.size);
    }
}
Layer.prototype.resize = function(){
    this.canvas.width = this.width;
    this.canvas.height = this.height;
}
Layer.prototype.draw2 = function(){
    this.ctx.clearRect(0,0,this.width, this.height);
    //console.log(importPixSet);
    this.pixSet = pixImp;
    for(i in this.pixSet){
        var curPix = this.pixSet[i];
            curPixX = curPix.xPos*cGrid.size; 
            curPixY = curPix.yPos*cGrid.size; 
            curPix.color.getCol = function(){
                return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")"
            }
/*
        var r =curPix.color.r; 
        var g =curPix.color.g; 
        var b =curPix.color.b; 
        var a =curPix.color.a; 
        this.ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
*/
        this.ctx.fillStyle = curPix.color.getCol();
        this.ctx.fillRect(curPixY,curPixX,cGrid.size, cGrid.size);
        //ctx.fillRect((pixObj[i].yPos-minX[0])*size,(pixObj[i].xPos-minY[0])*size, size,size);
    }

/*
    for(pixID in this.pixSet){
        var curPix = this.pixSet[pixID];
            curPixX = curPix.xPos*cGrid.size; 
            curPixY = curPix.yPos*cGrid.size; 
        this.ctx.fillStyle = curPix.color.getCol();
        this.ctx.fillRect(curPixY,curPixX,cGrid.size, cGrid.size);
    }
*/
}
Layer.prototype.drawLine = function(x1, y1, x2,y2){
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
            var pixOb = new Pixel( ( i2 * xdir ) + x1, xdir * tOb.getYSI(i2+x1, 'f') );

            //then move the inversion down. (there must be a more elegant way to do this...)
            if(x1 > x2){
                pixOb.ypos += y1 * 2;
            }

            pixOb.color.setCol(0,0,0,1);
           this.pixSet[pixOb.sID()] = pixOb;

        }

    }else{
        for(j2 = 1; j2<= Math.abs(ydis)-1; j2+=1){
            // Y position--
            // Use the distance between the starting point and the end point to create the line-- inverse it whenever the starting point > end point
            //var pixOb = new pixObj((ydis/Math.abs(y1-y2))*Math.round(tOb.getSI2(j2+y1)), j2*(ydis/Math.abs(y1-y2))+y1);

            //CHECK IF XPOS IS A NUMBER-- TODO find a better solution to this... xposition throws NaN when getting slope intercept of 0 position.
            if( isNaN(ydir * tOb.getXSI(j2+y1,'r') ) ){
                var pixOb = new Pixel( ydir * x1, (j2 * ydir) + y1);
            }else{
                var pixOb = new Pixel( ydir * tOb.getXSI(j2+y1, 'r'), ( j2 * ydir ) + y1);
            }

            //then move the inversion down. (there must be a more elegant way to do this...)
            if(y1 > y2){
                pixOb.xpos += x1 * 2;
            }
            pixOb.color.setCol(0,0,0,1);
            this.pixSet[pixOb.sID()] = pixOb;
        }
    }
}
Layer.prototype.distance = function(x1,y1,x2,y2){
    var xchange = Math.pow(x2 - x1,2);
    var ychange = Math.pow(y2 -y1,2);
    return(Math.round(Math.sqrt(xchange + ychange))); 
}
Layer.prototype.create = function(){
    this.canvas = document.createElement('canvas');
    this.canvas.id = this.layerName;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = "absolute";
    this.canvas.style.zIndex = this.zIndex;

    this.parentEl.appendChild(this.canvas);
    console.log(this.parentEl);
}

