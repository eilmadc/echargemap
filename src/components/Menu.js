import * as React from 'react';

/*interface IMenuProps {
    isMenuOpen;
}*/

export const Menu = ({ isMenuOpen }) => {

    return (
      <div className={`app-menu ${isMenuOpen ? 'menu-open' : ''}`} >
        <h2>Example</h2>
      </div>
    );
}