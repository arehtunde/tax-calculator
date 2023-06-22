let inputPage = document.querySelector('.input-page');
let welcomePage = document.querySelector('.welcome-page');
let compute = document.querySelector('.compute');
let proceed = document.querySelector('.proceed');
let para = document.querySelector('p');
let myForm = document.querySelector('.myform');
let inputField = document.querySelector('.inputfield');
let container = document.querySelector('.container');

const relief = (consolidated, pension, nhis, nhf, reliefSum) => {
  income = Number(inputField.value);
  let reliefAllowance = 200000;
  let reliefPercent = income * .01;
  fixedPercent = income * .2;
  pension = income * .08;
  nhis = income * .05;
  nhf = income * .025;

  tabInc = (reliefAllowance > reliefPercent) || (reliefAllowance === reliefPercent) ? reliefAllowance : reliefPercent;
  
  consolidated = (reliefAllowance > reliefPercent) || (reliefAllowance === reliefPercent) ? (reliefAllowance + fixedPercent) : (reliefPercent + fixedPercent);
  
  reliefSum = pension + nhis + nhf + consolidated;

  return reliefSum.toFixed(2);
};

const getTaxableIncome = () => {
  totalRelief = relief();
  return taxableIncome = income - totalRelief;
};

const calcTax = () => {
  let paye;
  taxableIncome = getTaxableIncome();

  if ((income <= 300000) || (taxableIncome <= 0)) {
    return paye = (income * .01).toFixed(2);
  };

  if (taxableIncome <= 300000) {
    paye = taxableIncome * .07;
  } else if ((taxableIncome > 300000) && (taxableIncome <= 600000)) {
    paye = ((taxableIncome - 300000) * .11) + 21000;
  } else if ((taxableIncome > 600000) && (taxableIncome <= 1100000)) {
    paye = ((taxableIncome - 600000) * .15) + 21000 + 33000;
  } else if ((taxableIncome > 1100000) && (taxableIncome <= 1600000)) {
    paye = ((taxableIncome - 1100000) * .19) + 21000 + 33000 + 75000;
  } else if ((taxableIncome > 1600000) && (taxableIncome <= 3200000)) {
    paye = ((taxableIncome - 1600000) * .21) + 21000 + 33000 + 75000 + 95000;
  } else {
    paye = ((taxableIncome - 3200000) * .24) + 21000 + 33000 + 75000 + 95000 + 336000;
  };
  
  return paye.toFixed(2);
};

const displayResult = () => {
  taxReturn = calcTax();
  let resultPage = document.createElement('section');
  resultPage.setAttribute('class', 'result-Page');
  container.append(resultPage);

  welcomePage.hidden = true;
  inputPage.hidden = true;

  const table2 = `
  <table style="height:40vh;">
  <tbody>
    <tr>
      <td>&nbsp;</td>
      <td style="width:22%;">&nbsp;</td>
      <td style="width:18%;">NGN</td>
      <td style="width:15%;">NGN</td>
    </tr> 
    <tr>
      <td>Gross Income</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>${income.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Income Tax</td>
      <td>1% of GI</td>
      <td>&nbsp;</td>
      <td>${calcTax()}</td>
    </tr>
    <tr>
      <td>Net Income</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>${income - calcTax()}</td>
    </tr>
  </tbody>
  </table>
  `;

  const table1 = `
  <table>
  <tbody>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>NGN</td>
      <td>NGN</td>
    </tr>
    <tr>
      <td>Gross Income</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>${income}</td>
    </tr>
    <tr>
      <td>Relief</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td rowspan="2">Consolidated relief allowance</td>
      <td scope="row">Higher of NGN 200,000 or 1% of GI</td>
      <td>${tabInc}</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td scope="row">20% of GI</td>
      <td style="text-align:right">${fixedPercent}</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Pension</td>
      <td>8% of GI</td>
      <td>${(income * .08).toFixed(2)}</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>NHIS</td>
      <td>5% of GI</td>
      <td>${(income * .05).toFixed(2)}</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>NHF</td>
      <td>2.5% of GI</td>
      <td>${(income * .025).toFixed(2)}</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Total Relief</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>${relief()}</td>
    </tr>
    <tr>
      <td>Taxable Income</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>${getTaxableIncome()}</td>
    </tr>
    <tr>
      <td>Income Tax</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>${calcTax()}</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Net Income</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>${income - calcTax()}</td>
    </tr>
  </tbody>
  </table>
  `;

  resultPage.innerHTML = ((income <= 300000) || (taxableIncome <= 0)) ? resultPage.innerHTML = table2 : resultPage.innerHTML = table1;

  let homeButton = document.createElement('button');
  homeButton.setAttribute('class', 'button');
  homeButton.textContent = 'Home';
  resultPage.append(homeButton);
  homeButton.addEventListener('click', () => {
    welcomePage.hidden = false;
    inputPage.hidden = true;
    resultPage.hidden = true;
    inputField.value = '';
    inputField.focus();
    para.textContent = '';
  });
}

const showResult = () => {
  let input = inputField.value;
  if (input === '')  {
    para.textContent = 'Input field cannot be left blank';
    inputField.focus();
    return false;
  };
  if (input.match(/[a-z]/g)) {
    para.textContent = 'Please enter numerical value';
    inputField.focus();
    inputField.value = '';
    return false;
  }; 
  Number(input);
  displayResult();
};

proceed.addEventListener('click', () => {
  welcomePage.hidden = true;
  inputPage.hidden = false;
  //resultPage.hidden = true;
});

compute.addEventListener('click', showResult);
