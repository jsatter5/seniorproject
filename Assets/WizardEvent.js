#pragma strict

private var cam : Camera;
private var startObj : GameObject;
private var stopObj : GameObject;
private var timeInSeconds = 0.5;
private var manager : GameObject;

function Start () {
	cam = transform.FindChild("WizardCamera").camera;
	startObj = transform.FindChild("WizardCamStart").gameObject;
	stopObj = transform.FindChild("WizardCamStop").gameObject;
	cam.transform.position = startObj.transform.position;
	manager = GameObject.Find("GameManager");
}

function Update () {
	 cam.transform.position = Vector3.Lerp(cam.transform.position,
	 									stopObj.transform.position,
	 									Time.deltaTime * timeInSeconds);
}

function OnGUI() {
	var storyStr = "\"I HAVE YOU NOW!! Now we will play a game...\"\n\n"+
					"Uh oh!\n"+
					"The evil wizard has lured you into his trap!\n"+
					"\n"+
					"Directions:\n"+
					"Select a difficulty.\n"+
					"You will be shown images. Remember them and their order.\n"+
					"Click on a cube to assign it to the next open slot.\n"+
					"Use the headset to rotate the cube until \nthe desired face is showing.\n"+
					"Arrange the face or faces in the order shown\n to you to break the spell and escape.\n";
	GUI.Box(Rect(20, 20, 400, 400), storyStr);
	if (GUI.Button(Rect(20, 430, 133, 100), "Easy")) {
		manager.GetComponent(CubeRotationGame).enableGameCam(0);
		cam.enabled = false;
		gameObject.SetActiveRecursively(false);
		GameObject.Find("Wizard").SetActiveRecursively(false);
	}
	else if (GUI.Button(Rect(153, 430, 133, 100), "Medium")) {
		manager.GetComponent(CubeRotationGame).enableGameCam(1);
		cam.enabled = false;
		gameObject.SetActiveRecursively(false);
		GameObject.Find("Wizard").SetActiveRecursively(false);
	}
	else if (GUI.Button(Rect(286, 430, 133, 100), "Hard")) {
		manager.GetComponent(CubeRotationGame).enableGameCam(2);
		cam.enabled = false;
		gameObject.SetActiveRecursively(false);
		GameObject.Find("Wizard").SetActiveRecursively(false);
	}
	else if (GUI.Button(Rect(Screen.width-410, Screen.height-110, 400, 100), "Quit")) {
		Application.LoadLevel(1);
	}
}