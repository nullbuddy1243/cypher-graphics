const generate = function (inputs) {
  console.log(`--- Generate Public x Private ---`);

  // compute - M, e, d, n
  const { a, b, aa, bb } = inputs;

  let math_print = `
        let M = a * b - 1;
        let e = aa * M + a;
        let d = bb * M + b;
        let n = (e * d - 1) / M;
    `;
  console.log(`maths ${math_print}`);

  let M = a * b - 1;
  let e = aa * M + a;
  let d = bb * M + b;
  let n = (e * d - 1) / M;

  let public = new Map();
  public.set("e", e);
  public.set("n", n);

  let private = new Map();
  private.set("d", d);
  private.set("n", n);

  let generated = {
    inputs: inputs,
    M: M,
    e: e,
    d: d,
    n: n,
    public: public,
    private: private,
  };

  return generated;
};

const factors = function (num) {
  // calculate factors of i, an Integer
  console.log(`--- Calculate Factors for ${num} ---`);
  let factors = new Set();
  if (Number.isInteger(num)) {
    let half = Math.floor(num / 2); // bc half * 2 = num
    for (let i = half; i > 0; i--) {
      if (num % i == 0) {
        factors.add(i);
      }
    }
    return factors;
  }
};

const encrypt = function (m, public) {
  console.log(`--- Encrypting message using generated public key ---`);

  const encrypt_message = (e, m, n) => {
    return (e * m) % n;
  };

  // let message be an integer m that is less than n, and share no factors with n
  console.log(`public: `);
  console.log(public);
  if (m < public.get("n")) {
    console.log(`m < n is True`);
    let n = public.get("n");
    let e = public.get("e");

    let m_factors = factors(m);
    let n_factors = factors(n);

    // console.log(`m: ${m}`);
    console.log(`m factors`);
    console.log(m_factors);

    // console.log(`n: ${n}`);
    console.log(`n factors`);
    console.log(n_factors);

    const intersection = new Set(
      [...m_factors].filter((factor) => n_factors.has(factor))
    );

    if (intersection.size > 1) {
      console.log(`m and n share factors other than 1`);
      console.log(intersection);
    } else {
      console.log(`m and n do not share factors other than 1`);
      console.log(
        `m is valid to be encrypted: m is less than n, and they do not share factors`
      );
    }

    return encrypt_message(e, m, n);
  }
};

const decrypt = function (encrypted, private) {
  console.log(`--- Decrypting message using generated private key`);
  return (encrypted * private.get("d")) % private.get("n");
};

// interesting, i tried using input numbers random 0-512 and decryption ended up being off by one,
// example of that output included in kid-rsa-off-by-1.md
let inputs = {
  a: Math.floor(Math.random() * 64),
  b: Math.floor(Math.random() * 64),
  aa: Math.floor(Math.random() * 64),
  bb: Math.floor(Math.random() * 64),
};

console.log("inputs: ");
console.log(inputs);
console.log("\n");

let generated = generate(inputs);

console.log("generated:");
console.log(generated);
console.log("\n");

let m = Math.floor(Math.random() * 512); // this is the msg to encrypt
console.log(`message to encrypt: ${m}`);
console.log(`hex: ${m.toString(16)}`);
console.log("\n");

let encrypted = encrypt(m, generated.public);
console.log("\n");
let decrypted = decrypt(encrypted, generated.private);

console.log(`m = ${m} ---encrypt---> ${encrypted} ---decrypt---> ${decrypted}`);
console.log("\n");

console.log(
  `hex: ${m.toString(16)} ---encrypt---> ${encrypted.toString(
    16
  )} ---decrypt---> ${decrypted.toString(16)}`
);
console.log(
  `${m.toString(2)} -> ${encrypted.toString(2)} -> ${decrypted.toString(2)}`
);
console.log(`done!`);
