"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Code, Briefcase, Mail, BookOpen } from "lucide-react";

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, href: '#hero' },
  { id: 'about', label: 'About', icon: User, href: '#about' },
  { id: 'projects', label: 'Projects', icon: Code, href: '#projects' },
  { id: 'experience', label: 'Experience', icon: Briefcase, href: '#experience' },
  { id: 'diary', label: 'Diary', icon: BookOpen, href: '#diary' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
];

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <motion.button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-50 sketch-btn p-3 !m-0"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-card border-l-4 border-primary z-50 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-8 h-full sketch-border-wavy paper-texture">
              {/* Menu Header */}
              <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="sketch-heading text-2xl mb-2">Navigation</h2>
                <div className="scribble-underline w-20 mx-auto"></div>
              </motion.div>

              {/* Menu Items */}
              <nav className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleMenuClick(item.href)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted/50 border-2 border-transparent hover:border-secondary transition-all duration-300 group sketch-card-project !m-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: Math.random() * 4 - 2,
                      backgroundColor: 'var(--muted)' 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="p-2 bg-secondary text-secondary-foreground rounded-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon size={20} />
                    </motion.div>
                    <span className="sketch-text font-semibold text-lg flex-1 text-left">
                      {item.label}
                    </span>
                    <motion.div
                      className="text-accent opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                ))}
              </nav>

              {/* Decorative Elements */}
              <motion.div
                className="absolute bottom-8 left-8 right-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="sticky-note text-center">
                  <p className="sketch-text text-sm">
                    "Every great journey starts with a single click! ✨"
                  </p>
                </div>
              </motion.div>

              {/* Floating Doodles in Sidebar */}
              <motion.div
                className="absolute top-20 left-8 text-2xl opacity-30"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🎨
              </motion.div>
              
              <motion.div
                className="absolute bottom-32 right-8 text-xl opacity-30"
                animate={{ 
                  x: [0, 5, -5, 0],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1 
                }}
              >
                📝
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}