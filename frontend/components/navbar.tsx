"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, BarChart3, LayoutDashboard, Settings, LogOut, FileText } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { RootState } from "@/redux/store";
import { logoutAndClearTimer } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector, useDispatch } from 'react-redux';

export function Navbar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isHomePage = pathname === "/";
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userDetails = useSelector((state: RootState) => state.user);

  const isLoggedIn = typeof accessToken === "string" && accessToken.trim() !== "";
  const userName = userDetails?.username || "Analyst";
  const userEmail = userDetails?.email || "analyst@finxplain.ai";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getUserInitials = () => {
    if (!userDetails?.username) return "A";
    const names = userDetails.username.trim().split(" ");
    return (names[0][0] + (names[1]?.[0] || "")).toUpperCase();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const middle = element.getBoundingClientRect().top + window.pageYOffset - window.innerHeight / 2;
      window.scrollTo({ top: middle, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutAndClearTimer());
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BarChart3 className="h-7 w-7 text-teal-600" />
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                FinXplain <span className="text-teal-600">AI</span>
              </span>
            </Link>
          </div>

          {!isMobile && (
            <nav className="mx-6 flex items-center space-x-6">
              <Link href="/" className={`text-sm font-medium transition-colors hover:text-teal-600 ${pathname === '/' ? 'text-teal-600' : 'text-gray-500'}`}>
                Home
              </Link>
              {isHomePage ? (
                <>
                  <button onClick={() => scrollToSection("features")} className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600">Features</button>
                  <button onClick={() => scrollToSection("how-it-works")} className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600">Methodology</button>
                </>
              ) : (
                <>
                  <Link href="/frameworks" className={`text-sm font-medium transition-colors hover:text-teal-600 ${pathname === '/frameworks' ? 'text-teal-600' : 'text-gray-500'}`}>
                    Frameworks
                  </Link>
                  <Link href="/analysis" className={`text-sm font-medium transition-colors hover:text-teal-600 ${pathname === '/analysis' ? 'text-teal-600' : 'text-gray-500'}`}>
                    Analysis Engine
                  </Link>
                </>
              )}
            </nav>
          )}

          <div className="flex items-center space-x-2">
            {!isMobile ? (
              isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-slate-100 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-teal-600 text-white text-xs">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60 p-2">
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-semibold">{userName}</p>
                      <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Profile Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer flex items-center">
                        <FileText className="mr-2 h-4 w-4" /> My Reports
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 flex items-center">
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700" asChild>
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </div>
              )
            ) : (
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="container mx-auto px-4 pb-6 bg-white border-t animate-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-4 pt-4">
            <Link href="/" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/frameworks" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>Frameworks</Link>
            <Link href="/analysis" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>Analysis Engine</Link>
            
            <div className="border-t pt-4">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link href="/profile">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button className="bg-teal-600" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}