// import React from 'react';
// import styled from 'styled-components';

// // --- Styled Components ---

// const HeaderContainer = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 2rem;
//   background-color: #030a16; /* Deep dark blue/black background */
//   color: #ffffff;
//   font-family: 'Arial', sans-serif; /* Replace with your global font if different */
// `;

// const LogoContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   cursor: pointer;
// `;

// const LogoIcon = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
  
//   /* Simple SVG drop replacement based on the image */
//   svg {
//     width: 32px;
//     height: 32px;
//     fill: #3498db; 
//   }
// `;

// const LogoText = styled.div`
//   display: flex;
//   flex-direction: column;
//   line-height: 1.1;
//   text-transform: uppercase;
// `;

// const LogoTitle = styled.span`
//   font-weight: 800;
//   font-size: 1.1rem;
//   letter-spacing: 0.5px;
// `;

// const LogoSubtitle = styled.span`
//   font-weight: 400;
//   font-size: 0.9rem;
//   color: #cbd5e1; /* Slightly lighter gray/white */
//   letter-spacing: 1px;
// `;

// const NavLinks = styled.nav`
//   display: flex;
//   align-items: center;
//   gap: 2rem;

//   @media (max-width: 768px) {
//     display: none; /* Quick mobile fallback - hidden by default */
//   }
// `;

// const NavLink = styled.a`
//   color: #ffffff;
//   text-decoration: none;
//   font-size: 0.9rem;
//   font-weight: 500;
//   transition: color 0.2s ease;
//   cursor: pointer;

//   &:hover {
//     color: #3b82f6; /* Blue hover effect */
//   }
// `;

// const CTAButton = styled.button`
//   background-color: #0066cc; /* Vibrant water blue from the image */
//   color: #ffffff;
//   border: none;
//   border-radius: 6px;
//   padding: 0.75rem 1.5rem;
//   font-size: 0.85rem;
//   font-weight: 700;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   cursor: pointer;
//   transition: background-color 0.2s ease, transform 0.1s ease;

//   &:hover {
//     background-color: #0052a3;
//   }

//   &:active {
//     transform: scale(0.98);
//   }
// `;

// // --- Main Component ---

// export default function Header() {
//   return (
//     <HeaderContainer>
//       {/* Brand Logo Area */}
//       <LogoContainer>
//         <LogoIcon>
//           {/* Water droplet SVG match */}
//           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
//           </svg>
//         </LogoIcon>
//         <LogoText>
//           <LogoTitle>Water Quality</LogoTitle>
//           <LogoSubtitle>Inspection</LogoSubtitle>
//         </LogoText>
//       </LogoContainer>

//       {/* Navigation Links */}
//       <NavLinks>
//         <NavLink href="#home">Home</NavLink>
//         <NavLink href="#about">About</NavLink>
//         <NavLink href="#water-quality">Water Quality</NavLink>
//         <NavLink href="#process">Process</NavLink>
//         <NavLink href="#faq">FAQ</NavLink>
//         <NavLink href="#contact">Contact</NavLink>
//       </NavLinks>

//       {/* Call to Action Button */}
//       <CTAButton>
//         Schedule Inspection
//       </CTAButton>
//     </HeaderContainer>
//   );
// }

'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image'; 

// --- Styled Components ---

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #030a16; 
  color: #ffffff;
  // font-family: 'Arial', sans-serif;
  
  /* --- FIX CODES ADDED HERE --- */
  position: fixed;   /* Keeps the header fixed in place */
  top: 0;            /* Sticks it exactly to the top of the viewport */
  left: 0;           /* Ensures it aligns correctly from the left boundary */
  width: 100%;       /* Spans across the full width of the screen */
  box-sizing: border-box; /* Prevents padding from breaking the 100% width layout */
  
  z-index: 100;      /* Keeps header layers safe over page content */

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 101;
`;

// New wrapper to cleanly bound your image size
const LogoImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 40px;  /* Adjust the width to fit your logo asset design */
  height: 40px;  /* Adjust the height to balance your header layout */
  border-radius:50px;
  overflow: hidden;
  margin-right:10px;
`;

