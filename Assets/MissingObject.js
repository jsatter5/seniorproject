#pragma strict

private var manager:GameObject;

function Start () {
	manager = GameObject.Find("GameManager");
}

function Update () {

}

function OnMouseDown() {
	manager.GetComponent(WhatIsMissingGame).isCorrect(gameObject);
}