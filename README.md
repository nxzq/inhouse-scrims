# lol-inhouse

League of Legends inhouse matchmaking solution. Attempts to honor role preference while also minimizing team MMR Δ & average lane MMR Δ (Lane Diff). Takes an array of player objects and returns an array of suitable lobbies sorted. Learn more about the [algorithm here](/module/README.md).

## Example Inputs

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

## Interfaces

Current plan is to implement a [react app](/app/README.md), [discord bot](/bot/README.md) and [cli](/cli/README.md) interfaces.