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

export {toggleDrawer, setPageTitle};