

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
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




/* Data
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
*/
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////



const displayMoviments = function(moviments, sort = false){

  containerMovements.innerHTML = ' '

  const movs = sort ? moviments.slice().sort((a,b)=> a - b) : moviments

  movs.forEach((mov,i)=>{


  const type = mov > 0 ? 'deposit' :  'withdrawal'


   const html =  `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} deposit</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}</div>
    </div>`;

    
    containerMovements.insertAdjacentHTML('afterbegin',html)

  })
}



const calcDisplayBalance = (acc)=>{

  acc.balance = acc.movements.reduce((acc,mov)=> acc + mov, 0)


  labelBalance.innerText = `${acc.balance}€`

}



const calcDisplaySammary = (acc)=>{

    const income = acc.movements.filter(mov => mov > 0).reduce((acc,mov)=> acc + mov, 0)



    const expense = Math.abs(acc.movements.filter(mov => mov < 0).reduce((acc,mov)=> acc + mov, 0))


    const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).filter((int,i,arr)=>{
        return int >= 1
    }).reduce((acc,int)=> acc + int, 0)
  

    labelSumIn.innerText = `${income}€`

    labelSumOut.innerText = `${expense}€`

    labelSumInterest.innerText = `${interest}€`


}



const creatUserName = function(acc){


  acc.forEach((acc)=>{

       acc.username =  acc.owner.split(' ').map(word => word.charAt(0)).join('').toLowerCase()

  })

}
creatUserName(accounts)

const updateUI = (acc)=>{
   // Display movement
   displayMoviments(acc.movements)
   // Display  Balance
   calcDisplayBalance(acc)
   // Display Summary
   calcDisplaySammary(acc)

}

//Event 

let currentAccont


btnLogin.addEventListener('click', (e)=>{
    e.preventDefault()
   
   currentAccont = accounts.find(acc => acc.username === inputLoginUsername.value)


   if(currentAccont?.pin === Number(inputLoginPin.value)){

    //clean input filds

    // Display UI and  messagem
    labelWelcome.innerText = `Welcome Back , ${currentAccont.owner.split(' ')[0]}`

    containerApp.style.opacity = 100
    //clear Input filders 
    inputLoginUsername.value = inputLoginPin.value = ''

    inputCloseUsername.blur()

    updateUI(currentAccont)
   }

})

btnTransfer.addEventListener('click',(e)=>{
    e.preventDefault()

    const  amount = Number(inputTransferAmount.value)

    const reciveAcc = accounts.find(acc => acc.username === inputTransferTo.value)

    inputTransferAmount.value = inputTransferTo.value = ''

    if(amount > 0 && reciveAcc && currentAccont.balance >= amount &&  reciveAcc?.username !== currentAccont.username)
        console.log('traf')
    {
      currentAccont.movements.push(-amount);
      reciveAcc.movements.push(amount)

      updateUI(currentAccont)
    }
})


btnClose.addEventListener('click',(e)=>{
    e.preventDefault()

    if(inputCloseUsername.value ===  currentAccont.username && Number(inputClosePin.value) === currentAccont.pin)
    {
      const index = accounts.findIndex(acc => acc.username === currentAccont.username)

      accounts.splice(index, 1)

      inputLoginPin.value = inputCloseUsername.value = ''

      //Delete UI
      containerApp.style.opacity = 0

      
      labelWelcome.innerText = 'Log in to get started'
    }
  
})


btnLoan.addEventListener('click',(e)=>{
  e.preventDefault()

  const amount =  Number(inputLoanAmount.value);


  if(amount > 0 && currentAccont.movements.some(mov =>  mov >= amount * 0.1)){

    currentAccont.movements.push(amount)

    updateUI(currentAccont)

    inputLoanAmount.value = ''
  }
})


let sorted = false 

btnSort.addEventListener('click',(e)=>{
  e.preventDefault()

  displayMoviments(currentAccont.movements,!sorted)

  sorted = !sorted
})
//////////////////////// lec





