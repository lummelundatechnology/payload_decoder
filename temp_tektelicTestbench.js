let DecodePrefixPayload = function (dataStr, decodeConfig) {
    var decodedData = {
        payloadData: {},
        metricsData: {},
    };

    var buf = Buffer.from(dataStr, "hex");

    let typeSize = decodeConfig.typeSize || 1;


    for (let i = 0; i < buf.length; i += typeSize) {
        let type = "0x" + buf.toString("hex", i, i + typeSize); // Read first typeSize bytes of next value (unsure if this should be Int or UInt, but probably doesn't matter at the moment). Could be fixed by using substring on dataStr instead for completely unambiguous indexing
        let typeCfg = decodeConfig.typeTable[type];

        if (typeof typeCfg == "undefined") {
            throw "Could not decode value, type " + type.toString() + " (0x" + type.toString(16) + "): Has no typeCfg";
        }

        if (typeCfg.ignore) {
            i += typeCfg.numBytes;
            continue;
        }

        if (typeCfg.printDebug) {
            node.warn("DEBUG INFO FOR TYPE: " + type.toString() + " (0x" + type.toString(16) + ")\n" + "Buffer offset (in bytes): " + i.toString() + "\n" + "Next 4 bytes (hex): 0x" + buf.readUInt32BE(i).toString(16));
        }

        if (typeCfg.faultyType) {
            throw "Could not decode value, type " + type.toString() + " (0x" + type.toString(16) + "): Unknown type (No known decode format)";
        }

        if (typeCfg.unimplemented) {
            throw "Could not decode value, type " + type.toString() + " (0x" + type.toString(16) + "): Type decode is not implemented";
        }

        // Does this type have multiple values?
        if (typeCfg.numValues && typeCfg.numValues > 1) {
            for (const innerValueCfg of typeCfg.valueCfgs) {
                // Check if buffer function is correct
                if (!innerValueCfg.bufferF) {
                    throw "Could not decode value, type " + type.toString() + " (0x" + type.toString(16) + ") is not configured with a bufferFunction!";
                }

                let dataLength = innerValueCfg.numBytes;
                let value = buf[innerValueCfg.bufferF](i + typeSize, dataLength);

                let vendorCS = innerValueCfg.vendorConversionScale || 1; // "Default operator" (or more commonly, OR) If first value is falsy, return the second value

                decodedData.payloadData[innerValueCfg.vendorName] = value * vendorCS;

                i += dataLength;
            }

            continue;
        }

        // Check if buffer function is correct
        if (!typeCfg.bufferF) {
            throw "Could not decode value, type " + type.toString() + " (0x" + type.toString(16) + ") is not configured with a bufferFunction!";
        }

        let dataLength = typeCfg.numBytes;
        let value = buf[typeCfg.bufferF](i + typeSize, dataLength);

        let vendorCS = typeCfg.vendorConversionScale || 1; // "Default operator" (or more commonly, OR) If first value is falsy, return the second value
        // vendorCS = vendorCS < 1 ? 1/vendorCS

        let ourCS = typeCfg.ourConversionScale || 1;

        decodedData.payloadData[typeCfg.vendorName] = value * vendorCS;
        decodedData.metricsData[typeCfg.ourName] = decodedData.payloadData[typeCfg.vendorName] * ourCS;

        // node.warn({"dataStr":dataStr, "typeCfg":typeCfg, "value":value})

        i += dataLength;
    }

    return decodedData;
};

let decodeConfig = {
    payloadFormat: "PrefixedValues",
    typeSize: 2,

    typeTable: {
        "0x00ff": {
            // Battery voltage
            vendorName: "battery_voltage",
            bufferF: "readIntBE",
            vendorConversionScale: 0.01,
            numBytes: 2,
        },

        "0x0100": {
            // Reed switch state
            vendorName: "reed_state",
            bufferF: "readUIntBE",
            numBytes: 1,
        },

        "0x0200": {
            // Light detected
            vendorName: "light_detected",
            bufferF: "readUIntBE",
            numBytes: 1,
        },

        "0x0367": {
            // Temperature
            vendorName: "ambient_temperature",
            bufferF: "readIntBE",
            vendorConversionScale: 0.1,
            numBytes: 2,
        },

        "0x0468": {
            // Relative humidity
            vendorName: "relative_humidity",
            bufferF: "readUIntBE",
            vendorConversionScale: 0.5,
            numBytes: 1,
        },

        "0x0502": {
            // Acceleration magnitude
            vendorName: "impact_magnitude",
            bufferF: "readUIntBE",
            vendorConversionScale: 0.001,
            numBytes: 2,
        },

        "0x0771": {
            // Acceleration vector
            unimplemented: true,
            /*let acceleration = { xaxis: null, yaxis: null, zaxis: null }
            decoded_data.acceleration = acceleration
            decoded_data.acceleration.xaxis = "bufferF":"readIntBE",
            "vendorConversionScale":0.001,
            decoded_data.acceleration.yaxis = "bufferF":"readIntBE",
            "vendorConversionScale":0.001,
            decoded_data.acceleration.zaxis = "bufferF":"readIntBE",
            "vendorConversionScale":0.001,
            "numBytes": 6,*/
        },

        "0x0804": {
            // Reed switch count
            vendorName: "reed_count",
            bufferF: "readUIntBE",
            numBytes: 2,
        },

        "0x0900": {
            // Moisture
            vendorName: "moisture",
            bufferF: "readUIntBE",
            numBytes: 1,
        },
        "0x0a00": {
            // Motion
            vendorName: "motion_event_state",
            bufferF: "readUIntBE",
            numBytes: 1,
        },
        "0x0b67": {
            // MCU temperature
            vendorName: "mcu_temperature",
            bufferF: "readIntBE",
            vendorConversionScale: 0.1,
            numBytes: 2,
        },
        "0x0c00": {
            // Impact alarm
            vendorName: "impact_alarm",
            bufferF: "readUIntBE",
            numBytes: 1,
        },
        "0x0d04": {
            // Motion event count
            vendorName: "motion_event_count",
            bufferF: "readUIntBE",

            numBytes: 2,
        },
        "0x0e00": {
            // External connector state
            vendorName: "extconnector_state",
            bufferF: "readUIntBE",

            numBytes: 1,
        },
        "0x0f04": {
            // External connector count
            vendorName: "extconnector_count",
            bufferF: "readUIntBE",

            numBytes: 2,
        },

        "0x1002": {
            // Ambient light intensity
            vendorName: "light_intensity",
            bufferF: "readUIntBE",

            numBytes: 1,
        },

        "0x1102": {
            // External connector analog
            vendorName: "extconnector_analog",
            bufferF: "readUIntBE",
            vendorConversionScale: 0.001,
            numBytes: 2,
        },
    },
};

