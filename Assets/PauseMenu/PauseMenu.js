#pragma strict

private var showMenu = false;
var background : Texture2D;

function Update() {
	if(Input.GetKeyDown(KeyCode.LeftControl) || Input.GetKeyDown(KeyCode.RightControl)) {
		showMenu = true;
	}
}

function OnGUI() {
	if (showMenu) {
		GameObject.FindWithTag("Player").GetComponent(MouseLook).enabled = false;
		GameObject.FindWithTag("Player").GetComponent(CharacterMotor).enabled = false;
		GameObject.FindWithTag("Player").GetComponent(FPSInputController).enabled = false;
		GameObject.FindWithTag("Player").transform.FindChild("Main Camera").GetComponent(MouseLook).enabled = false;
		var boxWidth = 500;
		var boxHeight = 500;
		GUI.Box(Rect((Screen.width - boxWidth) / 2, (Screen.height - boxHeight) / 2, boxWidth, boxHeight), background);
		var menuStr = "GAME PAUSED" + "\n\n\n"
						+ "Select an option below";
		GUI.Box(Rect((Screen.width - boxWidth) / 2, (Screen.height - boxHeight) / 2, boxWidth, boxHeight), menuStr);
		var btnWidth = 400;
		var btnHeight = 50;
		var btnResumeStr = "Resume Game";
		if (GUI.Button(Rect((Screen.width - btnWidth) / 2,
						    ((Screen.height - boxHeight) / 2) + btnHeight * 2,
							 btnWidth, btnHeight), btnResumeStr)) {
			showMenu = false;
			GameObject.FindWithTag("Player").GetComponent(MouseLook).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(CharacterMotor).enabled = true;
			GameObject.FindWithTag("Player").GetComponent(FPSInputController).enabled = true;
			GameObject.FindWithTag("Player").transform.FindChild("Main Camera").GetComponent(MouseLook).enabled = true;
		}
		var btnLoadStr = "Load Saved Game";
		if (GUI.Button(Rect((Screen.width - btnWidth) / 2,
						    ((Screen.height - boxHeight) / 2) + btnHeight * 4,
							 btnWidth, btnHeight), btnLoadStr)) {
			//Application.LoadLevel(0);
		}
		var btnSaveStr = "Save Progress";
		if (GUI.Button(Rect((Screen.width - btnWidth) / 2,
						    ((Screen.height - boxHeight) / 2) + btnHeight * 6,
							 btnWidth, btnHeight), btnSaveStr)) {
			//Application.LoadLevel(0);
		}
		var btnQuitStr = "Quit to Main Menu";
		if (GUI.Button(Rect((Screen.width - btnWidth) / 2,
						    ((Screen.height - boxHeight) / 2) + btnHeight * 8,
							 btnWidth, btnHeight), btnQuitStr)) {
			Application.LoadLevel(0);
		}
	}
}