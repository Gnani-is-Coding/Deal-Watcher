"use client"

import { scrapeAndStoreProduct } from "@/lib/actions"
import { FormEvent, useState } from "react"

const isValidateAmazonUrl = (url: string):Boolean => {
  try{
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname
    if (hostname.includes('amazon.com') || hostname.includes('amazon') || hostname.endsWith('amazon')) {
      return true
    }
  }
  catch(error){
    return false

  }
  return false
}

function SearchBar() {
  const [inputPrompt, setSearchPrompt] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isVaidLink = isValidateAmazonUrl(inputPrompt)
    if (!isVaidLink) {
      return alert("Please provide a valid Amazon link")
    }

    try{
      setIsLoading(true)
      const scrappedData = await scrapeAndStoreProduct(inputPrompt)
    } catch(error: any){
      console.log(`Error while searching for products ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form className='flex felx-wrap gap-4 mt-12'
      onSubmit={handleSubmit}
    >
      <input type="text" className='searchbar-input' placeholder="Enter Product link" onChange={(e) => setSearchPrompt(e.target.value)} />
      <button type="submit" className='searchbar-btn' disabled={inputPrompt === ''}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  )
}

export default SearchBar
