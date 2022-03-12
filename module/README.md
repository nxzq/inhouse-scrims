# inhouse-scrims

League of Legends inhouse matchmaking solution. Attempts to honor role preference while also minimizing team MMR Δ & lane MMR Δ (Lane Diff). Takes an array of player objects and returns an array of suitable lobbies sorted.

## Usage

inhouse-scrims exports a default function that takes in an array of player objects, validates the input then returns an array of up to 100 scrim lobbies sorted.

## Inputs

An array length 10 of player objects

```json
{
  "name": "any string",
  "elo": "see allowed elo values",
  "roles": ["see allowed roles values"]
}
```

### Allowed ELO Values

`"iron"` | `"bronze"` | `"silver"` | `"gold"` | `"platinum"` | `"diamond"` | `"master"` | `"challenger"`

Additionally division support has been added for ranks iron - diamond, e.g. `Gold IV -> value: "gold4"`, `Diamond I -> value: "diamond1"`

### Allowed Roles Values

Roles is an array of a players role preference. An empty array is the same a queueing `fill` or no preference. Otherwise the 0 index of the array will be considered the players primary role and the 1 index (if populated) will be considered the players secondary role. For best results populate roles, as an MMR modifier is applied to help ensure players are on role, currently fill players have no modifier applied to their MMR.

`"top"` | `"jug"` | `"mid"` | `"bot"` | `"sup"`

#### Examples

JUG primary role SUP secondary sole
`"roles": ["jug", "sup"]`

Fill Player
`"roles": []`

MID primary role no secondary role
`"roles": ["mid"]`

### Example Inputs

Platinum IV BOT main TOP secondary Player

```json
{
  "name": "summoner 4",
  "elo": "platinum4",
  "roles": ["bot", "top"]
}
```

Diamond I Fill Player

```json
{
  "name": "summoner 9",
  "elo": "diamond1",
  "roles": []
}
```

Gold III Support Player

```json
{
  "name": "summoner 10",
  "elo": "gold3",
  "roles": ["sup"]
}
```

## Output

Returns a sorted array of lobby objects

```json
    {
      "red": {
        "mmr"
        "roleScore"
        "roster"
      },
      "blue": {
        "mmr"
        "roleScore"
        "roster"
      },
      "metadata": {
        "roleScore"
        "delta"
        "laneDelta"
        "skillLevel"
      }
    }
```

### Teams

Team object includes a team MMR value as well as a roster object that has keys for each role with players data. In the default return there are 2 team objects, on named `red` and one named `blue`, the red team will always have the higher MMR.

```json
    "team": {
        "mmr": 8800,
        "roleScore": 8,
        "roster": {
          "top": {
            "name": "summoner 1",
            "elo": "Silver III",
            "roles": [
              "top",
              "sup"
            ],
            "mmr": 1450,
            "autofill": false
          },
          "jug": { /*...*/ },
          "mid": { /*...*/ },
          "bot": { /*...*/ },
          "sup": { /*...*/ }
        }
      }
```

### Metadata

Includes data about the lobby

- `skillLevel` -> total MMR of entire lobby
- `delta` -> total MMR difference between the two teams
- `laneDelta` -> MMR difference between each role between two teams (calculated as the sum of the absolute value of all role differences)
- `roleScore` -> role preference score, 2 points are awarded for players in primary roles, 1 point for secondary

```json
    "metadata": {
        "roleScore": 15,
        "delta": 50,
        "laneDelta": 240,
        "skillLevel": 17550
      }
```
