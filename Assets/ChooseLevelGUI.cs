using UnityEngine;
using System.Collections;

public class ChooseLevelGUI : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnGUI() {
	
		if (GUI.Button(new Rect(20,40,120,20), "Face Game")) {
			Application.LoadLevel("facegame");	
		}
		if (GUI.Button(new Rect(20,70,120,20), "Space Game")) {
			Application.LoadLevel("fablegame");
		}
		if (GUI.Button(new Rect(20,100,120,20), "Concentration Game")) {
			Application.LoadLevel("Concentration");
		}
		if (GUI.Button(new Rect(20,130,120,20), "What is missing Game")) {
			Application.LoadLevel ("WhatIsMissing");
		}
		if (GUI.Button(new Rect(20,160,120,20), "Missing Face Game")) {
			Application.LoadLevel ("CubeRotation");
		}
	}
}
