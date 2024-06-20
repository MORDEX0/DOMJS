let objects = [];


const objectForm = document.getElementById('object-form');
const objectList = document.getElementById('object-list');


function displayObjects() {
    
    objectList.innerHTML = '';

    
    objects.forEach((object, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Название машины:</span>${object.name} 
            <span>Марка:</span>${object.type} 
            <span>Лошадиные силы:</span>${object.horsepower} 
            <span>Цвет:</span>${object.color} 
            <button onclick="deleteObject(${index})">Удалить</button>
            <button onclick="editObject(${index})">Изменить</button>`;
        objectList.appendChild(li);
    });
}


function addObject(name, type, horsepower, color) {
    objects.push({ name, type, horsepower, color });
    displayObjects();
}


function deleteObject(index) {
    objects.splice(index, 1);
    displayObjects();
}


function editObject(index) {
    const newName = prompt('Введите новое название:');
    const newType = prompt('Введите другую марку:');
    const newHorsepower = parseInt(prompt('Введите новое количество лошадиных сил:'));
    const newColor = prompt('Введите новый цвет:');

    if (newName && newType && !isNaN(newHorsepower) && newColor) {
        objects[index].name = newName;
        objects[index].type = newType;
        objects[index].horsepower = newHorsepower;
        objects[index].color = newColor;
        displayObjects();
    } else {
        alert('Что-то пошло не так. Попробуйте еще раз');
    }
}


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
        alert('Введено не корректно. Попробуйте еще раз');
        return;
    }

    addObject(name, type, horsepower, color);

    
    nameInput.value = '';
    typeInput.value = '';
    horsepowerInput.value = '';
    colorInput.value = '';
});