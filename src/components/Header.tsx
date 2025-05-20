import { ROUTES } from "../utils/routes";
import { useEffect, useRef, type ReactNode } from "react";

interface HeaderProps {
  isHome: boolean;
  hamburger?: ReactNode;
  instagramIcon?: ReactNode;
  logo?: ReactNode;
  logoHover?: ReactNode;
  mobilelogo?: ReactNode;
  contact?: ReactNode;
}

export default function Header({
  logo,
}: HeaderProps) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0); // Track last scroll position
  let isHidden = false; // State to track if the header is currently hidden

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > 15) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down - hide the header
          headerRef.current.classList.add("opacity-0", "-translate-y-[50px]");
          isHidden = true;
        } else {
          // Scrolling up - show the header
          headerRef.current.classList.remove(
            "opacity-0",
            "-translate-y-[50px]"
          );
          isHidden = false;
        }
      } else {
        // At the top of the page, always show the header
        headerRef.current.classList.remove("opacity-0", "-translate-y-[50px]");
        isHidden = false;
      }

      // Update last scroll position
      lastScrollY.current = currentScrollY;
    };

    const handleMouseEnter = () => {
      if (isHidden && headerRef.current) {
        // Show the header when hovered
        headerRef.current.classList.remove("opacity-0", "-translate-y-[50px]");
      }
    };

    // Attach scroll and hover listeners
    window.addEventListener("scroll", handleScroll);
    headerRef.current?.addEventListener("mouseenter", handleMouseEnter);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      headerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);
  return (
    <div
      ref={headerRef}
      className="z-50 w-full flex px-0 pb-0 h-auto text-light transition-all duration-500 ease-in-out"
    >
      {/* Main header container */}
      <div className="w-full flex items-center justify-evenly relative gap-x-[140px]">
        {/* Left side boxes */}
        <div className="flex flex-col">
          <a className="m-1">
            <img src={'/gif1.gif'} alt="deathscene1" className="w-[72px] md:w-[96px] lg:w-[132px] h-auto" />
          </a>
          <a className="m-1">
            <img src={'/gif2.gif'} alt="deathscene2" className="w-[72px] md:w-[96px] lg:w-[132px] h-auto" />
          </a>
        </div>

        {/* Center logo */}
        <a
            className="absolute py-3 left-1/2 transform -translate-x-1/2 group 
                        h-[65px] sm:h-[76px] md:h-[96px] lg:h-[120px]"
            href={ROUTES.HOME}
            style={{
                filter: "drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.7))",
            }}
            >
            <div className="w-auto h-full flex items-center justify-center">
                {logo}
            </div>
        </a>

        {/* Right side boxes */}
        <div className="flex flex-col">
          <a className="m-1">
            <img src={'/gif3.gif'} alt="deathscene3" className="w-[72px] md:w-[96px] lg:w-[132px] h-auto" />
          </a>
          <a className="m-1">
            <img src={'/gif4.png'} alt="deathscene4" className="w-[72px] md:w-[96px] lg:w-[132px] h-auto" />
          </a>
        </div>
      </div>

      
    </div>
  )
}
