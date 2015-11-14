var paper = new Object();
paper.children = [];

var rawText = ["random shit blah References 1. Larkin PA (1996) Concepts and issues in marine ecosystem management. Rev Fish Biol Fisheries 6: 139–164. 2. Ruckelshaus M, Klinger T, Knowlton N, DeMaster DP (2008) Marine ecosystem-based management in practice: scientific and governance challenges. Biosci 58: 53–63. 3. Brewer JF (2011) Paper fish and policy conflict: Catch shares and ecosystem- based management in Maine’s groundfishery. Ecol Soc 16: 15. 4. Corkeron P (2006) Opposing views of the ––Ecosystem Approach’’ to fisheries management. Conserv Biol 20: 617–619. 5. Stephenson RL, Lane DE (1995) Fisheries Management Sciences: a plea for conceptual change. Can J Fish Aquat Sci 52: 2051–2056. "];

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//Search backwards through file until you see "References"
//count = 1
//Take everything char by char until (****) with 4 integer chars
//Skip the date and then take everything until .
//Add that whole thing using paper.children.push(citation)
//count++
//Find count. and then go to step 3

var indexOfReference = rawText.search("References");
rawText = rawText.substr(indexOfReference+11); //cuts out "References" and everything before

var index1 = 0;
var index2 = 0;
var citation = "";
var test = "";
var count = 1;

while (true)
{
  citation = "";
  while(true)
  {
  	index1 = rawText.search("(");
  	index2 = rawText.search(")");
  	if(isNumeric(rawText.substr(index1+1,index2-1)) && 1500 < rawText.substr(index1+1,index2-1) < 2100)
  	{
  		citation+=rawText.substr(0,index1-1);
  		break
  	}
  }
  rawText = rawText.substr(index2+1);
  
  index1 = rawText.search(".");
  citation+=rawText.substr(0,index1-1);
  paper.children.push(citation)
  
  index1 = rawText.search(count+".");
  if(index == -1)
  {
  	break
  }
  else
  {
  	rawText = rawText.substr(index1);
  }
}
