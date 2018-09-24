function AddItem() 
{
    var item = document.getElementById("item");
    var date = document.getElementById("date");
    var category = document.getElementById("category");
    var list = document.getElementById("todo-list");

    var text = document.createTextNode(item.nodeValue + " " + date.nodeValue + " " + category.nodeValue);
    var li = document.createElement("li");

    li.appendChild(text);
    list.appendChild(li);
}
