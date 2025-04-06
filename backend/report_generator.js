const fs = require('fs');
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');

function generatePDFReport(threats, outputPath) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputPath));
  doc.fontSize(18).text('Threat Intelligence Report', { align: 'center' });
  doc.moveDown();

  threats.forEach(({ threat, score }) => {
    doc.fontSize(12).text(`Threat: ${threat} - Risk Score: ${score}`);
  });

  doc.end();
}

function generateCSVReport(threats, outputPath) {
  const parser = new Parser();
  const csv = parser.parse(threats);
  fs.writeFileSync(outputPath, csv);
}

module.exports = { generatePDFReport, generateCSVReport };

