const toggleDrawer = () => {
    const sidebar = document.querySelector('.mobile_drawer');
    const background = document.querySelector('.drw_bg');

    background.classList.toggle('active');
    sidebar.classList.toggle('active');
}

const setPageTitle = (title, replace = false) => {
    if (replace) {
        document.title = title;
    } else {
        document.title = `${title} - GTCMS`;
    }
}

const capitalizeWords = (text) => {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

function formatDateTime(dateString) {
  const date = new Date(dateString);

  // YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // 12-hour time with AM/PM
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 -> 12

  const formattedTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

  return { formattedDate, formattedTime };
}

const combineDateTime = (date, time) => {
    if (!date || !time) return;

    const localDateTime = new Date(`${date}T${time}`);
    const isoString = localDateTime.toISOString();

    return isoString;
};

export {
    toggleDrawer,
    setPageTitle, 
    capitalizeWords, 
    formatDateTime, 
    combineDateTime
};