/*

//max
let balance2 = 0

for(const mov of  movements) balance2 += mov

const max = movements.reduce((acc,mov)=>{

  if(mov < acc)return acc
  else return mov
  

},movements[0])

console.log(max)


const euroToUsd = 1.1





const totalDepositUs = movements.filter(mov => mov > 0).map(mov => mov * euroToUsd).reduce((acc,mov)=> acc + mov , 0)


console.log(totalDepositUs)

















/*

const balance = movements.reduce((acc,cur,i,arr)=>{

    console.log(`Iteration ${i}: ${acc}`)

    return  acc + cur
},0)


console.log(balance)

let balance2 = 0 
for(const mov of movements) balance2 += mov
console.log(balance)


/*

const  euroToUs = 1.1
const movementsUsFor = []



const movementsUS = movements.map((mov)=>{
  return mov * euroToUs
})

//for(const mov of movements) movementsUsFor.push(mov * euroToUs)


const movementuS  = movements.map((mov)=>{return mov * euroToUs})

console.log(movementuS)



const movingDescripitons = movements.map((mov,i,arr)=>{
  return  `movement ${i + 1} : You ${mov > 0 ? 'Deposied' : 'Widthdraw'}`
})


console.log(movingDescripitons)
*/



/*

console.log(userName)

let arrJulia = [9,16,6,8,3]
let arrkate = [4,1,15,8,3]

//let arrJulia = [3,5,2,12,7]
//let arrkate = [4,1,15,8,3]

let arrJuliaCopy 


arrJuliaCopy = arrJulia.slice(1,-1)

const checkDogs = function(kate,julia){
  

    const allDogs = kate.concat(julia)


    allDogs.forEach((dogs,i)=>{

      const poppy = dogs < 3 ? 'poppy 🐶' : 'Dog 🐕‍🦺'


      console.log(`${poppy} ${i + 1}  ${dogs} years`) 

    })

}


checkDogs(arrkate,arrJuliaCopy)




const deposit = movements.filter((mov)=>{
  return mov < 0
})

console.log(deposit)


const Widthdraw = movements.filter((mov)=> mov < 0)


console.log(Widthdraw)



//const arr = [5,2,4,1,15,8,3]

const arr = [16,6,10,5,6,1,4]




const calcHumanAge = function(arr){
  let dogs = []
  let sum = 0


  for(const dog of arr){
   dogs.push(dog <= 2 ? dog * 2 : 16 + dog * 4)
    
  } 



  const ageLess = dogs.filter((el)=>{
    return el >= 18
  })

  console.log(ageLess)

  for(const avgAge of ageLess){
    sum += avgAge
    
  }

  const result = Math.trunc(sum / ageLess.length)

  return result

 
}

console.log(calcHumanAge(arr))





//const arr = [16,6,10,5,6,1,4]
const arr = [5,2,4,1,15,8,3]

const calcHumanAge2 = (arr)=>{


    const humanAge = arr.map(age => age <= 2 ? age * 2 : 16 + age * 4)

    const lessAge = humanAge.filter(age => age >= 18)

    console.log(lessAge)


    const avgHuman = lessAge.reduce((acc,mov)=> acc + mov,0)


    console.log(Math.trunc(avgHuman / lessAge.length))
}


calcHumanAge2(arr)




//const arr = [5,2,4,1,15,8,3]

const arr = [16,6,10,5,6,1,4]

const calcHumanAge = arr =>{
    const age = arr.map(age => age <= 2 ? age * 2 : 16 + age * 4).filter(age => age >= 18).reduce((acc,mov,i ,arr)=> acc + mov / arr.length,0)

    console.log(Math.trunc(age))

}


calcHumanAge(arr)


const firstWithDraw  = movements.find(mov => mov < 0)

const account = accounts.find(acc => acc.owner === 'Sarah Smith')



const any = movements.some(mov => mov > 0)


const every = movements.every(mov => mov < 0)

console.log(every)


console.log(any)


const arra = [1,2,3,[1,3343]]

console.log(arra.flat(arra))


const arrDeep = [4,[3,2],[0,1]]


console.log(arrDeep.flat())


const accontsMovements = accounts.map(acc => acc.movements).flat().reduce((mov,acc)=> mov + acc,0)


console.log(accontsMovements)


movements.sort((a,b)=>{
    if(a > b)return 1
    if(a < b)return -1
})

console.log(movements)



movements.sort((a,b)=>{
  if(a > b)return -1
  if(a < b)return 1
})

console.log(movements)


const x = new Array(4)

const d = x.fill(4)


console.log(d)


const y = Array.from({length: 4},() => 3 + 1)// ----> 777777777777777

console.log(y)


const z = Array.from({length: 7}, (cur,i)=> i - 1) //1234567890


const u = Array.from({length: 16},(sum,i)=> i + 1)

console.log(u)



labelBalance.addEventListener('click',()=>{
  const movementUI = Array.from(document.querySelectorAll('.movements__value'))


  console.log(movementUI.map(el => el.textContent.replace('$', '')))


  console.log([...document.querySelectorAll('.movements__value')])
})


console.log(z)



//const bankDepositSum = accounts.map(acc=> acc.movements.filter(mov => mov > 0)).flat().reduce((acc,mov)=> acc + mov,0)

// 1 task

const bankDepositSum = accounts.flatMap(acc => acc.movements.filter(mov=> mov > 0)).reduce((acc,mov)=> acc + mov,0)

console.log(bankDepositSum)

// 2 task


//const numDepoisOne = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length
  
const  numDepoisOne = accounts.flatMap(acc => acc.movements).reduce((count,cur)=> (cur >= 1000 ? count + 1 : count),0)
console.log(numDepoisOne)
*/

