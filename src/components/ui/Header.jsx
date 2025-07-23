import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Home", path: "/homepage", icon: "Home" },
    { name: "About", path: "/about", icon: "Users" },
    { name: "Services", path: "/services", icon: "Settings" },
    { name: "Portfolio", path: "/portfolio", icon: "Briefcase" },
    { name: "Blog", path: "/blog", icon: "FileText" },
    { name: "Careers", path: "/careers", icon: "UserPlus" },
    { name: "Contact", path: "/contact", icon: "Mail" },
  ];

  // Add Dashboard nav item if user is authenticated
  const dashboardNavItem = { name: "Dashboard", path: "/admin", icon: "LayoutDashboard" };
  const navItemsWithDashboard = user
    ? [...navigationItems, dashboardNavItem]
    : navigationItems;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check for user authentication
    const checkAuth = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkAuth();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/20 backdrop-blur-lg ${
        isScrolled ? "shadow-brand border-b border-slate-200/50" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/homepage"
            className="flex items-center space-x-3 group"
            onClick={closeMenu}
          >
            <div className="relative flex items-center space-x-3">
              <img
                src={"/Kayease-black.png"}
                alt="Kayease Logo"
                className="w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 object-contain rounded-lg transition-all duration-300"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItemsWithDashboard.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                  isActivePath(item.path)
                    ? "text-primary bg-primary/5"
                    : "text-text-secondary hover:text-text-primary hover:bg-muted"
                }`}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Icon
                    name={item.icon}
                    size={16}
                    className={`transition-colors duration-300 ${
                      isActivePath(item.path) ? "text-primary" : "text-black"
                    }`}
                  />
                  <span className="text-black">{item.name}</span>
                </span>
                {isActivePath(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-1 bg-primary rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={14}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                className="hidden md:flex cta-button text-white font-medium"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={16}
              >
                Start Project
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Icon
                name={isMenuOpen ? "X" : "Menu"}
                size={24}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-brand-lg transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-2">
            {(user ? [...navigationItems, dashboardNavItem] : navigationItems).map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActivePath(item.path)
                    ? "text-primary bg-primary/5 border-l-4 border-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-muted"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  className={`transition-colors duration-300 ${
                    isActivePath(item.path) ? "text-primary" : "text-current"
                  }`}
                />
                <span>{item.name}</span>
                {isActivePath(item.path) && (
                  <Icon
                    name="ChevronRight"
                    size={16}
                    className="ml-auto text-primary"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <Button
              variant="default"
              fullWidth
              className="cta-button text-white font-medium"
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={16}
            >
              Start Your Project
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeMenu}
        />
      )}
    </header>
  );
};

export default Header;
