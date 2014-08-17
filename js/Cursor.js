function Cursor(_p){
    this.xPos = 0;
    this.yPos = 0;
    this.offset = cGrid.size+5;
    this.parent = _p;
    this.el;

    this.create();
}
Cursor.prototype.create = function(){
    var el = document.createElement('div');
        el.id = "cursor";
        el.style.position = "absolute";
        el.style.width = cGrid.size+"px";
        el.style.height = cGrid.size+"px";
        el.style.backgroundColor = "rgba(0,100,0,.5)";
    this.parent.appendChild(el);
    this.el = el;
    this.move(0,0);
}
Cursor.prototype.move = function(_x,_y){
    this.xPos = cGrid.snap(_x-this.offset);
    this.yPos = cGrid.snap(_y-this.offset);
    this.el.style.left = this.xPos+"px";
    this.el.style.top = this.yPos+"px";
}
Cursor.prototype.move2 = function(){
    this.el.style.left = cGrid.snap(this.xPos)+"px";
    this.el.style.top = cGrid.snap(this.yPos)+"px";
}
Cursor.prototype.resize = function(){
    this.el.style.left = cGrid.snap(this.xPos) + 'px';
    this.el.style.top = cGrid.snap(this.yPos) + 'px';
    this.el.style.width = cGrid.size + 'px';
    this.el.style.height = cGrid.size + 'px';
}
