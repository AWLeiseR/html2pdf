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

const generatePDF = (e) => {
  e.preventDefault();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "pt", "a4");

  fetch("../teste.txt")
    .then((response) => response.text())
    .then((txt) => {
      txt = txt.replace("[name]", client_name.value);
      txt = txt.replace("[RG]", client_rg.value);
      txt = txt.replace("[CPF]", client_cpf.value);
      txt = txt.replace("[%]", client_discount.value + "%");

      let textLines = doc
        .setFont("times", "normal")
        .setFontSize(12)
        .splitTextToSize(txt, cmToPt(19.5));
      //calculo para decidir quatas páginas vão ter
      const pages = parseInt((30 + textLines.length * 20) / A4_HEIGHT_SIZE) + 1;
      //loop para adicionar página
      for (let j = 0; j < pages; j++) {
        // // adiciona cada linha ao documento PDF
        for (let i = 0; i < textLines.length; i++) {
          if (30 + i * 20 > A4_HEIGHT_SIZE) {
            textLines = textLines.slice(i);
            break;
          }

          doc.text(textLines[i], 20, 30 + i * 20);
        }
        if (j + 1 < pages) {
          doc.addPage();
        }
      }
      //abre o pdf em outr pagina
      doc.output("dataurlnewwindow");
      // // doc.save("teste.pdf");
    });
};

const client_button = document
  .getElementById("input_client_button")
  .addEventListener("click", generatePDF);
