var lastRepoId = 0;
var url = `https://api.github.com/repositories?since=${lastRepoId}`;

document.addEventListener("DOMContentLoaded", function(event) {
    getRepositories();
})

function showRepositories(data) {
    let container = document.getElementById('repoList');
    var row = createRow();                        
    data.forEach(repo => {
        lastRepoId = repo.id;
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
    .then((data) => {
        data = data.filter(repo => repo.id > lastRepoId)
                   .slice(0, 10);
        showRepositories(data);        
        console.log(data);
    })
    .catch(err => console.log(err))
}

