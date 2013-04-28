#pragma strict

private var playing:int;
var things : GameObject[];
private var time = 0.0;
private var startLoc;
var blackScreenCam : Camera;
private var missing : int;

function Start () {
	playing = 0;
	startLoc = GameObject.FindGameObjectWithTag("Player").transform.position;
	missing = Random.Range(0, 27);
	Debug.Log(things[missing].name);
}

function Update() {
	//if (playing > 1)
		time += 1 * Time.deltaTime;
}

function OnGUI() {
	Debug.Log("PLAYING WITH "+playing);
	if (playing == 0) {
		GameObject.FindWithTag("Player").GetComponent(CharacterMotor).enabled = false;
		GameObject.FindWithTag("Player").GetComponent(MouseLook).enabled = false;
		GameObject.FindWithTag("Player").GetComponent(FPSInputController).enabled = false;
		GameObject.FindWithTag("Player").transform.FindChild("Main Camera").GetComponent(MouseLook).enabled = false;
		var gameStr = "Show and tell day!\n\n"+
					"Directions:\n"+
					"The school is full of quite a mix of things!\n"+
					"You have 30 seconds to look around and take it all in.\n"+
					"Then, you will go through again and determine what is missing!\n"+
					"Select a difficulty to change how many items will disappear.";
		GUI.Box(Rect(20, 20, 400, 400), gameStr);
		/*if (GUI.Button(Rect(20, 430, 133, 100), "Easy")) {
			GameObject.FindWithTag("Player").GetComponent(CharacterMotor).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(MouseLook).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(FPSInputController).enabled =true;
			GameObject.FindWithTag("Player").transform.FindChild("Main Camera").GetComponent(MouseLook).enabled = true;
			playing = 1;
		}
		else if (GUI.Button(Rect(153, 430, 133, 100), "Medium")) {
			GameObject.FindWithTag("Player").GetComponent(CharacterMotor).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(MouseLook).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(FPSInputController).enabled = true;
			GameObject.FindWithTag("Player").transform.FindChild("Main Camera").GetComponent(MouseLook).enabled = true;
			playing = 1;
		}
		else if (GUI.Button(Rect(286, 430, 133, 100), "Hard")) {
			GameObject.FindWithTag("Player").GetComponent(CharacterMotor).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(MouseLook).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(FPSInputController).enabled = true;
			GameObject.FindWithTag("Player").transform.FindChild("Main Camera").GetComponent(MouseLook).enabled = true;
			playing = 1;
		}*/
		if (GUI.Button(Rect(20, 430, 400, 100), "Play")) {
			GameObject.FindWithTag("Player").GetComponent(CharacterMotor).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(MouseLook).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(FPSInputController).enabled =true;
			GameObject.FindWithTag("Player").transform.FindChild("Main Camera").GetComponent(MouseLook).enabled = true;
			playing = 1;
		}
		else if (GUI.Button(Rect(Screen.width-410, Screen.height-110, 400, 100), "Quit")) {
			Application.LoadLevel(1);
		}
	}
	else {
		if (time > 30) {
			playing++;
			time = 0.0;
		}
		if (playing == 1) {
			GUI.Box(Rect(20, 20, 200, 200), "Look around.\n\nTime:\t\t"+System.Math.Floor(time));
			if (GUI.Button(Rect(Screen.width-410, Screen.height-110, 400, 100), "Quit")) {
				Application.LoadLevel(1);
			}
		}
		else if (playing == 2) {
			things[missing].active = false;
			if (time < 6) {
				GameObject.FindWithTag("Player").transform.FindChild("Main Camera").active = false;
				blackScreenCam.active = true;
			}
			else {
				GameObject.FindWithTag("Player").transform.FindChild("Main Camera").active = true;
				GameObject.FindWithTag("Player").SetActiveRecursively(true);
				//blackScreenCam.GetComponent(BlackScreenCam).cleanup();
				blackScreenCam.active = false;
				things[missing].active = true;
				playing = 3;
				time = 0.0;
			}
		}
		else if (playing == 3) {
			GameObject.FindWithTag("Player").GetComponent(CharacterMotor).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(MouseLook).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(FPSInputController).enabled =true;
			GameObject.FindWithTag("Player").transform.FindChild("Main Camera").GetComponent(MouseLook).enabled = true;
			GameObject.FindGameObjectWithTag("Player").transform.position = startLoc;
			GUI.Box(Rect(20, 20, 200, 200), "Find what is missing!\n\nTime:\t\t"+System.Math.Floor(time));
			if (GUI.Button(Rect(Screen.width-410, Screen.height-110, 400, 100), "Quit")) {
				Application.LoadLevel(1);
			}
		}
		else if (playing == 4) {
			if (time < 6) {
				GameObject.FindWithTag("Player").transform.FindChild("Main Camera").active = false;
				blackScreenCam.active = true;
			}
			else {
				GameObject.FindWithTag("Player").transform.FindChild("Main Camera").active = true;
				GameObject.FindWithTag("Player").SetActiveRecursively(true);
				//blackScreenCam.GetComponent(BlackScreenCam).cleanup();
				blackScreenCam.active = false;
				things[missing].active = true;
				playing = 5;
				time = 0.0;
			}
		}
		else if (playing == 5) {
			GameObject.FindWithTag("Player").GetComponent(CharacterMotor).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(MouseLook).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(FPSInputController).enabled =true;
			GameObject.FindWithTag("Player").transform.FindChild("Main Camera").GetComponent(MouseLook).enabled = true;
			GameObject.FindGameObjectWithTag("Player").transform.position = startLoc;
			GUI.Box(Rect(20, 20, 200, 200), "Click on the missing object!");
			if (GUI.Button(Rect(Screen.width-410, Screen.height-110, 400, 100), "Quit")) {
				Application.LoadLevel(1);
			}
		}
		else {
			if (GUI.Button(Rect((Screen.width-200)/2, (Screen.height-200)/2, 200, 200), "YOU WIN! Click here to quit.")) {
				Application.LoadLevel(1);
			}
		}
		if (!blackScreenCam.active)
			GameObject.FindWithTag("Player").transform.FindChild("Main Camera").active = true;
	}
}

function isCorrect(target:GameObject) {
	if (things[missing].name == target.name) {
		playing = 6;
	}
}