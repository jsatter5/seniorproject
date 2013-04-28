using UnityEngine;
using System.Collections;

public class ProgressionTextScript : MonoBehaviour 
{
    public GameObject SubtitleObject;
	public GameObject TrainingSpot;
	
	private TriggerLocation trainer;
    private LabelDraw labelDraw;

    public string strIntro1;
    public string strIntro2;

	// Use this for initialization
	void Start () 
    {
        labelDraw = (LabelDraw)SubtitleObject.GetComponent("LabelDraw");
		trainer = (TriggerLocation)TrainingSpot.GetComponent("TriggerLocation");
		Debug.Log(trainer);
	}
	
	// Update is called once per frame
	void Update () 
    {
		if(!labelDraw.enable_LabelInformation)
        {
			if(trainer.isTrained == true){
				labelDraw.DrawLabel(strIntro2, true);
			}
			else{
            	labelDraw.DrawLabel(strIntro1, true);
			}
        }	
	}

    void OnTriggerEnter (Collider other) 
    {
        if(other.gameObject.tag == "Player")
        {
            Debug.Log("Player enter game progression trigger");
        }
		labelDraw.DrawLabel(strIntro1, true);
    }
}


