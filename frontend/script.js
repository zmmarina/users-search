let globalUsers = [];
let globalFilteredUsers = [];
let countUsers = 0;
let countMales = 0;
let countFemales = 0;
let sumAges = 0;
let averageAge = 0;

async function start(){
    await fetchUsers();
    hideSpinner();
    render();
    configFilter();
}

async function fetchUsers(){
    const response = await fetch("http://localhost:3001/users");
    const json = await response.json();
    globalUsers = json.map ((user) =>{
        
        return {
            name: `${user.name.first} ${user.name.last}`,
            picture: user.picture.large,
            age: user.dob.age,
            gender: user.gender
        };
    });  
   
    globalUsers.sort((a, b)=>{
        return a.name.localeCompare(b.name);
    });

    globalFilteredUsers = [...globalUsers];
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

    globalFilteredUsers.forEach(user=>{
        const { name, picture, age, gender} = user;
 
        const userHTML = `
        <div class='user'>
         <div>
             <img src="${picture}" alt="${name}">
         </div>
         <div>
             ${name}, ${age} years
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
    countUsers.textContent = globalFilteredUsers.length;
}

function renderStatistics(){
    const countMales = document.querySelector("#countMales");
    const countFemales = document.querySelector("#countFemales");
    const mappedGenders = globalFilteredUsers.map(user=> user.gender);
    const sumAges = document.querySelector("#sumAges");
    const averageAge = document.querySelector("#averageAge");


    let male = mappedGenders.filter(gender => {
        return gender === "male"});
    countMales.textContent = male.length;

    let female = mappedGenders.filter(gender => {
        return gender === "female"});
    countFemales.textContent = female.length;

    const totalAges = globalFilteredUsers.reduce((acc,curr)=>{
        return acc + curr.age;
    },0);
    sumAges.textContent = totalAges;

    averageAge.textContent = totalAges/globalFilteredUsers.length;          
}

function configFilter(){
    const buttonFilter = document.querySelector("#buttonFilter");
    buttonFilter.addEventListener("click", ()=>{
        const inputFilter = document.querySelector("#inputFilter");
        const filterValue = inputFilter.value.toLowerCase().trim();

        globalFilteredUsers = globalUsers.filter((user)=>{
            return user.name.toLowerCase().includes(filterValue)
        });
        
    render();
   
    });
   
}

start();