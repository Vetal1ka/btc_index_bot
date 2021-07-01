
const user_db = ""; //пользователь бд
const pass_db = ""; //пароль для бд
const token   = ""; //токен телеграм бота

const apiTelegram = require('node-telegram-bot-api');
const bot = new apiTelegram(token, { polling: true });  

//подключим бд

const mongoose  = require('mongoose');
const fetch = require('node-fetch');

const inlineButtons    = require('./options/inline_button.js');
const descriptionClass = require('./options/description.js');
const apiIndex = require('./options/api.js');
const Users = require('./models/Users.js');

// класс с кнопками:
let buttons = new inlineButtons(7,9); 

//класс с описанием
let description = new descriptionClass();

//api
let api = new apiIndex();         

const chats = {}  

const start_app = async () => {       

 //добавить команды для бота

 bot.setMyCommands([

        {command: '/get', description: 'Получить Индекс'},
        {command: '/faq', description: 'Информация'}
    
    ]); 

 let text_bot;
 let chat_id;
 let name;   

//text обработчик

bot.on('message', async (msg) => { 

      text_bot = "Неверный запрос!";  
      
      chat_id  = msg.chat.id; 
      name     = msg.chat.first_name;
      username = msg.from.username;  

console.log(msg);

switch (msg.text) {    
  
             case '/start':

 //создадим пользователя

 const user = new Users({ 

                name: name, 
                id: chat_id,
                username: username

           });

 user.save(function(err){
     
      if(err) return console.log(err);
     
      console.log("Сохранен объект user", user);
});

                 text_bot = "Привет "  + name + "!\n\n "
                 +"Получить информацию "
                 +"о боте: /faq \n\n Получить индекс: /get";

                 break;

  case '/get': 

        fetch('https://api.alternative.me/fng/?limit=1')
        
        .then(res => res.json())
        .then(json => {
                
         result = json.data;

          bot.sendMessage(

               chat_id,
               api.getDescription(parseInt(result[0]['value'])) 

             );

                     }

                );

               return false;     
                 
            break;

    case '/all': 

    //вывести всех пользователей

    Users.find({}, function(err, users){
     
    if(err) return console.log(err);
     
    console.log(users);

});

                 return false;
                 
                 break;

       
            case '/faq':
              
            return bot.sendMessage(  
                
                chat_id,
                description.faqText(),
                buttons.button("✅ Я ознакомился","ok")

             ); 

                 break;
          
                }

             return bot.sendMessage(chat_id,text_bot);
        
          }); 
      

  //inline обработчик
 
    bot.on('callback_query', async msg => {

      text_bot = "Неверный запрос!";

      chat_id  = msg.message.chat.id; 
      name     = msg.message.chat.first_name;  

        switch (msg.data) {    
           
           case 'ok':

                 text_bot = "Привет "  + name + "!\n\n "
                 +"Получить информацию "
                 +"о боте: /faq \n\n Получить индекс: /get";

           return bot.sendMessage(chat_id,text_bot);
          
           break; 

                  
                  }
              
              });

           };  
   

  //подключамся к бд

  async function start() {

  let connect = `mongodb+srv://${user_db}:${pass_db}@cluster0.fofcm.mongodb.net/todos`;

  try { 

  await mongoose.connect(connect,

                     { 

                           useNewUrlParser:true,
                           useUnifiedTopology: true,
                           useFindAndModify:false 

                      }      
                   
                   );
                              start_app(); 

                       } catch (e) {  

                console.log(e); 
          
           }

       };

 start();   





