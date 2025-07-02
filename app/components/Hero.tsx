'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const title = document.querySelector(".title");
        const subtitles = document.querySelectorAll(".subtitle");

        if (!title || subtitles.length === 0) return;

        const heroSplit = new SplitText(title, { type: "chars, words" });
        const paragraphSplit = new SplitText(Array.from(subtitles), { type: "lines" });

        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });

        // Timeline for leaf animations
        const leafTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        leafTimeline.to(".right-leaf", { y: 200 }, 0);
        leafTimeline.to(".left-leaf", { y: -200 }, 0);
        // Removed .arrow animation since no element exists

        // Video scroll timeline
        const startValue = isMobile ? "top 50%" : "center 60%";
        const endValue = isMobile ? "120% top" : "bottom top";

        const video = videoRef.current;
        if (!video) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "video", // note dot before class name
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            },
        });

        const onLoadedMetadata = () => {
            tl.to(video, {
                currentTime: video.duration || 1,
            });
        };

        if (video.readyState >= 1) {
            onLoadedMetadata();
        } else {
            video.addEventListener("loadedmetadata", onLoadedMetadata);
        }

        // Cleanup function
        return () => {
            video.removeEventListener("loadedmetadata", onLoadedMetadata);
            heroSplit.revert();
            paragraphSplit.revert();
            leafTimeline.scrollTrigger?.kill();
            tl.scrollTrigger?.kill();
            tl.kill();
            leafTimeline.kill();
        };
    }, []);

    return (
        <>
            <section id="hero" className="noisy relative overflow-hidden">
                <h1 className="title">MOJITO</h1>

                <img
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    className="left-leaf"
                />
                <img
                    src="/images/hero-right-leaf.png"
                    alt="right-leaf"
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic.</p>
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients,
                                creative flair, and timeless recipes — designed to delight your
                                senses.
                            </p>
                            <a href="/cocktails">View cocktails</a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="video absolute inset-0 z-[1] ">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    controls={false}
                    src="/videos/output.mp4"
                />
            </div>
        </>
    );
};

export default Hero;
