#pragma strict

var amplitude: float = 18.5; // platform excursion (+/- 5 units, in this case)
var speed: float = 0.075; // movements per second
var direction: Vector3 = Vector3.up; // direction relative to the platform
private var p0: Vector3;

function Start(){
  p0 = transform.position;
  while (true){
    // convert direction to local space
    var dir = transform.TransformDirection(direction);
    // set platform position:
    transform.position = p0+amplitude*dir*Mathf.Sin(6.28*speed*Time.time);
    yield; // let Unity free till the next frame
  }
}

function Update () {

}