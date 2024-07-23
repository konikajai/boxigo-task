import React, { useState, useEffect } from 'react';

const containerStyle = {
    width: '70%'
};

const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
};

const titleStyle = {
    color: 'red',
    display: 'flex',
    alignItems: 'center'
};

const LivingRoom = () => {
    const [data, setData] = useState({ Customer_Estimate_Flow: [] });

    useEffect(() => {
        fetch('http://test.api.boxigo.in/sample-data/')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Data:", data);
                setData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const aggregateItems = (items) => {
        const aggregated = {};

        items.forEach(item => {
            const key = `${item.displayName}-${item.type || ''}`;
            if (!aggregated[key]) {
                aggregated[key] = { ...item, quantity: 0 };
            }
            aggregated[key].quantity += item.quantity;
        });

        return Object.values(aggregated);
    };

    const furnitureItems = data.Customer_Estimate_Flow.flatMap(customer =>
        customer.items.inventory
            .filter(item => item.name === "furniture")
            .flatMap(item => item.category
                .flatMap(category => category.items
                    .map(furniture => ({
                        displayName: furniture.displayName,
                        quantity: furniture.qty,
                        type: furniture.typeOptions
                    }))
                )
            )
    );

    const electricalItems = data.Customer_Estimate_Flow.flatMap(customer =>
        customer.items.inventory
            .filter(item => item.name === "electronics")
            .flatMap(item => item.category
                .flatMap(category => category.items
                    .map(electrical => ({
                        displayName: electrical.displayName,
                        quantity: electrical.qty,
                        description: electrical.description
                    }))
                )
            )
    );

    const fragileItems = data.Customer_Estimate_Flow.flatMap(customer =>
        customer.items.inventory
            .filter(item => item.name === "other_appliances")
            .flatMap(item => item.category
                .flatMap(category => category.items
                    .map(fragile => ({
                        displayName: fragile.displayName,
                        quantity: fragile.qty
                    }))
                )
            )
    );

    const aggregatedFurnitureItems = aggregateItems(furnitureItems);
    const aggregatedElectricalItems = aggregateItems(electricalItems);
    const aggregatedFragileItems = aggregateItems(fragileItems);

    const totalFurnitureQuantity = aggregatedFurnitureItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalElectricalQuantity = aggregatedElectricalItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalFragileQuantity = aggregatedFragileItems.reduce((sum, item) => sum + item.quantity, 0);

    const totalQuantity = totalFurnitureQuantity + totalElectricalQuantity + totalFragileQuantity;

    return (
        <div style={containerStyle}>
            <h6 style={titleStyle}>
                Living Room 
                <span style={{ marginLeft: '10px', color: 'red' }}>
                   {totalQuantity}
                </span>
            </h6>
            <div className='d-flex justify-content-between mt-4'>
                <div style={columnStyle}>
                    <h5 className='mb-3' style={{ color: 'red' }}>Furnitures</h5>
                    {aggregatedFurnitureItems.map((item, index) => (
                        item.quantity > 0 && (
                            <div key={index} className='mb-3'>
                                <div className='d-flex justify-content-between'>
                                    <div>{item.displayName}</div>
                                    <div style={{ marginLeft: '20px' }}>{item.quantity}</div>
                                </div>
                                <div>{item.type}</div>
                            </div>
                        )
                    ))}
                </div>
                <div style={columnStyle}>
                    <h5 className='mb-3' style={{ color: 'red' }}>Electricals</h5>
                    {aggregatedElectricalItems.map((item, index) => (
                        item.quantity > 0 && (
                            <div key={index} className='mb-3'>
                                <div className='d-flex justify-content-between'>
                                    <div>{item.displayName}</div>
                                    <div style={{ marginLeft: '20px' }}>{item.quantity}</div>
                                </div>
                                <div>{item.description}</div>
                            </div>
                        )
                    ))}
                </div>
                <div style={columnStyle}>
                    <h5 className='mb-3' style={{ color: 'red' }}>Fragile</h5>
                    {aggregatedFragileItems.map((item, index) => (
                        item.quantity > 0 && (
                            <div key={index} className='mb-3'>
                                <div>{item.displayName}</div>
                                <div style={{ marginLeft: '20px' }}>{item.quantity}</div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LivingRoom;
