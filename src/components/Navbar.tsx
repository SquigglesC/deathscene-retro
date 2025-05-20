"use client"

import { ROUTES } from "../utils/routes"
import { useEffect, useRef, type ReactNode } from "react"
import { useDisclosure } from "@nextui-org/react"
import NavLink from "./input/NavLink"
import { motion, AnimatePresence } from "framer-motion"
import Contact from "./Contact"
import Cart from "../features/cart/components/Cart"

interface NavbarProps {
  initialState: boolean
  isHome: boolean
  hamburger?: ReactNode
  instagramIcon?: ReactNode
  cartIcon?: ReactNode
  logo?: ReactNode
  logoHover?: ReactNode
  mobilelogo?: ReactNode
  contact?: ReactNode
}

const overlayVariants = {
  open: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
}

const navVariants = {
  open: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
}

const linkVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  closed: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3, ease: "easeIn" },
  },
}


export default function Navbar({ initialState, cartIcon, hamburger, logo, mobilelogo }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navbarRef = useRef<HTMLDivElement | null>(null)
  const lastScrollY = useRef(0)
  let isHidden = false

  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return

      const currentScrollY = window.scrollY

      if (currentScrollY > 15) {
        if (currentScrollY > lastScrollY.current) {
          navbarRef.current.classList.add("opacity-0", "-translate-y-[50px]")
          isHidden = true
        } else {
          navbarRef.current.classList.remove("opacity-0", "-translate-y-[50px]")
          isHidden = false
        }
      } else {
        navbarRef.current.classList.remove("opacity-0", "-translate-y-[50px]")
        isHidden = false
      }

      lastScrollY.current = currentScrollY
    }

    const handleMouseEnter = () => {
      if (isHidden && navbarRef.current) {
        navbarRef.current.classList.remove("opacity-0", "-translate-y-[50px]")
      }
    }

    window.addEventListener("scroll", handleScroll)
    navbarRef.current?.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      navbarRef.current?.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  return (
    <div
      ref={navbarRef}
      className="z-50 w-full flex px-[7%] md:px-[10%] lg:px-[20%] h-auto transition-all duration-500 ease-in-out "
    >
      {/* Desktop */}
      <div className="rounded-br-xl rounded-tl-[12.5px] relative w-full items-center mt-[1px] justify-between hidden lg:flex bg-[#fefefe]">
        {/*Left side Navbar*/}
        <div className="flex items-center gap-x-[15px]">
          {/* Logo */}
          <a
            className="group mr-2"
            href={ROUTES.HOME}
            style={{
              filter: "drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.7))",
            }}
          >
            {logo || <div className="text-2xl font-bold italic text-blue-700">deathscene</div>}
          </a>
          {/* Navigation */}
          <nav
            className="flex flex-row gap-x-[25px] items-center"
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            <NavLink href={ROUTES.TRACK}>track</NavLink>
            <NavLink href={ROUTES.VIDEOS}>videos</NavLink>
            <Contact/>
          </nav>
        </div>
        {/* Cart - Right Side */}
        <span className="inline-flex items-center mr-3"
          style={{
            fontFamily: "Inter",
            fontSize: "14px",
            lineHeight: "24px",
          }}
        >
          <Cart />
        </span>
      </div>

      {/* Mobile Navbar */}
      <div className="rounded-br-xl rounded-tl-[12.5px] w-full flex items-center justify-between lg:hidden bg-[#fefefe] mt-[5px] relative">
        {/* Left Side: Hamburger + Logo */}
        <div className="flex items-center gap-x-[12px]">
          {/* Hamburger Button */}
          <button className="z-40 ml-3" onClick={onOpen}>
            {hamburger || <div className="text-2xl">☰</div>}
          </button>

          {/* Logo */}
          <a
            href={ROUTES.HOME}
            className="z-30"
            style={{
              filter: "drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.7))",
            }}
          >
            {mobilelogo || (
              <div className="text-xl font-bold italic text-blue-700">
                deathscene
              </div>
            )}
          </a>
        </div>

        {/* Right Side: Cart Icon */}
          <span className="flex items-center mr-3"
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            <Cart isMobile/>
          </span>
      </div>

      {/* Full-Screen Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-dark justify-between items-start text-light flex flex-col py-[80px] pl-[10%] pr-[5%]"
          >
            <button className="z-50 self-end font-extrabold text-4xl leading-none p-3 text-light hover:text-primary drop-shadow-[0px_0px_2px_rgba(235,235,235,0.4)] hover:drop-shadow-[0px_0px_4px_rgba(235,0,0,.4)] transition-all duration-500 ease-in-out">
              ✕
            </button>

            <motion.nav
              variants={navVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-y-8 text-5xl justify-start mb-10"
              style={{
                fontFamily: "Inter",
              }}
            >
              <motion.a variants={linkVariants} className="mb-10">
                <a
                  href={ROUTES.HOME}
                  className=""
                  style={{
                    filter: "drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.7))",
                  }}
                >
                  {mobilelogo || <div className="text-xl font-bold italic text-blue-700">deathscene</div>}
                </a>
              </motion.a>

              <motion.a variants={linkVariants}>
                <NavLink href={ROUTES.TRACK}>track</NavLink>
              </motion.a>
              <motion.a variants={linkVariants}>
                <NavLink href={ROUTES.VIDEOS}>videos</NavLink>
              </motion.a>
              <motion.a onClick={(e: any) => e.stopPropagation()} variants={linkVariants}>
                  <Contact />
              </motion.a>
            </motion.nav>

            <div></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
