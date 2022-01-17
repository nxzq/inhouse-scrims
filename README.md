# inhouse-scrims

<p>
  <a href="https://exclamationpointhuman.github.io/inhouse-scrims" alt="GitHub Pages">
    <img src="https://img.shields.io/badge/pages%20-deployed-%23222222?logo=github&style=flat-square" />
  </a>
</p>

League of Legends inhouse matchmaking solution. Attempts to honor role preference while also minimizing team MMR Δ & lane MMR Δ (Lane Diff). Takes an array of player objects and returns an array of suitable lobbies sorted. Learn more about the [algorithm here](/module/README.md).

## Example Inputs

Primary/Secondary Role Player
```json
    {
      "name": "summoner",
      "elo": "platinum4",
      "roles": ["bot", "top"]
    }
```
Fill Player
```json
    {
      "name": "T1 OK GOOD YES",
      "elo": "diamond1",
      "roles": []
    }
```
Single Role Player
```json
    {
      "name": "hide on bush",
      "elo": "challenger",
      "roles": ["mid"]
    }
```