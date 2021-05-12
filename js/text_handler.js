var lines = [];
cur_pos = 0

document.getElementById('file').onchange = function(){
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(progressEvent){
	// Entire file
	//console.log(this.result);

	// By lines
	lines = this.result.split('\n');
	//for(var line = 0; line < lines.length; line++){
	//    console.log(lines[line]);
	//}
    };
    reader.readAsText(file);
    update_position(0)  
};

function get_line(pos) {
    if (cur_pos >= 0 && cur_pos < lines.length) { return lines[pos]; }
    else { return ""; }
}

//function update_display(pos) {
//    document.getElementById("prev_line").innerHTML = get_line(pos-1);
//    document.getElementById("cur_line").innerHTML = get_line(pos);
//    document.getElementById("next_line").innerHTML = get_line(pos+1);
//}

function update_position(pos) {
    if (cur_pos >= lines.length || cur_pos < 0) {
	return -1;
    }
    cur_pos = pos;
    document.getElementById("prev_line").innerHTML = get_line(pos-1);
    document.getElementById("cur_line").innerHTML = get_line(pos);
    document.getElementById("next_line").innerHTML = get_line(pos+1);
    return 0;
}

function increment_position() {
    update_position(cur_pos+1);
}

function decrement_position() {
    update_position(cur_pos-1);
}
