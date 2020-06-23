const validateForm = () => {
  if (inputField.value === '')  {
    para.textContent = 'Input field cannot be left blank';
    inputField.focus();
    return false;
  }
  if (inputField.value.match(/[a-z]/g)) {
    para.textContent = 'Please enter numerical value';
    inputField.focus();
    inputField.value = '';
    return false;
  } else {
    //para.textContent = Number(inputField.value);
    inputField.value = '';
    inputField.focus();
    para.textContent = '';
  }
  return Number(inputField.value);
};
const relief = () => {
  let reliefAllowance = 200000;
  let reliefPercentage = inputField.value * .01;
  let consolidated;
  if (reliefPercentage > reliefAllowance) {
      consolidated = reliefPercentage * (inputField.value * .2)
  } 
  if ((reliefPercentage = reliefAllowance) || (reliefPercentage < reliefAllowance)) {
    consolidated = reliefAllowance * (inputField.value * .2);
  }
  return para.textContent = consolidated;
};
let income = Number(inputField.value);

const relief = consolidated => {
  income = validateForm();
  let reliefAllowance = 200000;
  let reliefPercent = income * .01;
  let fixedPercent = income * .2;
  consolidated = (reliefAllowance > reliefPercent) || (reliefAllowance === reliefPercent) ? (reliefAllowance + fixedPercent) : (reliefPercent + fixedPercent);
  return consolidated;
};

const otherRelief = (pension, nhis, nhf) => {
  income = validateForm();
  pension = income * .08;
  nhis = income * .05;
  nhf = income * .025;
  return income - (pension + nhis + nhf);
};