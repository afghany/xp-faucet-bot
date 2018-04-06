const sendSpam = require('../modules/sendSpam.js');
exports.run = async (XPBot, message, args, level) => { // eslint-disable-line no-unused-vars
  let guild = message.guild;
  
  var channels;
  
  let values = XPBot.vpg.getValues(guild.id);
  if(values && values.channelAliases){
    if(args[0] in values.channelAliases){
      channels = values.channelAliases[args[0]];
      args.shift();
    }
  } else{
    channels = args.shift().split(';');
  }
  let wait = parseInt(args.shift(), 10); //args[1]
  
  if(args.length == 0) return;
  
  args[0] = args[0].replace('everyone', '@everyone');
  
  let spamMsg = args.join(' ');
  
  const settings = message.settings;//XPBot.getGuildSettings(message.guild);  
  
  if(spamMsg.indexOf(',') === 0){
    message.reply('`spam`コマンドで水道局にXp-Botコマンドを打たせることはできません :cop:');
    return;
  }
  
  if(isNaN(wait)){
    message.reply(':no_entry_sign: 構文エラー');
    return;
  }
  
  let wBefore;
  if(wait >= 3000) wBefore = 2000;
  else if(wait > 0) wBefore = 800;
  else wBefore = 0;
  
  sendSpam(
    XPBot,
    guild,
    channels,
    spamMsg,
    null, //sendOption
    null, //funcAfterEach
    () => { //funcAfterAll
      XPBot.log('SPAM', '送信終了', 'Log');
    },
    {waitBefore: wBefore, waitAfter: wait}
  );

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  //specificAllowed: ['水道局長', '水道局幹部', '水道局職員', 'サーバー所有者', '管理者', 'モデレーター', 'チャットルーム・マネージャー', 'サポートチーム',  'ラジオ放送者'],
  permLevel: "サポートチーム"
};

exports.help = {
  name: "spam",
  category: "サーバー運営",
  description: "指定されたチャンネルに一斉にメッセージを送信します\nチャンネル名に「all」を指定すると、全チャットルームに送信\nメッセージ文頭に「everyone」を入力すると、自動的に@everyoneメンションに変わる",
  usage: "spam <チャンネル名(空白無し/先頭に「#」無し/「;」でつなげる)> <送信後書き込み停止時間(ミリ秒)> <メッセージ>"
};
