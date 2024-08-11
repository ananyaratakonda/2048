
var board;
var score = 0;
var row = 4;
var col = 4; 

window.onload = function(){
    setGame();
} /* when the page loads  */

function setGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
        
    ]
     /**
    board = [
        [2,2,2,2],
        [2,2,2,2],
        [4,4,8,8],
        [4,4,8,8]
    ]
   
        board = [
        [2,0,0,0],
        [0,4,16,0],
        [0,8,32,0],
        [0,0,0,64]
    ]

     */

    for(let r = 0; r < row; r++){
        for(let c = 0; c < col; c++){
            // this creates a div tag <div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for(let r = 0; r < row; r++){
        for(let c = 0; c < col; c++){
            if(board[r][c] == 0 ){
                return true;
            }
        }
    }
    return false; 
}

function setTwo(){
    if(!hasEmptyTile()){
        return;
    }
    let found = false; 
    while(!found){
        let r = Math.floor(Math.random() * row);
        let c = Math.floor(Math.random() * col);

        if(board[r][c] == 0){
            board[r][c] = 2; 
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true; 
        }
    } 
}


function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = ""; // will update the tile class like from x2 to x4 
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText = num;
        if(num <= 4096){
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score; 
})

function filterZero(rows){
    return rows.filter(num => num != 0); // new array 
}

function slide(rows){
    rows = filterZero(rows); 
    for(let i = 0; i < rows.length-1; i++){
        if(rows[i] == rows[i+1]){
            rows[i] *= 2;
            rows[i+1] = 0; 
            score += rows[i]; 
        }
    }
    rows = filterZero(rows);

    while(rows.length < col){
        rows.push(0);
    }
    return rows; 
}

function slideLeft(){
    for(let r = 0; r < row ; r++){
        let rows = board[r];
        rows = slide(rows);
        board[r] = rows;

        for(let c = 0; c< col; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }

}

function slideRight(){
    for(let r = 0; r < row ; r++){
        let rows = board[r];
        rows.reverse();
        rows = slide(rows);
        rows.reverse();
        board[r] = rows;

        for(let c = 0; c< col; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }

}

function slideUp(){
    for(let c = 0; c < col; c++){
        let rows = [board[0][c],board[1][c], board[2][c],board[3][c]];
        rows = slide(rows);
        board[0][c] = rows[0];
        board[1][c] = rows[1];
        board[2][c] = rows[2];
        board[3][c] = rows[3];

        for(let r = 0; r< row; r++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideDown(){
    for(let c = 0; c < col; c++){
        let rows = [board[0][c],board[1][c], board[2][c],board[3][c]];
        rows.reverse();
        rows = slide(rows);
        rows.reverse();

        for(let r = 0; r< row; r++){
            board[r][c] = rows[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}