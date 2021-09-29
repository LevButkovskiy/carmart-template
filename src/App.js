import React, { useState, useEffect } from 'react';
import './App.css';
import styles from './styles.module.css'

import CarCard from './components/CarCard';
import Drop from './components/Drop';

const APIUrl = 'https://api.carmart.ru/cars/temp?page=1&perPage=24&isNew%5B0%5D=1&orderBy%5B0%5D%5Bfield%5D=year&orderBy%5B0%5D%5Bdirection%5D=desc&brand%5B0%5D=';

function App() {
    const [availableCars, setAvailableCars] = useState();
    const [cars, setCars] = useState();
    const [currentCar, setCurrentCar] = useState('');

    const getAllCars = () => {
        return new Promise((resolve, reject) => {
            fetch(APIUrl, {method: 'GET'})
                .then(response => response.json())
                .then((data) => resolve(data.meta.filters.brand))
                .catch(error => reject(error))
        })
    }

    const getCarsByModelName = (modelName) => {
        return new Promise((resolve, reject) => {
            fetch(`${APIUrl}${modelName}`, {method: 'GET'})
                .then(response => response.json())
                .then((data) => resolve(data.list))
                .catch((error) => reject(error))
        })
    }

    useEffect(() => {
        getAllCars()
            .then(
                availableCars => {
                    setAvailableCars(availableCars);
                    setCurrentCar(availableCars[0])
                },
                error => alert(error)
            )
    }, [])

    useEffect(() => {
        getCarsByModelName(currentCar)
            .then(
                (cars) => setCars(cars),
                (error) => alert(error)
            )
    }, [currentCar])

    const prepareStatus = (status) => {
        if (status === 'Свободно') {
            return 'Купить';
        }
        if (status === 'Заказ') {
            return 'Купить под заказ';
        }
        return status || '';
    }

    const renderCars = (car, index) => {
        return (
            <CarCard
                title={`${car.classifieds.description} ${car.feedData.equipmentName}`}
                modelYear={car.feedData.modelYear}
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
                            value: car.feedData.colorByClassifierName
                        },
                    ]
                }
                images={car.photobank.imgs}
                price={car.legacy.price}
                options={car.feedData.options || []}
                status={prepareStatus(car.setCarStatus && car.setCarStatus.status || car.classifieds.status)}
            />
        )
    }

    return (
        <div className={styles.app}>
            <Drop
                availableCars={availableCars}
                currentCar={currentCar}
                setCurrentCar={setCurrentCar}
            />
            <div className={styles.content}>
                {cars && cars.map(renderCars)}
            </div>
        </div>
    );
}

export default App;
