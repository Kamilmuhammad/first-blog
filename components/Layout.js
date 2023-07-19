import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";

export default function Layout({ children }) {
    const [isMounted, setMount] = useState(false);
    const [hamburgerMenu, setHamburgerMenu] = useState(false);
    useEffect(() => {
        setMount(true);
    }, []);

    return (
        <main>
            <Navbar
                hamburgerMenu={hamburgerMenu}
                setHamburgerMenu={setHamburgerMenu}
            />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {isMounted ? (
                    <div
                        className="lg:px-24 xl:px-44 px-0 md:px-8 sm:px-4 py-4 min-h-[82vh]"
                        onClick={() => setHamburgerMenu(false)}
                    >
                        {children}
                    </div>
                ) : null}
                <Footer />
            </motion.div>
        </main>
    );
}
