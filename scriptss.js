class Entity {
    constructor(name, type, horsepower, color) {
        this.name = name;
        this.type = type;
        this.horsepower = horsepower;
        this.color = color;
    }
}

let objects = [];
let editIndex = -1;

// Получаем элементы DOM
const objectForm = document.getElementById('object-form');
const objectList = document.getElementById('object-list');
const editForm = document.getElementById('edit-form');
const editModal = new bootstrap.Modal(document.getElementById('editModal'), {});

// Функция для отображения объектов
function displayObjects() {
    // Очищаем текущий список
    objectList.innerHTML = '';

    // Перебираем все объекты и добавляем их в список
    objects.forEach((object, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>
                <strong>Название машины:</strong> ${object.name} 
                <strong>Марка:</strong> ${object.type} 
                <strong>Лошадиные силы:</strong> ${object.horsepower} 
                <strong>Цвет:</strong> ${object.color}
            </span>
            <span>
                <button  class="btn btn-warning btn-sm" onclick="editObject(${index})">Изменить</button>
                <button class="btn btn-danger btn-sm mr-1" onclick="deleteObject(${index})">Удалить</button>
            </span>`;
        objectList.appendChild(li);
    });
}

// Функция для добавления нового объекта
function addObject(name, type, horsepower, color) {
    objects.push(new Entity(name, type, horsepower, color));
    displayObjects();
}

// Функция для удаления объекта
function deleteObject(index) {
    objects.splice(index, 1);
    displayObjects();
}

// Функция для редактирования объекта
function editObject(index) {
    editIndex = index;
    const object = objects[index];
    document.getElementById('edit-name').value = object.name;
    document.getElementById('edit-type').value = object.type;
    document.getElementById('edit-horsepower').value = object.horsepower;
    document.getElementById('edit-color').value = object.color;
    editModal.show();
}

// Обработчик отправки формы добавления
objectForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const typeInput = document.getElementById('type');
    const horsepowerInput = document.getElementById('horsepower');
    const colorInput = document.getElementById('color');

    const name = nameInput.value.trim();
    const type = typeInput.value.trim();
    const horsepower = parseInt(horsepowerInput.value);
    const color = colorInput.value.trim();

    if (name === '' || type === '' || isNaN(horsepower) || color === '') {
        alert('Пожалуйста заполните все поля.');
        return;
    }

    addObject(name, type, horsepower, color);

    // Очищаем поля формы после добавления
    nameInput.value = '';
    typeInput.value = '';
    horsepowerInput.value = '';
    colorInput.value = '';
});

// Обработчик отправки формы редактирования
editForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('edit-name');
    const typeInput = document.getElementById('edit-type');
    const horsepowerInput = document.getElementById('edit-horsepower');
    const colorInput = document.getElementById('edit-color');

    const name = nameInput.value.trim();
    const type = typeInput.value.trim();
    const horsepower = parseInt(horsepowerInput.value);
    const color = colorInput.value.trim();

    if (name === '' || type === '' || isNaN(horsepower) || color === '') {
        alert('Пожалуйста заполните все поля.');
        return;
    }

    objects[editIndex] = new Entity(name, type, horsepower, color);
    displayObjects();
    editModal.hide();
});
