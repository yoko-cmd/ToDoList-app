// ----------------
// ボタン取得
// ----------------
const button = document.querySelector("#task-plus");
const button2 = document.querySelector("#delete");
const button3 = document.querySelector("#menu");
const button4 = document.querySelector(".star-list");

const tabStar = document.querySelector('.menu-tab1'); // スター付きタブ
const tabAll = document.querySelector('.menu-tab2');  // タスク一覧タブ

button.addEventListener("click", onButtonClick, true);
button2.addEventListener("click", onButton2Click, true);
button3.addEventListener("click", onButton3Click, true);
button4.addEventListener("click", onButton4Click, true);

// ----------------
// 完了メッセージ表示
// ----------------
function showFinishMessage(show) {
    const container = document.querySelector('.container');
    let finish_message = container.querySelector('.finish');
    if (!finish_message) {
        finish_message = document.createElement('span');
        finish_message.className = 'finish';
        finish_message.textContent = 'すべてのタスクが完了しました';
        const textDiv = container.querySelector('.text');
        if (textDiv) {
            textDiv.appendChild(finish_message);
        } else {
            container.appendChild(finish_message);
        }
    }
    finish_message.style.display = show ? 'block' : 'none';
}

// ----------------
// ローカルストレージ用配列
// ----------------
let tasksArray = [];

// ページ読み込み時に保存済みタスクを復元
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTasks.forEach(task => addTaskToDOM(task));
    tasksArray = savedTasks;
});

// ----------------
// タスクをDOMに追加する関数
// ----------------
function addTaskToDOM(task) {
    const container = document.querySelector('.container');
    let taskList = container.querySelector('.task-list');
    if (!taskList) {
        taskList = document.createElement('div');
        taskList.className = 'task-list';
        container.appendChild(taskList);
    }

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    // 〇ボタン
    const circle_button = document.createElement('button');
    circle_button.className = 'circle';
    circle_button.textContent = task.done ? '☑' : '〇';
    circle_button.onclick = function () {
        task.done = !task.done;
        circle_button.textContent = task.done ? '☑' : '〇';
        taskNameSpan.style.textDecoration = task.done ? 'line-through' : 'none';
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    };

    // タスク名
    const taskNameSpan = document.createElement('span');
    taskNameSpan.className = 'task-name';
    taskNameSpan.textContent = task.name;
    taskNameSpan.style.textDecoration = task.done ? 'line-through' : 'none';

    // ☆ボタン
    const star_button = document.createElement('button');
    star_button.className = 'star';
    star_button.textContent = task.starred ? '★' : '☆';
    star_button.style.color = task.starred ? '#ffd700' : '';
    star_button.onclick = function () {
        task.starred = !task.starred;
        star_button.textContent = task.starred ? '★' : '☆';
        star_button.style.color = task.starred ? '#ffd700' : '';
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    };

    taskItem.appendChild(circle_button);
    taskItem.appendChild(taskNameSpan);
    taskItem.appendChild(star_button);
    taskList.appendChild(taskItem);

    taskList.style.display = 'block';

    const firstMsg = container.querySelector('.first');
    if (firstMsg) firstMsg.style.display = 'none';

    showFinishMessage(false);
}

// ----------------
// タスク追加（ボタン押下）
// ----------------
function onButtonClick() {
    const taskName = window.prompt("タスク内容を入力してください");
    if (!taskName || taskName.trim() === "") return;

    const task = { name: taskName, done: false, starred: false };
    tasksArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));

    addTaskToDOM(task);
}

// ----------------
// チェック済削除
// ----------------
function onButton2Click() {
    const container = document.querySelector('.container');
    const taskList = container.querySelector('.task-list');
    if (!taskList) return;

    const tasks = taskList.querySelectorAll('.task-item');
    tasks.forEach((taskItem, index) => {
        const circle = taskItem.querySelector('.circle');
        if (circle && circle.textContent === '☑') {
            taskItem.remove();
            tasksArray.splice(index, 1); // 配列からも削除
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasksArray));

    if (taskList && taskList.children.length === 0) {
        showFinishMessage(true);
    } else {
        showFinishMessage(false);
    }
}

// ----------------
// ≡ メニュー開閉
// ----------------
function onButton3Click() {
    const container = document.querySelector('.container');
    container.classList.toggle('menu-open');
}

// ----------------
// タブ切り替え
// ----------------
tabAll.addEventListener('click', () => {
    document.querySelectorAll('.task-item').forEach(task => {
        task.style.display = 'flex';
    });
    tabAll.classList.add('active-tab');
    tabStar.classList.remove('active-tab');
});

tabStar.addEventListener('click', () => {
    document.querySelectorAll('.task-item').forEach(task => {
        const star = task.querySelector('.star');
        task.style.display = (star && star.textContent === '★') ? 'flex' : 'none';
    });
    tabStar.classList.add('active-tab');
    tabAll.classList.remove('active-tab');
});

// スター付きボタン
function onButton4Click() {
    document.querySelectorAll('.task-item').forEach(task => {
        const star = task.querySelector('.star');
        task.style.display = (star && star.textContent === '★') ? 'flex' : 'none';
    });
    tabStar.classList.add('active-tab');
    tabAll.classList.remove('active-tab');
}
