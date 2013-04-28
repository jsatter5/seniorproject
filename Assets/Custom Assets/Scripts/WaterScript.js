#pragma strict

var rate: float = 10; // number of "waves" * 3.14
var speed: float = 0.9; // cycles per second / 3.14
var intensity: float = 0.003;

private var mesh: Mesh;
private var verts: Vector3[];
private var uvs0: Vector2[];
private var uvs: Vector2[];
private var size: int;

function Start(){
    mesh = GetComponent(MeshFilter).mesh;
    verts = mesh.vertices;
    uvs0 = mesh.uv; // get original uv coordinates
    size = verts.length;
    uvs = new Vector2[size]; // create a new uv array
}

function Update(){
    var t = Time.time * speed;
    for (var i = 0; i < size; i++){
        var v = verts[i];
        // calculate a local offset for each uv
        var uv = Vector2(Mathf.Sin(t + v.x * rate), Mathf.Cos(t + v.z * rate));
        uvs[i] = uvs0[i] + intensity * uv; // add the offset
    }
    mesh.uv = uvs; // assign the modified uv array
}