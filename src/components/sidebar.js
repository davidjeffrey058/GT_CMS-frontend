// components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { toggleDrawer } from '../util/methods';

const navItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard' },
    { name: 'Members', path: '/members', icon: 'group' },
    { name: 'Events', path: '/events', icon: 'event'},
    { name: 'Finance', path: '/finance', icon: 'finance' },
    { name: 'Users', path: '/users', icon: 'person' }
];

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <span
         className='material-symbols-outlined close' onClick={toggleDrawer}>
            close
        </span>
        <div className='d-flex align-items-center gap-2 mb-4'>
            <img style={{
                width: '50px',
                aspectRatio: '1',
                // backgroundColor: '#f0f0f0'
            }} src="/images/logo.png" alt="" />
            <h3>GTCMS</h3>
        </div>
        {navItems.map(item => (
            <NavLink 
                key={item.path}
                className='nav_link'
                to={item.path}
                onClick={toggleDrawer}
            >
                <span className="material-symbols-outlined">{item.icon}</span>
                <p>{item.name}</p>
            </NavLink>
        ))}
    </div>
  );
}