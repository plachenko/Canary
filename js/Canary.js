function Canary(){
    this.frameArray = new Array();
    this.addFrame();
    this.curFrame =0;
    this.index = 0;
}
Canary.prototype.switchCurrent = function(_frame){
    this.currentFrame = _frame;
    Helper.id('container').innerHTML = "";
    Helper.id('layers-container').innerHTML = "";
    this.currentFrame.renderList();
    this.frameArray.forEach(function(e){
        e.frameListElement.style.backgroundColor = "rgba(255,255,255,1)";
    });
    this.currentFrame.frameListElement.style.backgroundColor = "rgba(200,200,200,1)";
}
Canary.prototype.remFrame = function(){

}
Canary.prototype.addFrame = function(){
    var frame = new Frame();
    var _cnryRef = this;
    this.frameArray.push(frame);
    frame.frameListElement = Helper.makeEl({
        attr:{},
        css:{
            position:"relative",
            padding: "5px 0px 5px 5px",
            borderTop: "1px solid",
            width: Helper.id('frames-container').offsetWidth+"px",
        }
    });
    frame.frameListElement.innerHTML = "<span>"+'Frame'+"</span>";
    frame.frameListElement.onmousedown = function(){
        console.log(frame);
        console.log(_cnryRef.frameArray.indexOf(frame));
    }
    Helper.id('frames-container').appendChild(frame.frameListElement);
    this.switchCurrent(frame);
    frame.addLayer();
}
