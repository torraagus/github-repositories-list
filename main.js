var itemsPerPage = 10;
var currentPage = 1;
var lastIdSeen_array = [0];
var url = `https://api.github.com/repositories`;

document.addEventListener("DOMContentLoaded", function(event) {    
    let data = getRepositories(0);
    pushLastId(data);    
})

function showRepositories(data) {
    let container = document.getElementById('repoList');
    cleanElement(container);
    var row = createRow();         
    data.forEach(repo => {
        if (row.childElementCount == 1) {
            container.appendChild(row);
            row = createRow();                      
        } 
        var col = createCol(repo);                
        row.appendChild(col);                    
    });
    showNextBtn();    
}

function showNextBtn() {
    let nextBtn = document.getElementById("nextBtn");
    nextBtn.style.display = "inline";
}

function cleanElement(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

function getRepositories(repoId) {
    return fetch(url)
    .then(response => response.json())
    .then((data) => {
        data = data.filter(repo => repo.id > repoId)
                   .slice(0, itemsPerPage+1);
        return data;
    })
    .catch(err => console.log(err))
}

function pushLastId(data) {
    shouldDisablePreviousBtn();
    data.then((data) => {
        lastIdSeen_array.push(data[itemsPerPage-1].id);
        showRepositories(data)
    })
}

function popLastId(data) {
    shouldDisablePreviousBtn();
    data.then((data) => {
        lastIdSeen_array.pop();
        showRepositories(data)
    })
}

function shouldDisablePreviousBtn() {
    let prevBtn = document.getElementById("previousBtn");
    if (lastIdSeen_array.length < 2) {
        prevBtn.style.display = "none"
    } else {
        prevBtn.style.display = "inline"
    }
}

function getNext10() {
    currentPage++;
    url = `https://api.github.com/repositories?since=${lastIdSeen_array[currentPage-1]}`;
    let data = this.getRepositories(lastIdSeen_array[currentPage-1]);
    pushLastId(data);
    console.log(lastIdSeen_array);
    console.log(currentPage);
}

function getPrevious10() {
    currentPage--;
    url = `https://api.github.com/repositories?since=${lastIdSeen_array[currentPage-1]}`;
    let data = this.getRepositories(lastIdSeen_array[currentPage-1]);
    popLastId(data);    
    console.log(lastIdSeen_array);
    console.log(currentPage);
}