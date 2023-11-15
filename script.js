const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = document.querySelector('button');
let isEditMode = false;


function displayItems()
{
    const itemsFromStorage =getItemsFromStorage();
    itemsFromStorage.forEach((item)=>addItemToDom(item));

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

if(isEditMode)
{
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode=false;
}else
{
    if(checkIfItemsExist())
    {
        alert('That Items Already Exists');
        return;
    }
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

    const itemsFromStorage=getItemsFromStorage();

    //Add new items to local storage
    itemsFromStorage.push(item);

    //Convert to JSON string and set to Local Storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));

}

function getItemsFromStorage(){
    let itemsFromStorage;

    //Checking if Local Storage already has items
    if(localStorage.getItem('items')===null)
    {
        itemsFromStorage=[];
    }
    else{
        itemsFromStorage=JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickItem(e)
{
    if(e.target.parentElement.classList.contains('remove-item'))
    {
        removeItem(e.target.parentElement.parentElement);
    }
    else{
        setItemToEdit(e.target);
    }    
}

function checkIfItemsExist()
{
    const itemsFromStorage=getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item)
{
    isEditMode=true;

    itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML='<i class="fa-solid fa-pen"></i> Upadte Item';
    formBtn.style.backgroundColor="#228B22"
    itemInput.value=item.textContent;
}

function removeItem(item)
{
    if(confirm('Are u sure ?'))
    {
        //Remove Item form DOM
        item.remove();

        //Remove Item from Storage
        removeItemsFromStorage(item.textContent);

        checkUI();
    }
    // if(e.target.parentElement.classList.contains('remove-item'))
    // {
    //     if(confirm('Are you Sure you Want to delete the item?'))
    //     {
    //         e.target.parentElement.parentElement.remove();
    //     }
        
    // }
    // checkUI();
}

function removeItemsFromStorage(item)
{
    let itemsFromStorage=getItemsFromStorage();

    //Filter Items from Storage
    itemsFromStorage = itemsFromStorage.filter((i)=> i!==item);

    //Reset the Items
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
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

    //Clear From Local Storage 
    localStorage.removeItem('items')
    
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
    itemInput.value='';
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

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item';
    formBtn.style.background='#333';

    isEditMode = false;

}

function init()
{
    //EVENT LISTNERS
itemForm.addEventListener('submit',onAddItemSubmit);
itemList.addEventListener('click',onClickItem);
itemClear.addEventListener('click',removeAllItems);
itemFilter.addEventListener('input',filterItems);
document.addEventListener('DOMContentLoaded',displayItems);

checkUI();
}

init();
