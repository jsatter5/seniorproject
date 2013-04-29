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
private var upperBound = 84;
private var playTimer = 0;
var cubeCol : GameObject[];
private var showCubes = false;
private var locked : int;
var lockLocs : GameObject[];
private var locks :GameObject[];
private var lock1 : GameObject;
private var lock2 : GameObject;
private var lock3 : GameObject;
private var lock4 : GameObject;
private var win : boolean = false;
private var tryAgain :boolean = false;


function Start () {
	playing = false;
	currDiff = 0;
	for (var i=0; i<21; i++) {
		var oldVal = cubeCol[i];
		var newInd = Random.Range(0,21);
		var newVal = cubeCol[newInd];
		cubeCol[i] = newVal;
		cubeCol[newInd] = oldVal;
	}
}

function Update () {
	if (((currDiff == 0) && (locked == 2)) ||
		((currDiff == 1) && (locked == 3)) ||
		((currDiff == 2) && (locked == 4))) {
		checkVictory();
		if (!win)
			tryAgain = true;
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
	initGame();
}

function OnGUI() {
	if (playing && !showCubes) {
		var w = System.Math.Floor(Screen.width / 6);
		if (currDiff == 1) {//med
			GUI.Box(Rect(w, 100, w, 225), imgs[((cube1Ind-1)*4)+cube1Face-1]);
			GUI.Box(Rect(2*w, 100, w, 225), imgs[((cube2Ind-1)*4)+cube2Face-1]);
			GUI.Box(Rect(3*w, 100, w, 225), imgs[((cube3Ind-1)*4)+cube3Face-1]);
			GUI.Box(Rect(4*w, 100, w, 225), "");
		}
		else if (currDiff == 2) {//hard
			GUI.Box(Rect(w, 100, w, 225), imgs[((cube1Ind-1)*4)+cube1Face-1]);
			GUI.Box(Rect(2*w, 100, w, 225), imgs[((cube2Ind-1)*4)+cube2Face-1]);
			GUI.Box(Rect(3*w, 100, w, 225), imgs[((cube3Ind-1)*4)+cube3Face-1]);
			GUI.Box(Rect(4*w, 100, w, 225), imgs[((cube4Ind-1)*4)+cube4Face-1]);
		}
		else {//easy
			GUI.Box(Rect(w, 100, w, 225), imgs[((cube1Ind-1)*4)+cube1Face-1]);
			GUI.Box(Rect(2*w, 100, w, 225), imgs[((cube2Ind-1)*4)+cube2Face-1]);
			GUI.Box(Rect(3*w, 100, w, 225), "");
			GUI.Box(Rect(4*w, 100, w, 225), "");
		}
		if (GUI.Button(Rect((Screen.width  - 200)/2, 450, 200, 100), "Continue")) {
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
	
	if (win) {
		if (GUI.Button(Rect((Screen.width-250)/2, (Screen.height-250)/2, 250, 250), "You win! - Click here to quit")) {
			Application.LoadLevel(1);
		}
	}
	else if (tryAgain) {
		if (GUI.Button(Rect((Screen.width-250)/2, (Screen.height-250)/2, 250, 250), "Sorry! Click here to try again")) {
			tryAgain = false;
			initGame();
			forceAllBack();
		}
	}
}

function sendAllBack() {
	for (var h=0; h<21; h++) {
		cubeCol[h].GetComponent(CubeBehave).goBack();
	}
}

function forceAllBack() {
	for (var h=0; h<21; h++) {
		cubeCol[h].GetComponent(CubeBehave).forceBack();
	}
}

function initGame() {
	cube1Ind = parseInt(cubeCol[0].name.Substring(5));
	cube2Ind = parseInt(cubeCol[1].name.Substring(5));
	cube1Face = Random.Range(1, 5);
	cube2Face = Random.Range(1, 5);
	//Debug.Log("cube 1 g.o.: "+cubeCol[0].name+" ind: "+cube1Ind+" face: "+cube1Face+" img: "+imgs[((cube1Ind-1)*4)+cube1Face-1].name);
	//Debug.Log("cube 2 g.o.: "+cubeCol[1].name+" ind: "+cube2Ind+" face: "+cube2Face+" img: "+imgs[((cube2Ind-1)*4)+cube2Face-1].name);
	if (currDiff > 0) {
		cube3Face = Random.Range(1, 5);
		cube3Ind = parseInt(cubeCol[2].name.Substring(5));
			//Debug.Log("cube 3 g.o.: "+cubeCol[2].name+" ind: "+cube3Ind+" face: "+cube3Face+" img: "+imgs[((cube3Ind-1)*4)+cube3Face-1].name);
	}
	if (currDiff == 2) {
		cube4Ind = parseInt(cubeCol[3].name.Substring(5));
		cube4Face = Random.Range(1, 5);
			//Debug.Log("cube 4 g.o.: "+cubeCol[3].name+" ind: "+cube4Ind+" face: "+cube4Face+" img: "+imgs[((cube4Ind-1)*4)+cube4Face-1].name);
	}
	locked = 0;
}

function getNextLockLoc(val:GameObject) {
	if (locked == 0)
		lock1 = val;
	else if(locked == 1)
		lock2 = val;
	else if (locked == 2)
		lock3 = val;
	else
		lock4 = val;
	locked++;
	return lockLocs[locked-1].transform.position;
}

function canLock() {
	if (((currDiff == 0) && (locked >= 2)) ||
		((currDiff == 1) && (locked >= 3)) ||
		((currDiff == 2) && (locked >= 4))) {
		return false;
	}
	else
		return true;
}

//function cascadeLocks() {
//	for (var i =0; i<locked-1; i++) {
		//locks[i] = locks[i+1];
		//locks[i].transform.position = lockLocs[i].transform.position;
//		Debug.Log(locks[i].name);
//		Debug.Log(locks[i+1].name+" +1");
//	}
//	locked--;
//}

//function lockThis(g:GameObject) {
//	locks[locked] = g;
//	locked++;
//}

function checkVictory() {
	if (currDiff == 0) {
		var n1 = imgs[((cube1Ind-1)*4)+cube1Face-1].name;
		var n2 = imgs[((cube2Ind-1)*4)+cube2Face-1].name;
		Debug.Log("angles "+(System.Math.Floor(System.Math.Abs(lock1.transform.rotation.eulerAngles.y / -90))));
		Debug.Log("substr "+(cube1Face-1));
		Debug.Log("angles2 "+(System.Math.Floor(System.Math.Abs(lock2.transform.rotation.eulerAngles.y / -90))));
		Debug.Log("substr2 "+(cube2Face-1));
		if (!((System.Math.Floor(System.Math.Abs(lock1.transform.rotation.eulerAngles.y / -90)) == (cube1Face-1))))
			return;
		if (!((System.Math.Floor(System.Math.Abs(lock2.transform.rotation.eulerAngles.y / -90)) == (cube2Face-1))))
			return;
	}
	if (currDiff > 0) {
		var n3 = imgs[((cube3Ind-1)*4)+cube3Face-1].name;
		if (!((System.Math.Floor(System.Math.Abs(lock3.transform.rotation.eulerAngles.y / -90)) == (cube3Face-1))))
			return;
	}
	if (currDiff == 2) {
		var n4 = imgs[((cube4Ind-1)*4)+cube4Face-1].name;
		if (!((System.Math.Floor(System.Math.Abs(lock4.transform.rotation.eulerAngles.y / -90)) == (cube4Face-1))))
			return;
	}
	win = true;
}