#pragma strict

var icon : Texture2D;
private var score = 0;
private var time = 0.0;
var Card1Obj : GameObject;
var Card2Obj : GameObject;
var Card3Obj : GameObject;
var Card4Obj : GameObject;
var Card5Obj : GameObject;
var Card6Obj : GameObject;
var Card7Obj : GameObject;
var Card8Obj : GameObject;
var Card9Obj : GameObject;
var Card10Obj : GameObject;
var Card11Obj : GameObject;
var Card12Obj : GameObject;
var Card13Obj : GameObject;
var Card14Obj : GameObject;
private var cardsFlipped = 0;
private var firstFlip : GameObject;
private var secondFlip : GameObject;
private var wrong = 0;
private var right = 0;
private var unflip = false;
private var rightFlag : boolean = false;
private var wrongFlag : boolean = false;
private var play : boolean = false;

function Start() {
	deal();
	gameObject.transform.FindChild("Rules").renderer.material.color = Color.red;
	gameObject.transform.FindChild("Score").renderer.material.color = Color.red;
	gameObject.transform.FindChild("Concentration2").renderer.material.color = Color.blue;
	gameObject.transform.FindChild("PlayText").renderer.material.color = Color.cyan;
}

function OnGUI () {
	//GUI.Box(Rect(0,0,Screen.width,Screen.height), "Concentration Game");
	//GUI.Box(Rect(10,10,Screen.width - 20, Screen.height - 20), "here");
	
	/*GUI.Label (Rect (200,200,100,50), "This is the text string for a Label Control");
	
	if (GUI.Button (Rect (300,300, 100, 50), icon)) {
		print ("you clicked the icon");
	}*/
	
	if (play) {
	
		GUI.Box (Rect (10,80,230,130), "Click cards to find pairs."+
						"\nSuccessful pairs score 10 points."+
						"\nIncorrect matches lose a point."+
						"\nAlso, three points are lost per minute.");
		GUI.Box (Rect (Screen.width - 240,80,230,130), "Pairs Matched: "+
						"                   "+right+
						"\n\nIncorrect Guesses: "+
						"              "+wrong+
						"\n\nTime: "+
						"                                 "+System.Math.Floor(time)+
						"\n\nScore: "+
						"                                "+score);
	
		if (rightFlag && GUI.Button (Rect (10,10, Screen.width-20, Screen.height-20), "Right! Click to continue")) {
			unflip = true;
		}
		else if (wrongFlag && GUI.Button (Rect (10,10, Screen.width-20, Screen.height-20), "Wrong! Click to continue")) {
			unflip = true;
		}
		
		if (GUI.Button (Rect (Screen.width - 210,490, 200, 80), "Click here to quit")) {
			play = false;
			/*var c : GameObject = gameObject.transform.FindChild("CardCameraSide").gameObject;
			c.camera.enabled = true;
			gameObject.transform.FindChild("CardCameraSideClose").gameObject.camera.enabled = false;*/
			Application.LoadLevel(Application.loadedLevel);
		}
	}
	else {
		if (GUI.Button (Rect (((Screen.width - 400) / 2),430, 400, 100), "")) {
			play = true;
			var ca : GameObject = gameObject.transform.FindChild("CardCameraSideClose").gameObject;
			ca.camera.enabled = true;
			camera.enabled = false;
			time = 0.0;
			score = 0;
			right = 0;
			wrong = 0;
			//unflip = true;
		}
		else if (GUI.Button(Rect(Screen.width-410, Screen.height-110, 400, 100), "Quit")) {
			Application.LoadLevel(1);
		}
	}
	
	/*GUI.Box (Rect (400,400,100,50), GUIContent("This is text", icon));
	
	// This line feeds "This is the tooltip" into GUI.tooltip
	GUI.Button (Rect (430,430,100,20), GUIContent ("Click me", "This is the tooltip"));
	// This line reads and displays the contents of GUI.tooltip
	GUI.Label (Rect (430,470,100,20), GUI.tooltip);
	
	GUI.Button (Rect (500,500,100,20), GUIContent ("Click me", icon, "This is the tooltip"));
	GUI.Label (Rect (500,540,100,20), GUI.tooltip);*/
	
}

