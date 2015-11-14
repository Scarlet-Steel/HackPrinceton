var Nodes=[];
var NodesN=0;
function Node(name,contains)
{
	this.name=name;
	this.contains=contains;

	Nodes[name]=this;
	NodesN++;
}

function CheckMissingNodes()
{
	var allContents=[];
	var allMissing=[];
	for (var i in Nodes)
	{
		var thisNode=Nodes[i];
		for (var i2 in thisNode.contains)
		{
			thisContent=thisNode.contains[i2];
			if (typeof(thisContent)!="string")
			{
				for (var i3 in thisContent) {allContents.push(thisContent[i3]);}
			}
			else allContents.push(thisContent);
		}
	}
	for (var i in allContents)
	{
		var thisContent=allContents[i];
		if (thisContent.charAt(0)==".") thisContent=thisContent.substring(1);
		thisContent=thisContent.split(",");
		thisContent=thisContent[0];
		if (!Nodes[thisContent] && thisContent!="") allMissing.push(thisContent);
	}
//	allMissing=allMissing.filter(function(elem,pos) {return allMissing.indexOf(elem)==pos;});//remove duplicates

	var str="Nodes that are linked to, but don't exist :\n";
	for (var i in allMissing)
	{
		str+=allMissing[i]+"\n";
	}
	alert(str);
}

function CleanNodes()
{
	for (var iT in Nodes)
	{
		thisT=Nodes[iT];

		toConcat=[];
		for (var i in thisT.contains)
		{
			if (typeof(thisT.contains[i])=="string")
			{
				if (thisT.contains[i].charAt(0)==".")
				{
					if (Nodes[thisT.contains[i].substring(1)]!=undefined)
					{
						toConcat=toConcat.concat(Nodes[thisT.contains[i].substring(1)].contains);
					}
					thisT.contains[i]="";
				}
			}
		}

		if (toConcat.length>0)
		{
			for (var i in toConcat)
			{
				thisT.contains.push(toConcat[i]);
			}
		}

		newContains=[];
		for (var i in thisT.contains)
		{
			if (thisT.contains[i]!="") newContains.push(thisT.contains[i]);
		}
		thisT.contains=newContains;

	}
}

var iN=0;
var Instances=[];
function Instance(what)
{
	this.name="node";
	this.type=Nodes[what];
	this.parent=0;
	this.children=[];
	this.n=iN;
	this.display=0;
	this.grown=false;
	iN++;
	Instances.push(this);

	return this;
}

Instance.prototype.Name=function()
{
	if (typeof(this.name)!="string")
	{
		var str="";
		if (typeof(this.name[0])=="string") str+=Choose(this.name);
		else
		{
			for (var i in this.name)
			{
				str+=Choose(this.name[i]);
			}
		}
		this.name=str;
	}

	nameParts=this.name.split("|");
	this.name=nameParts[0];

	if (nameParts[1]!=undefined) this.name=this.name+nameParts[1];

}

Instance.prototype.Grow=function()
{
	if (this.grown==false)
	{
		this.Name();
		for (var i in this.type.contains)
		{
			toMake=this.type.contains[i];
			if (typeof(toMake)!="string")
			{toMake=Choose(toMake);}
			toMake=toMake.split(",");
			var makeAmount=1;
			var makeProb=100;
			if (toMake[1]==undefined) toMake[1]=1;
			else
			{
				makeAmount=toMake[1].split("-");
				if (makeAmount[1]==undefined) makeAmount=makeAmount[0]; else
				{
					makeAmount=Rand(makeAmount[0],makeAmount[1]);
				}
				makeProb=(toMake[1]+"?").split("%");
				if (makeProb[1]!=undefined) {makeProb=makeProb[0];makeAmount=1;} else makeProb=100;
			}

			if (Nodes[toMake[0]]!=undefined)
			{
				if (Math.random()*100<=makeProb)
				{
					for (var ii=0;ii<makeAmount;ii++)
					{
						var New=Make(Nodes[toMake[0]].name);
						New.parent=this;
						this.children.push(New);
					}
				}
			}

		}
		this.grown=true;
	}
}


Instance.prototype.List=function()
{
	var str="";
	var addStyle="";
	for (var i in this.children)
	{
		str+='<div id="div'+this.children[i].n+'">'+this.children[i].name+'</div>';
	}
	//if (this.children.length>0) document.getElementById("div"+this.n).innerHTML='<span onclick="Toggle('+this.n+');"><span class="arrow" id="arrow'+this.n+'">+</span> '+this.name+'</span><div id="container'+this.n+'" class="node" style="display:none;">'+str+'</div>';
	if (this.children.length>0) document.getElementById("div"+this.n).innerHTML='<a href="javascript:Toggle('+this.n+');" style="padding-right:8px;" alt="archetype : '+(this.type.name)+'" title="archetype : '+(this.type.name)+'"><span class="arrow" id="arrow'+this.n+'">+</span> '+this.name+'</a><div id="container'+this.n+'" class="node" style="display:none;'+addStyle+'">'+str+'</div>';
	else document.getElementById("div"+this.n).innerHTML='<span class="emptyNode">'+this.name+'</span>';
}

function Make(what)
{
	return new Instance(what);
}

function Debug(what)
{
	document.getElementById("debug").innerHTML=document.getElementById("debug").innerHTML+'<br>'+what;
}

function Toggle(what)
{
	if (Instances[what].display==0)
	{

		for (var i in Instances[what].children)
		{
			if (Instances[what].children[i].grown==false) {Instances[what].children[i].Grow(0);Instances[what].children[i].List(0);}
		}


		Instances[what].display=1;
		document.getElementById("container"+what).style.display="block";
		document.getElementById("arrow"+what).innerHTML="-";
	}
	else if (Instances[what].display==1)
	{
		Instances[what].display=0;
		document.getElementById("container"+what).style.display="none";
		document.getElementById("arrow"+what).innerHTML="+";
	}
}



//And now, the fun begins!

//How to add a new Node :
//	new Node(name,contains,name generator);
//		-name is the referral name for this Node. Unless a name generator is specified, this name will be the default name for any instances of this Node.
//		-contains is an array of Nodes that an instance of this Node contains, specified by their name.
//			-For example, ["banana"] means this Node contains exactly 1 instance of a banana. ["banana","orange"] means it contains 1 banana and 1 orange.
//			-["banana","strawberry,25%"] means it will contain 1 banana, and has a 25% probability of also containing a strawberry.
//			-["banana,2-7"] means it will contain between 2 and 7 bananas.
//			-[".banana"] will not include a banana in the Node; instead, the Node will contain whatever the banana normally contains.
//			-["banana",["sugar","honey"]] will include a banana, and either sugar or honey. Unfortunately, this does not work with the format ".sugar" or ".honey".
//		-name generator is optional; if specified, the instance of the Node will be named according to this.
//			It can be either an array containing other arrays (the name will be patched up from an element of each array) or an identifier for the Name function, like *BOOK*.
//			A name generator of [["blue ","red "],["frog","toad"]] will produce names such as "blue frog" or "red toad".

Debug('Building...');

CleanNodes();

//CheckMissingNodes();
//alert("There are "+NodesN+" node archetypes.");

document.getElementById("debug").innerHTML="";
Debug('<div id="div0" class="node"></div>');

function LaunchNest(what)
{
	if (!Nodes[what])
		{
			what="error";
		}
	var Seed = Make(what);
	Seed.Grow(0);
	Seed.List();
}
