import { useState, useEffect, useRef } from 'react';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../layout/container';
import { logout } from '../../services/logout';

interface Props {
  children: React.ReactNode
}

const UserDropdown = ({children}: Props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      location.reload();
    } catch {}
  }

  return (
    <div className="relative text-left flex items-end" ref={dropdownRef}>
      
      {/* Trigger */}
      <button onClick={() => setIsOpen(!isOpen)} className="">
        {children}
      </button>

      {/* Dropdown */}
      <div className={`
        absolute right-0 top-0 mt-6 shadow-lg transition-all duration-200 ease-out
        ${isOpen
          ? 'transform opacity-100 scale-100 translate-y-0 pointer-events-auto' 
          : 'transform opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }
      `}>
        <Container>
          <div className="flex flex-col gap-1 py-1">
            <button className="w-full hover:bg-black/5 dark:hover:bg-white/3 transition" onClick={() => { 
              setIsOpen(false);
              navigate("/profile");
            }}>
              <div className="flex items-left px-5 pr-6 py-2">
                <User className="size-5 mr-2" />
                <span>Profile</span>
              </div>
            </button>

            <button className="w-full hover:bg-black/5 dark:hover:bg-white/3 transition" onClick={() => {
              handleLogout();
            }}>
              <div className="flex items-center px-5 pr-6 py-2">
                <LogOut className="size-5 mr-2" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </Container>
      </div>

    </div>
  );
}

export { UserDropdown }