/* eslint-disable prettier/prettier */
export const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  
    return formattedTime;
  };

  export const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };