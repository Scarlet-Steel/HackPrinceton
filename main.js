var Nodes=[];
var NodesN=0;
function Node(title,author,contains)
{
	this.title=title;
	this.author=author
	this.contains=contains;

	Nodes[title]=this;
	NodesN++;
}

var iN=0;
var Instances=[];
function Instance(title,author)
{
	this.title=title
	this.author=author
	this.type=Nodes[title];
	this.parent=0;
	this.children=[];
	this.n=iN;
	this.display=0;
	this.grown=false;
	this.render=false;
	this.empty=false;
	iN++;
	Instances.push(this);

	return this;
}

Instance.prototype.Name=function()
{
	if (typeof(this.title)!="string")
	{
		var str="";
		if (typeof(this.title[0])=="string") str+=Choose(this.title);
		else
		{
			for (var i in this.title)
			{
				str+=Choose(this.title[i]);
			}
		}
		this.title=str;
	}

	nameParts=this.title.split("|");
	this.title=nameParts[0];

	if (nameParts[1]!=undefined) this.title=this.title+nameParts[1];

}

Instance.prototype.Grow=function()
{
	if (this.grown==false || this.empty==true)
	{
		this.Name();
		console.log(this)
		for (var i in this.type.contains)
		{
			toMake = this.type.contains[i];
			var toMakeP = toMake.split(" | ")
			var toMakeT = toMakeP[1];
			var toMakeA = toMakeP[0];
			
			if (typeof(Nodes[toMakeT])=="undefined")
			{
				new Node(toMakeT, toMakeA, []);
			}
			else
			{
				this.empty = false;
			}
			var New=Make(toMakeT,toMakeA);
			
			New.parent=this;
			this.children.push(New);
		}
		this.grown=true;
	}
}

Instance.prototype.List=function()
{
	if (this.render==false)
	{
		var str="";
	
		document.getElementById("container"+this.parent.n).innerHTML += '<div id="div'+this.n+'"><a href="javascript:Toggle('+this.n+');" style="padding-right:8px;" alt="archetype : '+(this.title)+'" title="archetype : '+(this.title)+'"><span class="arrow" id="arrow'+this.n+'">+</span> '+this.title+'\n'+this.author+'</a><div id="container'+this.n+'" class="node" style="display:none;"></div></>';
		this.render = true;
	}
}

function getSources()
{
	var sources = []

	//var rawText = "References 1. Larkin PA (1996) Concepts and issues in marine ecosystem management. Rev Fish Biol Fisheries 6: 139–164. 2. Ruckelshaus M, Klinger T, Knowlton N, DeMaster DP (2008) Marine ecosystem-based management in practice: scientific and governance challenges. Biosci 58: 53-63. 3. Brewer JF (2011) Paper fish and policy conflict: Catch shares and ecosystem- based management in Maine's groundfishery. Ecol Soc 16: 15. 4. Corkeron P (2006) Opposing views of the --Ecosystem Approach'' to fisheries management. Conserv Biol 20: 617–619. 5. Stephenson RL, Lane DE (1995) Fisheries Management Sciences: a plea for conceptual change. Can J Fish Aquat Sci 52: 2051–2056. ";
	var rawText = "References 1. Larkin PA (1996) Concepts and issues in marine ecosystem management. Rev Fish Biol Fisheries 6: 139–164. 2. Ruckelshaus M, Klinger T, Knowlton N, DeMaster DP (2008) Marine ecosystem-based management in practice: scientific and governance challenges. Biosci 58: 53-63. 3. Brewer JF (2011) Paper fish and policy conflict: Catch shares and ecosystem- based management in Maine’s groundfishery. Ecol Soc 16: 15. 4. Corkeron P (2006) Opposing views of the ––Ecosystem Approach'' to fisheries management. Conserv Biol 20: 617–619. 5. Stephenson RL, Lane DE (1995) Fisheries Management Sciences: a plea for conceptual change. Can J Fish Aquat Sci 52: 2051–2056. 6. Pew Oceans Commission (POC) (2003) America’s Living Oceans: Charting a Course for Sea Change, Arlington (VA) POC. 7. US Commission on Ocean Policy (USCOP) (2004) An Ocean Blueprint for the 21st Century Washington (DC) USCOP. 8. Boyd IL (2002) Integrated environment-prey-predator interactions off South Georgia: implications for management of fisheries. Aquat Conserv: Marine Fresh Ecosyst 12: 119–126. 9. ICES (2008) Report of the ICES Advisory Committee 2008. ICES Advice, 2008. Book 6. pp 326. 10. Link JS, Brodziak JKT, Edwards SF, Overholtz WJ, Mountain D, et al. (2002) Marine ecosystem assessment in a fisheries management context. Can J Fish Aquat Sci 59: 1429–1440. 11. Pikitch E, Santora C, Babcock E, Bakun A, Bonfil R, et al. (2004) Ecosystem- based fishery management. Science 305: 346. 12. Fisheries and Oceans Canada (FOC) (2002) Canada’s Oceans Strategy, Ottawa, ON, FOC. 13. National Marine Fisheries Service (NMFS) (1999) Ecosystem-Based Fishery Management: A Report to Congress by the Ecosystem Principles Advisory Panel Washington (DC) NMFS, US Department of Commerce. 14. Bax NJ (1998) The significance and prediction of predation in marine fisheries. ICES J Mar Sci 55: 997–1030. 15. Levin PS, Kaplan I, Grober Dunsmore R, Chittaro PM, Oyamada S, et al. (2009) A framework for assessing the biodiversity and fishery aspects of marine reserves. J Appl Ecol 46: 735–742. 16. Sinclair ARE, Pech RP, Dickman CR, Hik D, Mahon P, et al. (1998) Predicting effects of predation on conservation of endangered prey. Conserv Biol 12: 564–575. 17. Ford JKB, Ellis GM (2006) Selective foraging by fish-eating killer whales ( Orcinus orca ) in British Columbia. Mar Ecol Prog Ser 316: 185–199. 18. Hanson MB, Baird RW, Ford JKB, Hempelmann-Halos J, Van Doornik DM, et al. (2010) Species and stock identification of prey consumed by endangered southern resident killer whales in their summer range. Endang Spec Res 11: 69–82. 19. Reynolds III JE, Marsh H, Ragen TJ (2009) Marine mammal conservation. Endang Spec Res 7: 23–28. 20. Nehlsen W, Williams JE, Lichatowich JA (1991) Pacific salmon at the crossroads: stocks at risk from California, Oregon, Idaho, and Washington. Fisheries 16: 4–21. 21. Waples RS (1991) Pacific salmon, Oncorhyncus spp., and the definition of ––species’’ under the Endangered Species Act. Mar Fisher Rev 53: 11–22. 22. Ward EJ, Holmes EE, Balcomb KC (2009) Quantifying the effects of prey abundance on killer whale reproduction. J Appl Ecol 46: 632–640. 23. Mooers AO, Prugh L, Festa Bianchet M, Hutchings J (2007) Biases in legal listing under Canadian endangered species legislation. Conserv Biol 21: 572–575. 24. Noakes DJ, Beamish RJ, Kent ML (2000) On the decline of Pacific salmon and speculative links to salmon farming in British Columbia. Aquaculture 183: 363–386. 25. Northcote T, Atagi D (1997) Pacific salmon abundance trends in the Fraser River watershed compared with other British Columbia systems. Pacific salmon and their ecosystems: status and future options. In Stouder DJ, Bisson PA, Naiman RJ, eds. Pacific salmon and their ecosystems, status and future options. New York: Chapman & Hall. pp 199–219."
	
	function isNumeric(n)
	{
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	var indexOfReference = rawText.indexOf("References");
	rawText = rawText.substring(indexOfReference+11);

	var index = 0;
	var citation = "";
	var count = 1;

	while (true)
	{
		citation = "";
  		while(true)
  		{
  			index = rawText.indexOf("(");
  			if(isNumeric(rawText.substring(index+1,index+5)) && 1500 < rawText.substring(index+1,index+5) < 2100)
  			{
  				citation+=rawText.substring(rawText.lastIndexOf(count+".")+2,index);
  				break
  			}
  		}
  		rawText = rawText.substring(index+7);
  
  		index = rawText.indexOf(".");
  		citation+="| "+rawText.substring(0,index);
  		sources.push(citation);
		console.log(citation);
		
  		rawText = rawText.substring(index+7+citation.length);
  		count++;
		
	
	}
	
	return sources;
}

function Make(title,author)
{
	return new Instance(title,author);
}

function Debug(source)
{
	document.getElementById("debug").innerHTML=document.getElementById("debug").innerHTML+'<br>'+source;
}

function Toggle(source)
{
	if (Instances[source].display==0)
	{
		Instances[source].Grow(0);
		if (Instances[source].type.contains.length==0)
		{			
			Instances[source].type.contains = getSources();
			Instances[source].empty=true;
			Instances[source].Grow(0);
		}

		for (var i in Instances[source].children)
		{
			if (Instances[source].children[i].render==false)
			{
				Instances[source].children[i].List(0);
			}
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

var parse = input.split(" | ");
new Node(parse[1], parse[0], getSources());

Debug('Building...');

document.getElementById("debug").innerHTML="";
Debug('<div id="div0" class="node"></div>');

function Launch(source)
{
	var parse = source.split(" | ")
	var title = parse[1];
	var author = parse[0];
	
	console.log(title)
	console.log(author)
	if (!Nodes[title])
		{
			title="Error.";
			author="Error.";
		}
	var Seed = Make(title,author);
	Seed.Grow(0);
	
	var str="";
	for (var i in Seed.children)
	{
		str+='<div id="div'+Seed.children[i].n+'"></div>';
	}
	document.getElementById("div"+Seed.n).innerHTML='<a href="javascript:Toggle('+Seed.n+');" style="padding-right:8px;" alt="archetype : '+(Seed.title)+'" title="archetype : '+(Seed.title)+'"><span class="arrow" id="arrow'+Seed.n+'">+</span> '+Seed.title+'\n'+Seed.author+'</a><div id="container'+Seed.n+'" class="node" style="display:none;">'+str+'</div>';
}
