# Andy
Node API for rolling dice.

## Dice Notation
Some role playing games that require some amount of randomness utilise dice of various sides, and in various amounts. There exists a format to describe an amount of dice, as well as the number of sides they have. The format is:

```
${n}d${y}
```
Where `n` is the total number of dice, and `y` is the number of sides each die has. In the center of both those variable is the literal character `d`.

### Example:
```
2d6
```
Which translates to **two six sided dice**.

## Usage
Start with
```bash
node server
```

## API
### `/roll?count=${count}&sides=${sides}`
**Query Parameters:**
 - count: The number of Dice to roll
 - sides: The amount of sides each Die has. A 1 sided die always returns 1, a 2 sided die return 1 or 2, etc.

**200 OK Response:**
```js
{
  count: number,
  sides: number,
  result: number,
  dice: [
    { result: number },
    { result: number },
    // etc ...
  ]
}
```
**400 Malformed Input Response:**
```js
{
  errorCode: 400,
  message: string,
}
```
**500 Internal Server Error Response:**
```js
{
  errorCode: 500,
  message: string,
}
```
