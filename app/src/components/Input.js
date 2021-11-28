
export default function SummonerInput({ summoner, i, handleChange }) {
  return (
    <div>
      <label>
        Name:
        <input type="text" value={summoner.name} name="name" onChange={(e) => handleChange(e,i)} />
      </label>
      <label>
        Elo:
        <select name="elo" value={summoner.elo} onChange={(e) => handleChange(e,i)}>
          <option value="iron4">Iron IV</option>
          <option value="iron3">Iron III</option>
          <option value="iron">Iron</option>
          <option value="iron2">Iron II</option>
          <option value="iron1">Iron I</option>
          <option value="bronze4">Bronze IV</option>
          <option value="bronze3">Bronze III</option>
          <option value="bronze">Bronze</option>
          <option value="bronze2">Bronze II</option>
          <option value="bronze1">Bronze I</option>
          <option value="silver4">Silver IV</option>
          <option value="silver3">Silver III</option>
          <option value="silver">Silver</option>
          <option value="silver2">Silver II</option>
          <option value="silver1">Silver I</option>
          <option value="gold4">Gold IV</option>
          <option value="gold3">Gold III</option>
          <option selected value="gold">Gold</option>
          <option value="gold2">Gold II</option>
          <option value="gold1">Gold I</option>
          <option value="platinum4">Platinum IV</option>
          <option value="platinum3">Platinum III</option>
          <option value="platinum">Platinum</option>
          <option value="platinum2">Platinum II</option>
          <option value="platinum1">Platinum I</option>
          <option value="diamond4">Diamond IV</option>
          <option value="diamond3">Diamond III</option>
          <option value="diamond">Diamond</option>
          <option value="diamond2">Diamond II</option>
          <option value="diamond1">Diamond I</option>
          <option value="master">Master</option>
          <option value="grandmaster">Grandmaster</option>
          <option value="challenger">Challenger</option>
        </select>
      </label>
      <label>
        Roles:
        <select name="roles" value={summoner.roles} onChange={(e) => handleChange(e,i)}>
          <option selected value={[]}>Fill</option>
          <option value={["top"]}>TOP</option>
          <option value={["top", "jug"]}>TOP & JUG</option>
          <option value={["top", "mid"]}>TOP & MID</option>
          <option value={["top", "bot"]}>TOP & BOT</option>
          <option value={["top", "sup"]}>TOP & SUP</option>
          <option value={["jug"]}>JUG</option>
          <option value={["jug", "top"]}>JUG & TOP</option>
          <option value={["jug", "mid"]}>JUG & MID</option>
          <option value={["jug", "bot"]}>JUG & BOT</option>
          <option value={["jug", "sup"]}>JUG & SUP</option>
          <option value={["mid"]}>MID</option>
          <option value={["mid", "top"]}>MID & TOP</option>
          <option value={["mid", "jug"]}>MID & JUG</option>
          <option value={["mid", "bot"]}>MID & BOT</option>
          <option value={["mid", "sup"]}>MID & SUP</option>
          <option value={["bot"]}>BOT</option>
          <option value={["bot", "top"]}>BOT & TOP</option>
          <option value={["bot", "jug"]}>BOT & JUG</option>
          <option value={["bot", "mid"]}>BOT & MID</option>
          <option value={["bot", "sup"]}>BOT & SUP</option>
          <option value={["sup"]}>SUP</option>
          <option value={["sup", "top"]}>SUP & TOP</option>
          <option value={["sup", "jug"]}>SUP & JUG</option>
          <option value={["sup", "mid"]}>SUP & MID</option>
          <option value={["sup", "bot"]}>SUP & BOT</option>
        </select>
      </label>
    </div>
  )
}
