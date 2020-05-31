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

  if(message.content == '봇아 나 좋아?') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '웅 너가 제일 좋아 !'  
      );
    }
    return message.reply('관리자는.. 딱히.. 좋아한다는 생각은 해본적이 없어요...');
  }
  
  if(message.content == '봇아 너가 제일 좋아하는 사람이 누구야?') {
    return message.reply('날 만들어주신 <@630717374642782218> 오빠가 제일 조치 !!');
  }
  if(message.content == '야') {
    return message.reply('왜');
  }

  if(message.content == '!서버정보') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/icons/705005885759422564/79eda5e0486fea441b39b23a03018ea9.webp?size=128';
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

  else if(message.content == '!명령어목록') {
    let helpImg = 'https://cdn.discordapp.com/icons/705005885759422564/79eda5e0486fea441b39b23a03018ea9.webp?size=128';
    let commandList = [
      {name: '!BR', desc: 'dm으로 전체 공지를 보넴니다'},
      {name: '!청소', desc: '텍스트를 지움니다'},
      {name: '!초대코드', desc: '해당 채널의 초대 코드 표기'},
      {name: '봇아 나 좋아?', desc: '봇이 대답합니다'},
      {name: '봇아 너가 제일 좋아하는 사람이 누구야?', desc: '봇이 대답합니다'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('제네시스 서버', helpImg)
      .setColor('#186de6')
      .setFooter(`제네시스 서버`)
      .setTimestamp()

    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);
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

else if(message.content == '!관리자목록') {
    let helpImg = 'https://cdn.discordapp.com/icons/705005885759422564/79eda5e0486fea441b39b23a03018ea9.webp?size=128';
    let commandList = [
      {name: '!강비', desc: '관리자인 강비에 대해 알고싶다면 !강비라고 쳐주세요'},
      {name: '!김고든', desc: '관리자인 김고든에 대해 알고싶다면 !김고든이라고 쳐주세요'},
      {name: '!클립', desc: '관리자인 클립에 대해 알고싶다면 !클립이라고 쳐주세요'},
      {name: '!팀투', desc: '관리자인 팀투에 대해 알고싶다면 !팀투라고 쳐주세요'},
      {name: '!똥견', desc: '관리자인 똥견에 대해 알고싶다면 !똥견이라고 쳐주세요'},
      {name: '!ymw15963', desc: '보충관리팀인 ymw15963에 대해 알고싶다면 !ymw15963이라고 쳐주세요'},
      {name: '!깡통', desc: '관리자는 아니지만 귀엽고 깜찍한 깡통에 대해 알고싶으면 !깡통이라고 쳐주세요..'},
      {name: '!카오스', desc: '규칙 관리원인 카오스에 대해 알고싶다면 !카오스라고 쳐주세요'},
      {name: '!리얼세븐', desc: '규칙 관리원인 리얼세븐에 대해 알고싶다면 !리얼세븐라고 쳐주세요'},
      {name: '!PLAS', desc: '서버 운영자 or 서버 대표인 PLAS에 대해 알고싶다면 !PLAS라고 쳐주세요'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of Team Genesis Bot', helpImg)
      .setColor('#186de6')
      .setFooter(`Team Genesis Bot`)
      .setTimestamp()

    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

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
      'https://cdn.discordapp.com/icons/705005885759422564/79eda5e0486fea441b39b23a03018ea9.webp?size=128';
    let embed = new Discord.RichEmbed()
      .setTitle('서버가 열렸습니다')
      .setColor(0x00ff3c)
      .setAuthor('제네시스 SERVER', img)
      .setThumbnail(img)
      .addField('디스코드', 'https://discord.gg/nv73rz')
      .addBlankField()
      .setTimestamp()
      .setFooter('제네시스 관리진', img);

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
      'https://cdn.discordapp.com/icons/705005885759422564/79eda5e0486fea441b39b23a03018ea9.webp?size=128';
    let embed = new Discord.RichEmbed()
      .setTitle('서버가 닫혔습니다')
      .setColor(0xff0000)
      .setAuthor('제네시스 SERVER', img)
      .setThumbnail(img)
      .addField('디스코드', 'https://discord.gg/nv73rz')
      .addBlankField()
      .setTimestamp()
      .setFooter('제네시스 관리진', img);

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
      'https://cdn.discordapp.com/icons/705005885759422564/79eda5e0486fea441b39b23a03018ea9.webp?size=128';
    let embed = new Discord.RichEmbed()
      .setTitle('서버가 다시시작됩니다')
      .setColor(0xf6ff00)
      .setAuthor('제네시스 SERVER', img)
      .setThumbnail(img)
      .addField('디스코드', 'https://discord.gg/nv73rz')
      .addBlankField()
      .setTimestamp()
      .setFooter('제네시스 관리진', img);

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
    'https://cdn.discordapp.com/icons/705005885759422564/79eda5e0486fea441b39b23a03018ea9.webp?size=128';
  let embed = new Discord.RichEmbed()
    .setTitle('서버가 점검중입니다')
    .setColor(0xff7200)
    .setAuthor('제네시스 SERVER', img)
    .setThumbnail(img)
    .addField('디스코드', 'https://discord.gg/nv73rz')
    .addBlankField()
    .setTimestamp()
    .setFooter('제네시스 관리진', img);
	
  message.channel.send(embed);
}
if (message.content === '!강비') {
  let img =
    'https://cdn.discordapp.com/avatars/513629171172507669/6a4debd68d9f9e03e6de4808784436e9.png?size=128';
  let embed = new Discord.RichEmbed()
    .setTitle('강비')
    .setColor(0xB7EAFF)
    .setAuthor('제네시스 서버 관리자', img)
    .setThumbnail(img)
    .addField('자기소개', '저느은 안귀여운 친저얼한 가앙비에요오')
    .addBlankField()
    .setTimestamp()
    .setFooter('강비', img);
	
  message.channel.send(embed);
}
if (message.content === '!김고든') {
  let img =
    'https://cdn.discordapp.com/avatars/381699810056601600/b1792850a8ab2e90d67a2418cb43ba8e.png?size=128';
  let embed = new Discord.RichEmbed()
    .setTitle('김고든')
    .setColor(0x3F3F3F)
    .setAuthor('제네시스 서버 관리자', img)
    .setThumbnail(img)
    .addField('자기소개', '안녕하세요 관리자감독관 김고든입니다.')
    .addBlankField()
    .setTimestamp()
    .setFooter('김고든', img);
	
  message.channel.send(embed);
}
if (message.content === '!클립') {
  let img =
    'https://cdn.discordapp.com/avatars/490812218955399188/d3055bda6837c6670c0b7ea319e60963.png?size=128';
  let embed = new Discord.RichEmbed()
    .setTitle('클립')
    .setColor(0xA17FFF)
    .setAuthor('제네시스 서버 관리자', img)
    .setThumbnail(img)
    .addField('자기소개', '저느은 올해승진한 귀여어운 클립이에영!')
    .addBlankField()
    .setTimestamp()
    .setFooter('클립', img);
	
  message.channel.send(embed);
}
if (message.content === '!팀투') {
  let img =
    'https://cdn.discordapp.com/avatars/361008330807967744/5e072fff3a045dd4962d899de745fc3c.png?size=128';
  let embed = new Discord.RichEmbed()
    .setTitle('팀투')
    .setColor(0x4747FF)
    .setAuthor('제네시스 서버 관리자', img)
    .setThumbnail(img)
    .addField('자기소개', '안녕하세요 허접 관리자 팀투라고합니다 잘부탁드립니다.')
    .addBlankField()
    .setTimestamp()
    .setFooter('팀투', img);
	
  message.channel.send(embed);
}
if (message.content === '!똥견') {
  let img =
    'https://cdn.discordapp.com/avatars/687959726075674685/9c2252ee54bc6257e68efc9d59d12f7a.webp?size=128';
  let embed = new Discord.RichEmbed()
    .setTitle('똥견')
    .setColor(0xFFBAC1)
    .setAuthor('제네시스 서버 관리자', img)
    .setThumbnail(img)
    .addField('자기소개', '12시간 일해서 100원 받는데  이젠 월급도안줌 악덕사장 나빠')
    .addBlankField()
    .setTimestamp()
    .setFooter('똥견', img);
	
  message.channel.send(embed);
}
if (message.content === '!ymw15963') {
  let img =
    'https://cdn.discordapp.com/avatars/358595920410968064/38909b53876e024979874607358d104d.png?size=128';
  let embed = new Discord.RichEmbed()
    .setTitle('ymw15963')
    .setColor(0xF4C4FF)
    .setAuthor('제네시스 서버 보충관리팀', img)
    .setThumbnail(img)
    .addField('자기소개', '안녕하세요 보충관리팀 ymw15963이라고 합니다 잘 부탁드립니다.')
    .addBlankField()
    .setTimestamp()
    .setFooter('ymw15963', img);
	
  message.channel.send(embed);
}
if (message.content === '!깡통') {
  let img =
    'https://cdn.discordapp.com/attachments/707430389614116864/715509503625265182/a94d9602c1806e3a.jpg';
  let embed = new Discord.RichEmbed()
    .setTitle('깡통')
    .setColor(0xFFFFFF)
    .setAuthor('제네시스 서버 엔지니어', img)
    .setThumbnail(img)
    .addField('자기소개', '안녕하세요 제네시스서버에서 제일 잘생기고 매력있고 귀엽고 섹시한 깡통이라고 합니다. 잘 부탁드립니다')
    .addBlankField()
    .setTimestamp()
    .setFooter('깡통', img);
	
  message.channel.send(embed);
}
if (message.content === '!카오스') {
  let img =
    'https://cdn.discordapp.com/avatars/447580432498950145/58d670f7ead477baf22b21b6db36d5fe.png?size=128';
  let embed = new Discord.RichEmbed()
    .setTitle('카오스')
    .setColor(0x1CEA4C)
    .setAuthor('제네시스 서버 규칙관리원', img)
    .setThumbnail(img)
    .addField('자기소개', '안녕하세요 규칙관리원 카오스라고 합니다 잘 부탁드립니다')
    .addBlankField()
    .setTimestamp()
    .setFooter('카오스', img);
	
  message.channel.send(embed);
}
if (message.content === '!리얼세븐') {
  let img =
    'https://cdn.discordapp.com/avatars/254506888257863680/f5e25c5bd33e0aac4b0d2f1131eb5440.png?size=128';
  let embed = new Discord.RichEmbed()
    .setTitle('리얼세븐')
    .setColor(0x00E8DC)
    .setAuthor('제네시스 서버 규칙관리원', img)
    .setThumbnail(img)
    .addField('자기소개', '안녕하세요 규칙관리원 리얼세븐이라고 합니다 잘 부탁드립니다')
    .addBlankField()
    .setTimestamp()
    .setFooter('리얼세븐', img);
	
  message.channel.send(embed);
}
if (message.content === '!PLAS') {
  let img =
    'https://cdn.discordapp.com/avatars/368951890144395266/46abd9e86429639cc13ec408d372f34e.png?size=128';
  let embed = new Discord.RichEmbed()
    .setTitle('PLAS')
    .setColor(0x000000)
    .setAuthor('제네시스 서버 운영자', img)
    .setThumbnail(img)
    .addField('자기소개', '휴식중입니다..현재는 일반 또수고요 추후에 다시 본직으로 복귀하겠습니다')
    .addBlankField()
    .setTimestamp()
    .setFooter('PLAS', img);
	
    message.channel.send(embed)
  }
  
  if(message.content == '!신고양식란') {
    let img = 'https://cdn.discordapp.com/icons/705005885759422564/79eda5e0486fea441b39b23a03018ea9.webp?size=128%27;';
    let embed = new Discord.RichEmbed()
      .setTitle('제네시스 서버 신고양식')
      .setURL('https://discord.gg/pCjc7MR')
      .setAuthor('제네시스 SERVER', img, 'https://discord.gg/pCjc7MR')
      .setThumbnail(img)
      .addBlankField()
      .addField('1. 사건이 발생한 시간:', '```2020년 ~월 ~일 ~시간```')
      .addField('2. 무슨 일이 발생했는지 :', '```예시 : 문트롤```')
      .addField('3.3. 처벌을 받을 유저의 스팀 주소 : ', '```(필수사항)```')
      .addField('4. 사진 및 영상 :', '```Ocam이나 윈도우10이신분들은 윈도우 + G 키 동시에 누르세요```')
      .addBlankField()
      .setTimestamp()
      .setFooter('제네시스 서버 관리진', img)
	
	
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
      let contents = message.content.slice('!BR'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('SCP 제네시스 서버 공지사항')
        .setColor('#186de6')
        .setFooter(`SCP 제네시스 서버 관리진 올림`)
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