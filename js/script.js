function createTable(myRows, myColumn) {
  let table = document.getElementById("main__container");
  let str = "";
  let items = ["♠", "♢", "♡", "♣"];
  let item;
  for (let i = 1; i <= myRows; i++) {
    for (let j = 1; j <= myColumn; j++) {
      item = items[Math.floor(Math.random() * items.length)]; // рандомно выбираю элемент из массива items
      let maClass = {
        "♠": "spades",
        "♢": "diamonds",
        "♡": "hearts",
        "♣": "clubs",
      };
      str += `<div name="tableItem" class="${maClass[item]}">${item}</div>`; // делаю квадратик с рандомно выбранным элементом
    }
  }

  table.innerHTML = str; // вставляю квадратик в документ

  playGame();
}
createTable(7, 6); // создаю таблицу

function playGame() {
  let tableItems = document.getElementsByName("tableItem");
  tableItems.forEach((element, index) => {
    let botItem = {
      myIndex: index + 6,
      myNextIndex: +6,
      ifIndex: index < 37,
    };
    let topItem = {
      myIndex: index - 6,
      myNextIndex: -6,
      ifIndex: index > 5,
    };
    let rightItem = {
      myIndex: index + 1,
      myNextIndex: +1,
      ifIndex: index < 41,
    };
    let leftItem = {
      myIndex: index - 1,
      myNextIndex: -1,
      nextIndex: index > 0,
    };

    element.onmouseover = () => {
      // крашу кубики при наведении
      mouseOver(
        element,
        index,
        tableItems,
        botItem.myIndex,
        botItem.ifIndex,
        botItem.myNextIndex
      );
      mouseOver(
        element,
        index,
        tableItems,
        topItem.myIndex,
        topItem.ifIndex,
        topItem.myNextIndex
      );
      mouseOver(
        element,
        index,
        tableItems,
        rightItem.myIndex,
        rightItem.ifIndex,
        rightItem.myNextIndex
      );
      mouseOver(
        element,
        index,
        tableItems,
        leftItem.myIndex,
        leftItem.ifIndex,
        leftItem.myNextIndex
      );
    };
    element.onmouseout = () => {
      // убираю цвет

      mouseOut(
        element,
        index,
        tableItems,
        botItem.myIndex,
        botItem.ifIndex,
        botItem.myNextIndex
      );
      mouseOut(
        element,
        index,
        tableItems,
        topItem.myIndex,
        topItem.ifIndex,
        topItem.myNextIndex
      );
      mouseOut(
        element,
        index,
        tableItems,
        rightItem.myIndex,
        rightItem.ifIndex,
        rightItem.myNextIndex
      );
      mouseOut(
        element,
        index,
        tableItems,
        leftItem.myIndex,
        leftItem.ifIndex,
        leftItem.myNextIndex
      );
    };
    element.onclick = () => {
      // удаляю выбранные элементы
      click(
        element,
        index,
        tableItems,
        botItem.myIndex,
        botItem.ifIndex,
        botItem.myNextIndex
      );
      click(
        element,
        index,
        tableItems,
        topItem.myIndex,
        topItem.ifIndex,
        topItem.myNextIndex
      );
      click(
        element,
        index,
        tableItems,
        rightItem.myIndex,
        rightItem.ifIndex,
        rightItem.myNextIndex
      );
      click(
        element,
        index,
        tableItems,
        leftItem.myIndex,
        leftItem.ifIndex,
        leftItem.myNextIndex
      );
    };
  });
}
function mouseOver(element, index, tableItems, myIndex, ifIndex, nextIndex) {
  element.style.backgroundColor = "#c6c6c6";
  if (
    ifIndex &&
    myIndex < 42 &&
    tableItems[myIndex].className === element.className
  ) {
    tableItems[myIndex].style.backgroundColor = "#c6c6c6";
    mouseOver(
      tableItems[myIndex],
      myIndex,
      tableItems,
      myIndex + nextIndex,
      ifIndex,
      nextIndex
    );
  }
}

function mouseOut(element, index, tableItems, myIndex, ifIndex, nextIndex) {
  element.style.backgroundColor = null;
  if (
    ifIndex &&
    myIndex < 42 &&
    tableItems[myIndex].className === element.className
  ) {
    tableItems[myIndex].style.backgroundColor = null;
    mouseOut(
      tableItems[myIndex],
      myIndex,
      tableItems,
      myIndex + nextIndex,
      ifIndex,
      nextIndex
    );
  }
}

function click(element, index, tableItems, myIndex, ifIndex, nextIndex) {
  if (
    ifIndex &&
    myIndex < 42 &&
    tableItems[myIndex].className === element.className
  ) {
    element.innerText = "";
    tableItems[myIndex].innerText = "";
    click(
      tableItems[myIndex],
      myIndex,
      tableItems,
      myIndex + nextIndex,
      ifIndex,
      nextIndex
    );
  }
}
