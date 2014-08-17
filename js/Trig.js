/*TRIG OBJECT*/
/* This is a small TrigObject to help with drawing lines 
 *
 * Takes Point 1(x,y), Point 2(x,y) and calculates
 * Slope,
 * Degree of Slope in Cos, Sin
 * slope intercept at Y
 * slope intercept at X
 * distance (if passing 'x' or 'y' as parameter, you get distance for those respective points, otherwise you get get total distance)
 *
 * P.S. Math sucks.
 */
var Trig = {
    x1:0,
    x2:0,
    y1:0,
    y2:0,
    points: function(_x1, _y1, _x2, _y2){
        this.x1 = _x1;
        this.x2 = _x2;
        this.y1 = _y1;
        this.y2 = _y2;
        return this;
    },
    slope: function(){
        return this.distance('y')/this.distance('x');
        //return (this.y2-this.y1)/(this.x2-this.x1);
    },
    cAngle: function(){
        return 1/Math.sqrt( 1 + ( Math.pow( this.slope(), 2 )  ) );
    },
    sAngle: function(){
        return this.slope()/Math.sqrt( 1 + ( Math.pow( this.slope(), 2 )  ) );
    },
    getYSI: function(_xInt, _r){
        var SY1 = (  this.slope() * (_xInt  - this.x1) ) - ( this.slope() * ( _xInt * this.cAngle() ) );
        var SY2 = SY1 + ( _xInt * this.sAngle() ) + this.y1;
        if(_r == 'f'){
            return Math.floor(SY2);
        }else if(_r == 'r'){
            return Math.round(SY2);
        }else if(_r == 'c'){
            return Math.ceil(SY2);
        }else{
            return SY2;
        }
    },
    getXSI: function(_yInt, _r){
        var SMX1 = _yInt * this.sAngle(); 
        var SMY1 = _yInt * this.cAngle();
        var SX1 = (-_yInt - (SMX1 - this.slope()*(SMY1 - this.x1) - this.y1) ) / - this.slope();
        if(_r == 'f'){
            return Math.floor(SX1);
        }else if(_r == 'r'){
            return Math.round(SX1);
        }else if(_r == 'c'){
            return Math.ceil(SX1);
        }else{
            return SX1;
        }
    },
    distance: function(_prop){
        var obj = {
            y: this.y2 - this.y1,
            x: this.x2 - this.x1,
            d: function(){
                return Math.round( Math.sqrt( ( Math.pow( this.x , 2 ) + Math.pow( this.y , 2 ) ) ) );
            }
        }
        if(_prop){
            return obj[_prop];
        }else{
            return obj.d();
        }
    }
}

