import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Hero from "@/app/components/Hero";
import {Nabla} from "next/dist/compiled/@next/font/dist/google";
import NavBar from "@/app/components/Navbar";
import Cocktail from "@/app/components/Cocktails";
import About from "@/app/components/About";
import Art from "./components/Art";
import Menu from "@/app/components/Menu";
import Contact from "./components/Contact";
gsap.registerPlugin(ScrollTrigger, SplitText);
const Home = () => {
    return (
        <main>
            <NavBar/>
            <Hero/>
            <Cocktail/>
            <About/>
            <Art/>
            <Menu/>
            <Contact/>
        </main>
    );
};

export default Home;
