"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface SearchResult {
  _id: string
  title: string
  image: string
  currentPrice: number
}

function NavSearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close on outside click or Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close()
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < 2) {
      setResults([])
      return
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
      const json = await res.json()
      setResults(json.data ?? [])
      setIsLoading(false)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  function open() {
    setIsOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function close() {
    setIsOpen(false)
    setQuery("")
    setResults([])
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Search icon button — hidden when open */}
      {!isOpen && (
        <div
          onClick={open}
          className="p-2 rounded-xl border border-glass-border cursor-pointer hover:border-accent-purple transition-colors duration-200"
          style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
        >
          <Image src="/assets/icons/search.svg" alt="search" width={20} height={20} style={{ filter: "invert(1)" }} />
        </div>
      )}

      {/* Expanded search input */}
      {isOpen && (
        <div className="flex items-center gap-2 rounded-xl border border-accent-purple px-3 py-1.5"
          style={{ background: "rgba(139,92,246,0.08)", backdropFilter: "blur(12px)", minWidth: "220px" }}
        >
          <Image src="/assets/icons/search.svg" alt="search" width={16} height={16} style={{ filter: "invert(1)", opacity: 0.6 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm text-text-primary placeholder:text-text-secondary w-full"
          />
          <button onClick={close} className="text-text-secondary hover:text-text-primary transition-colors text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Dropdown results */}
      {isOpen && (query.trim().length >= 2) && (
        <div
          className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-glass-border overflow-hidden z-50"
          style={{ background: "rgba(20,20,30,0.95)", backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
        >
          {isLoading ? (
            <p className="text-text-secondary text-sm px-4 py-3">Searching...</p>
          ) : results.length === 0 ? (
            <p className="text-text-secondary text-sm px-4 py-3">No products found.</p>
          ) : (
            <ul>
              {results.map((product) => (
                <li key={product._id}>
                  <Link
                    href={`/products/${product._id}`}
                    onClick={close}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors duration-150"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-glass-border"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <Image src={product.image} alt={product.title} width={40} height={40} className="object-contain w-full h-full" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-text-primary text-sm font-medium truncate">{product.title}</span>
                      <span className="text-accent-purple text-xs font-semibold">${product.currentPrice}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default NavSearchBar
