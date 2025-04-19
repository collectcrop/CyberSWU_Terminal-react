import { useEffect } from 'react';

const Toast = ({ message, type = 'error', duration = 2000, onClose, onComplete}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
      onComplete?.(); // 完成后执行额外操作（如跳转）
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, onComplete]);

  const bgColor = {
    error: 'bg-red-500',
    success: 'bg-green-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }[type];

  return (
    <div className={`text-white mt-3 px-4 py-2 rounded shadow-lg ${bgColor} animate-fade-in`}>
      <div className="flex justify-center items-center">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
