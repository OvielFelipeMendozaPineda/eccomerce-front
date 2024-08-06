import React from 'react';
import Input from '../Input/Input';
const SearchBar = ({ onChange }) => (

      <div className="flex flex-1 gap-5 items-center pb-2 bg-gray-200 rounded-xl w-full h-full">
        <i className='bx text-gray-400 mt-2 ml-5 bx-search text-2xl'></i>
        <Input
          name="products"
          placeholder="Buscar"
          id="products"
          text="search"
          className={'rounded-lg border-0 w-80 bg-gray-200 h-full focus:ring-0  flex self-center'}
          onChange={onChange}
        />
      </div>

);

export default SearchBar;
