'use client';

export default function UserAvatar({ 
  user, 
  size = 'md', 
  className = '' 
}) {
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'xs':
        return 'w-6 h-6 text-xs';
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'md':
        return 'w-10 h-10 text-base';
      case 'lg':
        return 'w-12 h-12 text-lg';
      case 'xl':
        return 'w-16 h-16 text-xl';
      case '2xl':
        return 'w-20 h-20 text-2xl';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  const getColorClasses = (name) => {
    // Generate consistent color based on name
    const colors = [
      'bg-rose-100 text-rose-600',
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-yellow-100 text-yellow-600',
      'bg-purple-100 text-purple-600',
      'bg-pink-100 text-pink-600',
      'bg-indigo-100 text-indigo-600',
      'bg-teal-100 text-teal-600',
    ];
    
    if (!name) return colors[0];
    
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  if (user?.image) {
    return (
      <img
        src={user.image}
        alt={user.name || 'User'}
        className={`rounded-full object-cover ${getSizeClasses(size)} ${className}`}
      />
    );
  }

  return (
    <div 
      className={`rounded-full flex items-center justify-center font-semibold ${getSizeClasses(size)} ${getColorClasses(user?.name)} ${className}`}
    >
      {getInitials(user?.name)}
    </div>
  );
} 