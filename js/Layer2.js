function Layer(_properties){
    var props = _properties || {};
        props.canCont = Helper.id(props.drawContainer) || null,
        this.canCont = props.canCont;
        props.listCont = Helper.id(props.layerListContainer) || null, 
        this.listCont = props.listCont;
        this.frameRef = props.frameRef;
        this.hidden = false;
        this.LayerArray = this.frameRef.LayerArray;
        this.ind = 0;
        this.addedNum = this.frameRef.totalLayers;
        this.name = "Layer "+this.addedNum;

    /*random shape to use*/
    this.shape = {
        color: Helper.color.rand().ret(),
        x1: Math.random()*10,
        y1: Math.random()*10,
        x2: Math.random()*10+30,
        y2: Math.random()*10+30
    }
}
Layer.prototype.hide = function(){
    var pre_hide;
    if(this.hidden){
        this.bar.bar_ref.value.cur = pre_hide;
        this.bar.update();
        this.hidden = false;
    }else{
        pre_hide = this.bar.bar_ref.value.cur; 
        this.bar.bar_ref.value.cur = 0;
        this.bar.update();
        this.hidden = true;
    }
}
Layer.prototype.setZind = function(){
    this.canvas.style.zIndex = this.ind;
}
Layer.prototype.create = function(){
    var _thisLayerRef = this;

    this.canvas = Helper.makeEl({
        type:'canvas', 
        attr:{
            id: 'layer-'+this.ind,
            width: this.canCont.offsetWidth,
            height: this.canCont.offsetHeight
        },
        css:{
            position:'absolute',
            zIndex: this.ind 
        }
    });
    this.canCont.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
/*
      //EVENTS FOR CANVAS MANIPULATIONS-- delegate to 'tool' Object 
    this.canvas.onmousedown = function(e){
        _thisLayerRef.context.strokeStyle = Helper.color.rand().ret();
        _thisLayerRef.context.lineWidth = 15;
        _thisLayerRef.context.beginPath();
        _thisLayerRef.context.moveTo(e.offsetX, e.offsetY);
        _thisLayerRef.pos = {x:e.offsetX, y:e.offsetY};
        _thisLayerRef.interval = setInterval(_thisLayerRef.draw, 100);
        _thisLayerRef.mouseIsDown = true;
        _thisLayerRef.LineArr.push(_thisLayerRef.pos);
        return false;
    }
    this.canvas.onmousemove = function(e){
        if(_thisLayerRef.mouseIsDown){
            _thisLayerRef.pos = {x:e.offsetX, y:e.offsetY};
            //console.log(e.offsetX, e.offsetY);
        }
        return false;
    }
    this.canvas.onmouseup = function(e){
        clearInterval(_thisLayerRef.interval);
        _thisLayerRef.mouseIsDown = false;
        _thisLayerRef.context.closePath();
        _thisLayerRef.StrokeArr.push(_thisLayerRef.LineArr);
        _thisLayerRef.LineArr = new Array();
        _thisLayerRef.itr = 0;
        return false;
    }
*/

    this.layerListElement = Helper.makeEl({
        attr:{},
        css:{
            position:"relative",
            padding: "5px 0px 5px 5px",
            borderTop: "1px solid",
            width: this.listCont.offsetWidth+"px",
        }
    });
    this.layerListElement.innerHTML = "<span>"+this.name+"</span>";
    this.layerListElement.onmousedown = function(){
        _thisLayerRef.frameRef.switchCurrent(_thisLayerRef);
    }

    this.barContainer = Helper.makeEl({
        attr:{
            id: "layer-alpha-bar-"+this.ind
        },
        css:{
            position:"relative",
            width: "120px",
            float:'left',
            height: "17px"
        }
    });
    this.layerListElement.appendChild(this.barContainer);

    if(this.LayerArray.length){
        this.listCont.insertBefore(this.layerListElement, this.LayerArray[this.frameRef.currentLayer.ind].layerListElement);
    }else{
        this.listCont.appendChild(this.layerListElement);
    }

    this.bar = new Bar2(this.barContainer, {p: this, val:{tot:100, cur: 100, inc:1}, divider:100});
    this.context.globalAlpha = 1;

    this.context.fillStyle = this.shape.color;
    this.context.fillRect(
            this.shape.x1,
            this.shape.y1,
            this.shape.x2,
            this.shape.y2
            );
}
Layer.prototype.remove = function(){
    this.canCont.removeChild(this.canvas);
    this.listCont.removeChild(this.layerListElement);
}
Bar2.prototype.update = function(){
    var alpha_value =this.bar_ref.value.cur/this.divider;
    this.parentObj.context.globalAlpha = alpha_value; 
    this.parentObj.context.clearRect(0,0,this.parentObj.canvas.height, this.parentObj.canvas.width);
    this.parentObj.context.fillStyle = this.parentObj.shape.color;
    this.parentObj.context.fillRect(
            this.parentObj.shape.x1,
            this.parentObj.shape.y1,
            this.parentObj.shape.x2,
            this.parentObj.shape.y2
            );
    /*
    this.parentObj.context.fillRect(
            this.parentObj.canvas.width*this.parentObj.num/10,
            Math.random()*100,
            (this.parentObj.canvas.width/10),
            this.parentObj.canvas.height-2
            );
            */

    this.inputElement.value = this.bar_ref.value.cur/this.divider;
    this.bar_ref.update();
}
