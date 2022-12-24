
import burgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css';

const logo: any = (props: any) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;