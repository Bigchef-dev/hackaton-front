export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  };
  return date.toLocaleDateString('fr-FR', options);
};

export const formatDateShort = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short'
  };
  return date.toLocaleDateString('fr-FR', options);
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};