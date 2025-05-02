import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Alert = ({ type, message }) => {
  const alertTypes = {
    error: {
      bg: 'bg-red-50',
      icon: <ExclamationCircleIcon className="h-5 w-5 text-red-400" />,
      text: 'text-red-800',
    },
    success: {
      bg: 'bg-green-50',
      icon: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
      text: 'text-green-800',
    },
  };

  const alertConfig = alertTypes[type] || alertTypes.error;

  return (
    <div className={`rounded-md ${alertConfig.bg} p-4 mb-4`}>
      <div className="flex">
        <div className="flex-shrink-0">{alertConfig.icon}</div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${alertConfig.text}`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;