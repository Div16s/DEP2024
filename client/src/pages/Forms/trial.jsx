import React, { useState } from 'react';

function trial() {
    // Define state for items and input values
    const [items, setItems] = useState([]);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [editingIndex, setEditingIndex] = useState(null); // Index of item being edited

    // Function to handle adding new item
    const addItem = () => {
        const newItem = {
            description: description,
            quantity: quantity,
            price: price
        };
        setItems([...items, newItem]); // Append new item to items array
        // Reset input values
        setDescription('');
        setQuantity(0);
        setPrice(0);
    };

    // Function to handle editing an item
    const editItem = (index) => {
        // Set input values to values of item being edited
        setDescription(items[index].description);
        setQuantity(items[index].quantity);
        setPrice(items[index].price);
        setEditingIndex(index);
    };

    // Function to handle deleting an item
    const deleteItem = (index) => {
        // Filter out the item at the given index
        const updatedItems = items.filter((item, i) => i !== index);
        setItems(updatedItems);
    };

    // Function to handle updating an item
    const updateItem = () => {
        const updatedItems = [...items];
        updatedItems[editingIndex] = {
            description: description,
            quantity: quantity,
            price: price
        };
        setItems(updatedItems);
        // Reset input values and editingIndex
        setDescription('');
        setQuantity(0);
        setPrice(0);
        setEditingIndex(null);
    };

    return (
        <div>
            {/* Input fields for description, quantity, and price */}
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            {/* Button to add or update item based on editingIndex */}
            <button onClick={editingIndex !== null ? updateItem : addItem}>
                {editingIndex !== null ? 'Update Item' : 'Add Item'}
            </button>
            {/* Render items */}
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        Description: {item.description}, Quantity: {item.quantity}, Price: {item.price}
                        {/* Buttons for modifying and deleting items */}
                        <button onClick={() => editItem(index)}>Edit</button>
                        <button onClick={() => deleteItem(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default trial;
