// components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { toggleDrawer } from '../util/methods';

const navItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard' },
    { name: 'Members', path: '/members', icon: 'group' },
    { name: 'Users', path: '/users', icon: 'person' }
];

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <span
         className='material-symbols-outlined close' onClick={toggleDrawer}>
            close
        </span>
        <h3>GTCMS</h3>
        {navItems.map(item => (
            <NavLink 
                key={item.path}
                className='nav_link'
                to={item.path}
            >
                <span className="material-symbols-outlined">{item.icon}</span>
                <p>{item.name}</p>
            </NavLink>
        ))}
    </div>
  );
}