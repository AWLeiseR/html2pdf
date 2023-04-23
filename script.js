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


const generatePDF = (e) => {
  e.preventDefault();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "pt", "a4");

  // Busque o arquivo de texto e carregue o conteúdo dele
  // fetch('./teste.txt')
  //   .then(response => response.text())
  //   .then(txt => {
  //     // Quebre o texto em linhas
  //     // const lines = txt.split('\n');

  //     // Adicione cada linha ao documento PDF
  //     // lines.forEach((line, i) => {
  //     //   doc.text(line, 20, 30 + i * 20);
  //     // });

  //     // doc.splitTextToSize(txt, 7.25, )


  //     doc.getFontList();

  //     let textLines;
  //     textLines = doc.setFont('times', 'normal')
  //       .setFontSize(12)
  //       .splitTextToSize(txt.innerText, 7.25)

  //     let verticalOffSet = 0.5
  //     verticalOffSet += (textLines.length + 0.5) * 12 / 72
  //     doc.text(textLines, 0.5, verticalOffSet + 12 / 72 )

  //     doc.save('teste.pdf');
  //   });


  fetch('./teste.txt')
  .then(response => response.text())
  .then(txt => {
    let textLines = doc.setFont('times', 'normal')
      .setFontSize(12)
      .splitTextToSize(txt, cmToPx(14.5));
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
