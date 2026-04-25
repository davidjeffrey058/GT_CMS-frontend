const toggleDrawer = () => {
    const sidebar = document.querySelector('.mobile_drawer');
    const background = document.querySelector('.drw_bg');

    background.classList.toggle('active');
    sidebar.classList.toggle('active');
}
 
export {toggleDrawer};