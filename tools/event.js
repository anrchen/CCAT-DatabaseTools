logme = (content) => {
  const lineBreak = '----------------------'
  console.log('\n'+lineBreak);
  console.log(content);
  console.log(lineBreak+'\n');
}

logfn = (fn) => {
  logme('(´･_･`) {'+fn+'} function is working hard...');
}

logwelcome = () => {
  const emoji_haha = 'ʅ(｡◔‸◔｡)ʃ';
  logme(emoji_haha+' Welcome to CCAT-Database Toolbox~ ');
}

module.exports = {
  logme,
  logfn,
  logwelcome,
};
