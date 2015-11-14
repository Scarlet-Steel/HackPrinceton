var paper = new Object();
paper.children = [];

var rawText = ["random shit blah References 1. Larkin PA (1996) Concepts and issues in marine ecosystem management. Rev Fish Biol Fisheries 6: 139–164. 2. Ruckelshaus M, Klinger T, Knowlton N, DeMaster DP (2008) Marine ecosystem-based management in practice: scientific and governance challenges. Biosci 58: 53–63. 3. Brewer JF (2011) Paper fish and policy conflict: Catch shares and ecosystem- based management in Maine’s groundfishery. Ecol Soc 16: 15. 4. Corkeron P (2006) Opposing views of the ––Ecosystem Approach’’ to fisheries management. Conserv Biol 20: 617–619. 5. Stephenson RL, Lane DE (1995) Fisheries Management Sciences: a plea for conceptual change. Can J Fish Aquat Sci 52: 2051–2056. "]

//Search backwards through file until you see "References"
//Take everything char by char until (****) with 4 integer chars
//Skip the date and then take evreything until .
//Add that whole thing using paper.children.push(citation)

