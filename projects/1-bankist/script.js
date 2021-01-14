//
//

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

console.log(1234);

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

const h1Credentials = document.querySelector('.h1__credentials');
const credentialsContainer = document.querySelector('.credentials__container');
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal ';
    const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">$${mov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `＄${acc.balance} USD`;
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => {
      return mov > 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = `＄${incomes}`;

  const out = acc.movements
    .filter(mov => {
      return mov < 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);
  labelSumOut.textContent = `＄${Math.abs(out)}`;

  const interest = acc.movements
    .filter(mov => {
      return mov > 0;
    })
    .map(deposit => {
      return (deposit * acc.interestRate) / 100;
      // return (deposit * 1.2) / 100;
    })
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => {
      return acc + int;
    });
  labelSumInterest.textContent = `＄${interest}`;
};

// calcDisplaySummary(account1.movements);

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

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc.movements);

  // Display Balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(account => {
    return account.username === inputLoginUsername.value;
  });
  console.log(currentAccount);

  // credentialsContainer.style.display = 'none';
  // h1Credentials.style.display = 'none';

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear Fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(acc => {
    return acc.username === inputTransferTo.value;
  });
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    // Doing the Transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add Movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => {
      return acc.username === currentAccount.username;
    });

    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// LECTURES
/////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const dogs = [
  {
    weight: 22,
    curFood: 250,
    owners: ['Alice', 'Bob'],
  },
  {
    weight: 8,
    curFood: 200,
    owners: ['Matlida'],
  },
  {
    weight: 13,
    curFood: 275,
    owners: ['Sarah', 'John'],
  },
  {
    weight: 32,
    curFood: 340,
    owners: ['Michael'],
  },
];

dogs.forEach(function (dog) {
  dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
});

const dogSarah = dogs.find(dog => {
  return dog.owners.includes('Sarah');
});
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooLittle);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);

console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

console.log(dogs.some(dog => dog.curFood === dog.recFood));

// const randomArr = ['a', 'b', 'c'];
// console.log(randomArr);

// const randomNumber = Math.floor(Math.random() * randomArr.length);

// console.log(randomArr[randomNumber]);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   );
//   console.log(movementsUI);
// });

// const x = new Array(7);
// console.log(x.fill(1));

// console.log(x.fill(1, 3));
// const y = Array.from(
//   {
//     length: 7,
//   },
//   () => 2
// );

// console.log(y);

// const z = Array.from(
//   {
//     length: 7,
//   },
//   (_, i) => i + 1
// );

// console.log(z);

// const random = Math.floor(Math.random() * 100);
// const bozo = Array.from(
//   {
//     // length: 100,
//     random,
//   },
//   random => random
// );

// console.log(bozo);
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());

// console.log(movements);
// console.log(movements.sort());

// const bozo = movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   }

//   if (b > a) {
//     return -1;
//   }
// });

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(1));

// const accountMovements = accounts.map(acc => {
//   return acc.movements;
// });

// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const totalArraySums = allMovements.reduce((acc, mov) => {
//   return acc + mov;
// });

// console.log(totalArraySums);

// console.log(movements.includes(-130));

// const anyDeposits = movements.some(mov => mov > 5000);
// console.log(anyDeposits);

// console.log(movements.every(mov => mov > 0));

// const deposits = mov => mov > 0;
// console.log(movements.some(deposits));

// const firstWithdraw = movements.find(function (mov) {
//   return mov < 0;
// });

// console.log(firstWithdraw);
// console.log(accounts);

// const account = accounts.find(function (acc) {
//   return acc.owner === `Adam Apple`;
// });

// console.log(account);

// for (const account of accounts) {
//   if (account.owner === 'Adam Apple') {
//     console.log(account);
//   } else {
//     console.log(`Doh`);
//   }
// console.log(account);
// account.owner === 'Adam Apple';
// }

// const euroToUsd = 1.1;
// const bozo = movements
//   .filter(mov => {
//     return mov > 0;
//   })
//   .map(mov => mov * euroToUsd)
//   .reduce((acc, curr) => {
//     return acc + curr;
//   }, 0);

// console.log(bozo);

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