let testData = [
    {
        payload: "036700d40468350a00000d04000000ff012e",
        payloadData: { raw: "[3,103,0,212,4,104,53,10,0,0,13,4,0,0,0,255,1,46]", port: 10, ambient_temperature: 21.200000000000003, relative_humidity: 26.5, motion_event_state: 0, motion_event_count: 0, battery_voltage: 3.02 },
        metricsData: { Temperature: 21.200000000000003, Humidity: 26.5, Presence: 0, Occupancy: 0, Voltage: 3.02 },
    },
    { payload: "0a00ff", payloadData: { raw: "[10,0,255]", port: 10, motion_event_state: 1 }, metricsData: { Presence: 1, Occupancy: 1 } },
    {
        payload: "036700d40468360a00ff0d04000100ff012e",
        payloadData: { raw: "[3,103,0,212,4,104,54,10,0,255,13,4,0,1,0,255,1,46]", port: 10, ambient_temperature: 21.200000000000003, relative_humidity: 27, motion_event_state: 1, motion_event_count: 1, battery_voltage: 3.02 },
        metricsData: { Temperature: 21.200000000000003, Humidity: 27, Presence: 1, Occupancy: 1, Voltage: 3.02 },
    },
    { payload: "0a0000", payloadData: { raw: "[10,0,0]", port: 10, motion_event_state: 0 }, metricsData: { Presence: 0, Occupancy: 0 } },
    { payload: "0a00ff", payloadData: { raw: "[10,0,255]", port: 10, motion_event_state: 1 }, metricsData: { Presence: 1, Occupancy: 1 } },
    { payload: "0a0000", payloadData: { raw: "[10,0,0]", port: 10, motion_event_state: 0 }, metricsData: { Presence: 0, Occupancy: 0 } },
    {
        payload: "036700d80468380a00000d04000100ff012e",
        payloadData: { raw: "[3,103,0,216,4,104,56,10,0,0,13,4,0,1,0,255,1,46]", port: 10, ambient_temperature: 21.6, relative_humidity: 28, motion_event_state: 0, motion_event_count: 1, battery_voltage: 3.02 },
        metricsData: { Temperature: 21.6, Humidity: 28, Presence: 0, Occupancy: 0, Voltage: 3.02 },
    },
    {
        payload: "036700d70468360a00000d04000000ff012e",
        payloadData: { raw: "[3,103,0,215,4,104,54,10,0,0,13,4,0,0,0,255,1,46]", port: 10, ambient_temperature: 21.5, relative_humidity: 27, motion_event_state: 0, motion_event_count: 0, battery_voltage: 3.02 },
        metricsData: { Temperature: 21.5, Humidity: 27, Presence: 0, Occupancy: 0, Voltage: 3.02 },
    },
    {
        payload: "036700d60468360a00000d04000000ff012e",
        payloadData: { raw: "[3,103,0,214,4,104,54,10,0,0,13,4,0,0,0,255,1,46]", port: 10, ambient_temperature: 21.400000000000002, relative_humidity: 27, motion_event_state: 0, motion_event_count: 0, battery_voltage: 3.02 },
        metricsData: { Temperature: 21.400000000000002, Humidity: 27, Presence: 0, Occupancy: 0, Voltage: 3.02 },
    },
    {
        payload: "036700d60468350a00000d04000000ff012e",
        payloadData: { raw: "[3,103,0,214,4,104,53,10,0,0,13,4,0,0,0,255,1,46]", port: 10, ambient_temperature: 21.400000000000002, relative_humidity: 26.5, motion_event_state: 0, motion_event_count: 0, battery_voltage: 3.02 },
        metricsData: { Temperature: 21.400000000000002, Humidity: 26.5, Presence: 0, Occupancy: 0, Voltage: 3.02 },
    },
];

let f = DecodePrefixPayload;

for (var i = 0; i < testData.length; i++) {
    let testDatum = testData[i];
    // let payload = Buffer.from(testDatum.payload, "hex");
    // let returnPD = f(payload, 10);

    let returnPD = f(testDatum.payload, decodeConfig).payloadData;

    // console.log(returnPD);

    if (returnPD.motion_event_state) {
      returnPD.motion_event_state = returnPD.motion_event_state > 0 ? 1 : 0;
    }

    for (var t in testDatum.payloadData) {
        if (testDatum.payloadData.hasOwnProperty(t)) {
          if(t == "raw" || t == "port") { continue; }
            if (returnPD[t] !== testDatum.payloadData[t]) {
                console.log("Error in conversion!");
                console.log(t);
                console.log(returnPD[t]);
                console.log(testDatum.payloadData[t]);
                console.log("-----------");
            }
        }
    }
}
