import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>
            Accueil
          </Link>
        </li>

        <li style={styles.navItem}>
          <Link to="/create" style={styles.navLink}>
            Créer un article
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
nav: {
    backgroundColor: 'black',
    padding: '13px'
    },
navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0
},

navItem: {
    margin: '0 10px',
},
navLink:{
    color: 'white',
    textDecoration: 'none',
    fontSize: '1em'
}

}

export default Navbar;
