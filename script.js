let taskList = [];

const handleOnSubmit = (e) => {
  // FormData() API is used to handle all data from the form. Check MozillaWebAPI

  const newForm = new FormData(e);

  const task = newForm.get("task");

  const hr = newForm.get("hr");

  const obj = {
    task,
    hr,
    id: randomIDGenerator(),
  };

  taskList.push(obj);
  displayEntryList();
};

const displayEntryList = () => {
  let str = "";
  const entryElm = document.getElementById("entryList");

  taskList.map((item, i) => {
    str += `<tr>
                  <th scope="row">${i + 1}</th>
                  <td>${item.task}</td>
                  <td>${item.hr} hr</td>
                  <td class="text-end">
                    <button class="btn btn-warning">
                      <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <button class="btn btn-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>`;
  });

  console.log(taskList);

  entryElm.innerHTML = str;
};

// ======== Creating a randomID for the data ========

const randomIDGenerator = (length = 6) => {
  const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

  let id = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);

    id += str[randomIndex];
  }
  return id;
};
