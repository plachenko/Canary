
function ColorBox(_p){
    this.color_set = Object.create(null);
    this.colorObj = {
        r:0,
        g:0,
        b:0,
        a:1,
        getID: function(){
            return "r"+this.r+"g"+this.g+"b"+this.b+"a"+(this.a*100); 
        },
        getColor: function(){
            return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")"; 
        }
    }
    this.ColorBarArray = new Array();
}
ColorBox.prototype.create = function(_p){
    this.parent = _p;
    var thisObj = this;
    Bar2.colorBox_ref = thisObj;

    /*-- Color Preview Div --*/
    this.colorBox = Helper.makeEl({id:'color-box', css:{
        height: "50px",
        width: "50px",
        float: "left",
        border: "1px solid",
        backgroundColor:"#000"
    }})

    for(var i = 0; i<=3; i++){
        var barEl = Helper.makeEl({
            id:'color-bar-'+i, 
            css:{
                height: "20px",
                position: "relative",
                margin: "5px 0px" 
            }
        });
        this.parent.appendChild(barEl);
        var barprops = {};
        if(i == 0){
            barprops.lock = true;
            barprops.color = 'r';
        }
        else if(i == 1){
            barprops.lock = true;
            barprops.color = 'g';
        }
        else if(i == 2){
            barprops.lock = true;
            barprops.color = 'b';
        }
        else if(i == 3){
            barprops.color = 'a';
            barprops.divider = 100;
            barprops.val = {
                cur: 100,
                tot: 100,
                inc:10
            }
        }
        barprops.p = thisObj;
        var bar = new Bar2(barEl, barprops);
        this.ColorBarArray.push(bar);
        bar.colorEvent = new CustomEvent('colorChange', {'detail':{col:bar.colorSel, divider: bar.divider, val:bar.bar_ref.value}});
    }

    this.parent.appendChild(this.colorBox);
    this.colorBox.addEventListener('colorChange', function(e){
         thisObj.colorObj[e.detail.col] = e.detail.val.cur/e.detail.divider;
         this.style.backgroundColor = thisObj.colorObj.getColor();
    }, false);

    /*-- Color Save Div --*/
    this.colorSaveBox = Helper.makeEl({id:this.colorObj.getID(), 
        css:{
            height: "50px",
            marginLeft: "5px",
            width: this.parent.offsetWidth - 67 + 'px',
            float: "left",
            border: "1px solid",
            overflow: "auto"
        }
    });
    this.parent.appendChild(this.colorSaveBox);

    var clear = Helper.makeEl({css:{clear:"both"}});
    this.parent.appendChild(clear);
}

ColorBox.prototype.addToSet = function(){
    if(typeof this.color_set[this.colorObj.getID()] !== 'object'){
        this.color_set[this.colorObj.getID()] = {r:this.colorObj.r, g:this.colorObj.g, b:this.colorObj.b, a:this.colorObj.a};
        var colSave = new this.ColorSaveObj(this.colorObj, this.colorSaveBox, this);
    }
}

/*Color save swatches*/
ColorBox.prototype.ColorSaveObj = function(col, _p,_ref){
    this.element = Helper.makeEl({
        css:{
            width: "20px",
            margin: "1px",
            float: "left",
            height: "20px",
            backgroundColor:col.getColor(),
            boxSizing: 'border-box',
            cursor: 'pointer'
        }
    });

    _p.appendChild(this.element);
    this.element.id = col.getID();
    this.element.onmouseout = function(){
        this.style.border = "none";
    }
    this.element.onmouseover = function(){
        this.style.border = "1px solid";
    }
    this.element.onmouseup = function(){
        var thisSwatch = this;
        _ref.ColorBarArray.forEach(function(e){
            e.bar_ref.value.cur = _ref.color_set[thisSwatch.id][e.colorSel]*e.divider;
            e.update();
        });
    }
}
Bar2.prototype.update = function(){
    this.inputElement.value = this.bar_ref.value.cur/this.divider;
    this.bar_ref.innerBarElement.style.backgroundColor = this.setColor();
    var thisObj = this;
    if(this.parentObj.ColorBarArray.length == 4){
        if(this.lock){
            this.parentObj.ColorBarArray.forEach(function(e){
                if(e.checkElement.checked && thisObj.checkElement.checked){
                    e.bar_ref.value.cur = thisObj.bar_ref.value.cur;
                    e.inputElement.value = e.bar_ref.value.cur;
                    e.bar_ref.innerBarElement.style.backgroundColor = e.setColor();
                    thisObj.parentObj.colorBox.dispatchEvent(e.colorEvent);
                    e.bar_ref.update();
                }
            });
        }
        this.parentObj.colorBox.dispatchEvent(this.colorEvent);
    }
    this.bar_ref.update();
}
