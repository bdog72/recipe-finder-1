'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal ';
    const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

// LECTURES
/////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;
const movementsToUsd = movements.map(function (mov) {
  return Math.trunc(mov * euroToUsd);
});

// console.log(movements);
// console.log(movementsToUsd);

const movementsDescription = movements.map(function (mov, i) {
  return `Movement ${
    i + 1
  }: You ${mov > 0 ? 'Deposited' : 'Withdrew'} ${Math.abs(mov)}`;
});
console.log(movementsDescription);

/////////////////////////////////////////////////

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();

//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);

//   const dogs = dogsJuliaCorrected.concat(dogsKate);

//   dogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is an puppy, and is ${dog} years old`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

/////////////////////////////////////////////////

// const dogsJulia = [3, 5, 2, 12, 7];
// const updatedDogsJulia = dogsJulia.slice(1, 4);
// const dogsKate = [4, 1, 15, 8, 3];

// const juliaDogsAges = updatedDogsJulia.forEach(function (ages, index) {
//   if (ages >= 5) {
//     console.log(`Dog ${index + 1} is an adult. They are ${ages} years old`);
//   } else {
//     console.log(`Dog ${index + 1} is an puppy. They are ${ages} years old`);
//   }
// });

// console.log(`---------------`);

// const katesDogsAges = dogsKate.forEach(function (ages, index) {
//   if (ages >= 5) {
//     console.log(`Dog ${index + 1} is an adult. They are ${ages} years old`);
//   } else {
//     console.log(`Dog ${index + 1} is an puppy. They are ${ages} years old`);
//   }
// });

/////////////////////////////////////////////////

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((value, key, map) => {
//   console.log(`${key}: ${value}`);
// });

// const currenciesUnique = new Set(['USD', 'GBP', 'EUR']);

// currenciesUnique.forEach((value, key, map) => {
//   console.log(`${key}: ${value}`);
// });

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`${i + 1}) You deposited ${movement}`);
//   } else {
//     console.log(`${i + 1}) You withdrew ${Math.abs(movement)}`);
//   }
// }

// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`${i + 1}) You deposited ${mov}`);
//   } else {
//     console.log(`${i + 1}) You withdrew ${Math.abs(mov)}`);
//   }
// });
