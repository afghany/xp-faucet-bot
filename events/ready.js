module.exports = async XPBot => {
  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  await XPBot.wait(1000);

  // Both `wait` and `XPBot.log` are in `./modules/functions`.
  XPBot.log("log", `${XPBot.user.tag}は起動完了しました！ サーバー数: ${XPBot.guilds.size} ユーザー数: ${XPBot.users.size}`, "Ready!");

  // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
  XPBot.guilds.filter(g => !XPBot.settings.has(g.id)).forEach(g => XPBot.settings.set(g.id, XPBot.config.defaultSettings));
  
  // 起動完了
  XPBot.ready = true;
  
  require('../modules/radioCenter.js')(XPBot);
};
