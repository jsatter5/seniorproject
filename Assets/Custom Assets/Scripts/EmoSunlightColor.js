var Excitement   : float;
var Meditation : float;
var Frustration : float;
var Boredom : float;
var frame : int;

var labelDraw : LabelDraw;

function Start() 
{
	frame = 0;
}

function Update()
{
	if(frame > 20)
	{
		Excitement = EmoAffectiv.shortTermExcitementScore;
		Meditation = EmoAffectiv.meditationScore;
		Frustration = EmoAffectiv.frustrationScore;
		Boredom = EmoAffectiv.boredomScore;
		if(Meditation > 0.70)
		{
			light.color = Color.blue;
		}
		else if(Frustration > 0.70)
		{
			light.color = Color.red;
		}
		else if(Boredom > 0.70)
		{
			light.color = Color.green;	
		}
		else
		{
			light.color = Color.white;
		}
		frame = 0;
	}
	else
	{
		frame++;
	}
}