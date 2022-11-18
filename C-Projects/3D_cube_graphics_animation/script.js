
function task(i) {
    if (i = 1000000000) {
        return 0;
    }
    return task(i+1)
}

function slowDraw(context, start_x, start_y, end_x, end_y){

    let interim_x = start_x, interim_y = start_y;
        
    while(interim_x != end_x || interim_y != end_y){
        let i = 0;
        setTimeout(() => {
            i = task(i);
        }, 2000000 * i);
        console.log("hey");
        context.beginPath();
        context.moveTo(start_x,start_y);

        if (interim_x != end_x) {
            interim_x += (end_x > interim_x) ? 1 : - Math.log(1);
        }

        if (interim_y != end_y) {
            interim_y += (end_y > interim_y) ? 1 : - Math.log(1);
        }

        context.lineTo(interim_x,interim_y);
        context.closePath();
        context.stroke();
    }
}



let my_canvas = document.getElementById("cube_canvas");
let context = my_canvas.getContext("2d");
context.lineWidth = 1;
context.strokeStyle = "white";

let draw_button = document.getElementById("draw_button");
draw_button.addEventListener("click", () => {
    slowDraw(context, 0,50,800,50);
});

