module.exports = (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kalkulator PPITI</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: sans-serif;
      background: #1c1c1c;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .calc {
      background: #2a2a2a;
      border-radius: 12px;
      padding: 20px;
      width: 280px;
    }

    .screen {
      background: #111;
      border-radius: 8px;
      padding: 14px 16px;
      text-align: right;
      margin-bottom: 14px;
    }

    .screen .expr {
      color: #666;
      font-size: 13px;
      min-height: 18px;
      margin-bottom: 4px;
    }

    .screen .result {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }

    .screen .result.err { color: #e57373; font-size: 16px; }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }

    button {
      background: #3a3a3a;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 16px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.15s;
    }

    button:hover  { background: #484848; }
    button:active { background: #555; }

    .op  { background: #1e3a5f; color: #7ec8e3; }
    .op:hover { background: #244a73; }

    .ac  { background: #5f1e1e; color: #e37c7c; }
    .ac:hover { background: #7a2525; }

    .eq  { background: #1e5f3a; color: #7ee3b0; }
    .eq:hover { background: #257a4a; }

    .zero { grid-column: span 2; }
  </style>
</head>
<body>
  <div class="calc">
    <div class="screen">
      <div class="expr" id="expr"></div>
      <div class="result" id="result">0</div>
    </div>
    <div class="grid">
      <button class="ac" onclick="clear_()">AC</button>
      <button class="ac" onclick="del_()">DEL</button>
      <button class="op" onclick="setOp('%')">%</button>
      <button class="op" onclick="setOp('/')">÷</button>

      <button onclick="input('7')">7</button>
      <button onclick="input('8')">8</button>
      <button onclick="input('9')">9</button>
      <button class="op" onclick="setOp('*')">×</button>

      <button onclick="input('4')">4</button>
      <button onclick="input('5')">5</button>
      <button onclick="input('6')">6</button>
      <button class="op" onclick="setOp('-')">−</button>

      <button onclick="input('1')">1</button>
      <button onclick="input('2')">2</button>
      <button onclick="input('3')">3</button>
      <button class="op" onclick="setOp('+')">+</button>

      <button class="zero" onclick="input('0')">0</button>
      <button onclick="input('.')">.</button>
      <button class="eq" onclick="calc()">=</button>
    </div>
  </div>

  <script>
    let a = '', op = '', b = '', waitNext = false;

    const exprEl   = document.getElementById('expr');
    const resultEl = document.getElementById('result');

    const opLabel = { '+':'+', '-':'−', '*':'×', '/':'÷', '%':'%' };

    function show(val, expr = '') {
      resultEl.className = 'result';
      resultEl.textContent = val;
      exprEl.textContent   = expr;
    }

    function input(ch) {
      if (waitNext) { b = ''; waitNext = false; }
      if (ch === '.' && (op ? b : a).includes('.')) return;
      if (op) b += ch; else a += ch;
      show(op ? b : a, a && op ? a + ' ' + opLabel[op] : '');
    }

    function setOp(o) {
      if (!a) return;
      op = o;
      waitNext = false;
      show(a, a + ' ' + opLabel[o]);
    }

    async function calc() {
      if (!a || !op || (!b && !waitNext)) return;

      resultEl.textContent = '...';
      try {
        const res  = await fetch('/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ a: parseFloat(a), b: parseFloat(b), operator: op })
        });
        const data = await res.json();

        if (data.success) {
          exprEl.textContent   = a + ' ' + opLabel[op] + ' ' + b + ' =';
          a = String(data.data.result);
          b = ''; op = ''; waitNext = true;
          resultEl.className   = 'result';
          resultEl.textContent = a;
        } else {
          resultEl.className   = 'result err';
          resultEl.textContent = data.message;
          a = ''; b = ''; op = '';
        }
      } catch {
        resultEl.className   = 'result err';
        resultEl.textContent = 'Error koneksi';
      }
    }

    function clear_() {
      a = ''; op = ''; b = ''; waitNext = false;
      show('0');
    }

    function del_() {
      if (op) b = b.slice(0, -1) || '';
      else    a = a.slice(0, -1) || '';
      show(op ? (b || '0') : (a || '0'), a && op ? a + ' ' + opLabel[op] : '');
    }

    document.addEventListener('keydown', e => {
      if ('0123456789.'.includes(e.key)) input(e.key);
      else if ('+-*/%'.includes(e.key)) setOp(e.key);
      else if (e.key === 'Enter' || e.key === '=') calc();
      else if (e.key === 'Backspace') del_();
      else if (e.key === 'Escape') clear_();
    });
  </script>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.end(html);
};
