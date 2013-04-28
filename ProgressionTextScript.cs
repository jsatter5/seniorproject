using UnityEngine;
using System.Collections;

public class PRogressionTextScript : MonoBehaviour 
{
    public EdkDll.EE_CognitivAction_t action;
    public GameObject SubtitleObject;
    public bool isTraining = false;

    private LabelDraw labelDraw;
    private float timeCount;
    private bool isShowProgess = false;
    private float maxTime = 10.0f;

    public string strIntro1;
    public string strIntro2;
	public string strIntro3;
    private bool isFirst = false;

	// Use this for initialization
	void Start () 
    {
        labelDraw = (LabelDraw)SubtitleObject.GetComponent("LabelDraw");
        
	
	}
	
	// Update is called once per frame
	void Update () 
    {
		//nothing yet
	
	}

    void OnTriggerEnter (Collider other) 
    {
        if(other.gameObject.tag == "Player")
        {
            Debug.Log("Player enter game progression trigger");
        }
    }

    void OnTriggerExit(Collider other)
    {
        //nothing yet
    }

    void OnGUI()
    {
        //nothing
    }

  
}


