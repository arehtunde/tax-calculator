let buttonProceed = document.querySelector('.proceed');
let visual = document.querySelector('.visual');
let instruction = document.querySelector('.instruction');
let field = document.querySelector('.field');
let calcPage = document.querySelector('.calc-page');
let compute = document.querySelector('.compute');
let para = document.querySelector('p');
//let myForm = document.querySelector('.myForm');
let inputField = document.querySelector('.inputfield');
let body = document.getElementsByTagName('body');

const validateForm = () => {
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
  
  para.textContent = '';
  inputField.focus();
  inputField.value = '';

  return Number(input);
};

const relief = (consolidated, pension, nhis, nhf, reliefSum) => {
  income = validateForm();
  let reliefAllowance = 200000;
  let reliefPercent = income * .01;
  let fixedPercent = income * .2;
  pension = income * .08;
  nhis = income * .05;
  nhf = income * .025;
  
  consolidated = (reliefAllowance > reliefPercent) || (reliefAllowance === reliefPercent) ? (reliefAllowance + fixedPercent) : (reliefPercent + fixedPercent);
  
  reliefSum = pension + nhis + nhf + consolidated;

  return reliefSum;
};

const getTaxableIncome = taxableIncome => {
  totalRelief = relief();
  return taxableIncome = income - totalRelief;
};

const calcTax = () => {
  let paye;
  taxableIncome = getTaxableIncome();

  if ((income <= 300000) || (taxableIncome <= 0)) {
    return paye = income * .01;
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
  
  return paye;
};

const table = `
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
    <td onload="this.innerHTML=validateForm()"></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Less Relief</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2">Consolidated relief allowance</td>
    <td scope="row">Higher of NGN 200,000 or 1% of GI</td>
    <td>200000</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td scope="row">20% of GI</td>
    <td>800000</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Pension</td>
    <td>8% of GI</td>
    <td>250000</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>NHIS</td>
    <td>5% of GI</td>
    <td>25000</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>NHF</td>
    <td>2.5% of GI</td>
    <td>2500</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Total</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>1500000</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Taxable Income</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>2500000</td>
  </tr>
</tbody>
</table>
`;

const displayResult = () => {
  taxReturn = calcTax();
  let resultPage = document.createElement('div');
  resultPage.setAttribute('class', 'result-Page');
  resultPage.style.backgroundColor = '#fef7f8';
  resultPage.style.height = '70vh';
  calcPage.appendChild(resultPage);

  visual.hidden = true;
  instruction.hidden = true;
  field.hidden = true;
  resultPage.innerHTML = table;
}

const showResult = () => {
  let input = inputField.value;
  if (input === '') {
    compute.addEventListener('click', validateForm);
  } else if (input.match === (/[a-z]/g)) {
    compute.addEventListener('click', validateForm);
  } else {
    compute.addEventListener('click', displayResult);
  };
  
};

compute.addEventListener('click', showResult);

buttonProceed.addEventListener('click', () => {
  visual.hidden = true;
  instruction.hidden = true;
  field.hidden = false;
  calcPage.style.backgroundColor = '#fef7f8';
  calcPage.style.height = '80vh';
});