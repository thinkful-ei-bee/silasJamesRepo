'use strict';
/* global cuid */


const STORE = [
  {id: cuid(), name: 'apples', checked: false},
  {id: cuid(), name: 'oranges', checked: false},
  {id: cuid(), name: 'milk', checked: true},
  {id: cuid(), name: 'bread', checked: false}
];


function renderShoppingList() {

  // this function will be responsible for rendering the shopping list in
  // the DOM


  console.log('`renderShoppingList` ran');


  $('.js-shopping-list').html(generateShoppingItemString(STORE));
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
      </div>
    </li>`
  ;
}


function addItemToShoppingList(itemName){
  console.log(`adding ${itemName} to shopping list`);
  STORE.push({id: cuid(), name: itemName, checked: false});
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
    renderShoppingList();
  });
}


function getItemIdFromElement(item){
  return $(item).closest('li').data('item-id');
}


function getIndexOfSelectedItem(item){
  return STORE.findIndex((storeVal) => storeVal.id === item);
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

    STORE[itemIndex].checked = ! STORE[itemIndex].checked;
    renderShoppingList();
    
  });
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item

  $('.js-shopping-list').on('click', '.js-item-delete', function(event){
    console.log('`handleDeleteItemClicked` ran');
    const itemId = getItemIdFromElement(this);

    const itemIndex = getIndexOfSelectedItem(itemId);

    STORE.splice(itemIndex, 1);
    renderShoppingList();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();

}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
