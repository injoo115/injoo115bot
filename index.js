const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";

const moment = require("moment");
require("moment-duration-format");
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '!명령어' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "일반인"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '!출근') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '관리자 권한을 소지중이지 않습니다.'  
      );
    }
    return message.reply('```님은 현재 출근상태입니다```');
  }
  
  if(message.content == '!퇴근') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '관리자 권한을 소지중이지 않습니다.'  
      );
    }
    return message.reply('```님은 현재 퇴근상태입니다```');
  }
  

  if(message.content == '!서버정보') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/attachments/714386073538789396/717712351989727282/images.jpg';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#186de6')
    embed.setAuthor('server info of Team Genesis Bot', img)
    embed.setFooter(`Team Genesis Bot`)
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord.js',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);

    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;

    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
  }

  else if(message.content == '!명령어') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '!BR', desc: '공지사항을 전송합니다'},
      {name: '!공지', desc: 'dm으로 전체 공지를 보넴니다'},
      {name: '!청소', desc: '텍스트를 지움니다'},
      {name: '!초대코드', desc: '해당 채널의 초대 코드 표기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('이벤트 SERVER', helpImg)
      .setColor('#186de6')
      .setFooter(`이벤트 SERVER`)
      .setTimestamp()

    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }
  
  else if(message.content == '!관리자목록') {
    let helpImg = 'https://cdn.discordapp.com/attachments/714386073538789396/717712351989727282/images.jpg';
    let commandList = [
      {name: '!Dira', desc: '서버 관리자인 DIRA에 대해 알고싶다면 !DIRA라 적어주세요. '},
      {name: '!생갈치', desc: '서버 관리자인 생갈치님에 대해 알고싶다면 !생갈치라 적어주세요.'},
      {name: '!44444', desc: '서버 관리자인 44444님에 대해 알고싶다면 !44444라 적어주세요.'},
      {name: '!INJOO', desc: '서버 개발자인 INJOO님에 대해 알고싶다면 !INJOO이라 적어주세요.'},
      {name: '!과충전', desc: '서버 디스코드 관리자인 과충전님에 대해 알고싶다면 !과충전이라 적어주세요.'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('이벤트 SERVER', helpImg)
      .setColor('#186de6')
      .setFooter(`이벤트 SERVER`)
      .setTimestamp()

    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content == '!관리자신청서') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img = 'https://cdn.discordapp.com/attachments/714386073538789396/717712351989727282/images.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('관리자 신청란')
      .setURL('https://discord.gg/HzCZFAz')
      .setAuthor('이벤트서버 관리진', img, 'https://discord.gg/HzCZFAz')
      .setThumbnail(img)
      .addBlankField()
      .addField('이름', '```예시 : 이름:유인주```')
      .addField('각오', '```예시 : 각오:열심히 하겠습니다 (길게쓰면 더 좋음)```')
      .addField('스팀 URL', '```예시 : https://steamcommunity.com/profiles/76561198862276861/```')
      .addField('나이', '```예시 : 나이:23살```')
      .addBlankField()
      .setTimestamp()
      .setFooter('이벤트서버 관리진', img)

    message.channel.send(embed);
  }
  if (message.content === '/온') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img =
      'https://cdn.discordapp.com/attachments/714386073538789396/717712351989727282/images.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('서버가 열렸습니다')
      .setColor(0x00ff3c)
      .setAuthor('이벤트 SERVER', img)
      .setThumbnail(img)
      .addField('디스코드', 'https://discord.gg/HzCZFAz')
      .addBlankField()
      .setTimestamp()
      .setFooter('이벤트서버 관리진', img);

    message.channel.send(embed);
  }
  if (message.content === '/오프') {
    message.delete();
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img =
      'https://cdn.discordapp.com/attachments/714386073538789396/717712351989727282/images.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('서버가 닫혔습니다')
      .setColor(0xff0000)
      .setAuthor('이벤트 SERVER', img)
      .setThumbnail(img)
      .addField('디스코드', 'https://discord.gg/HzCZFAz')
      .addBlankField()
      .setTimestamp()
      .setFooter('이벤트서버 관리진', img);

    message.channel.send(embed);
  }
  if (message.content === '/리붓') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img =
      'https://cdn.discordapp.com/attachments/714386073538789396/717712351989727282/images.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('서버가 다시시작됩니다')
      .setColor(0xf6ff00)
      .setAuthor('이벤트 SERVER', img)
      .setThumbnail(img)
      .addField('디스코드', 'https://discord.gg/HzCZFAz')
      .addBlankField()
      .setTimestamp()
      .setFooter('이벤트서버 관리진', img);

  message.channel.send(embed);
}
if (message.content === '/점검') {
  message.delete();  
  if (!message.member.hasPermission('MANAGE_MESSAGES')) {
    return message.channel.send(
      `<@${message.author.id}> ` +
        '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
    );
  }
  let img =
    'https://cdn.discordapp.com/attachments/714386073538789396/717712351989727282/images.jpg';
  let embed = new Discord.RichEmbed()
    .setTitle('서버가 점검중입니다')
    .setColor(0xff7200)
    .setAuthor('이벤트 SERVER', img)
    .setThumbnail(img)
    .addField('디스코드', 'https://discord.gg/HzCZFAz')
    .addBlankField()
    .setTimestamp()
    .setFooter('이벤트서버 관리진', img);

    message.channel.send(embed);
  }
  if (message.content === '!생갈치') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img =
      'https://cdn.discordapp.com/avatars/591956020742586369/3b4ac4831a3c3915c4aff333d1481a6a.png?size=128';
    let embed = new Discord.RichEmbed()
      .setTitle('생갈치')
      .setColor(0xFFEB59)
      .setAuthor('자기소개', img)
      .setThumbnail(img)
      .addField('안녕하세요 이벤트 서버장 생갈치라고 합니다. 잘 부탁 드립니다')
      .addBlankField()
      .setTimestamp()
      .setFooter('생갈치', img);
	  
    message.channel.send(embed);
  }
  if (message.content === '!Dira') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img =
      'https://cdn.discordapp.com/avatars/711508822371598409/223d8d7984ae1d032369a5ae3790103c.png?size=128';
    let embed = new Discord.RichEmbed()
      .setTitle('Dira')
      .setColor(0x4300FF)
      .setAuthor('자기소개', img)
      .setThumbnail(img)
      .addField('안녕하세요 이벤트 서버 관리자 Dira라고 합니다. 잘 부탁 드립니다')
      .addBlankField()
      .setTimestamp()
      .setFooter('Dira', img);	  
	  
    message.channel.send(embed);
  }
  if (message.content === '!44444') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img =
      'https://cdn.discordapp.com/avatars/625212101719490589/82c8cd0c58e822e304d6b4eda4f153f2.png?size=128';
    let embed = new Discord.RichEmbed()
      .setTitle('44444')
      .setColor(0xFF0000)
      .setAuthor('자기소개', img)
      .setThumbnail(img)
      .addField('안녕하세요 이벤트 서버 관리자 44444라고 합니다. 잘 부탁 드립니다')
      .addBlankField()
      .setTimestamp()
      .setFooter('44444', img);	  
	
    message.channel.send(embed);
  }
  if (message.content === '!INJOO') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img =
      'https://cdn.discordapp.com/attachments/714386073538789396/717712351989727282/images.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('INJOO')
      .setColor(0xFF0090)
      .setAuthor('자기소개', img)
      .setThumbnail(img)
      .addField('안녕하세요 이벤트 서버 개발자 INJOO라고 합니다. 잘 부탁 드립니다')
      .addBlankField()
      .setTimestamp()
      .setFooter('INJOO', img);	  
	  
    message.channel.send(embed);
  }
  if (message.content === '!과충전') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img =
      'https://cdn.discordapp.com/attachments/714386073538789396/717712351989727282/images.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('과충전')
      .setColor(0x1DFF00)
      .setAuthor('자기소개', img)
      .setThumbnail(img)
      .addField('안녕하세요 이벤트 서버 디스코드 관리자 과충전이라고 합니다. 잘 부탁 드립니다')
      .addBlankField()
      .setTimestamp()
      .setFooter('과충전', img);	  
	
    message.channel.send(embed)
  } else if(message.content == '!초대코드') {
    client.guilds.array().forEach(x => {
      x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
          }
        })
    });
  } else if(message.content.startsWith('!BR')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!공지'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('이벤트서버 공지사항')
        .setColor('#186de6')
        .setFooter(`이벤트서버 관리진`)
        .setTimestamp()

      embed.addField('공지: ', contents);

      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });

      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }

    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 99까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);