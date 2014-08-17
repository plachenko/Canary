function gridO(_el){
    var gridObj = new Object();
        gridObj.el  = _el;
        gridObj.division = 16;
        gridObj.size = 2;
        //TODO Consider moving viewlock...
        gridObj.viewLock = false;
        gridObj.hidden = false;
        gridObj.color = {
            r:100,
            g:100,
            b:100,
            a:.3, 
            getCol: function(){
                return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")"
            }
        }
    

        gridObj.gridDiv = document.createElement('div');
        gridObj.gridDiv.id = "cnry-grid-div"
        gridObj.gridDiv.style.zIndex = "9997";
        gridObj.gridDiv.style.top = "0px";
        gridObj.gridDiv.style.left = "0px";
        gridObj.gridDiv.style.position = "absolute";
        gridObj.gridDiv.style.width = "100%"
        gridObj.gridDiv.style.height = "100%"
        gridObj.el.appendChild(gridObj.gridDiv);

        if(gridObj.gridDiv){
            gridObj.render;
        }

    gridObj.setSize = function(_size){
        if(_size<=1){
            this.size = 1; 
            gridObj.gridDiv.innerHTML = "";
        }else{
            this.size = _size;
            gridObj.render();
        }
        return this.size;
    }

    gridObj.snap = function(_val){
        return this.size * Math.round(_val/this.size);
    }

    gridObj.zoomIn = function(){
        canGrid.size++;
        canGrid.setSize(canGrid.size);
        draw();
        //TODO-Add clearRect Method tie in.

    }

    gridObj.zoomOut = function(){
        canGrid.size--;
        canGrid.setSize(canGrid.size);
        //draw();
        //TODO-Add clearRect Method tie in.

    }
    
    gridObj.togView = function(){
        if(!gridObj.hidden){
            gridObj.hidden = true;
            gridObj.gridDiv.style.display = "none";
        }else{
            gridObj.hidden = false;
            gridObj.gridDiv.style.display = "block";
        }

    }

    gridObj.render = function(){
        gridObj.width = gridObj.el.offsetWidth; 
        gridObj.height = gridObj.el.offsetHeight; 
        gridObj.gridDiv.innerHTML = "";
        for(var i = 0; i < this.height/this.size; i++){
            var colDiv = document.createElement('div');
                colDiv.className = "cnry-col-div";
                colDiv.style.position = "absolute";
                colDiv.style.boxSizing = "border-box";
                colDiv.style.left = "0px";
                colDiv.style.top = this.size*i+"px";
                colDiv.style.width = "100%";
                colDiv.style.height = this.size+"px";
                if(i % this.division){
                    colDiv.style.borderTop = this.color.getCol() + "1px solid";
                }else{
                    colDiv.style.borderTop = "#F00 1px solid";
                }
            gridObj.gridDiv.appendChild(colDiv);
        }
        for(var i = 0; i < this.width / this.size; i++){
            var colDiv = document.createElement('div');
                colDiv.className = "cnry-col-div";
                colDiv.style.position = "absolute";
                colDiv.style.boxSizing = "border-box";
                colDiv.style.left = this.size*i + "px";
                colDiv.style.top = "0px";
                colDiv.style.width = this.size + "px";
                colDiv.style.height = "100%";
                if(i % this.division){
                    colDiv.style.borderLeft = this.color.getCol() + "1px solid";
                }else{
                    colDiv.style.borderLeft = "#F00 1px solid";
                }
            gridObj.gridDiv.appendChild(colDiv);
        }
    }
    return gridObj;
}

function makeGrid(_el, size){
    var grid = new gridO(_el);
    grid.setSize(size);

    return grid;

}
