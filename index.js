const inputBox = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const pendingDiv = document.getElementById('list-div');
const completedDiv = document.getElementById('completed-list-div');
const todoListItem = [{ text: 'new item', completed: false }];

function renderTodoList() {
  let pendingListString = '';
  let completedListString = '';
  let pendingTaskCount = 0;
  let completedTaskCount = 0;
  todoListItem.forEach((item, index) => {
    const htmlString = `
      <div class="list-item-par">
        <div class="list-item" id="list-item-${index}">
          <input type="radio" ${item.completed && 'checked'} />
          <label>${item.text}</label>
        </div>
        <button>Delete</button>
      </div>
    `;
    if(item.completed) completedListString += htmlString, completedTaskCount += 1;
    else pendingListString += htmlString, pendingTaskCount += 1;
  })

  pendingDiv.innerHTML = `
    ${pendingListString}
    <div id="task-count">${pendingTaskCount} tasks pending</div>
  `;
  if(completedListString.length) {
    completedDiv.innerHTML = `
      <div id="completed-div">Completed</div>
      ${completedListString}
      <div id="task-count">${completedTaskCount} task completed</div>
    `;
  }

  const listItems = pendingDiv.querySelectorAll('input');
  const listItemsPar = pendingDiv.querySelectorAll('.list-item-par');
  listItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      todoListItem[index].completed = !todoListItem[index].completed;
      renderTodoList()
    })
  })
  listItemsPar.forEach((item, index) => {
    item.querySelector('button').addEventListener('click', (e) => {
      todoListItem.splice(index, 1);
      renderTodoList();
    })
    item.addEventListener('mouseenter', (e) => {
      item.querySelector('button').style.display = 'block';
    })
    item.addEventListener('mouseleave', (e) => {
      item.querySelector('button').style.display = 'none';
    })
  });
}

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  todoListItem.push({ text: inputBox.value, completed: false });
  inputBox.value = '';
  renderTodoList();
})

renderTodoList()