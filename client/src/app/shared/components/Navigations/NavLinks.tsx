import React, { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthContext } from '../../context/auth-context';

const NavLinks: React.FC = () => {
  const auth = useContext(AuthContext);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const navLinks = [
    { href: '/', name: 'All Users' },
    { href: '/places/u1', name: 'My Places' },
    { href: '/auth', name: auth.isLoggedIn ? 'Logout' : 'Sign in' },
  ];

  return (
    <ul className="nav-links list-none m-0 p-0 w-full h-full flex flex-col sm:flex-row justify-center items-center uppercase text-white">
      {navLinks.map((link) => (
        <li
          className={`mb-2 sm:mb-0 sm:mr-2 ${isActive(link.href) ? 'text-[#5865F2]' : ''}`}
          key={link.name}
        >
          {link.name === 'Logout' ? (
            <button onClick={auth.logout}>{link.name}</button>
          ) : (
            <Link href={link.href}>{link.name}</Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
