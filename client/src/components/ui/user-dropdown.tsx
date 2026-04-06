import { useState, useEffect, useRef } from 'react';
import { LogOut, ShoppingBag, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../layout/container';
import { logout } from '../../services/auth';
import { ButtonHeaderDropDown } from './buttons-header';

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

  const handleProfile = () => {
    setIsOpen(false);
    navigate("/account?tab=profile");
  }

  const handleOrders = () => {
    setIsOpen(false);
    navigate("/account?tab=orders");
  }

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
        absolute right-0 top-0 mt-6 shadow-lg transition-all duration-200 ease-out rounded-lg
        ${isOpen
          ? 'transform opacity-100 scale-100 translate-y-0 pointer-events-auto' 
          : 'transform opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }
      `}>
        <Container>
          <div className="flex flex-col gap-1 py-1">
            <ButtonHeaderDropDown icon={<User size={19} />} label="Profile" action={() => handleProfile()} />
            <ButtonHeaderDropDown icon={<ShoppingBag size={19} />} label="Orders" action={() => handleOrders()} />
            <ButtonHeaderDropDown icon={<LogOut size={19} />} label="Logout" action={() => handleLogout()} />
          </div>
        </Container>
      </div>

    </div>
  );
}

export { UserDropdown }