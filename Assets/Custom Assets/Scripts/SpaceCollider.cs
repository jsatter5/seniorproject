using UnityEngine;
using System.Collections;

public class SpaceCollider : MonoBehaviour {
	
	public Light lights;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnTriggerEnter(Collider other){
		lights.enabled = !lights.enabled;
	}
}
