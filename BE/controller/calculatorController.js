const calculatorService = require('../services/calculatorService');

exports.calculate = (req, res) => {
  try {
    const { a, b, operator } = req.body;

    if (a === undefined || !operator) {
      return res.status(400).json({ success: false, message: 'Data tidak lengkap' });
    }

    const result = calculatorService.calculate(a, b, operator);

    res.status(200).json({
      success: true,
      data: { a, b, operator, result }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
