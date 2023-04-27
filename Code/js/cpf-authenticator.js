const cpfInput = document.getElementById("input_client_CPF");

function cpfAuthenticator (){
    let isFirstDigitTrue = false;
    let isSecondDigitTrue = false;
    let isCpfTrue = false;
    let cpf = cpfInput.value.replace(/[^\d]/g, "");

    let firstDigitA = cpf[0] * 10 + cpf[1] * 9 + cpf[2] * 8 + cpf[3] * 7 + cpf[4] * 6 + cpf[5] * 5 + cpf[6] * 4 + cpf[7] * 3 + cpf[8] * 2;

    if (cpf.length != 11) {
        console.log("CPF inválido: deve conter 11 dígitos");
        return;
      }

    if(firstDigitA * 10 % 11 == cpf[9] || firstDigitA * 10 % 11 == 0 && cpf[9] == 0){
        isFirstDigitTrue = true;
    }

    let secondDigitA = cpf[0] * 11 + cpf[1] * 10 + cpf[2] * 9 + cpf[3] * 8 + cpf[4] * 7 + cpf[5] * 6 + cpf[6] * 5 + cpf[7] * 4 + cpf[8] * 3 + cpf[9] * 2;

    if(secondDigitA * 10 % 11 == cpf[10] || secondDigitA * 10 % 11 == 0 && cpf[10] == 0){
        isSecondDigitTrue = true;
    }

    if(isFirstDigitTrue == true && isSecondDigitTrue == true) {
        isCpfTrue = true;
        console.log('isTrue');
    } 

    console.log(cpf);
    console.log(cpf[0]);
}

const client_button = document
  .getElementById("input_client_button")
  .addEventListener("click", cpfAuthenticator);
