'use strict'


/*
console.log(Math.sqrt(25));
console.log(8 ** (1 / 3));

console.log(Math.max(25, 45, 3, 8, 76, 95, 25, 42));
console.log(Math.min(25, 45, 3, 8, 76, 95, 25, 42));


const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min
console.log(randomInt(10, 20));

*/

/*
//    ----------VEdio-171

console.log(2 ** 53 - 1);
console.log(2 ** 53 + 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);

console.log('----------------------');

const num = 74185296374108520963852041n
console.log(num);
console.log(typeof num);

console.log(BigInt(74185296374108520963852041));

console.log(1000000n * 10000000n);

const huge = 7418527496741852963n;
const number = 23;
console.log(huge * BigInt(number));

*/


/*
//    ----------VEdio-172

const now = new Date()
console.log(now.getTime());

// console.log(new Date('May 16 2022 21:00:43'));
// console.log(new Date('25 january 2015 23:58:23'));


// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date());
// console.log(new Date(0));


const future = new Date('19 nov 2037 15:23')
console.log(future);
console.log(future.getTime());
console.log(future.getMonth() + 1);
console.log(future.getFullYear());
console.log(future.toISOString());

console.log(new Date(1652716087329));

console.log(Date.now());

*/

/*
//    ----------VEdio-174

const calcDatePassed = (today, birthday) => {
    const date1 = new Date(today)
    const date2 = new Date(birthday)

    const calcDate = (date1 - date2) / (1000 * 60 * 60 * 24)
    // const year = calcDate * 12;
    // const month = calcDate * 24
    // const day = calcDate * 60
    // console.log(year, month, day);

    console.log(calcDate);

}
calcDatePassed('16 may 2022', '16 march 2000')

*/

//    ----------VEdio-176
const num = 2563148.96;
console.log('US :', new Intl.NumberFormat('en-US').format(num));

console.log('IND :', new Intl.NumberFormat('en-IN').format(num));


// setTimeout(() => console.log('Hellooo'), 3000)

// setInterval(() => console.log('hellooooooooooooo'), 3000)

// setInterval(() => {
//     const now = new Date();
//     const hour = now.getHours()
//     const min = now.getMinutes()
//     const sec = now.getSeconds()
//     console.log(`${hour}: ${min}: ${sec}`);
// }, 1000)