import { TrackingResult } from "@/types/shipengine";
import { ShippingAddress, ShippingProduct } from "@/types/shipengine";
import ShipEngine from "shipengine"
import { CustomsItem } from "shipengine/esm/create-label-from-shipment-details/types/private-request";


if (!process.env.SHIPENGINE_SANDBOX_KEY) {
    throw new Error('Missing environment variable: SHIPENGINE_SANDBOX_KEY');
}

export const shipEngine = new ShipEngine(process.env.SHIPENGINE_SANDBOX_KEY)


export const getRates = async (address: ShippingAddress, products: ShippingProduct[]) => {
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
                    phone: "000-800-919-0566",
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
                }],
                customs: {
                    nonDelivery: 'return_to_sender',
                    contents: 'merchandise',
                    customsItems: products as CustomsItem[]
                }
            }
        })
        console.log(response.rateResponse)

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

    } catch (error) {
        console.log(error)
        return (error as Error).message
    }
}

export const trackParcel = async (params: { carrierCode: string, trackingNumber: string }) => {
    try {

        const response = await shipEngine.trackUsingCarrierCodeAndTrackingNumber(params)
        return response

    } catch (error) {
        console.log(error)
        return (error as Error).message
    }
}


export const sampleTrackingResponse: TrackingResult = {
    trackingNumber: "1Z932R800392060079",
    statusCode: "DE",
    // carrierCode: "dhl_express",
    // carrierId: 0,
    statusDescription: "Delivered",
    // statusDetailDescription: "Your parcel has been successfully delivered.",
    carrierStatusCode: '1',
    carrierDetailCode: "OT",
    carrierStatusDescription: "Your item was delivered in or at the mailbox at 9:10 am on March",
    shipDate: "2018-09-23T15:00:00.000Z",
    estimatedDeliveryDate: "2018-09-23T15:00:00.000Z",
    actualDeliveryDate: "2018-09-23T15:00:00.000Z",
    exceptionDescription: "string",
    events: [
        {
            occurredAt: "2018-09-23T15:00:00.000Z",
            carrierOccurredAt: "2018-09-23T15:00:00.000Z",
            description: "Delivered, In/At Mailbox",
            cityLocality: "AUSTIN",
            stateProvince: "TX",
            postalCode: '78756',
            countryCode: "CA",
            companyName: "Stamps.com",
            signer: "string",
            eventCode: "string",
            carrierDetailCode: "OT",
            statusCode: "IT",
            // statusDetailDescription: "Your shipment is on its way between the carrier hubs.",
            carrierStatusCode: '1',
            // carrierStatusDescription: "Your item was delivered in or at the mailbox at 9:10 am on March",
            latitude: -90,
            longitude: -180
        }
    ]
}