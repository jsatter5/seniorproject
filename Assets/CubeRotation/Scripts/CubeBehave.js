#pragma strict

private var origLoc:Vector3;
private var moving : boolean;
private var stopObj : GameObject;
private var timeInSeconds : float;
private var turning : boolean;
private var origRot : Quaternion;
private var turns : int;
private var lockedIn : boolean;
private var lockLoc : Vector3;

function Start () {
	origLoc = transform.position;
	origRot = transform.rotation;
	moving = false;
	stopObj = GameObject.Find("CubeSelectSpot");
	timeInSeconds = 3;
	turning = false;
	turns = 1;
	lockedIn = false;
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
	if (moving && Input.GetKeyDown(KeyCode.Return)) {
		lockIn();
	}
}

function OnMouseDown() {
	var c = GameObject.Find("GameManager").GetComponent(CubeRotationGame);
	c.sendAllBack();
	moving = true;
	if (lockedIn) {
		lockedIn = false;
		//c.cascadeLocks();
	}
}

function goBack() {
	if (!lockedIn) {
		transform.position = origLoc;
		moving = false;
	}
	else
		transform.position = lockLoc;
}

function forceBack() {
	transform.position = origLoc;
	moving = false;
	lockedIn = false;
}

function lockIn() {
	var c = GameObject.Find("GameManager").GetComponent(CubeRotationGame);
	if (c.canLock()) {
		lockLoc = c.getNextLockLoc(gameObject);
		moving = false;
		transform.position = lockLoc;
		lockedIn = true;
		//c.lockThis(gameObject);
	}
}