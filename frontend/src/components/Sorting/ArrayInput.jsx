import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';

const ArrayInput = ({ array, onChange, onRandomize }) => {
  const [inputValue, setInputValue] = useState(array.join(', '));

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    const newArray = value
      .split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));
    
    if (newArray.length > 0) {
      onChange(newArray);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Array Values
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter numbers separated by commas"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <button
        onClick={onRandomize}
        className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Shuffle className="h-4 w-4 mr-2" />
        Generate Random Array
      </button>
      
      <div className="text-sm text-gray-600">
        Current array: [{array.join(', ')}]
      </div>
    </div>
  );
};

export default ArrayInput;
