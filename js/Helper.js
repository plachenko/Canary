Array.prototype.move = function(old_index, new_index){
    while( old_index < 0 ){
        old_index+=this.length;
    }
    while( new_index < 0 ){
        new_index += this.length;
    }
    if(new_index>= this.length){
        var k = new_index - this.length;
        while((k--)+1){
            console.log(this);
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this;
};
var Helper = { 
    id: function(el){
        return document.getElementById(el);
    },
    makeEl: function(props){
        props = props || {};
        props.id = props.id || null;
        props.class = props.class || null;
        props.type = props.type || 'div';
        props.css = props.css || {};
        props.attr = props.attr || {};

        var el = document.createElement(props.type);
            el.id = props.id;
            el.class = props.class;
        for(i in props.attr){
            el.setAttribute(i, props.attr[i]);
        }
        for(i in props.css){
            el["style"][i] = props.css[i];
        }
        return el;
    },
    color:{
        r: 0,
        g: 0,
        b: 0, 
        a:1,
        set: function(_prop){
            var prop = _prop || {};
                prop.r = prop.r || this.r;
                prop.g = prop.g || this.g;
                prop.b = prop.b || this.b;
                prop.a = prop.a || this.a;
                
            this.r = prop.r;
            this.g = prop.g;
            this.b = prop.b; 
            this.a = prop.a; 

            return this;
        },
        rand: function(){
            this.r = Math.round(Math.random()*255);
            this.g = Math.round(Math.random()*255);
            this.b = Math.round(Math.random()*255); 

            return this;
        },
        ret: function(){
            return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
        }
    },
    keyObj: {
        actionKey: 32,
        pencilTog: 49,
        eraserTog: 50,
        bindTog: 51,
        upKey:75,
        downKey:74,
        leftKey:72,
        rightKey:76,
        lockX:65,
        lockY:83,
        switchTool:81,
        zoomIn:90,
        zoomOut:88
    }
};
