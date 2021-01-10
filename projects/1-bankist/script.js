//
//

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// console.log(123456);

// Data
const account1 = {
  // owner: 'Jonas Schmedtmann',
  owner: 'Adam Apple',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  // owner: 'Jessica Davis',
  owner: 'Bozo Boy',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  // owner: 'Steven Thomas Williams',
  owner: 'Clever Cat',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  // owner: 'Sarah Smith',
  owner: 'Doggy Doo',
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

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `＄${balance} USD`;
};

calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => {
      return mov > 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = `＄${incomes}`;

  const out = movements
    .filter(mov => {
      return mov < 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);
  labelSumOut.textContent = `＄${Math.abs(out)}`;

  const interest = movements
    .filter(mov => {
      return mov > 0;
    })
    .map(deposit => {
      return (deposit * 1.2) / 100;
    })
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => {
      return acc + int;
    });
  labelSumInterest.textContent = `＄${interest}`;
};

calcDisplaySummary(account1.movements);

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => {
        return name[0];
      })
      .join('');
  });
};

createUserNames(accounts);

// LECTURES
/////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;
const bozo = movements
  .filter(mov => {
    return mov > 0;
  })
  .map(mov => mov * euroToUsd)
  .reduce((acc, curr) => {
    return acc + curr;
  }, 0);

console.log(bozo);

// const calcAverageHumanAge = ages => {
//   const humanAges = ages.map(age => {
//     return age <= 2 ? 2 * age : 16 + age * 4;
//   });
//   const adults = humanAges.filter(age => {
//     return age >= 18;
//   });
//   const average =
//     adults.reduce((acc, curr) => {
//       return acc + curr;
//     }, 0) / adults.length;

//   return average;
// };

// const calcAverageHumanAge = ages => {
//   let adult;
//   const bozo = ages
//     .map(age => {
//       // console.log(age);
//       return age <= 2 ? 2 * age : 16 + age * 4;
//     })
//     .filter(adult => {
//       return adult > 18;
//     })
//     .reduce((a, b) => {
//       return (a + b) / 5;
//     });
//   console.log(bozo);
// };

// const averageAges1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const averageAges2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(averageAges1);
// console.log(averageAges2);

// console.log(movements);

// const balance = movements.reduce(function (acc, cur) {
//   return acc + cur;
// }, 0);

// console.log(balance);

// const greatestValue = movements.reduce((acc, curr) => {
//   console.log(`${acc} ${curr}`);
//   return acc > curr ? acc : curr;
// }, movements[0]);

// console.log(greatestValue);

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);

// const withdraws = movements.filter(mov => {
//   return mov < 0;
// });
// console.log(withdraws);

// const euroToUsd = 1.1;
// const movementsToUsd = movements.map(function (mov) {
//   return Math.trunc(mov * euroToUsd);
// });

// console.log(movements);
// console.log(movementsToUsd);

// const movementsDescription = movements.map(function (mov, i) {
//   return `Movement ${
//     i + 1
//   }: You ${mov > 0 ? 'Deposited' : 'Withdrew'} ${Math.abs(mov)}`;
// });

// console.log(movementsDescription);

/////////////////////////////////////////////////
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