// 3 task
const sumss = accounts.flatMap(acc => acc.movements).reduce((sums,mov)=>{
      //mov > 0 ? sums.deposit += mov : sums.widthdraw += mov

      sums[mov > 0 ? 'deposit' : 'widthdraw'] += mov

      return sums
    
},{deposit:0,widthdraw:0})

console.log(sumss)

// 4 task


const convertTitleCase = function(title){

  const excepitions = ['an','but','with', 'to','mike']

  const firstUpper =   title.toLocaleLowerCase().split(' ').map(str => excepitions.includes(str) ? str : str[0].toUpperCase() + str.slice(1))

  return firstUpper.join(' ')
}
const s = 'an ant went to store, but an ant cant buy mike with another ant.'

console.log(convertTitleCase(s))


//coding challleng 


const dogs = [
  {weight:22,curFood:250,owners:['alice','bob']},
  {weight:13,curFood:200,owners:['Matilda']},
  {weight:13,curFood:275,owners:['sarah','john']},
  {weight:32,curFood:340,owners:['micheal']}
]

//1
  dogs.flatMap(acc => acc.recomendFood =  Math.trunc(acc.weight ** 0.75 * 28))

//2
 const dogSarah = dogs.find(sarahDog => sarahDog.owners[0] === 'sarah')

console.log(dogSarah.curFood > dogSarah.recomendFood ? 'Sarah to eating eating to much' : 'Sarah to eating eating too little')

//3

const eatingTooLitte = dogs.filter(dog => dog.curFood < dog.recomendFood).flatMap(dog => dog.owners)

const eatingTooMuch = dogs.filter(dog => dog.curFood > dog.recomendFood).flatMap(dog => dog.owners)

console.log(eatingTooMuch)

console.log(eatingTooLitte)

//4
  console.log(`${eatingTooLitte.join(' and ')}'s dogs eat too little`)

  console.log(`${eatingTooMuch.join(' and ')}'s dogs eat too much`)

//5
    const reconFoodAmount = dogs.some(dog => dog.recomendFood === dog.curFood)

    console.log(reconFoodAmount)
//6
 

const okayAmountFood = dog => dog.curFood > dog.recomendFood * 0.90 && dog.curFood < dog.recomendFood * 0.10


console.log(dogs.some(okayAmountFood))

//7


console.log(dogs.some(okayAmountFood))

//8


const copyRecomend = dogs.slice().sort((a,b)=> a.recomendFood - b.recomendFood)

console.log(copyRecomend)

//covert number and parsing 


console.log(typeof  +'6')


console.log(Number.parseInt('30px'))

//isNAN

console.log(Number.isNaN(5))

console.log(Number.isNaN('4px'))

console.log(Number.isFinite('5px'))

// isIn

console.log(Number.isInteger(0.2))
console.log(Number.isInteger(0))





























