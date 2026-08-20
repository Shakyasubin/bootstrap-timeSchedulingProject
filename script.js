let taskList = [];

const savedHrsElm = document.getElementById("savedHrs");

const hoursPerWeek = 24 * 7;

const handleOnSubmit = (e) => {
  // FormData() API is used to handle all data from the form. Check MozillaWebAPI

  const newForm = new FormData(e);

  const task = newForm.get("task");

  // Downcasting string to number

  const hr = +newForm.get("hr");

  const obj = {
    task,
    hr,
    id: randomIDGenerator(),
    type: "entry",
  };

  // Checking if the hours submitted exceeds hours per week

  const existingTotalHrs = taskTotal();

  if (existingTotalHrs + hr > hoursPerWeek) {
    return alert("Your hours per week has exceeded!");
  }

  taskList.push(obj);
  displayEntryList();
};

const displayEntryList = () => {
  let str = "";
  const entryElm = document.getElementById("entryList");

  const entryLst = taskList.filter((item) => item.type === "entry");

  entryLst.map((item, i) => {
    str += `<tr>
                  <th scope="row">${i + 1}</th>
                  <td>${item.task}</td>
                  <td>${item.hr} hr</td>
                  <td class="text-end">
                  <button onclick = "handleOnDelete('${item.id}')" class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                    <button onclick ="switchTask('${item.id}', 'bad')" class="btn btn-warning">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });

  console.log(taskList);

  entryList.innerHTML = str;
  taskTotal();
};

const displayBadList = () => {
  let str = "";
  const badElm = document.getElementById("badList");

  const badLst = taskList.filter((item) => item.type === "bad");

  badLst.map((item, i) => {
    str += `<tr>
                  <th scope="row">${i + 1}</th>
                  <td>${item.task}</td>
                  <td>${item.hr} hr</td>
                  <td class="text-end">
                  <button onclick ="switchTask('${item.id}', 'entry')" class="btn btn-warning">
                  <i class="fa-solid fa-arrow-left"></i>
                  </button>
                  <button onclick = "handleOnDelete('${item.id}')" class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  </td>
                </tr>`;
  });

  console.log(taskList);

  badElm.innerHTML = str;
};

// ======== Generating a randomID for the data ========

const randomIDGenerator = (length = 6) => {
  const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

  let id = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);

    id += str[randomIndex];
  }
  return id;
};

// ======== Using the randomId for removing items from the lists ========

const handleOnDelete = (id) => {
  if (window.confirm("Are you sure, you want to delete this?")) {
    taskList = taskList.filter((item) => item.id !== id);
    displayEntryList();
    displayBadList();
  }
};

// ======== Switching the items between the lists ========

const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });

  displayEntryList();
  displayBadList();
};

// ======== Calculating Total Hrs ========

const taskTotal = () => {
  const totalHrs = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  document.getElementById("ttlHrs").innerText = totalHrs;

  return totalHrs;
};
