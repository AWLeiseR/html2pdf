const A4_HEIGHT_SIZE = 842;
const A4_WIDTH_SIZE = 595;

const pageHeight = 842; // altura da página em pontos (A4)
const topMargin = 40; // margem superior em pontos
const bottomMargin = 40; // margem inferior em pontos
const lineHeight = 20; // altura de linha em pontos

const client_name = document.getElementById("input_client_name");
const client_rg = document.getElementById("input_client_RG");
const client_cpf = document.getElementById("input_client_CPF");
const client_address = document.getElementById("input_client_address");
const client_discount = document.getElementById("input_client_discount");
const contract_model = document.getElementById("file_input_contract");

function cmToPx(valorEmCm) {
  const larguraDoMonitorEmCm = 34; // exemplo de largura do monitor em centímetros
  const larguraDoMonitorEmPixels = window.screen.width; // largura do monitor em pixels
  const proporcao = larguraDoMonitorEmPixels / larguraDoMonitorEmCm; // proporção entre largura em pixels e largura em centímetros
  const valorEmPx = valorEmCm * proporcao; // converte para pixels
  return valorEmPx;
}

function ptToPx(pt) {
  const px = pt * (96 / 72);
  return px;
}

function cmToPt(cm) {
  const pt = cm * 28.3465;
  return pt;
}

function addTextToDoc(doc, text) {
  const font = doc.setFont("times", "normal");
  doc.setFontSize(11);
  const lines = doc.splitTextToSize(text, cmToPt(16), { font });
  let y = topMargin;

  doc.setFont("times", "bold");
  doc.text(lines[0], cmToPt(7), y);
  y += lineHeight;
  for (let i = 1; i < lines.length; i++) {
    if (y + lineHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = topMargin;
    }
    const boldLine = lines[i].split(/(<b>.*?<\/b>)/gim);
    if (boldLine.length > 1) {
      let offset = 0;
      for (let j = 0; j < boldLine.length; j++) {
        if (boldLine[j].startsWith("<b>") && boldLine[j].endsWith("</b>")) {
          doc.setFont("times", "bold");
          doc.text(boldLine[j].slice(3, -4), cmToPt(3) + offset, y);
          offset = doc.getStringUnitWidth(boldLine[j].slice(3, -4)) * 11;
        } else {
          doc.setFont("times", "normal");
          doc.text(boldLine[j], cmToPt(3) + offset, y);
          offset = doc.getStringUnitWidth(boldLine[j]) * 11;
        }
      }
    } else {
      const line = boldLine[0];
      if (line.indexOf("<b>") > -1) {
        let offset = 0;
        let semiLineBold = line.split(/(<b>.*)/g);
        for (let j = 0; j < semiLineBold.length; j++) {
          if (semiLineBold[j].startsWith("<b>")) {
            doc.setFont("times", "bold");
            doc.text(semiLineBold[j].slice(3), cmToPt(3), y);
            offset = doc.getStringUnitWidth(semiLineBold[j].slice(3)) * 11;
          } else {
            doc.setFont("times", "normal");
            doc.text(semiLineBold[j], cmToPt(3) + offset, y);
            offset = 0;
          }
        }
      } else if (line.indexOf("</b>") > -1) {
        let offset = 0;
        let semiLineBold = line.split(/(.*<\/b>)/g);
        for (let j = 0; j < semiLineBold.length; j++) {
          if (semiLineBold[j].endsWith("</b>")) {
            doc.setFont("times", "bold");
            doc.text(semiLineBold[j].slice(0, -4), cmToPt(3), y);
            offset = doc.getStringUnitWidth(semiLineBold[j].slice(3)) * 11;
          } else {
            doc.setFont("times", "normal");
            doc.text(semiLineBold[j], cmToPt(3) + offset, y);
            offset = 0;
          }
        }
      } else {
        doc.setFont("times", "normal");
        doc.text(boldLine, cmToPt(3), y);
      }
    }
    y += lineHeight;
  }
}

const generatePDF = (e) => {
  e.preventDefault();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: [A4_WIDTH_SIZE, A4_HEIGHT_SIZE],
  });

  fetch("../modelo_contrato.txt")
    .then((response) => response.text())
    .then((txt) => {
      const regex_name = /NOME_LOCADOR/g;
      const regex_address = /ENDERECO_LOCADOR/g;
      const regex_rg = /LOCADOR_RG/g;
      const regex_cpf = /LOCADOR_CPF/g;
      const regex_discount = /DESCONTO_LOCADOR/g;

      txt = txt.replace(regex_name, client_name.value);
      txt = txt.replace(regex_rg, client_rg.value);
      txt = txt.replace(regex_address, client_address.value);
      txt = txt.replace(regex_cpf, client_cpf.value);
      txt = txt.replace(regex_discount, client_discount.value + "%");
      addTextToDoc(doc, txt);
      doc.setLineWidth(500);
      // doc.save("contrato.pdf");
      doc.output("dataurlnewwindow");
    });
};

const client_button = document
  .getElementById("input_client_button")
  .addEventListener("click", generatePDF);
