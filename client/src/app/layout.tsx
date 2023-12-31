"use client"
// import type { Metadata } from 'next'
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import MainNavigation from './shared/components/Navigations/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useState, useCallback, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const router = useRouter(); 

  const login = useCallback(uid => {
    setIsLoggedIn(true);
    setUserId(uid);
    router.push("/");
  }, []);
  
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    router.push("/auth");
  }, []);

  return (
    <html lang="en">  
      <head>
        <title>YourPlace</title>
        <script async defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlDVA68l66Pnt0YX_Q-WL1vO1HKdIdDd4&callback=Function.prototype">
        </script>
      </head>
      <body className={inter.className}>
        <div id="drawer-hook"></div>
        <div id="backdrop-hook"></div>
        <div id="modal-hook"></div>
        <AuthContext.Provider
          value={{
            isLoggedIn: isLoggedIn,
            userId: userId,
            login: login,
            logout: logout
          }}
        >
        <MainNavigation />
        <main className='bg-[#2C2F33] min-h-screen'>
          {children}
        </main>
        </AuthContext.Provider>
      </body>
    </html>
  )
}
