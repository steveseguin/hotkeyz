# hotkeyz - Generic hotkey boilerplate for websites

streamDeck friendly

Included are different methods of implementing hotkeys support into yourself, with sample functionality for a conferencing-centric website.

## Global Hotkey Support via MIDI controllers 🎹

Requires a MIDI virtual controller.

For PC: http://www.tobias-erichsen.de/software/loopmidi.html
For Mac:

For different key layouts, you can set  1 or 2 or 3 or 4 to the midi session variable.

The example MIDI hotkeys are configured to control a fictional conferencing app, with layout being:

### midi=1

| MIDI message 	| Example Function
|--------------	|----------	
| Note G3 	    | Toggle Chat	
| Note A3       | Toggle Mute        	
| Note B3       | Toggle Video Output      	
| Note C4       | Toggle Screen Share      	
| Note D4       | Hang up      	
| Note E4       | Raise Hand Toggle      	
| Note F4       | Record Local Video Toggle      	
| Note G4       | Enable the Director’s audio [director only]      	
| Note A4       | Stop the Director’s Audio [director only]      	


### midi=2

| MIDI message 	| Example Function
|--------------	|----------	
| Note G1 	    | Toggle Chat	
| Note A1       | Toggle Mute        	
| Note B1       | Toggle Video Output      	
| Note C2       | Toggle Screen Share      	
| Note D2       | Hang up      	
| Note E2       | Raise Hand Toggle      	
| Note F2       | Record Local Video Toggle      	
| Note G2       | Enable the Director’s audio [director only]      	
| Note A2       | Stop the Director’s Audio [director only]    

### midi=3

| MIDI message 	| Example Function
|--------------	|----------	
| Note C1 + Velocity 0 	| Toggle Chat	
| Note C1 + Velocity 1  | Toggle Mute        	
| Note C1 + Velocity 2  | Toggle Video Output      	
| Note C1 + Velocity 3  | Toggle Screen Share      	
| Note C1 + Velocity 4  | Hang up      	
| Note C1 + Velocity 5  | Raise Hand Toggle      	
| Note C1 + Velocity 6  | Record Local Video Toggle      	
| Note C1 + Velocity 7  | Enable the Director’s audio [director only]      	
| Note C1 + Velocity 8  | Stop the Director’s Audio [director only]   

### midi=4, control change-based

| MIDI message   	| Example Function
|---------------------	|----------	
| Command = 110	        | with values accepted from 0 to 8 for local toggle options.	
| Command = 110+N       | where N is the guest’s order in the control room.        	

In this case, for hotkeying remote guests as a director:

| MIDI message   | Example Function
|--------------- |----------	
| Value 0        | Opens the Transfer Popup	
| Value 1        | Add/remove from scene        	
| Value 2        | Mute guest in scene	
| Value 3        | Mute guest everyone    
| Value 4        | Hangup the guest
| Value 5        | Toggle Solo Chat with this guest    
