var session = {};
session.midiHotkeys = 1; // change accordingly


var script = document.createElement('script');
	script.onload = function() {
		WebMidi.enable(function(err) { // hotkeys

			if (err) {
				console.log(err);
			}

			WebMidi.addListener("connected", function(e) {
				console.log(e);
			});
			WebMidi.addListener("disconnected", function(e) {
				console.log(e);
			});

			for (var i = 0; i < WebMidi.inputs.length; i++) { // Connect to all available MIDI controllers (for easy)
				var input = WebMidi.inputs[i];
				if (session.midiHotkeys==1){
					input.addListener('noteon', "all", function(e) { // Sample Actions based on NOTE values.
						console.log(e);
						var note = e.note.name + e.note.octave;
						if (note == "G3") {  // open and close the chat window
						//	toggleChat();
						} else if (note == "A3") { // mute your audio output
						//	toggleMute();
						} else if (note == "B3") { // mute your video output
						//	toggleVideoMute();
						} else if (note == "C4") { // enable / disable screenshare
						//	toggleScreenShare();
						} else if (note == "D4") { // completely kill your connection/session
						//	hangup();
						} else if (note == "E4") { // raise your hand; director sees this
						//	raisehand();
						} else if (note == "F4") { // start/stop local recording
						//	recordLocalVideoToggle();
						} else if (note == "G4") {  // Director Enables their Audio output
						//	press2talk(true);
						} else if (note == "A4") {  // Director cut's their audio/video output
						//	hangup2();
						}
					});
				} else if (session.midiHotkeys==2){  // an altnerative range of MIDI notes; the user can select this instead of MIDI=1 (default)
					input.addListener('noteon', "all", function(e) {
						console.log(e);
						var note = e.note.name + e.note.octave;
						if (note == "G1") {  // open and close the chat window
						//	toggleChat();
						} else if (note == "A1") { // mute your audio output
						//	toggleMute();
						} else if (note == "B1") { // mute your video output
						//	toggleVideoMute();
						} else if (note == "C2") { // enable / disable screenshare
						//	toggleScreenShare();
						} else if (note == "D2") { // completely kill your connection/session
						//	hangup();
						} else if (note == "E2") { // raise your hand; director sees this
						//	raisehand();
						} else if (note == "F2") { // start/stop local recording
						//	recordLocalVideoToggle();
						} else if (note == "G2") {  // Director Enables their Audio output
						//	press2talk(true);
						} else if (note == "A2") {  // Director cut's their audio/video output
						//	hangup2();
						}
					});
				} else if (session.midiHotkeys==3){  // MIDI option that reuses one key
					input.addListener('noteon', "all", function(e) {
						console.log(e);
						var note = e.note.name + e.note.octave;
						var velocity = e.velocity;
						if (note == "C1"){
							if (velocity == "0") {  // open and close the chat window
						//		toggleChat();
							} else if (note == "1") { // mute your audio output
						//		toggleMute();
							} else if (note == "2") { // mute your video output
						//		toggleVideoMute();
							} else if (note == "3") { // enable / disable screenshare
						//		toggleScreenShare();
							} else if (note == "4") { // completely kill your connection/session
						//		hangup();
							} else if (note == "5") { // raise your hand; director sees this
						//		raisehand();
							} else if (note == "6") { // start/stop local recording
						//		recordLocalVideoToggle();
							} else if (note == "7") {  // Director Enables their Audio output
						//		press2talk(true);
							} else if (note == "8") {  // Director cut's their audio/video output
						//		hangup2();
							}
						}
					});
				} else if (session.midiHotkeys==4){
					
					/* channel: 1
					controller: {number: 110, name: undefined}
					data: Uint8Array(3) [176, 110, 3]
					target: Input {_userHandlers: {…}, _midiInput: MIDIInput, …}
					timestamp: 98235.34000001382
					type: "controlchange"
					value: 3 */
					
					input.addListener('controlchange', "all", function(e) {  // control change is more flexible and less likely to interfere with other controllers
						console.log(e);
						var command = e.controller.number;
						var value = e.value;
						
						if (command == 110){  
							if (value == 0) {  // open and close the chat window
						//		toggleChat();
							} else if (value == 1) { // mute your audio output
						//		toggleMute();
							} else if (value == 2) { // mute your video output
						//		toggleVideoMute();
							} else if (value == 3) { // enable / disable screenshare
						//		toggleScreenShare();
							} else if (value == 4) { // completely kill your connection/session
						//		hangup();
							} else if (value == 5) { // raise your hand; director sees this
						//		raisehand();
							} else if (value == 6) { // start/stop local recording
						//		recordLocalVideoToggle();
							} else if (value == 7) {  // Director Enables their Audio output
						//		press2talk(true);
							} else if (value == 8) {  // Director cut's their audio/video output
						//		hangup2();
							}
						} else if (command > 110){ // 111 and up are Free game to use. These are not 'reserved' midi keys. 111=guest1, 112 = guest2, etc
							var guestslot = command-111;
							if (value == 0) { 
						//		var elements = document.querySelectorAll('[data-action-type="forward"][data--u-u-i-d]');
						//		if (elements[guestslot]) {
						//			directMigrate(elements[guestslot], true);
						//		}
							} else if (value == 1) { 
						//		var elements = document.querySelectorAll('[data-action-type="addToScene"][data--u-u-i-d]');
						//		if (elements[guestslot]) {
						//			directEnable(elements[guestslot], true);
						//		}
							} else if (value == 2) { 
						//		var elements = document.querySelectorAll('[data-action-type="mute-scene"][data--u-u-i-d]');
						//		if (elements[guestslot]) {
						//			directMute(elements[guestslot], true);
						//		}
							} else if (value == 3) { 
						//		var elements = document.querySelectorAll('[data-action-type="mute-guest"][data--u-u-i-d]');
						//		if (elements[guestslot]) {
						//			directMute(elements[guestslot], true);
						//		}
							}  else if (value == 4) { 
						//		var elements = document.querySelectorAll('[data-action-type="hangup"][data--u-u-i-d]');
						//		if (elements[guestslot]) {
						//			directHangup(elements[guestslot], true);
						//		}
							} else if (value == 5) { 
						//		var elements = document.querySelectorAll('[data-action-type="solo-chat"][data--u-u-i-d]');
						//		if (elements[guestslot]) {
						//			session.toggleSoloChat(elements[guestslot].dataset.UUID);
						//		}
							}
							
						}
					});
				}
			}
		});
	};
	script.src = "./thirdparty/webmidi.js"; // dynamically load this only if its needed. Keeps loading time down.
	document.head.appendChild(script);
}
