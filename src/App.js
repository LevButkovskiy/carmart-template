import React, { useState, useEffect } from 'react';
import './App.css';
import styles from './styles.module.css'
import CarCard from './components/CarCard';

const characteristics = [
    {
        title: 'Двигатель',
        value: '1.6л'
    },
    {
        title: 'КПП',
        value: 'Автоматическая'
    },
    {
        title: 'Цвет',
        value: 'Серебристо-зеленый'
    },
];

const APIUrl = 'https://api.carmart.ru/cars/temp?page=1&perPage=24&isNew%5B0%5D=1&orderBy%5B0%5D%5Bfield%5D=year&orderBy%5B0%5D%5Bdirection%5D=desc&brand%5B0%5D=Audi';
function App() {
    const [cars, setCars] = useState();

    useEffect(() => {
        fetch(APIUrl, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                setCars(data.list)
            })
            .catch(error => {
                console.log(error)
            })

    }, [])

    const prepareStatus = (status) => {
        if (status === 'Свободно') {
            return 'Купить';
        }
        if (status === 'Заказ') {
            return 'Купить под заказ';
        }
        return status
    }

    const renderCars = (car, index) => {
        console.log(car);
        return (
            <CarCard
                title={`${car.classifieds.description} ${car.feedData.equipmentName}`}
                modelYear={car.classifieds.modelYear}
                vin={car.vin}
                characteristics={
                    [
                        {
                            title: 'Двигатель',
                            value: `${car.feedData.equipmentVariantEngineCapacity / 1000} л / ${car.feedData.equipmentVariantEnginePower} лс / ${car.feedData.equipmentVariantFuelType}`
                        },
                        {
                            title: 'КПП / Привод',
                            value: `${car.feedData.equipmentVariantTransmissionType} / ${car.feedData.equipmentVariantDriveType}`
                        },
                        {
                            title: 'Цвет',
                            value: car.feedData.color
                        },
                    ]
                }
                images={car.photobank.imgs}
                price={car.legacy.price}
                color={car.feedData.colorByClassifierName}
                options={car.feedData.options}
                status={prepareStatus(car.setCarStatus.status)}
            />
        )
    }

    return (
        <div className={styles.app}>
            <div className={styles.content}>
                {cars && cars.map(renderCars)}
            </div>
        </div>
    );
}

export default App;
