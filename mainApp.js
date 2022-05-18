'use strict';

// ----------------Bankist App------------------

// Data
const account1 = {
    owner: 'Anup Kumar Shaw',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 6, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2021-10-08T14:11:59.604Z',
        '2022-05-11T17:01:17.194Z',
        '2022-05-13T23:36:17.929Z',
        '2022-05-15T10:17:24.185Z',
        '2022-05-16T18:22:29.824Z',

    ],
    currency: 'INR',
    locale: 'hi-hi',
};

const account2 = {
    owner: 'Maxwell Gupta',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 7,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    owner: 'John Suji',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 5,
    pin: 3333,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account4 = {
    owner: 'Chapatti Vetory Aata',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 4,
    pin: 4444,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2021-10-08T14:11:59.604Z',
        '2021-11-08T17:01:17.194Z',
        '2021-11-11T23:36:17.929Z',
        '2021-11-12T10:51:36.790Z',
    ],
    currency: 'INR',
    locale: 'hi-hi',
};

const accounts = [account1, account2, account3, account4];



// Elements Selecter
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


///////////////////////////////////////////////////////////////////////////////////////////////////////

const formatMovementsDate = function (date) {

    const calcDatePassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))
    const dayPassed = calcDatePassed(new Date(), date)
    // console.log(dayPassed);

    if (dayPassed === 0) return 'Today';
    if (dayPassed === 1) return 'Yesterday';
    if (dayPassed <= 7) return `${dayPassed} days ago`;
    else {
        const day = `${date.getDate()}`.padStart(2, 0)
        const month = `${date.getMonth() + 1}`.padStart(2, 0)
        const year = date.getFullYear()
        return `${day}/${month}/${year}`;
    }
}

// Currency formate

const formateCurrency = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);

}

// Display Movements
const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';

    // console.log(acc.movements);

    // For Sorting
    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    movs.forEach((mov, i) => {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const date = new Date(acc.movementsDates[i])
        const displayDate = formatMovementsDate(date)

        const formateMovement = formateCurrency(mov, acc.locale, acc.currency)

        const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formateMovement}</div>
    </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html)
    });
}


// Sum or Total
const calcDisplayBalance = function (curAcc) {
    curAcc.balance = curAcc.movements.reduce((acc, mov) => acc + mov, 0)
    const formateMovement = formateCurrency(curAcc.balance, curAcc.locale, curAcc.currency)
    labelBalance.textContent = `${formateMovement}`
}


// Display Summary
const calcDisplaySummary = function (curAcc) {
    const sumIn = curAcc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0)
    labelSumIn.textContent = formateCurrency(sumIn, curAcc.locale, curAcc.currency)

    const sumOut = Math.abs(curAcc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0))
    labelSumOut.textContent = formateCurrency(sumOut, curAcc.locale, curAcc.currency)

    const sumInterest = curAcc.movements
        .filter(mov => mov > 0)
        .map(mov => (mov * curAcc.interestRate) / 100)
        .filter((intrest, i, arr) => {
            // console.log(arr);
            return intrest >= 8
        })
        .reduce((acc, mov) => acc + mov, 0)
    labelSumInterest.textContent = formateCurrency(sumInterest, curAcc.locale, curAcc.currency)
}


// Create UserName
const createUserName = function (accs) {
    accs.forEach(acc => {
        acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');

    });
}
createUserName(accounts)


// UpdateUI
const updateUI = function (curAcc) {
    // Display Movements
    displayMovements(curAcc)

    // Display Balance
    calcDisplayBalance(curAcc)

    // Display Summery
    calcDisplaySummary(curAcc)

}


const startLogOutTimer = function () {
    // Set the time
    let time = 300;

    const countDown = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0)
        const sec = String(time % 60).padStart(2, 0);

        // In each call print the remaining time
        labelTimer.innerHTML = `${min}:${sec}`;

        // When time 0 Hide UI
        if (time === 0) {
            containerApp.style.opacity = 0
            clearInterval(timer)
            labelWelcome.textContent = `You are Log Out ${currentAccount.owner.split(' ')[0]} !`
        }
        time--;
    }

    // Call the time every second
    countDown()
    const timer = setInterval(countDown, 1000)
    return timer;
}




// Evant Handler
// LOGIN features
let currentAccount, timer;

