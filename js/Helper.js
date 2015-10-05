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
