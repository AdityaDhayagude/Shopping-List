const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter')


function displayItems()
{
    const itemsFromStoage =getItemsFromStorage();
    itemsFromStoage.forEach((item)=>addItemToDom(item));

    checkUI();
}

function onAddItemSubmit(e)
{
    e.preventDefault();

    const newItem = itemInput.value;
    //Validate Input
    if(newItem==='')
    {
        alert('Please add an item'); 
        return;
    }

    addItemToDom(newItem);

    //Adding item to storage 
    addItemToStorage(newItem);

    //Check UI
    checkUI();

    // CLEAR ITEMS
    itemInput.value='';

}



function addItemToDom(item){
    //Create List Item
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //Add li to ul
    itemList.appendChild(li);
}



function createButton(classes)
{
    const button = document.createElement('button');
    button.className = classes;

    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes)
{
    const icon = document.createElement('i');
    icon.className = classes;
    return icon ;
}

function addItemToStorage(item){

    const itemsFromStoage=getItemsFromStorage();

    //Add new items to local storage
    itemsFromStoage.push(item);

    //Convert to JSON string and set to Local Storage
    localStorage.setItem('items',JSON.stringify(itemsFromStoage));

}

function getItemsFromStorage(){
    let itemsFromStoage;

    //Checking if Local Storage already has items
    if(localStorage.getItem('items')===null)
    {
        itemsFromStoage=[];
    }
    else{
        itemsFromStoage=JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStoage;
}

function removeItem(e)
{
    if(e.target.parentElement.classList.contains('remove-item'))
    {
        if(confirm('Are you Sure you Want to delete the item?'))
        {
            e.target.parentElement.parentElement.remove();
        }
        
    }
    checkUI();
}

function removeAllItems(e)
{
    // Slower method
    // itemList.innerHTML=''

    // FASTER METHOD
    if(confirm('Are u sure u want to clear All Items????'))
    {
        while(itemList.firstChild)
    {
        itemList.removeChild(itemList.firstChild);  
    }
    }
    
    checkUI();
}

function filterItems(e)
{
    const items = itemList.querySelectorAll('li');
    const text =e.target.value.toLowerCase();

    items.forEach((item)=>{
        const itemName = item.firstChild.textContent.toLowerCase();

        if(itemName.indexOf(text)!=-1)
        {
            item.style.display='flex';
        }
        else
        {
            item.style.display='none';
        }
    })
}

function checkUI()
{
    const items = itemList.querySelectorAll('li');
    // console.log(items);
    if(items.length===0)
    {
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else
    {
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block';
    }

}

function init()
{
    //EVENT LISTNERS
itemForm.addEventListener('submit',onAddItemSubmit);
itemList.addEventListener('click',removeItem);
itemClear.addEventListener('click',removeAllItems);
itemFilter.addEventListener('input',filterItems);
document.addEventListener('DOMContentLoaded',displayItems);

checkUI();
}

init();
