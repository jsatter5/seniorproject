using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class FaceGame : MonoBehaviour {
	
	public GUIText gui;
	public ParticleEmitter sphere1,sphere2,sphere3,sphere4,sphere5;
    public int level = 1;
	public string difficulty = "Easy";

	public bool inGame, finished, skipTutorial = false;
	private ParticleEmitter[] spheres = new ParticleEmitter[6];
	private string[] activeGesture = new string[4];
	private int[] used = {0, 0, 0, 0};  //which list does the 1st, 2nd, and 3rd gesture come from?
	private int[] used2 = {0, 0, 0, 0}; //which emo does each gesture use?  Coincide it with used[]
	private int[] previous = {0,0,0,0};
	private string[] list1 = {"blink both eyes", "wink your left eye", "wink your right eye",
		"close both eyes"};
	private string[] list2 = {"look up", "look down", "look left", "look right"};
	private string[] list3 = {"smile", "clench your teeth", "open your mouth", "raise your eyebrows"};
	public bool[] emo1 = new bool[4];
	public bool[] emo2 = new bool[4];
	public float[] emo3 = new float[4];
	private float levelTime, finishedTime = 0;

	// Use this for initialization
	void Start () {
		Setup();
		StartCoroutine("Tutorial");
	}
	
	// Update is called once per frame
	void Update () {
		if(emo1[0]==false)
			emo1[0] = EmoExpressiv.isBlink;
		if(emo1[1]==false)
			emo1[1] = EmoExpressiv.isLeftWink;
		if(emo1[2]==false)
			emo1[2] = EmoExpressiv.isRightWink;
		if(emo1[3]==false)
			emo1[3] = EmoExpressiv.isEyesOpen;
		/*
		emo2[0] = EmoExpressiv.isLookingUp;
		emo2[1] = EmoExpressiv.isLookingDown;
		emo2[2] = EmoExpressiv.isLookingLeft;
		emo2[3] = EmoExpressiv.isLookingRight;
		*/
		emo3[0] = EmoExpressiv.smileExtent;
		emo3[1] = EmoExpressiv.clenchExtent;
		emo3[2] = EmoExpressiv.upperFacePower;
		emo3[3] = EmoExpressiv.eyebrowExtent;
		
		if (skipTutorial == false && Input.GetKeyDown("space"))
		{
			skipTutorial = true;
			StopCoroutine("Tutorial");	
			StartCoroutine("NewLevel");
		}
		
		if (Input.GetKeyDown ("n") && inGame == true)
		{
			StartCoroutine ("Success");
		}
		
		if (inGame)
			finished = false;
		
		if (inGame == true && finished == false)
		{
			switch(difficulty){
			case("Easy"):
				/*//if using list1
				if(used[1] == 1)
					if(emo1[used2[1]])
						finished=true;
				//using list2
				else
					if(emo2[used2[1]])
						finished=true;
				break;*/
				if(emo3[used2[1]] > 0.95f){
					inGame = false;
					finished = true;
					finishedTime = levelTime;
				}
				break;
			case("Hard"):
				/*
				//if using list1 as first gesture
				if(used[1] == 1)
					if(emo1[used2[1]] && emo2[used2[2]])
						finished=true;
				//using list2
				else
					if(emo2[used2[1]] && emo1[used2[2]])
						finished=true;
				break;
				*/
				if(emo3[used2[1]] > 0.95f && emo1[used2[2]]){
					inGame = false;
					finished = true;
					finishedTime = levelTime;
				}
				break;
				/*
			case("Hard"):
				//if using list1 as first gesture
				if(used[1] == 1)
					if(emo1[used2[1]] && emo2[used2[2]] && emo3[used2[3]] > 0.5f)
						finished=true;
				//using list2
				else
					if(emo2[used2[1]] && emo1[used2[2]] && emo3[used2[3]] > 0.5f)
						finished=true;
				break;
				*/
			}
		}
		
		if(finished==true && level<=5){
			finished = false;
			StartCoroutine("Success");
		}
		else if(level==6 && Input.GetKeyDown("enter")){
			StartCoroutine("MainLevel");
		}
		levelTime += Time.deltaTime;
	}
	
	//Displays the tutorial to the user
	IEnumerator Tutorial ()
	{
		yield return new WaitForSeconds(1);  //to allow level to load before starting
		gui.text = "Welcome to the Simon Says mini-game.";
		yield return new WaitForSeconds(5);
		gui.text = "You may skip the tutorial at anytime by pressing the spacebar.";
		skipTutorial = false;
		yield return new WaitForSeconds(3);
		gui.text = "How to play the game: ";
		yield return new WaitForSeconds(5);
		gui.text = "You will make a funny face according to the instruction.";
		yield return new WaitForSeconds(5);
		gui.text = "I will laugh.";
		yield return new WaitForSeconds(5);
		gui.text = "There are two difficulty levels as you play.";
		yield return new WaitForSeconds(5);
		gui.text = "Each difficulty level involves an extra face gesture.";
		yield return new WaitForSeconds(5);
		gui.text = "The screen will tell you when you've made the correct face.";
		yield return new WaitForSeconds(5);
		gui.text = "Once you've done all 5 faces, you've won the game.";
		yield return new WaitForSeconds(4);
		gui.text = "Now stare into my eyes and we'll begin.";
		yield return new WaitForSeconds(3);	
		skipTutorial = true;
		StartCoroutine("NewLevel");
	}
	
	void Setup()
	{
		skipTutorial = true;
		spheres[1] = sphere1;
		spheres[2] = sphere2;
		spheres[3] = sphere3;
		spheres[4] = sphere4;
		spheres[5] = sphere5;
	} 
	
	void MainLevel()
	{
		Application.LoadLevel("1");
	}
	
	IEnumerator NewLevel()
	{
		level++;
		inGame = false;
		if (level == 4)
		{
			difficulty = "Hard";
			//else
				//difficulty = "Hard";
		}
		if(level<=5)
		{
			gui.text = "Level "+level+" - Difficulty: "+difficulty;
			yield return new WaitForSeconds(3);
			
			//Gesture randomization code
			
			int temp = 0;
			/*
			used[1] = Random.Range(1,3);
			while(used[2] == 0){
				temp = Random.Range (1,3);
				if(temp != used[1])
					used[2] = temp;
			}
			used[3] = 3;
			*/
			used[1] = 3;
			used[2] = 1;
			
			//Assigning gestures to use
			for (int i=1; i<=((level/2)+(level%2)); i++)
			{
				previous[i] = used2[i];
				while(used2[i] == previous[i]){
					temp = Random.Range (0,4);
					switch(used[i]){
						case 1: activeGesture[i] = list1[temp];
							break;
						case 2: activeGesture[i] = list2[temp];
							break;
						case 3: activeGesture[i] = list3[temp];
							break;
					}
					used2[i] = temp;
				}
			}
			
			//Prettified text block
			if(difficulty=="Easy")
				gui.text = "Simon Says: " + activeGesture[1];
			else if(difficulty=="Hard")
				gui.text = "Simon Says: " + activeGesture[1] + " and " + activeGesture[2];
			//else
				//gui.text = "Simon Says: " + activeGesture[1] + ", " + activeGesture[2] + ", and " + activeGesture[3];
			
			levelTime=0;
			finished=false;
			inGame=true;
			for(int i =0; i<=3; i++)
				emo1[i]=false;
		}
		else{
			gui.text = "Congrats you win!  Press enter to go back to the island.";
		}
	}
	
	IEnumerator Success()
	{
		spheres[level].emit = true;
		gui.text = "Correct! Level completed in "+finishedTime+" seconds";
		yield return new WaitForSeconds(5);
		StartCoroutine("NewLevel");
	}
}
