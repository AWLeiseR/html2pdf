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
      txt = txt.replace('[%]', client_discount.value);

    let textLines = doc.setFont('times', 'normal')
      .setFontSize(12)
      .splitTextToSize(txt, cmToPt(19.5));
    // adiciona cada linha ao documento PDF
    for (let i = 0; i < textLines.length; i++) {
      doc.text(textLines[i], 20, 30 + i * 20);
    }
    doc.save('teste.pdf');
  });

};


const client_button = document
  .getElementById("input_client_button")
  .addEventListener("click", generatePDF);
