import { useState } from 'react';
import BoardsList from '../../boards/BoardsList';
import classes from './SideMenu.module.css';

function SideMenu(props) {

    const [menuClasses, setMenuClasses] = useState(classes.menu);
    const [visible, setVisible] = useState(true);

    function toggleSidebar() {

        if (visible) {
            setMenuClasses(`${classes.menu} ${classes.hiddenMenu}`);
            setVisible(false);
            props.setSidebarVisible(false);
        }
        else {
            setMenuClasses(`${classes.menu}`);
            setVisible(true);
            props.setSidebarVisible(true);
        }
    }

    return (
        <div className={menuClasses} >
            <div className={classes.logo}>
                <h1>Task Manager</h1>
            </div>
            <BoardsList />
            <button onClick={toggleSidebar} className={classes.toggleButton}>
                <span className='material-icons'>{visible ? 'visibility_off' : 'visibility'}</span>
                <span>{visible ? 'Hide Sidebar' : 'Show Sidebar'}</span>
            </button>

        </div>
    )
}

export default SideMenu;