// const LogoContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   cursor: pointer;
//   z-index: 101;
// `;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 32px;
    height: 32px;
    fill: #3498db; 
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  text-transform: uppercase;
`;

const LogoTitle = styled.span`
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
`;

const LogoSubtitle = styled.span`
  font-weight: 400;
  font-size: 0.9rem;
  color: #cbd5e1; 
  letter-spacing: 1px;
`;

// FIXED: Changed isOpen to $isOpen
const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 992px) {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #030a16;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 1rem 0 2rem 0;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    
    /* Using transient prop syntax here */
    max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out, opacity 0.2s ease-in-out;
  }
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #3b82f6; 
  }

  @media (max-width: 992px) {
    font-size: 1.1rem;
    padding: 1.2rem 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    width: 100%;
    box-sizing: border-box;

    &:hover {
      background-color: rgba(255, 255, 255, 0.02);
    }
  }
`;

const CTAButton = styled.button`
  background-color: #0066cc; 
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #0052a3;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

const MobileCTALinkWrapper = styled.div`
  display: none;
  padding: 1.5rem 2rem 0 2rem;

  @media (max-width: 992px) {
    display: block;
  }
`;

const MobileCTAButton = styled(CTAButton)`
  @media (max-width: 992px) {
    display: block;
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
  }
`;

// FIXED: Changed isOpen to $isOpen
const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;

  span {
    width: 28px;
    height: 3px;
    background: #ffffff;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    /* Using transient prop syntax here */
    &:first-child {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
      transform: ${({ $isOpen }) => ($isOpen ? 'translateX(20px)' : 'translateX(0)')};
    }

    &:last-child {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }

  @media (max-width: 992px) {
    display: flex;
  }
`;

// --- Main Component ---

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

const router = useRouter();

  

  const headerRef = useRef(null);

    const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };



  useEffect(() => {
    const handleOutsideClick = (event) => {
      // If the menu is open and the clicked element is NOT inside the header container, close it
      if (isOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // Bind listener on mount
    document.addEventListener('mousedown', handleOutsideClick);
    
    // Clean up event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  




  return (
    <HeaderContainer ref={headerRef}>
      {/* Brand Logo Area */}
     <Link href='/'>
      <LogoContainer onClick={closeMenu}>
        <LogoIcon>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </LogoIcon>
        <LogoImageWrapper>
          <Image 
          src="/logo.webp"    
          alt="Water Quality Inspection Logo"
          fill                
          style={{ objectFit: 'cover'}} 
          // priority   
        />
        </LogoImageWrapper>
        <LogoText>
          <LogoTitle>El Paso Water Quality LLC</LogoTitle>
          {/* <LogoSubtitle>Inspection</LogoSubtitle> */}
        </LogoText>
      </LogoContainer>
     </Link>

      {/* Hamburger Icon - FIXED prop to $isOpen */}
      <HamburgerButton $isOpen={isOpen} onClick={toggleMenu} aria-label="Toggle navigation menu">
        <span />
        <span />
        <span />
      </HamburgerButton>

      {/* Navigation Links Overlay Wrapper - FIXED prop to $isOpen */}
      <NavLinks $isOpen={isOpen}>
        <NavLink href="/" onClick={closeMenu}>Home</NavLink>
        <NavLink href="/about" onClick={closeMenu}>About</NavLink>
        {/* <NavLink href="/water-quality" onClick={closeMenu}>Water Quality</NavLink> */}
        <NavLink href="/process" onClick={closeMenu}>Process</NavLink>
        {/* <NavLink href="/faq" onClick={closeMenu}>FAQ</NavLink> */}
        <NavLink href="/contact" onClick={closeMenu}>Contact</NavLink>
        
        <Link href='/contact'>
        <MobileCTALinkWrapper>
          <MobileCTAButton onClick={closeMenu}>
            Schedule Inspection
          </MobileCTAButton>
        </MobileCTALinkWrapper>
        </Link>
      </NavLinks>

      {/* Desktop Call to Action Button */}
   
      <CTAButton onClick={()=>router.push('/contact')}>
        Schedule Inspection
      </CTAButton>
  
      
    </HeaderContainer>
  );
}