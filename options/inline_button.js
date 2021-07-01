class inline_buttons {  

  /*

  constructor(name,id) {    

          this.name = name;
          this.id   = id; 
  }

  */

  button (text,callback) {       

     return { 

                reply_markup: JSON.stringify({
                inline_keyboard: [

                    [{text: text, callback_data: callback }],
                ]
           
           
           })
  
       };
              
           
           }
  
       }

  
    module.exports = inline_buttons  

