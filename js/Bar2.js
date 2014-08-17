function Bar2(_p, _obj){
    var obj = _obj || {};
        obj.divider = obj.divider || 1;
        obj.color = obj.color || null;
        obj.p = obj.p || null;
    this.bar_ref = new Bar(_p, obj)
    this.input = {
        maxlength: 3,
        width: 50,
        height: this.bar_ref.height
    }
    this.color = {
        r:0,
        g:0,
        b:0,
        a:1
    }
    this.colorSel = obj.color;
    this.divider = obj.divider;
    this.overlayOffset = 5;
    this.colorBox_ref = obj.p.colorBox;
    this.create();
}
Bar2.prototype.setColor = function(){
    this.color[this.colorSel] = this.bar_ref.value.cur;
    return "rgba("+this.color.r+","+this.color.g+","+this.color.b+","+this.color.a+")"; 
}
Bar2.prototype.create = function(){

    this.colorEvent = new CustomEvent('colorChange', {'detail':{col:this.colorSel, divider: this.divider, val:this.bar_ref.value}});

    var modObj = this;
    var barObj = this.bar_ref;
        barObj.mouseIsDown = false;

    this.bar_ref.width -= this.input.width; 
    this.checkElement = Helper.makeEl({
        type:"input",
        attr:{
            type: "checkbox"
        }
    });
    this.bar_ref.parentElement.appendChild(this.checkElement);
    this.inputElement = Helper.makeEl({
        type:"input",
        attr:{
            maxlength: this.input.maxlength,
            id:"bar_input"+this.bar_ref.id
        },
        css:{
            position:'absolute',
            zIndex:9999,
            right: "0px",
            height:this.input.height+"px", 
            width:this.input.width-this.overlayOffset+"px",
            padding: "0px",
            border: "1px solid",
            boxSizing: "border-box",
            top:"0px",
        }
    });
    this.bar_ref.parentElement.appendChild(this.inputElement);

    this.bar_ref.create();

    this.bar_ref.barElement.tabIndex = 1;
    this.overElement = Helper.makeEl({
        attr:{
            id:"bar_over"+this.bar_ref.id
        },
        css:{
            position:'absolute',
            zIndex:9999,
            height:"100%", 
            width:this.bar_ref.width+this.overlayOffset+"px",
            top:"0px",
            left:"0px",
        }
    });
    this.bar_ref.parentElement.appendChild(this.overElement);

    this.bar_ref.barElement.onkeydown = function(e){
        switch(e.which){
            case 37:
                barObj.dn();
                break;
            case 39:
                barObj.up();
                break;
        }
    }
    this.inputElement.onkeydown = function(e){
        if(e.which == 13){
            barObj.value.cur = this.value;
            modObj.update();
        }
    }
    this.inputElement.onmousedown = function(e){
        this.focus();
        this.select();
    } 
    this.overElement.onmousewheel = function(e){
        if(e.wheelDelta > 0){
            barObj.value.cur += barObj.value.inc;
        }else{
            barObj.value.cur -= barObj.value.inc;
        }
        modObj.update();
        return false;
    }
    this.overElement.onmousemove = function(e){
        if(barObj.mouseIsDown || document.mouseIsDown){
            barObj.value.cur =  barObj.value.inc*Math.round((e.offsetX*(barObj.value.tot/barObj.width)/barObj.value.inc));
            modObj.update();
        }
    }
    this.overElement.onmouseup = function(e){
        barObj.mouseIsDown = false;
    }
    this.overElement.onmouseover = function(e){
        if(document.mouseIsDown){
            barObj.value.cur =  barObj.value.inc*Math.round((e.offsetX*(barObj.value.tot/barObj.width)/barObj.value.inc));
            modObj.update();
            barObj.barElement.focus();
        }
    }
    this.overElement.onmouseout = function(e){
        barObj.mouseIsDown = false;
    }
    this.overElement.onmousedown = function(e){
        barObj.value.cur =  barObj.value.inc*Math.round((e.offsetX*(barObj.value.tot/barObj.width)/barObj.value.inc));
        modObj.update();

        barObj.mouseIsDown = true;
        barObj.barElement.focus();

        return false;
    }
    this.update();
}
Bar2.prototype.update = function(){
    this.inputElement.value = this.bar_ref.value.cur/this.divider;
    this.bar_ref.innerBarElement.style.backgroundColor = this.setColor();
    if(this.bar_ref.parentElement.children.length == 3){
        this.colorBox_ref.dispatchEvent(this.colorEvent);
    }
    this.bar_ref.update();
}
