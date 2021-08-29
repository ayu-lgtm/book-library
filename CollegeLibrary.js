console.log('hi ayush welcome here.')

//constructor
function Book(name, author, type,link) {
    this.name = name;
    this.author = author;
    this.type = type;
    this.link = link;
}

//Display constructor

function Display() {}
let count = localStorage.length + 1;
console.log(count)
//add method to diplay prototype
Display.prototype.add = function (book) {
    console.log('adding');
    let tablebody = document.getElementById('tablebody');

    let uistring = `<tr>
                        <td>${count}</td>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                        <td><a href='${book.link}' class="btn btn-secondary btn-sm">Go to download</a></td>
                    </tr>`;
    //console.log(uistring)
    localStorage.setItem(count, uistring);
    count += 1;
    Window.reset()
}

//implement the clear function
Display.prototype.clear = function () {
    let libraryform = document.getElementById('libraryform');
    libraryform.reset();
}

//implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2 || book.type.length < 2 || book.link<2) {
        return false;
    } else {
        return true;
    }
}
//eroor show function

Display.prototype.show = function (type, displaymassege) {
    let massege = document.getElementById('massege');
    massege.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong style="color:red">${type} ! </strong>${displaymassege}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`

    setTimeout(function () {
        massege.innerHTML = ''
    }, 5000);
}

//add submit event listener
let libraryform = document.getElementById('libraryform');
libraryform.addEventListener('submit', libraryformsubmit);

function libraryformsubmit(e) {
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('Author').value;
    let link = document.getElementById('link').value;


    let type;
    let fiction = document.getElementById('Fiction');
    let programming = document.getElementById('Programming');
    let cooking = document.getElementById('Cooking');

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    console.log(type)
    let book = new Book(name, author, type,link);
    console.log(book);

    let display = new Display();
    /*
    1   vkm jvdbsjdv bdjsd
    2.
    3
    4.*/ //problem
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('Success', ' Your book has been successfully added.');
    } else {
        display.show('Eroor', ' Sorry you can not add this book.')
    }


    let serch = document.getElementById('search');



    serch.addEventListener('input', function (e) {
        let inputval = serch.value.toLowerCase();
        let table = document.getElementById('tablebody').children;

        Array.from(table).forEach(function (e) {
            let txt = e.innerHTML;
            if (txt.includes(inputval)) {
                e.style.display = '';
            } else {
                e.style.display = 'none';
            }
        })

    })
    e.preventDefault();
}
//
let len = localStorage.length;
for (let i = 1; i <= len; i++) {
    tablebody.innerHTML += localStorage.getItem(i);
    tablebody.style.color='lightgray';
}
