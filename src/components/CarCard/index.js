import React from 'react';
import styles from './styles.module.css';

export default function CarCard(props) {
    const { title, modelYear, vin, images, characteristics, price, options, status } = props;

    const renderCharacteristics = (item, index) => {
        return (
            <div className={styles.characteristic}>
                <div className={styles.characteristicTitle}>{item.title}</div>
                <div className={styles.characteristicValue}>{item.value}</div>
            </div>
        );
    }

    const renderImages = (image, index) => {
        return (
            <>
            <img src={image.url} className={styles.carImage}/>
        <img src={image.url} className={styles.carImage}/></>
    )
    }

    const renderOptions = (option, index, options) => {
        if (options.length > 1) {
            return index == 0 ? `${option.optionName}, ` : index == 1 ? `${option.optionName} ` : '';
        }
        else {
            return `${option.optionName} `;
        }
    }

    const inclineByNumber = (number) => {
        let lastNumber = number.toString().split('').pop();
        switch (Number(lastNumber)) {
            case 0: case 5: case 6: case 7: case 8: case 9: return 'пакетов';
            case 1: return 'пакет';
            case 2: case 3: case 4: return 'пакета';
            default: return 'пакетов'
        }
    }

    const addSpacesToNumber = (str) => {
        str = str.toString();
        return str.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
    }

    return (
       <div className={styles.carCard}>
           <div className={styles.title}>{title}<sup className={styles.modelYear}>{modelYear}</sup></div>
           <div className={styles.vin}>{vin}</div>
           <div className={styles.images}>
               {images.map(renderImages)}
           </div>
           <div className={styles.characteristics}>
               {characteristics.map(renderCharacteristics)}
           </div>
           <div className={styles.options} type={!options.length ? 'hidden' : null}>
               <div className={styles.characteristicTitle}>Пакеты</div>
               <div className={styles.optionsList}>
                   <div className={styles.optionsValue}>{options.map(renderOptions)}</div>
                   <div className={styles.optionsMore}>(+еще {options.length} {inclineByNumber(options.length)})</div>
               </div>
           </div>
           <div className={styles.total}>
               <div className={styles.financial}>
                   <div className={styles.price}>{addSpacesToNumber(price)}<span style={{color: 'black'}}> ₽</span></div>
                   {options.length > 0 && <div className={styles.additionalOptionsResult}>Доп. опции на <span style={{color: '#22BF86'}}>999 999</span>₽</div>}
               </div>
               <div className={styles.actions}>
                   <button className={styles.buyButton} type={status === 'В поставке' || status === 'Резерв' || status === 'Продан' ? 'inactive' : null}>{status}</button>
               </div>
           </div>
       </div>
   )
}
