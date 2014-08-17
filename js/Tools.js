/* Tools class will take coordinates and do ACTION based on current tool*/
/* Tools will reference the current selected canvas */

// tools.set(draw);
// el.onmousedown = function(e){
//      setInterval => update
//      e
//
// }
// function Update(){
//      tools.action(this.position.x, this.position.y);
// }
var Tools = {
    set: function(func){
        console.log(this, Function.prototype.call(func), this.func);
    },
    current: function(){
        console.log('test');

    } 
}
function Tool(){

}
Tool.prototype.action = function(){

}
Tool.prototype.draw = function(_obj){
    var obj = _obj || {};
        obj.strokeArr = obj.strokeArr || new Array();
/*
Layer.prototype.draw = function(ob){
    var _this = frame.currentLayer;

    var pos = _this.pos;
    var lArr = _this.LineArr;

    console.log(lArr[_this.itr].x, lArr[_this.itr].y);
    _this.context.lineTo(lArr[_this.itr].x, [_this.itr].y);
    _this.context.stroke();
    lArr.push(pos);
    //_this.drawLine();
    _this.itr++;
    console.log(lArr[_this.itr].x, lArr[_this.itr].y);
    //_this.context.moveTo(lArr[_this.itr].x, lArr[_this.itr].y);

}
*/
    //If this object already has an array, draw it.
    /*
    for(var i = 0; i <= this.StrokeArr.length-1; i++){
        this.context.moveTo(this.StrokeArr[i][0].x, this.StrokeArr[i][0].y);
        for(var j = 1; j <= this.StrokeArr[i].length-1; j++){
            //console.log(this.StrokeArr[i][j]);
            this.context.lineTo(this.StrokeArr[i][j].x, this.StrokeArr[i][j].y);
            this.context.moveTo(this.StrokeArr[i][j].x, this.StrokeArr[i][j].y);
            this.context.stroke();
        }
    }
    */

    //Return an array set to draw...
}
Tool.prototype.rect = function(){

}
Tool.prototype.circ = function(){

}
Tool.prototype.line = function(){

}
Tool.prototype.erase = function(){

}
Tool.prototype.bounds = function(){

}
Tool.prototype.pen = function(){

}
