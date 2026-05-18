exports.calculate = (a, b, operator) => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA)) return { error: "Nilai a harus berupa angka" };
  if (operator !== "sqrt" && isNaN(numB)) return { error: "Nilai b harus berupa angka" };

  let result;

  switch (operator) {
    case "+":
      result = numA + numB;
      break;
    case "-":
      result = numA - numB;
      break;
    case "*":
      result = numA * numB;
      break;
    case "/":
      if (numB === 0) return { error: "Tidak bisa dibagi dengan nol" };
      result = numA / numB;
      break;
    case "%":
      result = numA % numB;
      break;
    case "pow":
      result = Math.pow(numA, numB);
      break;
    case "sqrt":
      if (numA < 0) return { error: "Akar kuadrat dari bilangan negatif tidak valid" };
      result = Math.sqrt(numA);
      break;
    default:
      return { error: `Operator '${operator}' tidak dikenali. Gunakan: +, -, *, /, %, pow, sqrt` };
  }

  return { a: numA, b: operator !== "sqrt" ? numB : null, operator, result };
};
