let globalUsers = [];

async function start(){
    await fetchUsers();

    hideSpinner();
}

async function fetchUsers(){
    const response = await fetch("http://localhost:3001/users");
    const json = await response.json();

    globalUsers = json.map(({name, picture, login, age, gender}) =>{
        return{
            userId: login.uuid,
            userName: name,
            userAge: age,
            userGender: gender,
            userPicture: picture.large
        }
    })
}

function hideSpinner(){
    const spinner = document.querySelector("#spinner");
    spinner.classList.add('hide');
}

function render(){}

start();