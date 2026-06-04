'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HistoryPage() {
    return (
        <main className="max-w-7xl mx-auto p-6 md:p-12">

            <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
                <div className="lg:col-span-12 space-y-10">
                    <Card className="rounded-[40px] border-none shadow-sm min-h-[700px] overflow-hidden flex flex-col">

                        {/* CABECERA */}
                        <CardHeader className="flex flex-row items-center justify-between pb-10 pt-10 px-10 border-b">
                            <div>
                                <CardTitle className="text-3xl md:text-4xl font-serif italic mb-2">History</CardTitle>
                                <CardDescription className="text-sm font-medium opacity-70">Archive of approved drafts</CardDescription>
                            </div>
                            <Button asChild
                                variant="outline"
                                className="rounded-full px-8 h-12 uppercase font-black text-[10px] tracking-widest border-muted"
                            >
                                <Link href="/dashboard">  Back to Editor  </Link>

                            </Button>
                        </CardHeader>

                        {/* CONTENIDO PRINCIPAL */}

                    </Card>
                </div>
            </motion.div>
        </main>

    )
}
