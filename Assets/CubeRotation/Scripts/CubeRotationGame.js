#pragma strict

var flameWall : GameObject;
var player : GameObject;
var wizEvent : GameObject;
var wizard : GameObject;
var cam : GameObject;
var prefabsArray : GameObject[];
private var playing : boolean;
var imgs : Texture2D[];
private var currDiff : int;
private var cube1Ind :int;
private var cube2Ind : int;
private var cube3Ind : int;
private var cube4Ind : int;
private var cube1Face :int;
private var cube2Face : int;
private var cube3Face : int;
private var cube4Face : int;
private var upperBound = 3;
private var playTimer = 0;
//private var CubeColEasy = [0,1,2,3,4,5,6,7];
//private var CubeColMed = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
//private var CubeColHard = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var cubeCol : GameObject[];
private var showCubes = false;


function Start () {
	//flameWall = GameObject.Find("FlameBarrier");
	//player = GameObject.FindGameObjectWithTag("Player");
	//wizEvent = GameObject.Find("WizardEvent");
	playing = false;
	currDiff = 0;
	/*cube1Ind = Random.Range(0, upperBound);
	var next = Random.Range(0, upperBound);
	while (next == cube1Ind)
		next = Random.Range(0, upperBound);
	cube2Ind = next;
	while ((next == cube1Ind) || (next == cube2Ind))
		next = Random.Range(0, upperBound);
	cube3Ind = next;
	while ((next == cube1Ind) || (next == cube2Ind) || (next == cube3Ind))
		next = Random.Range(0, upperBound);
	cube4Ind = next;
	cube1Face = Random.Range(1, 5);
	cube2Face = Random.Range(1, 5);
	cube3Face = Random.Range(1, 5);
	cube4Face = Random.Range(1, 5);*/
	for (var i=0; i<21; i++) {
		var oldVal = cubeCol[i];
		var newInd = Random.Range(0,21);
		var newVal = cubeCol[newInd];
		cubeCol[i] = newVal;
		cubeCol[newInd] = oldVal;
	}
}

function Update () {
	if (Input.GetKeyDown(KeyCode.K)) {
		var c : GameObject = Instantiate(prefabsArray[Random.Range(0, 21)],
									 player.transform.position, Quaternion.identity);
		//c.transform.rotation.
	}
}

function triggerGame() {
	flameWall.SetActiveRecursively(true);
	Destroy(player);
	wizEvent.SetActiveRecursively(true);
	wizard.SetActiveRecursively(true);
}

function enableGameCam(diff:int) {
	cam.SetActiveRecursively(true);
	currDiff = diff;
	playing = true;
}

function OnGUI() {
	if (playing && !showCubes) {
		var w = System.Math.Floor(Screen.width / 6);
		if (currDiff == 1) {//med
//			GUI.Box(Rect(w, 100, w, 300), imgs[(cube1Ind*4)+cube1Face]);
//			GUI.Box(Rect(2*w, 100, w, 300), imgs[(cube2Ind*4)+cube2Face]);
//			GUI.Box(Rect(3*w, 100, w, 300), imgs[(cube3Ind*4)+cube3Face]);
			GUI.Box(Rect(w, 100, w, 300), imgs[0]);
			GUI.Box(Rect(2*w, 100, w, 300), imgs[1]);
			GUI.Box(Rect(3*w, 100, w, 300), imgs[2]);
			GUI.Box(Rect(4*w, 100, w, 300), "");
		}
		else if (currDiff == 2) {//hard
			GUI.Box(Rect(w, 100, w, 300), imgs[0]);
			GUI.Box(Rect(2*w, 100, w, 300), imgs[1]);
			GUI.Box(Rect(3*w, 100, w, 300), imgs[2]);
			GUI.Box(Rect(4*w, 100, w, 300), imgs[3]);
		}
		else {//easy
//			GUI.Box(Rect(w, 100, w, 300), imgs[(cube1Ind*4)+cube1Face]);
//			GUI.Box(Rect(2*w, 100, w, 300), imgs[(cube2Ind*4)+cube2Face]);
			GUI.Box(Rect(w, 100, w, 300), imgs[0]);
			GUI.Box(Rect(2*w, 100, w, 300), imgs[1]);
			GUI.Box(Rect(3*w, 100, w, 300), "");
			GUI.Box(Rect(4*w, 100, w, 300), "");
		}
		if (GUI.Button(Rect((Screen.width  - 100)/2, 500, 100, 100), "Continue")) {
			showCubes = true;
		}
	}
	else if (playing) {
		if (currDiff == 0) {
			for (var j=0; j<8; j++) {
				cubeCol[j].SetActiveRecursively(true);
			}
		}
		else if (currDiff == 1) {
			for (var k=0; k<15; k++) {
				cubeCol[k].SetActiveRecursively(true);
			}
		}
		else if (currDiff ==2) {
			for (var h=0; h<21; h++) {
				cubeCol[h].SetActiveRecursively(true);
			}
		}
		if (GUI.Button(Rect(Screen.width-100, Screen.height-100, 100, 100), "Quit")) {
			Application.LoadLevel(1);
		}
	}
}

function sendAllBack() {
	for (var h=0; h<21; h++) {
		cubeCol[h].GetComponent(CubeBehave).goBack();
	}
}