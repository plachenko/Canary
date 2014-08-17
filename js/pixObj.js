function Pixel(_yPos, _xPos){
    this.xPos = _xPos;
    this.yPos = _yPos;
    this.col = null;
    this.color = {
        r:0,
        g:0,
        b:0,
        a:1, 
        setCol: function(_r,_g,_b,_a){
            this.r = _r;
            this.g = _g;
            this.b = _b;
            this.a = _a;
        },
        getCol: function(){
            return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")"
        }
    }
}
Pixel.prototype.sID = function(){
    return "x"+this.xPos+"y"+this.yPos;
}
