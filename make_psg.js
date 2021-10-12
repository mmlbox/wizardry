const fs = require("fs");

const voltbl = [
  0x0, 0x7, 0x8, 0x9, 0x9, 0xa, 0xb, 0xc, 0xc, 0xc, 0xd, 0xd, 0xd, 0xe, 0xe, 0xe,
];

function conv_env(env) {
  const res = [];
  for (let i = 0; i < env.length; i++) {
    const ch = env[i];
    if (ch === ":" || ch === "=" || ch === ",") {
      res.push(ch);
      i++;
      while (/[0-9]/.test(env[i])) {
        res.push(env[i++]);
      }
      break;
    } else {
      const v = parseInt(ch, 16);
      res.push(voltbl[v].toString(16));
    }
  }
  const r = res.join("");
  return r;
}

const text = fs.readFileSync(process.argv[2], { encoding: "utf-8" });

const lines = text.toString().split("\n");

const res = [];

for (let line of lines) {
  if (/^@s[0-9]+/.test(line)) continue;

  line = line.replace(/wiz1_([0-9][0-9])/, (s, args) => `wiz1_p${args}`);
  line = line.replace('[SCC]', '[PSG]')
  line = line.replace(/^4\s/, "1 ").replace(/^5\s/, "2 ").replace(/^6\s/, "3 ");
  let m = line.match(/^(@e[0-9]+={.*,.*,)([0-9a-f:=,]+)\s*(}.*)$/i);
  if (m) {
    line = `${m[1]}${conv_env(m[2])}${m[3]} ; ${m[2]}`;
  }

  line = line.replace(/(@4v[0-9]+|v[0-9]+@4)/i, 'v15@e31');
  line = line.replace(/@[0-9]+/, '').replace(/k1/, 'k3');
  line = line.replace(/@e31/, '@e31k1');

  line = line.replace(/^456\s/,'123 ');
  res.push(line);
}

res.push('\n@e31={,,dccb}');

console.log(res.join('\n').replace(/\n\n\n+/g,'\n'));