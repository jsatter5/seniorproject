#pragma strict

private var origLoc:Vector3;

function Start () {
	origLoc = transform.position;
}

function Update () {

}

function OnMouseDown() {
	GameObject.Find("GameManager").GetComponent(CubeRotationGame).sendAllBack();
	transform.position = GameObject.Find("CubeSelectSpot").transform.position;
}

function goBack() {
	transform.position = origLoc;
}