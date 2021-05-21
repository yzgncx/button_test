var lines = [];
cur_pos = 0

window.onload = function() {

    const realFileBtn = document.getElementById("file");
    const customBtn = document.getElementById("custom-button");
    const customTxt = document.getElementById("custom-text");
    const lineNumber = document.getElementById("line_number");
    
    customBtn.addEventListener("click", function() {
	realFileBtn.click();
    });

    realFileBtn.addEventListener("change", function() {
	if (realFileBtn.value) {
	    customTxt.innerHTML = realFileBtn.value.match(
		/[\/\\]([\w\d\s\.\-\(\)]+)$/
	    )[1];
	} else {
	    customTxt.innerHTML = "No file selected.";
	}
    });

    lineNumber.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
	    update_position(document.getElementById("line_number").value);
	}
    });
    
    document.getElementById('file').onchange = function(){
	var file = this.files[0];
	var reader = new FileReader();
	reader.onload = function(progressEvent){
	    // Entire file
	    //console.log(this.result);

	    // By lines
	    lines = this.result.split('\n');
	    //for(var line = 0; line < lines.length; line++){
	    //  console.log(lines[line]);
	    //}
	};
	reader.readAsText(file);
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// CSS UPDATER FUNCTIONS //////////////////////////////////////////

function unlock_start_session() {
    var sessionButton=document.getElementById("session-button");
    sessionButton.className = "button button_big";
    sessionButton.onclick = function () { play('tone_440');
					  update_position(0);
					  unlock_timestamps();
					}
}

function unlock_timestamps() {
    var acceptButton=document.getElementById("accept-button");
    acceptButton.className= "button button_big button_accept";
    acceptButton.onclick = function () { addTimeStamp(this,'accept');
					 increment_position();
    }
    var rejectButton=document.getElementById("reject-button");
    rejectButton.className= "button button_big button_reject";
    rejectButton.onclick = function () { addTimeStamp(this,'reject');
    }
    var otherButton=document.getElementById("other-button");
    otherButton.className= "button button_big button_other";
    otherButton.onclick = function () { addTimeStamp(this,'ohshoot');
    }
    var downloadButton=document.getElementById("download-button");
    downloadButton.className= "button"
    downloadButton.onClick = function () { download(document.getElementById('text').value)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// TEXT HANDLER FUNCTIONS /////////////////////////////////////////

function get_line(pos) {
    if (pos >= 0 && pos < lines.length) { return lines[pos]; }
    else { return ""; }
}

function update_position(pos) {
    if (pos >= lines.length || pos < 0) {
	return -1;
    }
    cur_pos = Number(pos);
    document.getElementById("prev_line").innerHTML = (cur_pos-1) + "&emsp;&emsp;" + get_line(pos-1);
    document.getElementById("cur_line").innerHTML = (cur_pos) + "&emsp;&emsp;" + get_line(pos);
    document.getElementById("next_line").innerHTML = (cur_pos+1) + "&emsp;&emsp;" + get_line(pos+1);
    document.getElementById("line_number").value = cur_pos;
    return 0;
}

function increment_position() {
    update_position(cur_pos+1);
}

function decrement_position() {
    update_position(cur_pos-1);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


var timestamps=new Array

function formatDate(date) {
    var d = new Date(date),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('');
}

    
function download(sessionNotes) {
    var filename=formatDate((new Date()))+'.txt';
    var timestamps_copy=timestamps.slice(0);
    var text=sessionNotes+'\n\n'+timestamps.join("\n");
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function foo() {
    console.log(timestamps)
}

function addTimeStamp(obj,action) {
    line=action+'\t'+(new Date().getTime())
    timestamps.push(line);
    obj.disabled = true;
    setTimeout(function() {
        obj.disabled = false;
    }, 1000);
}

function play(tone_id) {
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++) sounds[i].pause();
    var audio = document.getElementById(tone_id);
    audio.play();
}

