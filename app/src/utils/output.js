/**
 * Standard string output
 * @param {*} inhouse 
 * @returns 
 */
export const generateOutput = (inhouse) => {
  const blue = inhouse.blue
  const red = inhouse.red
  const padding = Math.max(...[...Object.keys(red.roster).map(x => red.roster[x].name.length),...Object.keys(blue.roster).map(x => blue.roster[x].name.length)]) + 10
  return `
  |${'-'.padEnd((padding+1)*2,'-')}|
  | ${'🔵 BLUE SIDE'}${''.padEnd(padding*2-23)}${'🔴 RED SIDE'} |
  |${'-'.padEnd((padding+1)*2,'-')}|
  | ${blue.roster.top.name}${'TOP'.padStart(padding-blue.roster.top.name.length)}${''.padEnd(padding-red.roster.top.name.length)}${red.roster.top.name} |
  | ${blue.roster.jug.name}${'JUG'.padStart(padding-blue.roster.jug.name.length)}${''.padEnd(padding-red.roster.jug.name.length)}${red.roster.jug.name} |
  | ${blue.roster.mid.name}${'MID'.padStart(padding-blue.roster.mid.name.length)}${''.padEnd(padding-red.roster.mid.name.length)}${red.roster.mid.name} |
  | ${blue.roster.bot.name}${'BOT'.padStart(padding-blue.roster.bot.name.length)}${''.padEnd(padding-red.roster.bot.name.length)}${red.roster.bot.name} |
  | ${blue.roster.sup.name}${'SUP'.padStart(padding-blue.roster.sup.name.length)}${''.padEnd(padding-red.roster.sup.name.length)}${red.roster.sup.name} |
  |${'-'.padEnd((padding+1)*2,'-')}|
  `
}

/**
 * Verbose string output
 * @param {*} inhouse 
 * @returns 
 */
export const generateAdvancedOutput = (inhouse) => {
  const blue = inhouse.blue
  const red = inhouse.red
  const namePadding = Math.max(...[...Object.keys(red.roster).map(x => red.roster[x].name.length),...Object.keys(blue.roster).map(x => blue.roster[x].name.length)]) + 10
  const eloPadding = Math.max(...[...Object.keys(red.roster).map(x => red.roster[x].elo.length),...Object.keys(blue.roster).map(x => blue.roster[x].elo.length)]) + 2
  return `
  |${'-'.padEnd(((namePadding*2)+(eloPadding*2)+50-23),'-')}|
  | ${'🔵 BLUE SIDE'}${''.padEnd((namePadding*2)+(eloPadding*2)+25-23)}${'🔴 RED SIDE'} |
  |${'-'.padEnd(((namePadding*2)+(eloPadding*2)+50-23),'-')}|
  | - | ELO ${''.padEnd(eloPadding-5)}| MMR  | PLAYER ${''.padEnd(namePadding*2-14)} PLAYER |  MMR |${''.padEnd(eloPadding-4)} ELO | - |
  |${'-'.padEnd(((namePadding*2)+(eloPadding*2)+50-23),'-')}|
  | ${blue.roster.top.autofill ? '*' : '✔'} | ${blue.roster.top.elo}${'|'.padStart(eloPadding - blue.roster.top.elo.length)} ${blue.roster.top.mmr} ${'|'.padStart(5 - blue.roster.top.mmr.toString().length)} ${blue.roster.top.name}${'TOP'.padStart(namePadding-blue.roster.top.name.length)}${''.padEnd(namePadding-red.roster.top.name.length)}${red.roster.top.name} ${'|'.padEnd(5 - red.roster.top.mmr.toString().length)} ${red.roster.top.mmr} ${'|'.padEnd(eloPadding - red.roster.top.elo.length)} ${red.roster.top.elo} | ${red.roster.top.autofill ? '*' : '✔'} |
  | ${blue.roster.jug.autofill ? '*' : '✔'} | ${blue.roster.jug.elo}${'|'.padStart(eloPadding - blue.roster.jug.elo.length)} ${blue.roster.jug.mmr} ${'|'.padStart(5 - blue.roster.jug.mmr.toString().length)} ${blue.roster.jug.name}${'JUG'.padStart(namePadding-blue.roster.jug.name.length)}${''.padEnd(namePadding-red.roster.jug.name.length)}${red.roster.jug.name} ${'|'.padEnd(5 - red.roster.jug.mmr.toString().length)} ${red.roster.jug.mmr} ${'|'.padEnd(eloPadding - red.roster.jug.elo.length)} ${red.roster.jug.elo} | ${red.roster.jug.autofill ? '*' : '✔'} |
  | ${blue.roster.mid.autofill ? '*' : '✔'} | ${blue.roster.mid.elo}${'|'.padStart(eloPadding - blue.roster.mid.elo.length)} ${blue.roster.mid.mmr} ${'|'.padStart(5 - blue.roster.mid.mmr.toString().length)} ${blue.roster.mid.name}${'MID'.padStart(namePadding-blue.roster.mid.name.length)}${''.padEnd(namePadding-red.roster.mid.name.length)}${red.roster.mid.name} ${'|'.padEnd(5 - red.roster.mid.mmr.toString().length)} ${red.roster.mid.mmr} ${'|'.padEnd(eloPadding - red.roster.mid.elo.length)} ${red.roster.mid.elo} | ${red.roster.mid.autofill ? '*' : '✔'} |
  | ${blue.roster.bot.autofill ? '*' : '✔'} | ${blue.roster.bot.elo}${'|'.padStart(eloPadding - blue.roster.bot.elo.length)} ${blue.roster.bot.mmr} ${'|'.padStart(5 - blue.roster.bot.mmr.toString().length)} ${blue.roster.bot.name}${'BOT'.padStart(namePadding-blue.roster.bot.name.length)}${''.padEnd(namePadding-red.roster.bot.name.length)}${red.roster.bot.name} ${'|'.padEnd(5 - red.roster.bot.mmr.toString().length)} ${red.roster.bot.mmr} ${'|'.padEnd(eloPadding - red.roster.bot.elo.length)} ${red.roster.bot.elo} | ${red.roster.bot.autofill ? '*' : '✔'} |
  | ${blue.roster.sup.autofill ? '*' : '✔'} | ${blue.roster.sup.elo}${'|'.padStart(eloPadding - blue.roster.sup.elo.length)} ${blue.roster.sup.mmr} ${'|'.padStart(5 - blue.roster.sup.mmr.toString().length)} ${blue.roster.sup.name}${'SUP'.padStart(namePadding-blue.roster.sup.name.length)}${''.padEnd(namePadding-red.roster.sup.name.length)}${red.roster.sup.name} ${'|'.padEnd(5 - red.roster.sup.mmr.toString().length)} ${red.roster.sup.mmr} ${'|'.padEnd(eloPadding - red.roster.sup.elo.length)} ${red.roster.sup.elo} | ${red.roster.sup.autofill ? '*' : '✔'} |
  |${'-'.padEnd(((namePadding*2)+(eloPadding*2)+50-23),'-')}|
  | ${blue.mmr}${'TOTAL MMR'.padStart(namePadding+eloPadding+15-blue.mmr.toString().length)}${''.padEnd(namePadding+eloPadding+10-red.mmr.toString().length)}${red.mmr} |
  |${'-'.padEnd(((namePadding*2)+(eloPadding*2)+50-23),'-')}|
    ✔ denotes on-role
    * denotes autofill
  `
}