var url = `https://api.github.com/repositories`;

document.addEventListener("DOMContentLoaded", function(event) {
    getRepositories();
})

function createRow() {
    let row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("justify-content-center");
    return row;
}

function createCol(repo) {
    let classes_arr = ["col-xl-5", "col-lg-6", "col-md-8", "col-sm-12", "col-xs-12", "repository"];
    let col = document.createElement("div");
    let avatar = document.createElement("img");
    let repo_full_name = document.createElement("span");
    let repo_owner_login = document.createElement("span");
    let repo_id = document.createElement("span");
    avatar.setAttribute('src', `${repo.owner.avatar_url}`);
    repo_full_name.innerHTML = repo.full_name;
    repo_owner_login.innerHTML = ` from ${repo.owner.login}`;    
    repo_id.innerHTML = `#${formatId(repo.id)}`;            
    let childs_arr = [repo_id, avatar, repo_full_name, repo_owner_login];
    appendChildsToElement(col, childs_arr);
    addClassesToElement(col, classes_arr)
    return col;
}

function appendChildsToElement(element, childs) {
    childs.forEach(c => {
        element.appendChild(c);
    });
}

function addClassesToElement(element, clasess) {
    clasess.forEach(c => {
        element.classList.add(c);
    });
}

function formatId(number) {
    let formatted_number = Number(number);
    return formatted_number < 10 ? `0${formatted_number}` : String(formatted_number);
}

function showRepositories(data) {
    let container = document.getElementById('repoList');
    var row = createRow();                        
    data.forEach(repo => {
        if (row.childElementCount == 1) {
            container.appendChild(row);
            row = createRow();                      
        } 
        var col = createCol(repo);                
        row.appendChild(col);                    
    });
}

function getRepositories() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        showRepositories(data);        
        console.log(data);
    }) 
    .catch(err => console.log(err))
}

