function ToggleCheckbox()
{
    if(this.checked)
    {
        this.parentElement.parentElement.style.backgroundColor = "grey";
    }
    else
    {
        this.parentElement.parentElement.style.backgroundColor = "white";
    }
}
function AddItem() 
{
    var item = document.getElementById("item");
    var date = document.getElementById("date");
    var time = document.getElementById("time");
    var category = document.getElementById("category");
    var table = document.getElementById("todo-list");
    var dateAdded = new Date();
    var tableData = document.createElement("td");
    var deletionCell = document.createElement("td");
    var deleteButton = document.createElement("button");
    var checkbox = document.createElement("input");
    var tableRow = table.insertRow();

    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
        table.deleteRow(event.target.parentElement.parentElement.rowIndex);
    };
    checkbox.type = "checkbox";
    checkbox.onclick = ToggleCheckbox;

    tableData.appendChild(checkbox);
    deletionCell.appendChild(deleteButton);

    tableRow.insertCell(0).innerHTML = item.value;
    tableRow.insertCell(1).innerHTML = category.value;
    tableRow.insertCell(2).innerHTML = dateAdded.getFullYear() + "-" + (dateAdded.getMonth()+1) + "-" + dateAdded.getDate() 
        + " " + dateAdded.getHours() + ":" + (dateAdded.getMinutes() < 10 ? "0" + dateAdded.getMinutes : dateAdded.getMinutes())
        + ":" + (dateAdded.getSeconds() < 10 ? "0" + dateAdded.getSeconds() : dateAdded.getSeconds());
    tableRow.insertCell(3).innerHTML = date.value + " " + time.value;
    tableRow.appendChild(tableData);
    tableRow.appendChild(deletionCell);

    item.value = "";
    time.value = "";
    category.value = "";
}

var addButton = document.getElementById("add-button");
addButton.addEventListener("click", AddItem, false);
