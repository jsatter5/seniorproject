#pragma strict

var menu : AudioClip;

function OnGUI() {
	var outX = (Screen.width - 800) / 2;
	var outY = (Screen.height - 300) / 2;
	var outWidth = 800;
	var outHeight = 350;
	var outStr = "Welcome to the Mind-Controlled ADHD Game";
	GUI.Box(Rect(outX, outY, outWidth, outHeight), outStr);
	if (GUI.Button(Rect(outX + 50, outY + 50, outWidth - 100, 50), "New Game")) {
		//World.incCounter();
		Application.LoadLevel(1);
	}
	if (GUI.Button(Rect(outX + 50, outY + 150, outWidth - 100, 50), "Load Game")) {
		Application.LoadLevel(1);
	}
	if (GUI.Button(Rect(outX + 50, outY + 250, outWidth - 100, 50), "View Statistics")) {
		Application.LoadLevel(1);
	}
	//AudioSource.time = 15; 
	/*var a : AudioSource;
	a = transform.audio;
	if (a.isPlaying == false) {
		a.time = 15;
		AudioSource.PlayClipAtPoint(menu, transform.position);
		//a.PlayOneShot(menu, 1.0);
	}*/
	
	//a.Play();
	//AudioSource.PlayClipAtPoint(menu, transform.position);
}