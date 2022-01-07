import React, {useState} from 'react'
import Options from './Options'
import { useOrderDetails } from '../../context/OrderDetails';
export default function OrderEntry() {
    
    const [orderDetails] = useOrderDetails();
    return (
        <div>
            <Options optionType={'scoops'}></Options>
            <Options optionType={'toppings'}></Options>
            <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
        </div>
    )
}
