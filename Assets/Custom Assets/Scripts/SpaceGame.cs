using UnityEngine;
using System.Collections;

public class SpaceGame : MonoBehaviour {
	
	public GUIText gui;
	public Light[] lights;
	public TriggerLocation tl;
	public TrainingProgess tp;
	public Animation anim;
	
	private bool inGame, finished, skipTutorial, playing = false;
	private int used1,used2,used3;
	private double time = 0.0;
	private int score = 0;
	private int level = 0;
	private int stage = 0;
	private int currentLight;

	// Use this for initialization
	void Start () {
		skipTutorial = true;
	}
	
	// Update is called once per frame
	void Update () {		
		if (skipTutorial == false && Input.GetKeyDown("space"))
		{
			skipTutorial = true;
			StopCoroutine("Tutorial");	
			StartCoroutine("NewLevel");
		}
		
		if(lights[currentLight].enabled && playing){
			playing=false;
			stage++;
			tp.setEnable(false);
			tp.power = 0;
			StartCoroutine("StartStage");
		}
		
	}
	
	//Displays the tutorial to the user
	IEnumerator Tutorial ()
	{
		yield return new WaitForSeconds(1);  //to allow level to load before starting
		gui.text = "Welcome to the Space Game mini-game.";
		yield return new WaitForSeconds(5);
		gui.text = "You may skip the tutorial at anytime by pressing the spacebar.";
		skipTutorial = false;
		yield return new WaitForSeconds(3);
		gui.text = "How to play the game: ";
		yield return new WaitForSeconds(5);
		gui.text = "Like the animation shows, you must make all 3 pillars light up.";
		yield return new WaitForSeconds(5);
		gui.text = "There are three difficulty levels as you play.";
		yield return new WaitForSeconds(5);
		gui.text = "Each difficulty level involves lighting an extra pillar.";
		yield return new WaitForSeconds(5);
		gui.text = "The pillar will light up when you've successfully pushed the block.";
		yield return new WaitForSeconds(5);
		gui.text = "Once you've lit all of the pillars, you've beaten the level.";
		yield return new WaitForSeconds(4);
		gui.text = "If you're having trouble, retrain the ability in the upper-left corner.";
		yield return new WaitForSeconds(3);	
		gui.text = "Good luck and remember to have fun!";
		yield return new WaitForSeconds(3);	
		skipTutorial = true;
		StartCoroutine("NewLevel");
	}
	
	void OnGUI () {
		if(inGame){
			if (GUI.Button(new Rect(20,40,120,20), "Train Push")) {
				tl.CallTrain(EdkDll.EE_CognitivAction_t.COG_PUSH, "Think about pushing!");	
			}
			if (GUI.Button(new Rect(20,70,120,20), "Train Move Left")) {
				tl.CallTrain(EdkDll.EE_CognitivAction_t.COG_LEFT, "Think about moving it left!");
			}
			if (GUI.Button(new Rect(20,100,120,20), "Train Move Right")) {
				tl.CallTrain(EdkDll.EE_CognitivAction_t.COG_RIGHT, "Think about moving it right!!");
			}
			if (GUI.Button (new Rect(20,130,120,20), "Train Neutral")) {
				tl.CallTrain (EdkDll.EE_CognitivAction_t.COG_NEUTRAL, "Clear your mind...");
			}
		}
		else{
			if (GUI.Button(new Rect(((Screen.width - 400) / 2),430, 400, 100), "Start the game")) {
				inGame=true;
				StartCoroutine("Tutorial");
				time = 0.0;
				score = 0;
			}
		}
	}
	
	void NewLevel() {
		level++;
		anim.enabled = false;
		for (int i=0; i<=2; i++)
			lights[i].enabled = false;
		
		gui.text = "Level "+level;
		used2 = -99;
		used3 = -99;
		
		//Light randomization code
		int temp = 0;
		
		//light 1
		used1 = Random.Range(0,3);
		if(level<5)
			lights[used1].enabled = true;
		
		//light 2
		while(used2 == -99){
			temp = Random.Range(0,3);
			if(temp != used1)
				used2 = temp;
		}
		if(level<3)
			lights[used2].enabled = true;
		
		//light 3
		while(used3 == -99){
			temp = Random.Range (0,3);
			if(temp != used1 && temp != used2)
				used3 = temp;
		}
		StartCoroutine("StartStage");
	}
	
	void StartStage() {
		if(level < 3){
			if(stage==0)
				StartCoroutine("ResetLights",used1);
			else
				StartCoroutine("StageOver");
		}
		else if(level < 5){
			if(stage==0)
				StartCoroutine("ResetLights",used1);
			else if(stage==1)
				StartCoroutine("ResetLights",used2);
			else
				StartCoroutine("StageOver");
		}
		else{
			if(stage==0)
				StartCoroutine("ResetLights",used1);
			else if(stage==1)
				StartCoroutine("ResetLights",used2);
			else if(stage==2)
				StartCoroutine("ResetLights",used3);
			else
				StartCoroutine("StageOver");
		}
	}
	
	IEnumerator StageOver() {
		gui.text = "Congrats, you've beat this level.";
		yield return new WaitForSeconds(5);
		StartCoroutine("NewLevel");
	}
	
	void ResetLights(int used){
		for (int i=0; i<=2; i++)
			lights[i].enabled = true;
		lights[used].enabled = false;
		currentLight = used;
		switch(used){
		case(0):
			tp.setIndex(5);
			tp.setDirection(new Vector3(-1,0,0));
			break;
		case(1):
			tp.setIndex(1);
			tp.setDirection(new Vector3(0,0,1));
			break;
		case(2):
			tp.setIndex(6);
			tp.setDirection(new Vector3(1,0,0));
			break;
		}
		tp.setEnable(true);
		tp.setMaxPos(12);
		playing=true;
	}
}
