function Frame(){
    this.currentLayer = null;
    this.totalLayers= 0;
    this.LayerArray = new Array();
    this.containerProperties = {
        drawContainer:'container', 
        layerListContainer: 'layers-container',
        frameRef: this 
    }
}
Frame.prototype.create = function(){
    this.frameListElement = Helper.makeEl({
        attr:{},
        css:{
            position:"relative",
            padding: "5px 0px 5px 5px",
            borderTop: "1px solid",
            width: 400+"px",
            height:"10px"
        }
    });
    this.frameListElement.innerHTML = "<span>"+"Frame"+"</span>";
    Helper.id('frames-container').appendChild(this.frameListElement);
}
Frame.prototype.addLayer = function(){
    this.totalLayers++;
    var layer = new Layer(this.containerProperties);

    if(this.LayerArray.length){
        if(this.currentLayer.num != this.LayerArray.length){
            for(var i = this.currentLayer.num; i<=this.LayerArray.length-1; i++){
                this.LayerArray[i].num ++;
                this.LayerArray[i].setZind();
            }
        }        
        layer.num = this.currentLayer.num+1;
        this.LayerArray.splice(this.LayerArray.indexOf(this.currentLayer)+1, 0, layer);
        layer.ind = this.LayerArray.indexOf(layer);
        layer.create();
        layer.setZind();
    }else{
        layer.ind = 0;
        layer.create();
        this.LayerArray.push(layer);
        layer.num = 1;
    }
    this.renderList();
    this.switchCurrent(layer);
}
Frame.prototype.removeLayer = function(){
    this.currentLayer.remove();
    this.LayerArray.splice(this.currentLayer.ind, 1);

    if(!this.LayerArray.length){
        this.addLayer();
    }else{
        if(this.currentLayer.ind == this.LayerArray.length){
            console.log('last Element...');
            this.switchCurrent(this.LayerArray[this.currentLayer.ind-1]);
        }else{
            this.switchCurrent(this.LayerArray[this.currentLayer.ind]);
        }
    }
    this.renderList();
}
Frame.prototype.renderList = function(){
    Helper.id('layers-container').innerHTML = "";
    var la = this.LayerArray;
    this.LayerArray.forEach(function(e){
        e.ind = la.indexOf(e);
        if(e.ind){
            Helper.id('layers-container').insertBefore(e.layerListElement, la[e.ind-1].layerListElement);
        }else{
            Helper.id('layers-container').appendChild(e.layerListElement);
        }
        e.setZind();
    });
}
Frame.prototype.moveLayer = function(amt){
    if((this.currentLayer.ind+1 + amt) <= 0 || (this.currentLayer.ind + amt) >= this.LayerArray.length){
    }else{
        if(amt>0){
            this.LayerArray.move(this.currentLayer.ind, (this.currentLayer.ind) + amt);
            this.renderList();
            /*
            Helper.id('layers-container').insertBefore(this.currentLayer.layerListElement, this.LayerArray[this.currentLayer.num-1].layerListElement);
            console.log(this.LayerArray[this.currentLayer.num-1]);
            this.LayerArray[this.currentLayer.num].num-= amt;
            this.currentLayer.num+= amt;
            */
        }else{
            this.LayerArray.move(this.currentLayer.ind, (this.currentLayer.ind) + amt);
            this.renderList();
        }
    }
}
Frame.prototype.switchCurrent = function(_layer){
    this.currentLayer = _layer;
    this.LayerArray.forEach(function(e){
        e.layerListElement.style.backgroundColor = "rgba(255,255,255,1)";
    });
    this.currentLayer.layerListElement.style.backgroundColor = "rgba(200,200,200,1)";
    Helper.id('curLayerNum').innerHTML = this.currentLayer.ind;
}

