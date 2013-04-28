using UnityEngine;
using System.Collections;

public class OutOfBoundsScript : MonoBehaviour {
	
	public GameObject player;

    void OnTriggerEnter (Collider other) 
    {
        transform.position = player.transform.position;
		player.transform.position = transform.position;
		
		player.transform.position = new Vector3(1000.653f,125.000f,955.2845f);
		
		Debug.Log("Player went out of bounds.");
    }
}
