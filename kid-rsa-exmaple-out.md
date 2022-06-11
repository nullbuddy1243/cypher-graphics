## Example out

```bash
$ node kid-rsa.js
inputs:
{ a: 5, b: 27, aa: 19, bb: 46 }


--- Generate Public x Private ---
maths
        let M = a * b - 1;
        let e = aa * M + a;
        let d = bb * M + b;
        let n = (e * d - 1) / M;

generated:
{
  inputs: { a: 5, b: 27, aa: 19, bb: 46 },
  M: 134,
  e: 2551,
  d: 6191,
  n: 117860,
  public: Map(2) { 'e' => 2551, 'n' => 117860 },
  private: Map(2) { 'd' => 6191, 'n' => 117860 }
}


message to encrypt: 33
hex: 21


--- Encrypting message using generated public key ---
public:
Map(2) { 'e' => 2551, 'n' => 117860 }
m < n is True
--- Calculate Factors for 33 ---
--- Calculate Factors for 117860 ---
m factors
Set(3) { 11, 3, 1 }
n factors
Set(23) {
  58930,
  29465,
  23572,
  11786,
  5893,
  1660,
  1420,
  830,
  710,
  415,
  355,
  332,
  284,
  166,
  142,
  83,
  71,
  20,
  10,
  5,
  4,
  2,
  1
}
m and n do not share factors other than 1
m is valid to be encrypted: m is less than n, and they do not share factors


--- Decrypting message using generated private key
m = 33 ---encrypt---> 84183 ---decrypt---> 33


hex: 21 ---encrypt---> 148d7 ---decrypt---> 21
done!

```

#
