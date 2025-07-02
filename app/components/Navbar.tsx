'use client'
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { navLinks } from '@/constants';
import gsap from 'gsap';
const NavBar = () => {
    const navRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!navRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: navRef.current,
                    start: 'bottom top',
                    toggleActions: 'play none none reverse',
                },
            });

            tl.fromTo(
                navRef.current,
                {
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(0px)',
                },
                {
                    backgroundColor: '#00000050',
                    backdropFilter: 'blur(10px)',
                    duration: 1,
                    ease: 'power1.inOut',
                }
            );
        }, navRef);

        return () => ctx.revert(); // clean up
    }, []);
    return (
        <nav>
            <div>
                <a href="/" className='flex items-center gap-2'>
                    <Image src='/images/logo.png' alt='logo' width='50' height='50'/>
                    <p>K'tre Ktrok</p>
                </a>
                <ul>
                    {navLinks.map((link, i) => (
                        <li key={i}>
                            <a href={link.id}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;