function Update() {
	if (cardsFlipped == 2) {
		if (firstFlip.name == secondFlip.name) {
			rightFlag = true;
			wrongFlag = false;
		}
		else {
			wrongFlag = true;
			rightFlag = false;
		}
	}
	if (unflip) {
		if (rightFlag) {
			right++;
			Destroy(firstFlip);
			Destroy(secondFlip);
		}
		else if (wrongFlag) {
			firstFlip.animation.Play("CardUnflip");
			secondFlip.animation.Play("CardUnflip");
			wrong++;
			firstFlip.GetComponent(CardBehavior).flipped = false;
			secondFlip.GetComponent(CardBehavior).flipped = false;
		}
		/*else {
			if (firstFlip != null) {
				firstFlip.animation.Play("CardUnflip");
				firstFlip.GetComponent(CardBehavior).flipped = false;
			}
			if (secondFlip != null) {
				secondFlip.animation.Play("CardUnflip");
				secondFlip.GetComponent(CardBehavior).flipped = false;
			}
		}*/
		rightFlag = false;
		wrongFlag = false;
		cardsFlipped = 0;
		firstFlip = null;
		secondFlip = null;
		unflip = false;
	}
		
	if (play) {
		
		gameObject.transform.FindChild("Concentration").renderer.enabled = false;
		gameObject.transform.FindChild("Concentration2").renderer.enabled = false;
		gameObject.transform.FindChild("PlayText").renderer.enabled = false;
		
		gameObject.transform.FindChild("Rules").renderer.enabled = true;
		gameObject.transform.FindChild("Score").renderer.enabled = true;
		
		time += 1 * Time.deltaTime;
		score = (right * 10) - wrong - ((System.Math.Floor(time) / 60) * 3);
		if (score < 0)
			score = 0;
		}
	else {
		gameObject.transform.FindChild("Concentration").renderer.enabled = true;
		gameObject.transform.FindChild("Concentration2").renderer.enabled = true;
		gameObject.transform.FindChild("PlayText").renderer.enabled = true;
		
		gameObject.transform.FindChild("Rules").renderer.enabled = false;
		gameObject.transform.FindChild("Score").renderer.enabled = false;
	}
}

function deal() {
	var cardObjs = [Card1Obj, Card1Obj, Card2Obj, Card2Obj, Card3Obj, Card3Obj, 
					 Card4Obj, Card4Obj, Card5Obj, Card5Obj, Card6Obj, Card6Obj, 
					 Card7Obj, Card7Obj, Card8Obj, Card8Obj, Card9Obj, Card9Obj, 
				 	 Card10Obj, Card10Obj, Card11Obj, Card11Obj, Card12Obj, Card12Obj, 
				 	 Card13Obj, Card13Obj, Card14Obj, Card14Obj];
				 
	for (var i=0; i<28; i++) {
		var newPos = Random.Range(0, 27);
		var currVal = cardObjs[i];
		var swapVal = cardObjs[newPos];
		cardObjs[newPos] = currVal;
		cardObjs[i] = swapVal;
	}
	
	var col = transform.FindChild("CardCollection");
	for (var r=1; r<5; r++) {
		var row = col.FindChild("CardRow"+r);
		for (var k=1; k<8; k++) {
			var card = row.FindChild("Card"+k);
			var inner = Instantiate(cardObjs[((r-1)*7)+k-1], card.position, Quaternion.identity);
			inner.transform.parent = card;
			inner.transform.localPosition = Vector3(0,0,0);
			inner.transform.localRotation = Quaternion.identity;
		}
	}
}

function canFlip() {
	return play && (cardsFlipped < 2);
}

function addFlip(card : GameObject) {
	if (firstFlip == null)
		firstFlip = card;
	else 
		secondFlip = card;
	cardsFlipped++;
}