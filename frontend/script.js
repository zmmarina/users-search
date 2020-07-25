let globalUsers = [];
let countUsers = 0;
let countMales = 0;
let countFemales = 0;
let sumAges = 0;
let averageAge = 0;

async function start(){
    await promiseUsers();

    hideSpinner();
    render();

    configFilter();
}

function promiseUsers(){
    return new Promise (async (resolve, reject)=> {
        const users = await fetchUsers();

        setTimeout(()=>{
            resolve(users);
        }, 1500);    
    });
}

async function fetchUsers(){
    const response = await fetch("http://localhost:3001/users");
    const json = await response.json();
    globalUsers = json.map (user =>{
        
        return {
            name: user.name,
            picture: user.picture.large,
            age: user.dob.age,
            gender: user.gender
        };
    });     
}

function hideSpinner(){
    const spinner = document.querySelector("#spinner");
    spinner.classList.add('hide');
}

function render(){
    renderUsers();
    renderTitle();  
    renderStatistics();
};

function renderUsers(){
    let usersHTML = '<div>';

    globalUsers.forEach(user=>{
        const { name, picture, age, gender} = user;
 
        const userHTML = `
        <div class='user'>
         <div>
             <img src="${picture}" alt="${name}">
         </div>
         <div>
             ${name.first} ${name.last}, ${age} years
         </div>         
        </div>       
        `;
        usersHTML+= userHTML;
    });
 
    const divUsers = document.querySelector("#users");
     divUsers.innerHTML = usersHTML;   
}

function renderTitle(){
    const countUsers = document.querySelector("#countUsers");
    countUsers.textContent = globalUsers.length;
}

function renderStatistics(){
    const countMales = document.querySelector("#countMales");
    const countFemales = document.querySelector("#countFemales");
    const mappedGenders = globalUsers.map(user=> user.gender);
    const sumAges = document.querySelector("#sumAges");
    const averageAge = document.querySelector("#averageAge");


    let male = mappedGenders.filter(gender => {
        return gender === "male"});
    countMales.textContent = male.length;

    let female = mappedGenders.filter(gender => {
        return gender === "female"});
    countFemales.textContent = female.length;

    const totalAges = globalUsers.reduce((acc,curr)=>{
        return acc + curr.age;
    },0);
    sumAges.textContent = totalAges;

    averageAge.textContent = totalAges/globalUsers.length;          
}

function configFilter(){
    const buttonFilter = document.querySelector("#buttonFilter");
    const inputFilter = document.querySelector("#inputFilter");
}

start();