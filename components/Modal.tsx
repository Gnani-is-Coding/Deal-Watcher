import Image from 'next/image'
import React, { FormEvent, useEffect } from 'react'

type IProps = {
    isOpen: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    isLoading: boolean,
    setInputEmail: React.Dispatch<React.SetStateAction<string>>,
    inputEmail: string,
    handleEmailSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}
function Modal({isOpen, setOpenModal, isLoading, setInputEmail, inputEmail, handleEmailSubmit}: IProps) {

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (e.key === 'Escape') {
                setOpenModal(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () =>  window.removeEventListener('keydown', handleKeyDown)
            
    }, [])

    return (
        isOpen ? (
            <>    
            <div onClick={() => setOpenModal(false)} className= "fixed top-0 left-0 bg-black h-[100%] w-[100%] flex justify-center items-center z-50 opacity-70">
            </div>
            <div className="fixed flex flex-col flex-1 min-w-[290px] max-w-[400px] z-[100] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
             bg-white rounded-lg p-6 gap-3">
        
                    <div className='flex justify-between w-full items-center'>
                        <div className='border border-grey-500 p-3 rounded-xl'>
                        <Image src="/assets/icons/star.svg" height={20} width={20} alt="logo"/>
                        </div>
                        <button onClick ={() => setOpenModal(false)} type="button" className='cursor-pointer hover:bg-color-[#333]'>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                        </button>
                    </div>
        
                    <h2 className='font-semibold text-secondary text-lg'>Stay updated with the product pricing alerts roght in your inbox!</h2>
                    <p className='text-sm text-gray-500'>Never miss a bargain again with our timely alerts!</p>
        
                    <form className='flex flex-col gap-2' onSubmit = { handleEmailSubmit} >
                        <label htmlFor="email" className='font-medium text-sm text-gray-700'>Email address</label>
                        <div className="flex gap-2 border-2 border-grey-600 rounded-3xl p-3 px-4">
                            <span><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <rect x="3" y="5" width="18" height="14" rx="2" stroke="#000000" stroke-width="2" stroke-linecap="round"></rect> </g></svg> </span>
                            <input type="email" id="email" className="w-full border-none outline-none" 
                            placeholder='gnanendragariminti@gmail.com' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                        </div>
                        <button className='btn my-4' type="submit">{isLoading ? 'Submitting...' :'Track Product' }</button>
                    </form>
        
            </div>
            </>
        ) : null
    )
}

export default Modal