///////////////////////////////////////////////
// Fake account logIN for test --- after test it will be remove
// currentAccount = account1;
// updateUI(currentAccount)
// containerApp.style.opacity = 100;

// Experiments INterlization API
// const now = new Date()


///////////////////////////////////////////////




btnLogin.addEventListener('click', function (e) {
    e.preventDefault()
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and Welcome Message
        labelWelcome.textContent = `Welcome Back ! ${currentAccount.owner.split(' ')[0]}`

        containerApp.style.opacity = 100;

        // current Date
        const now = new Date()

        const option = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        }
        const local = navigator.language
        labelDate.textContent = new Intl.DateTimeFormat(local, option).format(now)

        // const day = `${now.getDate()}`.padStart(2, 0)
        // const month = `${now.getMonth() + 1}`.padStart(2, 0)
        // const year = now.getFullYear()
        // const hour = `${now.getHours()}`.padStart(2, 0)
        // const min = `${now.getMinutes()}`.padStart(2, 0)


        // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;



        // Clear inputs fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginUsername.blur()
        inputLoginPin.blur()

        // Timer for LogOut
        if (timer) clearInterval(timer)
        timer = startLogOutTimer()

        updateUI(currentAccount);
    }
})


// const now = new Date()
// const day = `${now.getDate()}`.padStart(2, 0)
// const month = `${now.getMonth() + 1}`.padStart(2, 0)
// const year = now.getFullYear()
// const hour = `${now.getHours()}`.padStart(2, 0)
// const min = `${now.getMinutes()}`.padStart(2, 0)

// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;





// Transfer Money
btnTransfer.addEventListener('click', (e) => {
    e.preventDefault()

    const amount = Math.floor(inputTransferAmount.value)
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

    if (amount > 0 && currentAccount.balance >= amount && receiverAcc && receiverAcc?.username !== currentAccount.username) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // Date of transfer
        currentAccount.movementsDates.push(new Date().toISOString())
        receiverAcc.movementsDates.push(new Date().toISOString())


        // clear Fields
        inputTransferAmount.value = inputTransferTo.value = ''
        inputTransferAmount.blur()
        inputTransferTo.blur()
        updateUI(currentAccount)

        clearInterval(timer)
        timer = startLogOutTimer()
    }
})



// Request Loan 
btnLoan.addEventListener('click', function (e) {
    e.preventDefault()

    const amount = Math.floor(inputLoanAmount.value)

    // amount much be > 10% of deposit --- you can do with (amount / 10) or (amount * 0.1) 

    if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
        // Add new movements
        setTimeout(() => {
            currentAccount.movements.push(amount);

            // Date of transfer
            currentAccount.movementsDates.push(new Date()
                .toISOString())
            updateUI(currentAccount);

            clearInterval(timer)
            timer = startLogOutTimer()
        }, 2000)
    }
    inputLoanAmount.value = ''
    inputLoanAmount.blur();

})



// Close Account
btnClose.addEventListener('click', function (e) {
    e.preventDefault()
    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        const indexNo = accounts.findIndex(acc => acc.username === currentAccount.username)

        // Delete Account
        accounts.splice(indexNo, 1)

        // Clean Fields
        inputCloseUsername.value = inputClosePin.value = ''
        inputCloseUsername.blur();
        inputClosePin.blur();

        // Display in UI
        containerApp.style.opacity = 0;
        labelWelcome.textContent = `${currentAccount.owner.split(' ')[0]}! Your's Account is SuccessFully Deleted`;
    }
})



// Sorting Btn
let sorted = false;

btnSort.addEventListener('click', function (e) {
    e.preventDefault()
    displayMovements(currentAccount, !sorted)
    sorted = !sorted
})


/*
// -------------------------

labelBalance.addEventListener('click', function () {
    const movementsUI = Array.from(document.querySelectorAll('.movements__value'))

    const movUI = movementsUI
        .map(el => Number(el.textContent.replace('₹', '')))
    console.log(movUI);
    const addMov = movUI.reduce((acc, cur) => acc + cur, 0)
    console.log(addMov);
})

*/

/*
labelBalance.addEventListener('click', function () {
    [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
        if (i % 2 == 0) {
            row.style.backgroundColor = 'red';
        }
    })
})

*/




