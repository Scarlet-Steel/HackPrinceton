function Pdf2TextClass(){
     var self = this;
     this.complete = 0;

    /**
     *
     * @param data ArrayBuffer of the pdf file content
     * @param callbackPageDone To inform the progress each time
     *        when a page is finished. The callback function's input parameters are:
     *        1) number of pages done;
     *        2) total number of pages in file.
     * @param callbackAllDone The input parameter of callback function is 
     *        the result of extracted text from pdf file.
     *
     */
     this.pdfToText = function(data, callbackPageDone, callbackAllDone){
     console.assert( data  instanceof ArrayBuffer  || typeof data == 'string' );
     PDFJS.getDocument( data ).then( function(pdf) {
     var div = document.getElementById('viewer');

     var total = pdf.numPages;
     callbackPageDone( 0, total );        
     var layers = {};        
     for (i = 1; i <= total; i++){
        pdf.getPage(i).then( function(page){
        var n = page.pageNumber;
        page.getTextContent().then( function(textContent){
          if( null != textContent.bidiTexts ){
            var page_text = "";
            var last_block = null;
            for( var k = 0; k < textContent.bidiTexts.length; k++ ){
                var block = textContent.bidiTexts[k];
                if( last_block != null && last_block.str[last_block.str.length-1] != ' '){
                    if( block.x < last_block.x )
                        page_text += "\r\n"; 
                    else if ( last_block.y != block.y && ( last_block.str.match(/^(\s?[a-zA-Z])$|^(.+\s[a-zA-Z])$/) == null ))
                        page_text += ' ';
                }
                page_text += block.str;
                last_block = block;
            }

            textContent != null && console.log("page " + n + " finished."); //" content: \n" + page_text);
            layers[n] =  page_text + "\n\n";
          }
          ++ self.complete;
          callbackPageDone( self.complete, total );
          if (self.complete == total){
            window.setTimeout(function(){
              var full_text = "";
              var num_pages = Object.keys(layers).length;
              for( var j = 1; j <= num_pages; j++)
                  full_text += layers[j] ;
              callbackAllDone(full_text);
            }, 1000);              
          }
        }); // end  of page.getTextContent().then
      }); // end of page.then
    } // of for
  });
 }; // end of pdfToText()
}; // end of class
