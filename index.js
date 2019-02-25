'use strict';
/* global cuid */


const STORE = {
  
  items: [
    {id: cuid(), name: 'apples', checked: false},
    {id: cuid(), name: 'oranges', checked: false},
    {id: cuid(), name: 'milk', checked: true},
    {id: cuid(), name: 'bread', checked: false}
  ],
  hideCompleted: false,
};


function renderShoppingList(arr) {

  // this function will be responsible for rendering the shopping list in
  // the DOM

  let filteredItems = arr;

  if (STORE.hideCompleted){
    filteredItems = filteredItems.filter((item) => !item.checked);
  }

  $('.js-shopping-list').html(generateShoppingItemString(filteredItems));
} 



function generateShoppingItemString(shoppingList){


  const items = shoppingList.map((item) => generateItemElement(item));


  return items.join('');
}


function generateItemElement(item){
  return `
    <li class="js-item-index-element" data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <form id="js-rename-form" class="js-rename">
            <label for="shopping-list-rename"></label>
            <input type="text" name="shopping-list-rename" class="shopping-list-rename" placeholder="...">
            <button type="submit" class="js-rename-button">Rename</button>
        </form>
      </div>
    </li>`
  ;
}


function toggleHideFilter(){
  STORE.hideCompleted = !STORE.hideCompleted;
}


function handleToggleHideFilter(){
  $('.js-hide-completed-toggle').click(() => {
    console.log('click');
    toggleHideFilter();
    renderShoppingList(STORE.items);
  });
}


function addItemToShoppingList(itemName){
  console.log(`adding ${itemName} to shopping list`);
  STORE.items.push({id: cuid(), name: itemName, checked: false});
}


function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item


  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');


    const newItemName = $('.js-shopping-list-entry').val();
    console.log(newItemName);

    $('.js-shopping-list-entry').val('');

    addItemToShoppingList(newItemName);
    renderShoppingList(STORE.items);
  });
}


function handleNewItemSearch(){

  $('#js-search-form').submit(function(event){
    event.preventDefault();

    const searchItem = $('.js-shopping-list-search').val();

    if(searchForItem(searchItem).length > 0){
      const resultObj = searchForItem(searchItem);
      console.log(resultObj);

      renderShoppingList(resultObj);
    } 

  });
  
}


function searchForItem(item){
  const result = STORE.items.filter((val) => val.name === item);
  return result;
}

function getItemIdFromElement(item){
  return $(item).closest('li').data('item-id');
}


function getIndexOfSelectedItem(item){
  return STORE.items.findIndex((storeVal) => storeVal.id === item);
}


function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.

  $('.js-shopping-list').on('click', '.js-item-toggle', function(event) {
    console.log('`handleItemCheckClicked` ran');
    const itemId = getItemIdFromElement(this);
    console.log(itemId);
    
    const itemIndex = getIndexOfSelectedItem(itemId);
    console.log(itemIndex);

    STORE.items[itemIndex].checked = ! STORE.items[itemIndex].checked;
    renderShoppingList(STORE.items);
    
  });
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item

  $('.js-shopping-list').on('click', '.js-item-delete', function(event){
    console.log('`handleDeleteItemClicked` ran');
    const itemId = getItemIdFromElement(this);

    const itemIndex = getIndexOfSelectedItem(itemId);

    STORE.items.splice(itemIndex, 1);
    renderShoppingList(STORE.items);
  });
}


function handleRenameItem(){
  $('.js-rename').submit(function(event){
    event.preventDefault();

    const newName = $('.shopping-list-rename').val();
    const selectedItem = getItemIdFromElement(this);

    const itemIndex = getIndexOfSelectedItem(selectedItem);

    STORE.items[itemIndex].name = newName;

    renderShoppingList(STORE.items);

    console.log(itemIndex);
  });
}


// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList(STORE.items);
  handleNewItemSubmit();
  handleNewItemSearch();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleRenameItem();
  handleToggleHideFilter();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
