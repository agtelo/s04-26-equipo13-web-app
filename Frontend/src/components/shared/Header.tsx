import React from 'react'
import { Logo } from './Logo';
import { Button } from '../ui/button';
import { History } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header className="border-b bg-card px-6 md:px-12 py-5 md:py-8 flex flex-col md:flex-row items-center justify-between sticky top-0 z-30 gap-6">
        <div className="flex items-center gap-4 self-start md:self-auto">
          <Logo className="text-primary w-8 h-8 md:w-10 md:h-10" />
          <div>
            <h1 className="text-xl md:text-2xl font-serif italic font-medium leading-none mb-1">Distiller</h1>
            <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">Automated Community Editor</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
   
          <ModeToggle/>
          {/* <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex items-center gap-3 px-1.5 pr-4 py-1.5 h-12 rounded-full bg-secondary/30 hover:bg-secondary/50 transition-all border border-border/50 group"
              )}
            >
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-inner">
                {user?.displayName ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase() : user?.email?.[0].toUpperCase()}
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-xs font-black uppercase tracking-widest leading-none">
                  {user?.displayName ? user.displayName.split(' ')[0] : user?.email?.split('@')[0]}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-[28px] border-none shadow-2xl p-2 mt-2 bg-card/95 backdrop-blur-xl ring-1 ring-border/50">
              <div className="px-4 pt-5 pb-3 flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground font-black text-2xl shadow-xl rotate-3">
                  {user?.displayName ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase() : user?.email?.[0].toUpperCase()}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-sm font-black uppercase tracking-widest">{user?.displayName || user?.email?.split('@')[0]}</h3>
                    {isAdmin && <ShieldCheck className="w-3.5 h-3.5 text-primary" />}
                  </div>
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{user?.email}</p>
                </div>
                {isAdmin && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-[0.2em] mt-1">
                    Administrator
                  </Badge>
                )}
              </div>
              
              <Separator className="bg-border/50 my-1 mx-2" />

              <div className="p-1">
                <DropdownMenuItem 
                  onClick={() => window.open('/icons-gallery.html', '_blank')}
                  className="rounded-2xl p-3 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground focus:bg-secondary focus:text-foreground cursor-pointer transition-all mb-1"
                >
                  <Logo className="w-4 h-4" />
                  Icon Registry
                </DropdownMenuItem>

                <DropdownMenuItem 
                  onClick={() => auth.signOut()}
                  className="rounded-2xl p-3 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out of Distiller
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </header>
  )
}
