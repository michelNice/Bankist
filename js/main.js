
'use  strict';
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate:1.2, // %
    currency:'GBP',
    pin: 1111,
    movementsDates: [
      '2023-07-24T21:31:17.178Z',
      '2019-12-23T07:42:02.383Z',
      '2020-07-22T09:15:04.904Z',
      '2023-07-22T10:17:24.185Z',
      '2020-05-08T14:11:59.604Z',
      '2020-07-22T17:01:17.194Z',
      '2023-07-17T23:36:17.929Z',
      '2023-07-23T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', 
  };

const account2 = {
    owner:'Ana Garcia Diaz',
    interestRate:0.7,
    pin:2222,
    locale:'en-US',
    currency:'USD',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    movementsDates: [
        '2019-07-24T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-07-22T09:15:04.904Z',
        '2023-07-22T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-07-22T17:01:17.194Z',
        '2023-07-17T23:36:17.929Z',
        '2023-07-23T10:51:36.790Z',
      ],
}

const account3 = {
    owner:'Lenny Turne Silver',
    interestRate:0.7,
    pin:3333,
    locale:'en-US',
    currency:'USD',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2023-06-24T18:49:59.371Z',
        '2023-07-14T12:01:20.894Z',
      ],
}

const account4 = {
    owner:'Natalia  silva de oliveira',
    interestRate:0.9,
    pin:4444,
    locale:'pt-PT',
    currency:'EUR',
    movements: [430, 1000, 700, 50, 90],
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2023-06-24T18:49:59.371Z',
        '2023-07-14T12:01:20.894Z',
      ],
}

const accounts = [account1,account2,account3,account4]




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



const formatDate = (date)=>{

    const calcDaysPass = (date1, date2) => Math.round(Math.abs(date1 - date2) / 1000 * 60 * 60 * 24)


    const passDay = calcDaysPass(date)


    console.log(passDay)


    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2,0)
    const day = `${date.getDate()}`.padStart(2,0)

    
    if(passDay === 0)return 'Today'
    if(passDay === 1)return 'Yestusday'
    if(passDay <= 7)return ` ${passDay} days ago}`
    else{
        return `${month}/${day}/${year}`
    }
  
    
}


const formtCur = (value,locale,currency)=>{

    return new Intl.NumberFormat(locale,{
        style:'currency',
        currency:currency
    }).format(value)
}


const displayMoviments = (acc,sort= false)=>{


    containerMovements.innerText = ''

    const movs = sort ? acc.movements.slice().sort((a,b)=> a - b) : acc.movements


    movs.forEach((mov,i)=>{

        const date = formatDate(new Date(acc.movementsDates[i]))

        const formatedMov   = formtCur(mov,acc.locale,acc.currency)

        const type = mov  > 0 ? 'deposit' :  'withdrawal'
        
        const html =  `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} deposit</div>
        <div class="movements__date">${date}</div>
        <div class="movements__value">${formatedMov}</div>
      </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html)
    })
}

const calcDisplayBalance = (acc)=>{
    
    acc.balance =  acc.movements.reduce((acc,mov)=> acc + mov, 0)

    labelBalance.innerText = formtCur(acc.balance,acc.locale,acc.currency)

}
const calcDisplaySammary = (acc)=>{

    const income = acc.movements.filter(mov => mov > 0).reduce((acc,mov)=> acc + mov,0)

    
    const expense =  Math.abs(acc.movements.filter(mov => mov < 0).reduce((acc,mov)=> acc + mov,0))

    const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * 1.2) / 100).filter((int,i,arr)=>{
        return int >= 1
    }).reduce((acc,int)=> acc + int,0)


    labelSumIn.innerText = formtCur(income,acc.locale,acc.currency)


    labelSumOut.innerText = formtCur(expense,acc.locale,acc.currency)


    labelSumInterest.innerText = formtCur(interest,acc.locale,acc.currency)
   

} 

const creatUserName = ((acc)=>{

  acc.forEach(acc => {
        
     acc.username = acc.owner.match(/(^\S\S?|\s\S)?/g).map(v=>v.trim()).join('').match(/(^\S|\S$)?/g).join("").toLowerCase()

  });

})


creatUserName(accounts)

let currentAccont,timer;



const startLogOutTimer = ()=>{

    let  time = 300

    const timer = setInterval(function(){


        const min = String(Math.trunc(time / 60)).padStart(0,'0')

        const sec = String(time % 60).padStart(2,'0')


        labelTimer.innerText = `${min}:${sec}`
        

        time--


        if(time === -1){
            clearInterval(timer)


            labelWelcome.innerText = 'Log in to  get Started'

            containerApp.style.opacity = 0

        }

    },1000)

    return timer

}   



const updateUI = (acc)=>{

    calcDisplayBalance(acc)

    calcDisplaySammary(acc)

    displayMoviments(acc)
}


btnLogin.addEventListener('click',(e)=>{

    e.preventDefault()

    currentAccont = accounts.find(acc => acc.username === inputLoginUsername.value)


    if(currentAccont?.pin === Number(inputLoginPin.value)){

        inputLoginUsername.value = inputLoginPin.value = ''

        labelWelcome.innerText = `Welcome Back , ${currentAccont.owner.split(' ')[0]}`

        containerApp.style.opacity = 100

      const now = new Date()

      const opitions = {
        hour:'numeric',
        minute:'numeric',
        month:'numeric',
        day:'numeric',
        year:'numeric',
        weekday:'long'
      }

      //const locale = navigator.language


      //internalizaiton
    const date = new Intl.DateTimeFormat(currentAccont.locale,opitions).format(now)
    
    labelDate.textContent = date


    if(timer) clearInterval(timer)

    timer = startLogOutTimer()
      
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


      clearInterval(timer)

      timer = startLogOutTimer()


      reciveAcc.movementsDates.push(new Date())

      currentAccont.movementsDates.push(new Date())
        
    }
})


btnClose.addEventListener('click',(e)=>{
    e.preventDefault()

    if(inputCloseUsername.value === currentAccont.username && Number(inputClosePin.value) === currentAccont.pin){

        const index = accounts.findIndex(acc => acc.username === currentAccont.username)

        accounts.splice(index, 1)

        inputClosePin.value = inputCloseUsername.value = ''


        labelWelcome.innerText = 'Log in to get started'

        containerApp.style.opacity = 0
    }


})


btnLoan.addEventListener('click',(e)=>{
    e.preventDefault()

    const amount = Number(inputLoanAmount.value) 


    inputLoanAmount.value = ''

    if(amount > 0  && currentAccont.movements.some(mov => mov >= amount * 1)){

        setTimeout(function(){
               currentAccont.movements.push(amount)

                updateUI(currentAccont)

                 clearInterval(timer)
                 timer = startLogOutTimer()

                currentAccont.movementsDates.push(new Date().toISOString())
        },3000)
        
      

        //Reset timer
      
    }          

})



let sorted = false

btnSort.addEventListener('click',(e)=>{
  e.preventDefault()

  displayMoviments(currentAccont,!sorted)

  sorted = !sorted
})

