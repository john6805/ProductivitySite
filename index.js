var reverseIndex = -1;
var dataListColors = ["#74a0e8", "#74e8a2", "#a0e874", "#e8b574"];
var deleteRowIndex;
function ToggleCheckbox()
{
    if(this.checked)
    {
        this.parentElement.parentElement.cells[0].style.opacity = "0.3";
        this.parentElement.parentElement.cells[1].style.opacity = "0.3";
        this.parentElement.parentElement.cells[2].style.opacity = "0.3";
        this.parentElement.parentElement.cells[3].style.opacity = "0.3";
    }
    else
    {
        this.parentElement.parentElement.cells[0].style.opacity = "1";
        this.parentElement.parentElement.cells[1].style.opacity = "1";
        this.parentElement.parentElement.cells[2].style.opacity = "1";
        this.parentElement.parentElement.cells[3].style.opacity = "1";
    }
}
function AddItem() 
{
    var item = document.getElementById("item");
    var date = document.getElementById("date");
    var time = document.getElementById("time");
    var color = document.getElementById("color");
    var category = document.getElementById("category");
    var dataList = document.getElementById("categories");
    var table = document.getElementById("todo-list");
    var dateAdded = new Date();
    var tableData = document.createElement("td");
    var deletionCell = document.createElement("td");
    var deleteButton = document.createElement("button");
    var checkbox = document.createElement("input");
    var tableRow = table.insertRow();
    var colorSet = false;

    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
        deleteRowIndex = event.target.parentElement.parentElement.rowIndex;
        OpenModal();
    };

    checkbox.type = "checkbox";
    checkbox.onclick = ToggleCheckbox;

    tableData.appendChild(checkbox);
    deletionCell.appendChild(deleteButton);

    tableRow.insertCell(0).innerHTML = item.value;
    for(var i = 0; i < dataList.options.length; i++)
    {
        if(dataList.options[i].value == category.value)
        {
            tableRow.cells[0].style.backgroundColor = dataListColors[i];
            colorSet = true;
            break;
        }
    }
    if(!colorSet)
    {
        tableRow.cells[0].style.backgroundColor = color.value;
        dataListColors.push(color.value);
        var newOption = document.createElement("option");
        newOption.value = category.value;
        newOption.textContent = category.value;
        dataList.appendChild(newOption);
    }
    tableRow.insertCell(1).innerHTML = category.value;
    tableRow.insertCell(2).innerHTML = dateAdded.getFullYear() + "-" + (dateAdded.getMonth()+1) + "-" + dateAdded.getDate() 
        + " " + dateAdded.getHours() + ":" + (dateAdded.getMinutes() < 10 ? "0" + dateAdded.getMinutes() : dateAdded.getMinutes())
        + ":" + (dateAdded.getSeconds() < 10 ? "0" + dateAdded.getSeconds() : dateAdded.getSeconds());
    tableRow.insertCell(3).innerHTML = date.value + " " + time.value;
    tableRow.appendChild(tableData);
    tableRow.appendChild(deletionCell);

    item.value = "";
    time.value = "";
    category.value = "";
}

function SortTable(index)
{
    var table = document.getElementById("todo-list");
    var rows = table.rows;
    var values = [];
    var htmlValues = [];
    if(rows.length <= 1)
    {
        return;
    }

    for(var i = 1; i < rows.length; i++)
    {
        if(index != 4)
        {
            values[i - 1] = {value: rows[i].cells[index].innerHTML, row: i, checked: rows[i].cells[4].getElementsByTagName("input")[0].checked};
        }
        else if(index == 4)
        {
            values[i - 1] = {value: (rows[i].cells[index].getElementsByTagName("input")[0].checked) ? 1 : -1, row: i};
        }
    }
    values.sort(function(a, b) {
        if(a.value < b.value)
        {
            return -1;
        }
        if(a.value > b.value)
        {
            return 1;
        }
        return 0;
    });
    console.log(values);
    if(index == reverseIndex)
    {
        values.reverse();
        reverseIndex = -1;
    }
    else
    {
        reverseIndex = index;
    }

    for(var i = 0; i < values.length; i++)
    {
        htmlValues[i] = rows[values[i].row].innerHTML;
    }
    for(var i = 0; i < values.length; i++)
    {
        table.deleteRow(-1);
    }
    for(var i = 0; i < values.length; i++)
    {
        table.insertRow(-1).innerHTML = htmlValues[i];
        if(index == 4)
        {
            table.rows[i + 1].cells[index].getElementsByTagName("input")[0].onclick = ToggleCheckbox;
            if(values[i].value == 1)
            {
                table.rows[i + 1].cells[index].getElementsByTagName("input")[0].click();
            }
        }
        else
        {
            table.rows[i + 1].cells[4].getElementsByTagName("input")[0].onclick = ToggleCheckbox;
            if(values[i].checked)
            {
                table.rows[i + 1].cells[4].getElementsByTagName("input")[0].click();
            }
        }
    }
}

function OpenModal()
{
    var modal = document.getElementById("warning-modal");
    modal.style.display = "block";
}

function CloseModal()
{
    var modal = document.getElementById("warning-modal");
    modal.style.display = "none";
    deleteRowIndex = -1;
}

function DeleteRow()
{
    var table = document.getElementById("todo-list");
    table.deleteRow(deleteRowIndex);
}

var addButton = document.getElementById("add-button");
addButton.addEventListener("click", AddItem, false);
