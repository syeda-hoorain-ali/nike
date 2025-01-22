import ShipEngine from "shipengine"


if (!process.env.SHIPENGINE_SANDBOX_KEY) {
    throw new Error('Envoirement variables are not set');
}

export const shipEngine = new ShipEngine(process.env.SHIPENGINE_SANDBOX_KEY)

export interface ShippingAddress {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    cityLocality: string;
    stateProvince: string;
    postalCode: string;
    countryCode: string;
    addressResidentialIndicator: "unknown" | "yes" | "no";
}


export const getRates = async (address: ShippingAddress) => {
    try {
        const response = await shipEngine.getRatesWithShipmentDetails({
            rateOptions: {
                carrierIds: [
                    process.env.SHIPENGINE_STAMPS_COURIER || '',
                    process.env.SHIPENGINE_UPS_COURIER || '',
                    process.env.SHIPENGINE_FEDEX_COURIER || '',
                    process.env.SHIPENGINE_DHL_COURIER || ''
                ].filter(Boolean)
            },
            shipment: {
                validateAddress: 'no_validation',
                shipTo: address,
                shipFrom: {
                    companyName: "Nike",
                    name: "Hooraain Ali",
                    phone: "111-111-1111",
                    addressLine1: "4009 Marathon Blvd",
                    addressLine2: "Suite 300",
                    cityLocality: "Austin",
                    stateProvince: "TX",
                    postalCode: "78756",
                    countryCode: "US",
                    addressResidentialIndicator: "no",
                },
                packages: [{
                    weight: {
                        value: 1.0,
                        unit: 'ounce'
                    }
                }]
            }
        })

        return response.rateResponse.rates || []

    } catch (error) {
        console.log(error)
        return []
    }
}

export const createLabel = async (rateId: string) => {
    try {
        const label = await shipEngine.createLabelFromRate({ rateId })
        return label
        
        // return {
        //     createdAt: label.createdAt,
        //     labelDownload: label.labelDownload,
        //     labelId: label.labelId,
        //     shipDate: label.shipDate,
        //     shipmentCost: label.shipmentCost,
        //     shipmentId: label.shipmentId,
        //     status: label.status,
        //     trackable: label.trackable,
        //     trackingNumber: label.trackingNumber,
        //     trackingStatus: label.trackingStatus,
        // };

    } catch (error) {
        console.log(error)
        return null
    }
}

export const trackParcel = async (labelId: string) => {
    try {

        const response = await shipEngine.trackUsingLabelId(labelId)
        return response


    } catch (error) {
        console.log(error)
        return null
    }
}


// Rates

// const a = {
//     "rateId": "se-51907525",
//     "rateType": "shipment",
//     "carrierId": "se-1621318",
//     "shippingAmount": {
//         "currency": "usd",
//         "amount": 34.69
//     },
//     "insuranceAmount": {
//         "currency": "usd",
//         "amount": 0
//     },
//     "confirmationAmount": {
//         "currency": "usd",
//         "amount": 0
//     },
//     "otherAmount": {
//         "currency": "usd",
//         "amount": 14.94
//     },
//     "taxAmount": null,
//     "zone": null,
//     "packageType": null,
//     "deliveryDays": 3,
//     "guaranteedService": true,
//     "estimatedDeliveryDate": "2025-01-17T23:00:00Z",
//     "carrierDeliveryDays": "Friday 1/17 by 11:00 PM",
//     "shipDate": "2025-01-14T00:00:00Z",
//     "negotiatedRate": false,
//     "serviceType": "UPS 3 Day Select®",
//     "serviceCode": "ups_3_day_select",
//     "trackable": true,
//     "carrierCode": "ups",
//     "carrierNickname": "ShipEngine Test Account - UPS",
//     "carrierFriendlyName": "UPS",
//     "validationStatus": "valid",
//     "warningMessages": [],
//     "errorMessages": []
// }

// const b = {
//     "rateId": "se-51907536",
//     "rateType": "shipment",
//     "carrierId": "se-1621317",
//     "shippingAmount": {
//         "currency": "usd",
//         "amount": 4.54
//     },
//     "insuranceAmount": {
//         "currency": "usd",
//         "amount": 0
//     },
//     "confirmationAmount": {
//         "currency": "usd",
//         "amount": 0
//     },
//     "otherAmount": {
//         "currency": "usd",
//         "amount": 0
//     },
//     "taxAmount": null,
//     "zone": 7,
//     "packageType": "package",
//     "deliveryDays": 4,
//     "guaranteedService": false,
//     "estimatedDeliveryDate": "2025-01-18T00:00:00Z",
//     "carrierDeliveryDays": "4",
//     "shipDate": "2025-01-14T00:00:00Z",
//     "negotiatedRate": false,
//     "serviceType": "USPS First Class Mail",
//     "serviceCode": "usps_first_class_mail",
//     "trackable": true,
//     "carrierCode": "stamps_com",
//     "carrierNickname": "ShipEngine Test Account - Stamps.com",
//     "carrierFriendlyName": "Stamps.com",
//     "validationStatus": "valid",
//     "warningMessages": [],
//     "errorMessages": []
// }
