const A4_HEIGHT_SIZE = 842;
const client_name = document.getElementById("input_client_name");
const client_rg = document.getElementById("input_client_RG");
const client_cpf = document.getElementById("input_client_CPF");
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


const pageHeight = 842; // altura da página em pontos (A4)
const topMargin = 30; // margem superior em pontos
const bottomMargin = 30; // margem inferior em pontos
const lineHeight = 20; // altura de linha em pontos

function addTextToDoc(doc, text) {
  let lines = doc.splitTextToSize(text, cmToPt(19.5));
  let y = topMargin;
  for (let i = 0; i < lines.length; i++) {
    if (y + lineHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = topMargin;
    }
    doc.text( lines[i], 20, y);
    y += lineHeight;
  }
}

const generatePDF = (e) => {
  e.preventDefault();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "pt", "a4");
  
  fetch('../teste.txt')
    .then(response => response.text())
    .then(txt => {
      txt = txt.replace('[name]', client_name.value);
      txt = txt.replace('[RG]', client_rg.value);
      txt = txt.replace('[CPF]', client_cpf.value);
      txt = txt.replace('[%]', client_discount.value + '%');
      addTextToDoc(doc, txt);
      doc.save('teste.pdf');
    });
};



const client_button = document
  .getElementById("input_client_button")
  .addEventListener("click", generatePDF);
