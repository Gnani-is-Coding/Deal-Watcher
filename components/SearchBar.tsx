"use client"

function SearchBar() {

    const handleSubmit = () => {

    }
  return (
    <form className='flex felx-wrap gap-4 mt-12'
    
    onSubmit={handleSubmit}
    >
        <input type="text" className='searchbar-input' placeholder="Enter Product link"/>
        <button type="submit" className='searchbar-btn'>Search</button>
    </form>
  )
}

export default SearchBar
