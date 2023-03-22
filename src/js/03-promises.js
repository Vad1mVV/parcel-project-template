const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let delayVal = Number(e.target.elements.delay.value);
  const stepVal = Number(e.target.elements.step.value);
  const amountVal = Number(e.target.elements.amount.value);

  refs.form.reset();

  for (let i = 1; i <= amountVal; i += 1) {
    createPromise(i, delayVal)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    delayVal += stepVal;
  }
}
  

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
}

