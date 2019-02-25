'use strict';
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
  const shoppingListItemString = generateShoppingItemString(STORE);

  $('.js-shopping-list').html(shoppingListItemString);
}


function generateShoppingItemString(shoppingList){
  const items = shoppingList.map((item) => generateItemElement(item));

  return items.join();
}


function generateItemElement(item){
  const isChecked = item.checked ? 'shopping-item__checked' : '';
  return `
  <li data-item-id="${item.id}">
    <span class="shopping-item js-shopping-item ${isChecked}>${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle>
        <span class="button-label">Check</span>
      </button>
      <button class="shopping-item-delete js-item-delete>
        <span class="button-label">Delete</span>
      </button>
    </div>  
  </li>
  `;
}


function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  console.log('`handleNewItemSubmit` ran');
}


function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  console.log('`handleItemCheckClicked` ran');
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  console.log('`handleDeleteItemClicked` ran');
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
