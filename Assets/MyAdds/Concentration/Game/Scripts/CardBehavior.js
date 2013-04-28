#pragma strict 

private var rotation = 0.0;
private var elevation = 0.0;
private var direction = 1;
private var maxElevate = 2.0;
private var maxRotate = 180.0;
private var totalRotate = 0.0;
private var speed = 50;
var flipped = false;
var gameManager : ConcentrationGame;

private var clicked = false;

function Start () {
	var ind = name.IndexOf('(');
	this.name = this.name.Substring(0, ind);// +","+ transform.parent.parent.name + ","+transform.parent.name;
	gameManager = transform.parent.parent.parent.parent.GetComponent(ConcentrationGame);
}

function Update() {
	/*while (elevation < maxElevate && rotation < 90) {
		elevation += 1 * Time.deltaTime * direction;
		rotation += Time.deltaTime * 45;
		transform.Translate(Vector3.up * elevation, Space.World);
    	transform.Rotate(Vector3.forward * rotation);
	}
	direction *= -1;
    while (elevation > 0 && rotation < 180) {
		elevation += 1 * Time.deltaTime * direction;
		rotation += Time.deltaTime * 45;
		transform.Translate(Vector3.up * elevation, Space.World);
    	transform.Rotate(Vector3.forward * rotation);
	}*/
	
	
	/*if (totalRotate < maxRotate) {
		var thisRotate = speed * Time.deltaTime;
		transform.Rotate(0, direction * thisRotate, 0);
		totalRotate += thisRotate;
	}
	else {
		//clicked = false;
		totalRotate = 0.0;
		//direction *= -1;
	}*/
	
	/*if (elevation < maxElevate) {
		var thisEl = 3 * Time.deltaTime;
		transform.Translate(0, thisEl, 0);
		elevation += thisEl;
	}
	else {
		//clicked = false;
		//totalRotate = 0.0;
		//direction *= -1;
		if (totalRotate < maxRotate) {
			var thisRotate = 50 * Time.deltaTime;
			transform.Rotate(0, 0, thisRotate, Space.Self);
			totalRotate += thisRotate;
		}
		else {
			//clicked = false;
			//totalRotate = 0.0;
			//direction *= -1;
		}
	}*/
	
	
	/*
	
	var rayMousePos = Camera.current.ScreenPointToRay(Input.mousePosition);
    var rayHit : RaycastHit;
     
    if ((Physics.Raycast(rayMousePos, rayHit)) 
    	&& (checkName(rayHit.collider.gameObject.name))) {
    	//Debug.DrawLine( rayMousePos.origin, rayHit.point );
    	//Debug.Log( " Ray Hit Name : " + rayHit.collider.gameObject.name );
    	
    	//Debug.Log("this: "+Input.GetMouseButtonDown(0));
    	
    	
    	/*if (Input.GetMouseButton(0)) {
    		clicked = true;
    	}
    	//direction *= -1;
    }
    
    if (clicked && !flipped) {
    	if (ConcentrationGame.canFlip()) {
    		gameObject.animation.Play("CardFlip");
    		ConcentrationGame.addFlip(this.gameObject);
    	}
    	clicked = false;
    	flipped = true;
    }
    
    */
    
    
}

function checkName(str) {
	return str == name;
}

function OnMouseUpAsButton() {
	if (!flipped && gameManager.canFlip()) {
		gameObject.animation.Play("CardFlip");
		gameManager.addFlip(this.gameObject);
		flipped = true;
	}
}