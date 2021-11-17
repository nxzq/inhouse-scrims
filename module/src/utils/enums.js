const MMR = Object.freeze({
  "iron": 600,
  "bronze": 1000,
  "silver": 1500,
  "gold": 1800,
  "platinum": 2000,
  "diamond": 2200,
  "master": 2500,
  "grandmaster": 3000,
  "challenger": 3250
})

const MMR_MODIFIER = Object.freeze({
  "fill": 1,
  "primary": 1,
  "secondary": .9,
  "autofill": .5,
})

const ROLES_BY_INDEX = Object.freeze(["top", "jug", "mid", "bot", "sup", "top", "jug", "mid", "bot", "sup"])


module.exports = { MMR_MODIFIER, MMR, ROLES_BY_INDEX }