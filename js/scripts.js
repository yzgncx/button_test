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

function addTimeStamp(action) {
    line=action+'\t'+(new Date().getTime())
    timestamps.push(line);
}

function play(tone_id) {
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++) sounds[i].pause();
    var audio = document.getElementById(tone_id);
    audio.play();
}
