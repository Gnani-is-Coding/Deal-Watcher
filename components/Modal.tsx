"use client"

import Image from 'next/image'
import React, { FormEvent, useEffect } from 'react'

type IProps = {
    isOpen: boolean,
    setOpenModal: () => void,
    isLoading: boolean,
    setInputEmail: React.Dispatch<React.SetStateAction<string>>,
    inputEmail: string,
    handleEmailSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
    isSuccess: boolean,
    error: string,
}

function Modal({ isOpen, setOpenModal, isLoading, setInputEmail, inputEmail, handleEmailSubmit, isSuccess, error }: IProps) {

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenModal()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Auto-close 3s after success
    useEffect(() => {
        if (!isSuccess) return
        const timer = setTimeout(() => setOpenModal(), 3000)
        return () => clearTimeout(timer)
    }, [isSuccess])

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={setOpenModal}
                className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
            />

            {/* Modal panel */}
            <div className="fixed flex flex-col min-w-[290px] max-w-[400px] w-[90vw] z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 gap-4"
                style={{
                    background: "rgba(18,18,28,0.97)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(24px)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
                }}
            >
                {isSuccess ? (
                    /* ── Success state ── */
                    <div className="flex flex-col items-center gap-4 py-4 text-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-text-primary">You&apos;re all set!</h2>
                        <p className="text-sm text-text-secondary">
                            We&apos;ll notify you at{' '}
                            <span className="text-accent-purple font-medium">{inputEmail}</span>{' '}
                            whenever the price drops.
                        </p>
                        <p className="text-xs text-text-muted mt-1">Closing automatically…</p>
                    </div>
                ) : (
                    /* ── Form state ── */
                    <>
                        <div className="flex justify-between w-full items-center">
                            <div className="p-3 rounded-xl border border-glass-border"
                                style={{ background: "rgba(255,255,255,0.06)" }}>
                                <Image src="/assets/icons/star.svg" height={20} width={20} alt="star" style={{ filter: "invert(1)" }} />
                            </div>
                            <button onClick={setOpenModal} type="button" className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M14.5 9.5L9.5 14.5M9.5 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        <h2 className="font-semibold text-text-primary text-lg">
                            Stay updated with price alerts right in your inbox!
                        </h2>
                        <p className="text-sm text-text-secondary">Never miss a bargain again with our timely alerts!</p>

                        <form className="flex flex-col gap-3" onSubmit={handleEmailSubmit}>
                            <label htmlFor="email" className="font-medium text-sm text-text-secondary">
                                Email address
                            </label>
                            <div className="flex gap-2 rounded-2xl p-3 px-4 border border-glass-border"
                                style={{ background: "rgba(255,255,255,0.04)" }}
                            >
                                <Image src="/assets/icons/mail.svg" width={20} height={20} alt="mail" style={{ filter: "invert(0.6)" }} />
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
                                    placeholder="you@example.com"
                                    value={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                />
                            </div>

                            {error && (
                                <p className="text-xs text-red-400 px-1">{error}</p>
                            )}

                            <button className="btn mt-2" type="submit" disabled={isLoading || !inputEmail}>
                                {isLoading ? 'Submitting…' : 'Track Product'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </>
    )
}

export default Modal
