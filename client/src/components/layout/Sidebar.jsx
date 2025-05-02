import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  UserIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: HomeIcon,
      roles: ['candidate', 'recruiter', 'admin'],
    },
    {
      name: 'Jobs',
      path: '/dashboard/jobs',
      icon: BriefcaseIcon,
      roles: ['candidate', 'recruiter', 'admin'],
    },
    {
      name: 'Applications',
      path: '/dashboard/applications',
      icon: DocumentTextIcon,
      roles: ['candidate', 'recruiter', 'admin'],
    },
    {
      name: 'Companies',
      path: '/dashboard/companies',
      icon: BuildingOfficeIcon,
      roles: ['recruiter', 'admin'],
    },
    {
      name: 'Profile',
      path: '/dashboard/profile',
      icon: UserIcon,
      roles: ['candidate', 'recruiter', 'admin'],
    },
    {
      name: 'Settings',
      path: '/dashboard/settings',
      icon: CogIcon,
      roles: ['candidate', 'recruiter', 'admin'],
    },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-900">JobRecruitment</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navItems.map((item) => {
                if (!item.roles.includes(user?.role)) return null;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActive
                          ? 'text-indigo-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              onClick={logout}
              className="flex-shrink-0 w-full group block"
            >
              <div className="flex items-center">
                <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Sign out
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;