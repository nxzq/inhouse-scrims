# lol-inhouse

description ...  
Team MMR Δ  
Average Lane MMR Δ (Lane Diff)  
Role Preference  


## Usage


### Input
```json
  [
    {
      "name": "any string (16 max length)",
      "elo":  "iron" | 
              "bronze" | 
              "silver" | 
              "gold" | 
              "platinum" | 
              "diamond" | 
              "master" | 
              "challenger",
      "roles":  [] // for fill 
                or
                [
                  "top" | "jug" | "mid" | "bot" | "sup", 
                  null | "top" | "jug" | "mid" | "bot" | "sup"
                ] // for preference
    },
    ...
  ]
```
### Examples:
Primary/Secondary Role Player
```json
{
  "name": "summoner 4",
  "elo": "platinum4",
  "roles": ["bot", "top"]
}
```
Fill Player
```json
{
  "name": "summoner 9",
  "elo": "diamond1",
  "roles": []
}
```
Single Role Player
```json
{
  "name": "summoner 10",
  "elo": "gold3",
  "roles": ["sup"]
}
```

### Output
```json
{
  "red": {
    "mmr": 8800,
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
      "jug": {
        "name": "summoner 2",
        "elo": "Silver III",
        "roles": [
          "jug",
          "sup"
        ],
        "mmr": 1450,
        "autofill": false
      },
      "mid": {
        "name": "summoner 3",
        "elo": "Gold III",
        "roles": [
          "mid",
          "bot"
        ],
        "mmr": 1750,
        "autofill": false
      },
      "bot": {
        "name": "summoner 4",
        "elo": "Platinum IV",
        "roles": [
          "bot",
          "top"
        ],
        "mmr": 2000,
        "autofill": false
      },
      "sup": {
        "name": "summoner 5",
        "elo": "Platinum II",
        "roles": [
          "sup",
          "mid"
        ],
        "mmr": 2150,
        "autofill": false
      }
    }
  },
  "blue": {
    "mmr": 8750,
    "roster": {
      "top": {
        "name": "summoner 6",
        "elo": "Bronze II",
        "roles": [
          "sup",
          "top"
        ],
        "mmr": 1125,
        "autofill": false
      },
      "jug": {
        "name": "summoner 7",
        "elo": "Gold IV",
        "roles": [
          "sup",
          "jug"
        ],
        "mmr": 1530,
        "autofill": false
      },
      "mid": {
        "name": "summoner 8",
        "elo": "Platinum III",
        "roles": [
          "jug",
          "mid"
        ],
        "mmr": 1845,
        "autofill": false
      },
      "bot": {
        "name": "summoner 9",
        "elo": "Diamond I",
        "roles": [],
        "mmr": 2500,
        "autofill": false
      },
      "sup": {
        "name": "summoner 10",
        "elo": "Gold III",
        "roles": [
          "sup"
        ],
        "mmr": 1750,
        "autofill": false
      }
    }
  },
  "metadata": {
    "roleScore": 15,
    "delta": 50,
    "avgLaneDiff": 140,
    "skillLevel": 17550
  }
}
```