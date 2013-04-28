#pragma strict

function OnTriggerEnter(other:Collider) {
	GameObject.Find("GameManager").GetComponent(CubeRotationGame).triggerGame();
}