let globalUsers = [];
let globalFilteredUsers = [];

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
    activateInput();
    clearInput();
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

    if (globalFilteredUsers.length >= 1){
        countUsers.textContent = `${globalFilteredUsers.length} users found`;
    } else{
        countUsers.textContent = "No user found!"
    }    
}

function renderStatistics(){
    const countMales = document.querySelector("#countMales");
    const countFemales = document.querySelector("#countFemales");
    const mappedGenders = globalFilteredUsers.map(user=> user.gender);
    const sumAges = document.querySelector("#sumAges");
    const averageAge = document.querySelector("#averageAge");
    const noData = document.querySelector("#noData");

    if (globalFilteredUsers.length >= 1){
        let male = mappedGenders.filter(gender => {
            return gender === "male"});
        countMales.textContent = `Male: ${male.length}`;
    
        let female = mappedGenders.filter(gender => {
            return gender === "female"});
        countFemales.textContent = `Female: ${female.length}`;
    
        const totalAges = globalFilteredUsers.reduce((acc,curr)=>{
            return acc + curr.age;
        },0);
        sumAges.textContent = `Sum of ages: ${totalAges}`;

        const avAge = (totalAges/globalFilteredUsers.length).toFixed(2);
    
        averageAge.textContent = `Average age: ${avAge}`;

    } else {
       noData.textContent = "No data to show";
       countMales.classList.add('hide');
       countFemales.classList.add('hide');
       sumAges.classList.add('hide');
       averageAge.classList.add('hide');
    }    
        
  
}

function configFilter(){
    const buttonFilter = document.querySelector("#buttonFilter");
    const inputFilter = document.querySelector("#inputFilter");

    inputFilter.addEventListener("keyup", handleKeyUp);
    buttonFilter.addEventListener("click", handleButton);  

}

function handleButton(){
    const inputFilter = document.querySelector("#inputFilter");
    const filterValue = inputFilter.value.toLowerCase().trim();

    globalFilteredUsers = globalUsers.filter((user)=>{
        return user.name.toLowerCase().includes(filterValue)
    });
        
    render(); 
    clearInput();
}

function handleKeyUp(event){
    const {key} = event;

    if (key !== "Enter"){
        return;
    }

    handleButton();
} 

function activateInput(){
    inputFilter.focus();
}

function clearInput(){
    inputFilter.value = "";
    inputFilter.focus();
}


start();