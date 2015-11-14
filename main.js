var Nodes=[];
var NodesN=0;
function Node(name,contains)
{
	this.name=name;
	this.contains=contains;

	Nodes[name]=this;
	NodesN++;
}

var iN=0;
var Instances=[];
function Instance(source)
{
	this.name="node";
	this.type=Nodes[source];
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

Instance.prototype.GetPDF=function()
{
	//Gets PDF from JSTOR using title string
}

Instance.prototype.ConvertPDFToTxt=function()
{
	//Takes the PDF and gets a .txt file of the last ??? pages
}

Instance.prototype.findSources=function()
{
	if (this.grown==false)
	{
		this.Name();
		for (var i in this.type.contains)
		{
			toMake=this.type.contains[i];
			console.log(toMake)
			var New=Make(Nodes[toMake].name);
			console.log(Nodes[toMake])
			New.parent=this;
			this.children.push(New);
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
	if (this.children.length>0) document.getElementById("div"+this.n).innerHTML='<a href="javascript:Toggle('+this.n+');" style="padding-right:8px;" alt="archetype : '+(this.type.name)+'" title="archetype : '+(this.type.name)+'"><span class="arrow" id="arrow'+this.n+'">+</span> '+this.type.name+'</a><div id="container'+this.n+'" class="node" style="display:none;'+addStyle+'">'+str+'</div>';
	else document.getElementById("div"+this.n).innerHTML='<span class="emptyNode">'+this.name+'</span>';
}

function Make(source)
{
	return new Instance(source);
}

function Debug(source)
{
	document.getElementById("debug").innerHTML=document.getElementById("debug").innerHTML+'<br>'+source;
}

function Toggle(source)
{
	if (Instances[source].display==0)
	{

		for (var i in Instances[source].children)
		{
			if (Instances[source].children[i].grown==false) {Instances[source].children[i].findSources(0);Instances[source].children[i].List(0);}
		}


		Instances[source].display=1;
		document.getElementById("container"+source).style.display="block";
		document.getElementById("arrow"+source).innerHTML="-";
	}
	else if (Instances[source].display==1)
	{
		Instances[source].display=0;
		document.getElementById("container"+source).style.display="none";
		document.getElementById("arrow"+source).innerHTML="+";
	}
}

new Node(input, ["a", "b", "c", "d"])
new Node("a", ["aa", "ab", "ac", "ad"]);
new Node("b", ["ba", "bb", "ac", input]);
new Node("c", ["aa", "bb", "ac", "ad"]);
new Node("d", ["aa", "bb", input, "dd"]);

Debug('Building...');

document.getElementById("debug").innerHTML="";
Debug('<div id="div0" class="node"></div>');

function Launch(source)
{
	if (!Nodes[source])
		{
			source="Error.";
		}
	var Seed = Make(source);
	Seed.findSources(0);
	Seed.List();
}
