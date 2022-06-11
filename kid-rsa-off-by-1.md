# Off by 1

when i tried using input numbers random 0-512 and decryption ended up being off by one

```javascript
let inputs = {
  a: Math.floor(Math.random() * 512),
  b: Math.floor(Math.random() * 512),
  aa: Math.floor(Math.random() * 512),
  bb: Math.floor(Math.random() * 512),
};
```

I wonder why that was? Probably Javascript's fault...

## offending program output:

```bash
$ node kid-rsa.js
--- Generate Public x Private ---
inputs:
{ a: 240, b: 491, aa: 471, bb: 374 }
maths
        let M = a * b - 1;
        let e = aa * M + a;
        let d = bb * M + b;
        let n = (e * d - 1) / M;

generated:
{
  inputs: { a: 240, b: 491, aa: 471, bb: 374 },
  M: 117839,
  e: 55502409,
  d: 44072277,
  n: 20758132228,
  public: Map(2) { 'e' => 55502409, 'n' => 20758132228 },
  private: Map(2) { 'd' => 44072277, 'n' => 20758132228 }
}
message to encrypt: 401
--- Encrypting message using generated public key ---
Map(2) { 'e' => 55502409, 'n' => 20758132228 }
55502409 20758132228
m < n is True
--- Calculate Factors for 401 ---
--- Calculate Factors for 20758132228 ---
m: 401
m factors
Set(1) { 1 }
n: 20758132228
n factors
Set(23) {
  10379066114,
  5189533057,
  506295908,
  253147954,
  126573977,
  2246308,
  1515524,
  1123154,
  757762,
  561577,
  378881,
  54788,
  36964,
  27394,
  18482,
  13697,
  9241,
  164,
  82,
  41,
  4,
  2,
  1
}
intersection?
m and n do not share factors other than 1
m is valid to be encrypted: m is less than n, and they do not share factors
--- Decrypting message using generated private key
m = 401 ---encrypt---> 1498333781 ---decrypt---> 400
hex: 191 ---encrypt---> 594ec255 ---decrypt---> 190
```
