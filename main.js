var url = `https://api.github.com/repositories`;

document.addEventListener("DOMContentLoaded", function(event) {
    getRepositories();
})

function getRepositories() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let ul = document.getElementById('repoList');
        data.forEach(repo => {
            var row = document.createElement("div");
            for (let i = 0; i < 4; i++) {
                var col = document.createElement("div");
                var avatar = document.createElement("img");
                var repo_full_name = document.createElement("p");
                var repo_owner_login = document.createElement("p");
                avatar.setAttribute('src', `${repo.owner.avatar_url}`);
                repo_full_name.innerHTML = repo.full_name;
                repo_owner_login.innerHTML = `from ${repo.owner.login}`;
                row.classList.add("row");
                col.classList.add("col-3");
                col.classList.add("repository");
                col.appendChild(avatar);
                col.appendChild(repo_full_name);
                col.appendChild(repo_owner_login);
                row.appendChild(col);                    
            }            
            ul.appendChild(row);
        });
        console.log(data);
    }) 
    .catch(err => console.log(err))
}

