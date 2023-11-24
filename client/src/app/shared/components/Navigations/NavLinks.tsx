import React, { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthContext } from '../../context/auth-context';

const NavLinks: React.FC = () => {
  const auth = useContext(AuthContext);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <ul className="nav-links list-none m-0 p-0 w-full h-full flex flex-col sm:flex-row justify-center items-center uppercase text-white">
      <li className={`mb-2 sm:mb-0 sm:mr-2 ${isActive("/") ? 'text-[#5865F2]' : ''}`}>
        <Link href="/">all users</Link>
      </li>
      {auth.isLoggedIn && (
        <li className={`mb-2 sm:mb-0 sm:mr-2 ${isActive(`/places/${auth.userId}`) ? 'text-[#5865F2]' : ''}`}>
          <Link href={`/places/${auth.userId}`}>my places</Link>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li className={`mb-2 sm:mb-0 sm:mr-2 ${isActive("/auth") ? 'text-[#5865F2]' : ''}`}>
          <Link href="/auth">sign in</Link>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button className='mb-2 sm:mb-0 uppercase' onClick={auth.logout}>logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
