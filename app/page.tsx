import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Hero from "@/app/components/Hero";
import {Nabla} from "next/dist/compiled/@next/font/dist/google";
import NavBar from "@/app/components/Navbar";

gsap.registerPlugin(ScrollTrigger, SplitText);
const Home = () => {
    return (
        <main>
            <NavBar/>
            <Hero/>
        </main>
    );
};

export default Home;
