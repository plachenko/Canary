//Instantiate with new Bar('parentElement', 'properties')
var Bar_Obj_Added = 0;
function Bar(_p, _obj){
    Bar_Obj_Added++;
    var obj = _obj || {};
        obj.val = obj.val || {cur: 0, tot: 255, inc: 1};
        obj.id = obj.id || Bar_Obj_Added;
        obj.pad = obj.pad || 1;
        obj.bor = obj.bor || 1;

    
    this.id = obj.id;
    this.value = obj.val;
    this.paddingSize = obj.pad;
    this.borderSize = obj.bor;
    this.parentElement = _p
    this.height = this.parentElement.offsetHeight;
    this.width = this.parentElement.offsetWidth;
}
Bar.prototype.obj = function(){
    return this;
}
Bar.prototype.create = function(){
    var bar = this;
    this.barElement = Helper.makeEl({
        attr:{
            id:'bar-'+this.id,
            class:'bar' 
        },
        css:{
            position:'absolute', 
            height: this.height + 'px', 
            width: this.width + 'px', 
            padding: this.paddingSize+"px",
            border: this.borderSize+"px solid",
            boxSizing: "border-box"
        }
    });
    this.parentElement.appendChild(this.barElement);

    this.innerBarElement = Helper.makeEl({
        attr:{
            id:'inner-bar-'+this.id, 
            class:'inner-bar' 
        },
        css:{
            height:this.height - ((this.paddingSize*2) + (this.borderSize*2)) + "px", 
            width: this.innerWidth(),
            backgroundColor:"#F00"
        }
    });
    this.barElement.appendChild(this.innerBarElement);
}
Bar.prototype.up = function(){
    //console.log(this.value.tot - (this.value.tot%this.value.inc));
    this.value.cur += this.value.inc;
    this.update();
}
Bar.prototype.dn = function(){
    this.value.cur -= this.value.inc;
    this.update();
}
Bar.prototype.update = function(){
    if(this.value.cur <= 0){
        this.value.cur = 1;
    }
    if(this.value.cur >= this.value.tot){
        this.value.cur = this.value.tot-1;
    }
    this.innerBarElement.style.width = this.innerWidth() + "px"; 
}
Bar.prototype.innerWidth = function(){
    return (this.value.cur/this.value.tot)*(this.width - ((this.paddingSize*2) + (this.borderSize*2))); 
}

/* BAR AS SLIDER -- EXTENDS BAR CLASS*/
function Bar2(_p, _obj){
    var obj = _obj || {};
        obj.divider = obj.divider || 1;
        obj.color = obj.color || 'r';
        obj.p = obj.p || null;
        obj.lock = obj.lock || false;
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
    this.parentObj = obj.p;
    this.lock = obj.lock;
    this.lockWidth = 0;
    this.create();
}
Bar2.prototype.setColor = function(){
    this.color[this.colorSel] = this.bar_ref.value.cur;
    return "rgba("+this.color.r+","+this.color.g+","+this.color.b+","+this.color.a+")"; 
}
Bar2.prototype.create = function(){

    var modObj = this;
    var barObj = this.bar_ref;
        barObj.mouseIsDown = false;

    if(this.lock){
        this.checkElement = Helper.makeEl({
            type:"input",
            attr:{
                type: "checkbox"
            },
            css:{
                width: "14px",
                float: "left", 
                padding: "0px",
                margin: "0px"
            }
        });
        this.bar_ref.parentElement.appendChild(this.checkElement);
        this.lockWidth = 16;
    }else{
        this.checkElement ={checked:false};

    }
    this.bar_ref.width -= (this.input.width +this.lockWidth); 
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
    this.bar_ref.barElement.style.left = this.lockWidth+"px";

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
            left:this.lockWidth+"px",
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
    this.bar_ref.update();
}

