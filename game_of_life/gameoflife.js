
const canvas = document.querySelector("canvas").getContext("2d") ;
let height ;
let width ;
let cellSize = 10;
    
let gsize;
let grid;
let runnig = false;

function createGrid(height, width){
    grid = new Array(Math.floor(height));
    for(i= 0; i<grid.length;i++){
        grid[i] = new Array(Math.floor(width));
        for(j= 0; j<grid[i].length;j++){
            grid[i][j] = 0;
        }
        
    }
    
}

//buttons

//writen using arrow functions for comparicen
const pause = document.querySelector("#pause");
const play = document.querySelector("#play");
pause.onclick = function(){
    runnig = false;
    play.style = "background-color: #444;"
    pause.style = "background-color: #222;"

}

play.onclick = function(){
    runnig = true;
    play.style = "background-color: #222;"
    pause.style = "background-color: #444;"

}

document.querySelector("#gsize").onclick = function(){
    gsize = Number(document.querySelector("#gisize").value);
    createGrid(gsize,gsize);
    canvas.canvas.height = gsize*cellSize;
    canvas.canvas.width = gsize*cellSize;
}

document.querySelector("#cellSizeButton").onclick = function(){
    cellSize = Number(document.querySelector("#cellSize").value);
    createGrid(gsize,gsize);
    canvas.canvas.height = gsize*cellSize;
    canvas.canvas.width = gsize*cellSize;
}

document.querySelector("#delayinput").onclick = () => delay = Math.floor(document.querySelector("#delay").value/10);


document.querySelector("#fullScreen").onclick = fullScreen;


function fullScreen(){
    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;
    canvas.canvas.height = height-50;
    canvas.canvas.width = width;
    createGrid(height/cellSize,width/cellSize);
}

fullScreen();



//bow drawing on click
function draw(event) {
    //gets mouse position relative to the elements position
    let rect = event.target.getBoundingClientRect();
    let y = Math.floor(event.clientY/cellSize-rect.top/cellSize);
    let x = Math.floor(event.clientX/cellSize-rect.left/cellSize);
    if(y>=0 && x>=0){
        if(grid[y][x] == 0){
            grid[y][x] = 1;
        }else{
            grid[y][x] = 0; 
        }
    }
  }
//mouse event listener
document.querySelector("canvas").addEventListener("click", draw);

function update(){
    let newgrid = new Array(gsize);

    for( i = 0;i < grid.length;i++){//copia el array de arrays
        newgrid[i] = new Array(gsize);
        for( j = 0;j < grid[i].length;j++){
            newgrid[i][j]=(grid[i][j]);
        }
    }


    for( i = 0;i < grid.length;i++){
        for( j = 0;j < grid[i].length;j++){
             contador = 0;

            if(i>0){//comprueba si las tres de arribas son 1
                if(grid[i-1][j] == 1){contador++;}
                if(j<grid[i].length-1){if(grid[i-1][j+1] == 1){contador++;}}
                if(j>0){if(grid[i-1][j-1] == 1){contador++;}}
            }
            if(i<grid.length-1){//comprueba si las tres de abajo son 1
                if(grid[i+1][j] == 1){contador++;}
                if(j<grid[i].length-1){if(grid[i+1][j+1] == 1){contador++;}}
                if(j>0){if(grid[i+1][j-1] == 1){contador++;}}
            }
            if(j>0){if(grid[i][j-1] == 1){contador++;}}//izquierda
            if(j<grid[i].length-1){if(grid[i][j+1] == 1){contador++;}}//derecha

            if(grid[i][j] == 1 && (contador == 2 || contador == 3)){
                newgrid[i][j] = 1;
            }
            else if(grid[i][j] == 0 &&  contador == 3){
                newgrid[i][j] = 1;
            }
            else if(grid[i][j] == 1){
                newgrid[i][j] = 0;
            }
            
            
        }
        
        
    }
    for( i = 0;i < grid.length;i++){//copia el array de arrays
        for( j = 0;j < grid[i].length;j++){
            grid[i][j]= newgrid[i][j];
        }
    }
    
}

let cont = 0;
let delay =1;
function loop(){
    window.requestAnimationFrame(loop);//call the animation for the function on every frame
    
    if(runnig){
        if(cont <delay){
        update();
        cont = 10;
        }
        cont--;
    }
    for(i= 0; i<grid.length;i++){
        for(j= 0; j<grid[i].length;j++){
            if(grid[i][j]==0){
                canvas.fillStyle ="#000000";
            }else{
                canvas.fillStyle = "#FFFFFF";
            }
            canvas.fillRect(j*cellSize,i*cellSize,cellSize,cellSize)
        }
        
    }

    

    

}

loop();
