class CalculatorService {
  calculate(a, b, operator) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA)) throw new Error('Nilai a harus berupa angka');
    
    if (operator !== 'sqrt' && isNaN(numB)) {
      throw new Error('Nilai b harus berupa angka');
    }

    let result;
    switch (operator) {
      case '+': result = numA + numB; break;
      case '-': result = numA - numB; break;
      case '*': result = numA * numB; break;
      case '/': 
        if (numB === 0) throw new Error('Pembagian dengan nol');
        result = numA / numB; 
        break;
      case '%': result = numA % numB; break;
      case 'pow': result = Math.pow(numA, numB); break;
      case 'sqrt': 
        if (numA < 0) throw new Error('Akar kuadrat negatif tidak valid');
        result = Math.sqrt(numA); 
        break;
      default:
        throw new Error(`Operator '${operator}' tidak dikenali`);
    }

    return parseFloat(result.toFixed(10));
  }
}

module.exports = new CalculatorService();
