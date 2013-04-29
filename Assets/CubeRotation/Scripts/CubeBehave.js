#pragma strict

private var origLoc:Vector3;
private var moving : boolean;
private var stopObj : GameObject;
private var timeInSeconds : float;
private var turning : boolean;
private var origRot : Quaternion;
private var turns : int;

function Start () {
	origLoc = transform.position;
	origRot = transform.rotation;
	moving = false;
	stopObj = GameObject.Find("CubeSelectSpot");
	timeInSeconds = 3;
	turning = false;
	turns = 1;
}

function Update () {
	if (turns == 5)
		turns = 0;
	if (moving) {
		transform.position = Vector3.Lerp(transform.position,
	 									stopObj.transform.position,
	 									Time.deltaTime * timeInSeconds);
	}
	if (turning) {
		transform.rotation = Quaternion.Slerp(transform.rotation,
											Quaternion.Euler(-90,-90*turns,-90),
											Time.deltaTime * 5);
		
	}
	if (transform.rotation == Quaternion.Euler(-90,-90*turns,-90)) {
		turning = false;
	}
	if (moving && Input.GetKeyDown(KeyCode.N)) {
		turns++;
		turning = true;
	}
}

function OnMouseDown() {
	GameObject.Find("GameManager").GetComponent(CubeRotationGame).sendAllBack();
	moving = true;
}

function goBack() {
	transform.position = origLoc;
	moving = false;
	//transform.rotation = origRot;
}