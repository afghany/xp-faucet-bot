// presenceUpdateイベントはユーザーのステータス変更時に発火します
// 注: Botは全てのイベントに関連付けられているため、関数実行時全てのイベントに
// XPBot, other, args が渡されます。

module.exports = (XPBot, oldMsg, newMsg) => {
  if(!XPBot.ready) return;
  //if(message.author.bot) return;
  if(newMsg.author.id === XPBot.user.id) return;

};
