import React from 'react';
import styles from './styles.module.css';
import { Dropdown } from 'react-bootstrap';

export default function Drop(props) {
    const { availableCars, currentCar, setCurrentCar } = props;

    const renderAvailableCars = (item, index) => {
        return <Dropdown.Item className={styles.dropMenuItem} onClick={() => {setCurrentCar(item)}}>{item}</Dropdown.Item>
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" className={styles.drop}>
                {currentCar}
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.dropMenu}>
                {availableCars && availableCars.map(renderAvailableCars)}
            </Dropdown.Menu>
        </Dropdown>
    )
}
