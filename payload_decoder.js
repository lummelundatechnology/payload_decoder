

////////////////////////////////////////////////////////////////////////////////////////
// Decode configurations ///////////////////////////////////////////////////////////////
// Later on, these should be set in msg.device.DecodeConfig later, instead of here


// Elsys DecodeConfig (PrefixedValues) ver 0.1
if(typeof this.elsysDecodeConfig == "undefined") {
	this.elsysDecodeConfig = {
	"payloadFormat": "PrefixedValues",


	"typeTable": { // INCOMPLETE

		0x01: { // TEMP = 0x01; //temp 2 bytes -3276.8°C -->3276.7°C
			"numBytes":2,

			// "valueType": "integer", // Specifying type, endianess, and sign is redundant if we specify buffer function below
			// "littleEndian":false, // Conversely, the below function name could be constructed through some simple logic with these values
			// "signed": true,

			"bufferF":"readInt16BE",

			"vendorConversionScale":0.1,	// Defaults to 1 if omitted
			"ourConversionScale": 1, 		// Defaults to 1 if omitted

			"vendorName":"temperature",
			"ourName":"Temperature"
		},
		0x02: { // RH = 0x02; //Humidity 1 byte  0-100%
			"numBytes":1,
			"bufferF":"readUInt8",

			"vendorName":"humidity",
			"ourName":"Humidity"
		},


		0x03: { // ACC = 0x03; //acceleration 3 bytes X,Y,Z -128 --> 127 +/-63=1G
			"numValues":3,
			"valueCfgs": [
				{
					"numBytes":1,
					"bufferF":"readInt8",
					"vendorName":"x"
				},
				{
					"numBytes":1,
					"bufferF":"readInt8",
					"vendorName":"y"
				},
				{
					"numBytes":1,
					"bufferF":"readInt8",
					"vendorName":"z"
				}
			],
		},


		0x04: { // LIGHT = 0x04; //Light 2 bytes 0-->65535 Lux
			"numBytes":2,
			"bufferF":"readUInt16BE",

			"vendorName":"light",
			"ourName":"Illuminance"
		},


		0x05: { // MOTION = 0x05; //No of motion 1 byte  0-255
			"numBytes":1,
			"bufferF":"readUInt8",

			"vendorName":"motion",
			"ourName":"Presence"
		},
		0x06: { // CO2 = 0x06; //Co2 2 bytes 0-65535 ppm
			"numBytes":2,
			"bufferF":"readUInt16BE",

			"vendorName":"co2",
			"ourName":"CO2"
		},
		0x07: { // VDD = 0x07; //VDD 2byte 0-65535mV
			"numBytes":2,
			"bufferF":"readUInt16BE",

			"ourConversionScale": 0.001,

			"vendorName":"vdd",
			"ourName":"Voltage"
		},


		0x08: { // ANALOG1 = 0x08; //VDD 2byte 0-65535mV
			"numBytes":2,
			"bufferF":"readUInt16BE",

			"vendorName":"analog1",
			"ourName":"NOT_DEFINED"
		},

		0x09:{// GPS = 0x09; //3bytes lat 3bytes long binary
			"numValues":2,
			"valueCfgs":[
				{
					"numBytes":3,
					"bufferF":"readIntBE",
					"vendorConversionScale":0.0001,
					"vendorName":"lat"
				},
				{
					"numBytes":3,
					"bufferF":"readIntBE",
					"vendorConversionScale":0.0001,
					"vendorName":"long"
				},
			]
		},


		0x0a: {// PULSE1 = 0x0a; //2bytes relative pulse count
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"pulse1"
		},


		0x0b:{ // PULSE1_ABS = 0x0b; //4bytes no 0->0xFFFFFFFF
			"numBytes":4,

			"bufferF":"readUInt32BE",

			"vendorName":"pulseAbs"
		},


		0x0c: {// EXT_TEMP1 = 0x0c; //2bytes -3276.5C-->3276.5C
			"numBytes":2,

			"bufferF":"readInt16BE",

			"vendorConversionScale":0.1,

			"vendorName":"externalTemperature"
		},

		0x0d:{ // EXT_DIGITAL = 0x0d; //1bytes value 1 or 0
			"numBytes":1,

			"bufferF":"readUInt8",

			"vendorName":"digital"
		},


		0x0e: { // EXT_DISTANCE = 0x0e; //2bytes distance in mm
			"numBytes":2,
			"bufferF":"readUInt16BE",

			"vendorName":"distance",
			"ourName":"ExternalDistance"
		},


		0x0f:{ // ACC_MOTION = 0x0f; //1byte number of vibration/motion
			"numBytes":1,
			"bufferF":"readUInt8",

			"vendorName":"accMotion",
			"ourName":"Acceleration"
		},


		0x10:{ // IR_TEMP = 0x10; //2bytes internal temp 2bytes external temp -3276.5C-->3276.5C
			"numValues":2,
			"numBytes":4,
			"valueCfgs":[
				{
					"numBytes":2,
					"bufferF":"readInt16BE",
					"vendorConversionScale":0.1,
					"vendorName":"irInternalTemperature"
				},
				{
					"numBytes":2,
					"bufferF":"readInt16BE",
					"vendorConversionScale":0.1,
					"vendorName":"irExternalTemperature"
				}
			]
		},



		0x11: { // OCCUPANCY = 0x11; //1byte data
			"numBytes":1,

			"bufferF":"readUInt8",

			"vendorName":"occupancy"
		},



		0x12: { //WATERLEAK = 0x12; //1byte data 0-255
			"numBytes":1,

			"bufferF":"readUInt8",

			"vendorName":"waterleak"
		},



		0x13: { // GRIDEYE = 0x13; //65byte temperature data 1byte ref+64byte external temp
			"ignore":true,
            "numBytes":65,
			"unimplemented": true
		},


		0x14: {// PRESSURE = 0x14; //4byte pressure data (hPa)
			"numBytes":4,

			"bufferF":"readUInt32BE",

			"vendorConversionScale":0.001,

			"vendorName":"pressure"
		},


		0x15: { // SOUND = 0x15; //2byte sound data (peak/avg)
			"numValues":2,
			"valueCfgs":[
				{
					"numBytes":1,

					"bufferF":"readUInt8",

					"vendorName":"soundPeak"
				},
				{
					"numBytes":1,

					"bufferF":"readUInt8",

					"vendorName":"soundAvg"
				},

			]
		},


		0x16:{ // PULSE2 = 0x16; //2bytes 0-->0xFFFF
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"pulse2"
		},

		0x17:{// PULSE2_ABS = 0x17; //4bytes no 0->0xFFFFFFFF
			"numBytes":4,

			"bufferF":"readUInt32BE",

			"vendorName":"pulseAbs2"
		},

		0x18:{		// ANALOG2 = 0x18; //2bytes voltage in mV
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"analog2",
		},

		0x19:{		// EXT_TEMP2 = 0x19; //2bytes -3276.5C-->3276.5C
			"numBytes":2,

			"bufferF":"readInt16BE",

			"vendorName":"externalTemperature2"
		},

		0x1a:{		// EXT_DIGITAL2 = 0x1a; // 1bytes value 1 or 0
			"numBytes":1,

			"bufferF":"readUInt8",

			"vendorName":"digital2"
		},

		0x1b:{		// EXT_ANALOG_UV = 0x1b; // 4 bytes signed int (uV)
			"numBytes":4,

			"bufferF":"readInt32BE",

			"vendorName":"analogUv"
		},

		0x1c:{
			"faultyType":true,
			// "printDebug":true,
		},

		0x3d:{		// DEBUG = 0x3d; // 4bytes debug
			"unimplemented":true
		},

	}
};
}


// CG DeskSense DecodeConfig (PrefixedValues) ver 0.1 // INCOMPLETE
if(typeof this.cgDeskSenseDecoderConfig == "undefined") {
	this.cgDeskSenseDecoderConfig = {
	"payloadFormat": "PrefixedValues",

	"typeTable": { // INCOMPLETE
		0x01:{     // build = 0x01; // Build timestamp                              			( 7 bytes)

			"unimplemented":true,
			"numBytes":7
		},

		0x02:{     // HW_V = 0x02; // Hardware Version                              			( 1 bytes)

			"unimplemented":true,
			"numBytes":1
		},

		0x03:{     // SW_V = 0x03; // Software Version                              			( 2 bytes)

			"unimplemented":true,
			"numBytes":2
		},

		0x04:{     // PCBID = 0x04; // PCB Identifier (PXXXXXX)                     			( 3 bytes)

			"unimplemented":true,
			"numBytes":3
		},

		0x05:{     // PCBV = 0x05; // PCB Identifier version (VXX)								( 1 bytes)

			"unimplemented":true,
			"numBytes":1
		},

		0x10:{     // hbInterval = 0x10; // Heartbeat msg Interval                        		( 2 bytes)

			"unimplemented":true,
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"hbInterval"
		},

		0x12:{     // loraRejoinCnt = 0x12; // Number of msgs needed before forced new join 	( 1 bytes)
			"unimplemented":true,
			"numBytes":1
		},

		0x20:{     // devFunction = 0x20; // Device function - WIP                         	( 1 bytes)
			"unimplemented":true,
			"numBytes":1
		},

		0x22:{     // devBattery = 0x22; // Device Battery lvl                          	  	( 2 bytes)
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorConversionScale":0.001,

			"vendorName":"vdd"
		},

		0x30:{     // TempC = 0x30; // Temperature (deg C)                           			( 2 bytes)

			"unimplemented":true,
			// Signed integer
			"numBytes":2
		},

		0x31:{     // TempF = 0x31; // Temperature (deg F)(deprecated)                  		( 2 bytes)

			"unimplemented":true,
			"numBytes":2
		},

		0x32:{     // Humidity = 0x32; // Humidity (%)                                  		( 1 bytes)

			"unimplemented":true,
			"numBytes":1
		},

		0x33:{     // CO2 = 0x33; // CO2 (ppm)                                     			( 2 bytes)

			"unimplemented":true,
			"numBytes":2
		},

		0x40:{     // nSamplesNeeded = 0x40; // Config: number of samples                    	( 1 bytes)

			"unimplemented":true,
			"numBytes":1
		},

		0x41:{     // tSample = 0x41; // Config: time between samples                  		( 2 bytes)

			"unimplemented":true,
			"numBytes":2
		},

		0x42:{     // tStopped = 0x42; // Config: silence time after msg                		( 2 bytes)

			"unimplemented":true,
			"numBytes":2
		},

		0x43:{     // tIdle = 0x43; // Config: time before releasing room            			( 2 bytes)

			"unimplemented":true,
			"numBytes":2
		},

		0x44:{     // nSamplesTaken = 0x44; // Number of samples taken during FP             	( 1 bytes)
			"numBytes":1,

			"bufferF":"readUInt8",
			"vendorName":"nsample"

		},

		0x45:{ // nSamplesPos = 0x45; // Number of samples detected motion             	( 1 bytes)
			"numBytes":1,

			"bufferF":"readUInt8",
			"vendorName":"npositive"
		},

		0x46:{ // occupied = 0x46; // Room occupied? (1=yes, 0=no)                  		( 1 bytes)
			"numBytes":1,

			"bufferF":"readUInt8",
			"vendorName":"occupied"
		},

		0x47:{ // activity = 0x47; // Activity level based on motion (0 ~ 255)      		( 1 bytes)
			"numBytes":1,

			"bufferF":"readUInt8",

			"vendorName":"activity"
		},

		0x48:{ // activityThresh = 0x48; // Threshold for claiming a desk as occupied	( 1 bytes)
			"numBytes":1,

			"bufferF":"readUInt8",

			"vendorName":"activityThreshold"
		},

		0x49:{ // thresholdHyst = 0x49; // Hysteresis used when occupied (0 = ignored)	( 1 bytes)
			"numBytes":1,

			"bufferF":"readUInt8",

			"vendorName":"thresholdHyst"
		},

		0x66: {// CO2_CalCnt = 0x66; // CO2 Calibration Counter							(3 bytes)
			"unimplemented":true
		},
	}
};
}


// Yabby DecodeConfig (FixedPositions) ver 0.1
if(typeof this.yabbyDecodeConfig == "undefined") {
	this.yabbyDecodeConfig = {
	"PayloadFormat": "FixedPositions",


	"valueCfgs": [
		{ // 32 bit latitude, signed, LSb = 0.000’000’1°. To convert, first calculate the signed integer value, then divide by 10 million to get a floating-point value
			"numBytes":4,

			"bufferF":"readInt32LE",

			"vendorConversionScale":1e-7,	// Defaults to 1 if omitted
			// "ourConversionScale": 1, 		// Defaults to 1 if omitted

			"vendorName":"latitudeDeg",
			// "ourName":"Temperature" // TODO: implement for FixedValue decoder
		},
		{ // 32 bit longitude, signed, see above
			"numBytes":4,

			"bufferF":"readInt32LE",

			"vendorConversionScale":1e-7,	// Defaults to 1 if omitted
			// "ourConversionScale": 1, 		// Defaults to 1 if omitted

			"vendorName":"longitudeDeg",
			// "ourName":"Temperature" // TODO: implement for FixedValue decoder
		},
		{
			"numBytes": 1,

			"bufferF":"readUInt8", // For now this has to be used in conjunction with "bitsType" (Add errorchecks?)

			"bitsType":"flags", // bitsConfig is implicitly read as bools
			"bitsConfigs":[
				{ // 8.0  0: Out of trip, 1: In-trip
					"vendorName":"inTrip"
				},
				{ // 8.1 Last fix failed
					"vendorName":"fixFailed"
				},
				{ // 8.2 Man down (no movement for configured period)
					"vendorName":"manDown"
				},
				// 8.3 -8.7 Reserved (Ignore)
				{ ignore: true },{ ignore: true },{ ignore: true },{ ignore: true },{ ignore: true },
			]
		},
		{
			"numBytes": 1,

			"bufferF":"readUInt8", // For now this has to be used in conjunction with "bitsType" (Add errorchecks?)

			"bitsType":"bitValues",
			"bitsConfigs":[
				{ // 9.0-9.2 (3 bits) Heading, LSb = 45°, rounded to nearest
					"vendorName":"headingDeg",
					"numBits":3,

					"vendorConversionScale":45
				},
				{ // 9.3-9.7 (5 bits) Speed, LSb = 5km/h, rounded down
					"vendorName":"speedKmph",
					"numBits":5,

					"vendorConversionScale":5
				},
			]
		},
		{ // 10(BYTE)Battery voltage, LSb = 25 mV, rounded down
			"numBytes":1,

			"bufferF":"readUInt8",

			"vendorConversionScale":0.025,	// Defaults to 1 if omitted
			// "ourConversionScale": 1, 		// Defaults to 1 if omitted

			"vendorName":"batV",
			// "ourName":"Temperature" // TODO: implement for FixedValue decoder
		}
	]
};
}


// Ellenex decoder (FixedPositions) ver 0.1
if(typeof this.ellenexDecodeConfig == "undefined") {
	this.ellenexDecodeConfig = {
	"PayloadFormat": "FixedPositions",


	"valueCfgs": [
		{ // Board Serial 2 bytes
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"boardserial",
		},
		{ // Data Type 1 bytes - always 0, ignore
			"numBytes":1,

			//

			"bufferF":"readUInt8",

			"vendorName":"dataType",
		},
		{ // Pressure 2 bytes // TODO: This also describes height, we need to account for this in the config
		// TODO: height also has a "shifted" value (adding/subtracting), which is currently not supported (though easy to add)
			"numBytes": 2,

			"bufferF":"readUInt16BE",

			"vendorName":"rawPressure",
			"ourName":"Pressure"
		},
		{ // Temperature 2 bytes
			"numBytes": 2,

			"bufferF":"readInt16BE",

			"vendorConversionScale":0.01,

			"vendorName":"temperature",
			"ourName":"Temperature"
		},
		{ // battery voltage 1 bytes (1/10 V)
			"numBytes":1,

			"bufferF":"readUInt8",

			"vendorConversionScale":100,
			"ourConversionScale":0.001,

			"vendorName":"vdd",
			"ourName":"Voltage"
		}
	]
};
}


// PeopleCounter decoder (FixedPositions) ver 0.1
if(typeof this.peopleCounterDecodeConfig == "undefined") {
	this.peopleCounterDecodeConfig = {
	"PayloadFormat": "FixedPositions",


	"valueCfgs": [
		{  // PayloadType(1B) // NOTE: Ignored in the vendor decoder, so ignoring it here.
			"ignore":true,

			"numBytes":1,

			"stringType":true, // Note for string type: numBytes means 2 characters each in hexa
			"bufferF":"toString",

			"vendorName":"PayloadType"
		},
		{ //Type Variant (1B) // NOTE: Ignored in vendor decoder, ignoring it here
			"ignore":true,

			"numBytes":1,

			"stringType":true, // Note for string type: numBytes means 2 characters each in hexa
			"bufferF":"toString",

			"vendorName":"TypeVariant"
		},
		{ //EUI(8B) // Ignored in vendor code, so ignoring it here
			"ignore":true,

			"numBytes": 8,

			"stringType":true, // Note for string type: numBytes means 2 characters each in hexa
			"bufferF":"toString",

			"vendorName":"EUID"
		},
		{  //Device Status(1B)
			"numBytes":1,

			"stringType":true, // Note for string type: numBytes means 2 characters each in hexa
			"bufferF":"toString",

			"vendorName":"DeviceStatus"
			// "ourName":"payloadType"
		},
		{  // BatteryVoltage(2B)
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"BatteryVoltage"
		},
		{  // CounterA(2B)
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"CounterA"
			// "ourName":"CounterA"
		},
		{  // CounterB(2B)
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"CounterB"
			// "ourName":"CounterB"
		},
		{  // SensorStatus(1B)
			"numBytes":1,

			"stringType":true, // Note for string type: numBytes means 2 characters each in hexa
			"bufferF":"toString",

			"vendorName":"SensorStatus"
			// "ourName":"SensorStatus"
		},
		{  // TotalCntA(2B)
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"TotalCntA"
			// "ourName":"TotalCntA"
		},
		{  // TotalCntB(2B)
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"TotalCntB"
			// "ourName":"TotalCntB"
		},
		{  // PayloadCounter(1B)
			"numBytes":1,

			"bufferF":"readUInt8",

			"vendorName":"PayloadCounter"
			// "ourName":"PayloadCounter"
		}
	]
};
}


if(typeof this.pyxiRftTrackerDecoderConfig == "undefined") {
	this.pyxiRftTrackerDecoderConfig = {
	"PayloadFormat": "FixedPositions",


	"valueCfgs": [
		{  //ApplicationId
			"numBytes":2,

			"stringType":true, // Note for string type: numBytes means 2 characters each in hexa
			"bufferF":"toString",

			"vendorName":"ApplicationId"
		},
		{ //DeviceId
			"numBytes":4,

			"stringType":true, // Note for string type: numBytes means 2 characters each in hexa
			"bufferF":"toString",

			"vendorName":"DeviceId"
		},
		{ // Status // NOTE: Needs some postprocessing, I'll probably put that in the switch case for now... (Erik)
			"numBytes": 1,

			"bufferF":"readUInt8",

			"vendorName":"Status"
		},
		{  // G
			"numBytes":1,

			"stringType":true, // Note for string type: numBytes means 2 characters each in hexa
			"bufferF":"toString",

			"vendorName":"G"
			// "ourName":"payloadType"
		},
		{  // Timestamp
			"numBytes":4,

			"bufferF":"readUInt32BE",

			"vendorConversionScale":1000,
			"dateType":true,

			"vendorName":"timestamp"
		},
		{  // latitude
			"numBytes":4,

			"bufferF":"readUInt32BE",

			"vendorConversionScale":0.000001,

			"vendorName":"latitude"
		},
		{  // longitude
			"numBytes":4,

			"bufferF":"readUInt32BE",

			"vendorConversionScale":0.000001,

			"vendorName":"longitude"
		},
		{  // num satellites
			"numBytes":1,

			"bufferF":"readUInt8",

			"vendorName":"nbSatellites"
		},
		{  // Course
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"course"
		},
		{  // speed
			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorName":"speed"
		},
		{  // V
			"mightBeTruncated":true,
			// "truncatedDefaultValue":

			"numBytes":1,

			"stringType":true, // Note for string type: numBytes means 2 characters each in hexa
			"bufferF":"toString",

			"vendorName":"V"
		},
		{  // vbatlevel
			"mightBeTruncated":true,

			"numBytes":2,

			"bufferF":"readUInt16BE",

			"vendorConversionScale":0.01,

			"vendorName":"vbatlevel"
		},
	]
};
}


// DecentLab DecodeConfig (DecentLab format)
if(typeof this.decentLabDecodeConfig == "undefined") {
	this.decentLabDecodeConfig = {
    "ProtocolVersion": 2,
    "Sensors": [
        {
            "numData": 1,
            "values": [
                {
                    "name": "Battery voltage",
                    "unit": "V",

					"vendorConversionScale":0.001
                }
            ]
        },
        {
            "numData": 2,
            "values": [
                {
                    "name": "Air temperature",
                    "unit": "°C",

					// Conversion: sensorValues[0] / 65535 * 175  - 45;
					// decoder expression: (175 * sensorValues[0]) / 65535 - 45;
					"vendorConversionScale":0.002670328831921874, // 175 / 65535
					"vendorConversionShift":-45
                },
                {
					// decoder expression (100 * x[1]) / 65535;
                    "name": "Air humidity",
                    "unit": "%"
                }
            ]
        },
        {
            "numData": 1,
            "values": [
                {
                    "name": "Barometric pressure",
                    "unit": "Pa"
                }
            ]
        },
        {
            "numData": 2,
            "values": [
                {
                    "name": "Ambient light (visible + infrared)"
                },
                {
                    "name": "Ambient light (infrared)"
                },
                {
                    "name": "Illuminance",
                    "unit": "lx"
                }
            ]
        },
        {
            "numData": 3,
            "values": [
                {
                    "name": "CO2 concentration",
                    "unit": "ppm"
                },
                {
                    "name": "CO2 sensor status"
                },
                {
                    "name": "Raw IR reading"
                }
            ]
        },
        {
            "numData": 1,
            "values": [
                {
                    "name": "Activity counter"
                }
            ]
        },
        {
            "numData": 1,
            "values": [
                {
                    "name": "Total VOC",
                    "unit": "ppb"
                }
            ]
        }
    ]
};
}





////////////////////////////////////////////////////////////////////////////////////////
// Payload decoder functions ///////////////////////////////////////////////////////////

// DecentLab payload format decoder ///////////
if (typeof this.DecodeDecentLabPayload == "undefined") {
	node.warn("DecodeDecentLabPayload undefined in context, setting it now");
    this.DecodeDecentLabPayload = function(dataStr, decodeConfig) {
			let decodedData = {
				payloadData: {},
				metricsData: {}
			};

			let buf = Buffer.from(dataStr, 'hex');
			let i = 0;


			// Read header bytes (always 5 bytes) /////

			// Protocol version, might as well check it since we have it
			let version = buf.readUInt8(i);
			i += 1;

			if (version != decodeConfig.ProtocolVersion) {
				node.warn("DECODER ERROR: decentlabs protocol version " + version + " doesn't match v2");
				return { error: "protocol version " + version + " doesn't match v2" };
			}

			// Device ID (Is this devUID?)
			decodedData.payloadData.deviceId = buf.readUInt16BE(i); // TODO: figure out if this is devUID
			i += 2;


			let flags = buf.readUInt16BE(i)
			i += 2;


			let sensorCfg = decodeConfig.Sensors

			for (j = 0; j < sensorCfg.length; j++, flags >>= 1); {
				if ((flags & 1) !== 1) continue; // This sensor data is not provided in this payload, skip it

				var sensor = sensorCfg[j];
				var x = [];
				// convert data to 16-bit integer array
				for (k = 0; k < sensor.length; k++); {
					x.push(buf.readInt16BE(i));
				}

				// decode sensor values
				for (k = 0; k < sensor.values.length; k++); {
					var value = sensor.values[k];
					if ("convert" in value) {
						result[value.name] = { value: value.convert(x), unit: value.unit };
					}
				}
			}




			return decodedData;
		}
}


// PrefixedValues Decoder /////////////
// Decodes a payload encoded in "prefix value" format
// the first byte in a value denotes its "type", which then specifies how many more bytes to parse, and in what way

// Sample payload (Yabby, with whitespace for ease of reading):
// 01 00e3  02 14  04 0127  05 06  07 0e1c

// dataStr - Encoded payload as hex formatted string (no leading 0x)
// decodeConfig - Object containing information needed to decode dataStr
if(typeof this.DecodePrefixPayload == "undefined") {
	this.DecodePrefixPayload = function(dataStr, decodeConfig) {
    var decodedData = {
		payloadData: {},
		metricsData: {}
	};

	var buf = Buffer.from(dataStr, 'hex');


	for (let i = 0; i < buf.length; i++) {
		let type = buf.readUInt8(i); // Read first int of next value (unsure if this should be Int or UInt, but probably doesn't matter at the moment). Could be fixed by using substring on dataStr instead for completely unambiguous indexing
		let typeCfg = decodeConfig.typeTable[type]

		if(typeof typeCfg == "undefined") {
			throw "Could not decode value, type " + type.toString() +  " (0x" + type.toString(16) + "): Has no typeCfg";
		}


		if(typeCfg.ignore) {
            i += typeCfg.numBytes;
            continue;
        }


		if(typeCfg.printDebug) {
			node.warn("DEBUG INFO FOR TYPE: " + type.toString() +  " (0x" + type.toString(16) + ")\n" +
			"Buffer offset (in bytes): " + i.toString() + "\n" +
			"Next 4 bytes (hex): 0x" + buf.readUInt32BE(i).toString(16))
		}

		if(typeCfg.faultyType) {
			throw "Could not decode value, type " + type.toString() +  " (0x" + type.toString(16) + "): Unknown type (No known decode format)"
		}

		if(typeCfg.unimplemented) {
			throw "Could not decode value, type " + type.toString() +  " (0x" + type.toString(16) + "): Type decode is not implemented"
		}




		// Does this type have multiple values?
		if(typeCfg.numValues && typeCfg.numValues > 1) {
			for (const innerValueCfg of typeCfg.valueCfgs) {
				// Check if buffer function is correct
				if(!innerValueCfg.bufferF) {
					throw "Could not decode value, type " + type.toString() +  " (0x" + type.toString(16) + ") is not configured with a bufferFunction!";
				}

				let dataLength = innerValueCfg.numBytes
				let value = buf[innerValueCfg.bufferF](i+1, dataLength)

				let vendorCS = innerValueCfg.vendorConversionScale || 1; // "Default operator" (or more commonly, OR) If first value is falsy, return the second value

				decodedData.payloadData[innerValueCfg.vendorName] = value * vendorCS

				i += dataLength;
			}

			continue;
		}

		// Check if buffer function is correct
		if(!typeCfg.bufferF) {
			throw "Could not decode value, type " + type.toString() +  " (0x" + type.toString(16) + ") is not configured with a bufferFunction!";
		}


		let dataLength = typeCfg.numBytes
		let value = buf[typeCfg.bufferF](i+1, dataLength)

		let vendorCS = typeCfg.vendorConversionScale || 1; // "Default operator" (or more commonly, OR) If first value is falsy, return the second value
		// vendorCS = vendorCS < 1 ? 1/vendorCS

		let ourCS = typeCfg.ourConversionScale || 1;


		decodedData.payloadData[typeCfg.vendorName] = value * vendorCS
		decodedData.metricsData[typeCfg.ourName   ] = decodedData.payloadData[typeCfg.vendorName] * ourCS

		// node.warn({"dataStr":dataStr, "typeCfg":typeCfg, "value":value})

		i += dataLength
	}

	return decodedData
};
}


// FixedPositions Decoder ///////////////
// Decodes a payload encoded in "fixed position" format
// Each value has a specific byte sequence in the payload that it corresponds to, which never changes

// dataStr - Encoded payload as hex formatted string (no leading 0x)
// decodeConfig - Object containing information needed to decode dataStr
if(typeof this.DecodeFixedPayload == "undefined") {
	this.DecodeFixedPayload = function(dataStr, decodeConfig) {
	var decodedData = {
		payloadData: {},
		metricsData: {}
	};

	var buf = Buffer.from(dataStr, 'hex');
	var valueOffset = 0;



	for (const cfg of decodeConfig.valueCfgs) { // NOTE: for .. of loop keeps the order, which is important in this case
		if (cfg.ignore){
			valueOffset += cfg.numBytes;
			continue;
		}


		// Drop any truncated values if payload is short (Currently only used for Pyxe RFTTracker)
		if (cfg.mightBeTruncated && valueOffset >= buf.length){
			valueOffset += cfg.numBytes;
			decodedData.payloadData[cfg.vendorName] = undefined;
			continue;
		}



		let value;

		// If we're reading a string we can't use the bufferF unfortunately
		// Read the string and skip the rest
		// This could be refactored to be more clean probably (Erik)
		if (cfg.stringType) {
			decodedData.payloadData[cfg.vendorName] = buf[cfg.bufferF]("hex", valueOffset, valueOffset + cfg.numBytes)
			valueOffset += cfg.numBytes;
			continue;
		}
		else {
			value = buf[cfg.bufferF](valueOffset, cfg.numBytes);
		}



		// If we're reading bits as flags
		if (cfg.bitsType == "flags") {
			let flagOffset = 1;

			for (const bitsCfg of cfg.bitsConfigs) {
				if (bitsCfg.ignore){
					flagOffset <<= 1;
					continue;
				}

				// node.warn(value.toString(2));
				// node.warn(flagOffset.toString(2));

				decodedData.payloadData[bitsCfg.vendorName] = (value & flagOffset) !== 0;
				flagOffset <<= 1;
			}
		}

		// We're reading the bits as values smaller than a byte
		else if(cfg.bitsType == "bitValues") {
			for (const bitsCfg of cfg.bitsConfigs) {
				let vendorCS = bitsCfg.vendorConversionScale || 1;
				// let ourCS = bitsCfg.ourConversionScale || 1;

				decodedData.payloadData[bitsCfg.vendorName] = (value & bitMask(bitsCfg.numBits)) * vendorCS
				value >>= bitsCfg.numBits;
			}
		}

		// We're reading the data as one or more bytes
		else {
			let vendorCS = cfg.vendorConversionScale || 1;
			// let ourCS = cfg.ourConversionScale || 1;


			decodedData.payloadData[cfg.vendorName] = value * vendorCS;
			// decodedData.metricsData[cfg.ourName   ] = decodedData.payloadData[cfg.vendorName] * ourCS
		}


		valueOffset += cfg.numBytes;
	}

	return decodedData;
};
}




////////////////////////////////////////////////////////////////////////////////////////
// Old/Vendor decoder functions ///////////////////////////////////////////////////////////////

//Decentlab Decoder
// Needs some thinking on how to do the calculations more generally, but if hardcoded, these two can probably be converted relatively easy (Erik)
if (typeof this.decentlab_decoder == "undefined") {
    this.decentlab_decoder = {
        PROTOCOL_VERSION: 2,
        SENSORS: [
            {
                length: 1,
                values: [
                    {
                        name: "Battery voltage",
                        convert: function (x) {
                            return x[0] / 1000;
                        },
                        unit: "V",
                    },
                ],
            },
            {
                length: 2,
                values: [
                    {
                        name: "Air temperature",
                        convert: function (x) {
                            return (175 * x[0]) / 65535 - 45;
                        },
                        unit: "°C",
                    },
                    {
                        name: "Air humidity",
                        convert: function (x) {
                            return (100 * x[1]) / 65535;
                        },
                        unit: "%",
                    },
                ],
            },
            {
                length: 1,
                values: [
                    {
                        name: "Barometric pressure",
                        convert: function (x) {
                            return x[0] * 2;
                        },
                        unit: "Pa",
                    },
                ],
            },
            {
                length: 2,
                values: [
                    {
                        name: "Ambient light (visible + infrared)",
                        convert: function (x) {
                            return x[0];
                        },
                    },
                    {
                        name: "Ambient light (infrared)",
                        convert: function (x) {
                            return x[1];
                        },
                    },
                    {
                        name: "Illuminance",
                        convert: function (x) {
                            return Math.max(Math.max(1.0 * x[0] - 1.64 * x[1], 0.59 * x[0] - 0.86 * x[1]), 0) * 1.5504;
                        },
                        unit: "lx",
                    },
                ],
            },
            {
                length: 3,
                values: [
                    {
                        name: "CO2 concentration",
                        convert: function (x) {
                            return x[0] - 32768;
                        },
                        unit: "ppm",
                    },
                    {
                        name: "CO2 sensor status",
                        convert: function (x) {
                            return x[1];
                        },
                    },
                    {
                        name: "Raw IR reading",
                        convert: function (x) {
                            return x[2];
                        },
                    },
                ],
            },
            {
                length: 1,
                values: [
                    {
                        name: "Activity counter",
                        convert: function (x) {
                            return x[0];
                        },
                    },
                ],
            },
            {
                length: 1,
                values: [
                    {
                        name: "Total VOC",
                        convert: function (x) {
                            return x[0];
                        },
                        unit: "ppb",
                    },
                ],
            },
        ],

        read_int: function (bytes) {
            return (bytes.shift() << 8) + bytes.shift();
        },

        decode: function (msg) {
            var bytes = msg;
            var i, j;
            if (typeof msg === "string") {
                bytes = [];
                for (i = 0; i < msg.length; i += 2) {
                    bytes.push(parseInt(msg.substring(i, i + 2), 16));
                }
            }

            var version = bytes.shift();
            if (version != this.PROTOCOL_VERSION) {
                return { error: "protocol version " + version + " doesn't match v2" };
            }

            var deviceId = this.read_int(bytes);
            var flags = this.read_int(bytes);
            var result = { "Protocol version": version, "Device ID": deviceId };
            // decode payload
            for (i = 0; i < this.SENSORS.length; i++, flags >>= 1) {
                if ((flags & 1) !== 1) continue;

                var sensor = this.SENSORS[i];
                var x = [];
                // convert data to 16-bit integer array
                for (j = 0; j < sensor.length; j++) {
                    x.push(this.read_int(bytes));
                }

                // decode sensor values
                for (j = 0; j < sensor.values.length; j++) {
                    var value = sensor.values[j];
                    if ("convert" in value) {
                        result[value.name] = { value: value.convert(x), unit: value.unit };
                    }
                }
            }
            var data = result;
            var obj = {};
            //format the output
            obj.device = { value: data["Device ID"], unit: "" };
            obj["battery-voltage"] = { value: data["Battery voltage"].value, unit: data["Battery voltage"].unit };
            obj["air-temperature"] = { value: data["Air temperature"].value, unit: data["Air temperature"].unit };
            obj["air-humidity"] = { value: data["Air humidity"].value, unit: data["Air humidity"].unit };
            obj["barometric-pressure"] = { value: data["Barometric pressure"].value, unit: data["Barometric pressure"].unit };
            obj["ambient-light-visible-infrared"] = { value: data["Ambient light (visible + infrared)"].value, unit: "" };
            obj["ambient-light-infrared"] = { value: data["Ambient light (infrared)"].value, unit: "" };
            obj["illuminance"] = { value: data["Illuminance"].value, unit: data["Illuminance"].unit };
            obj["co2-concentration"] = { value: data["CO2 concentration"].value, unit: data["CO2 concentration"].unit };
            obj["co2-sensor-status"] = { value: data["CO2 sensor status"].value, unit: "" };
            obj["co2-raw-reading"] = { value: data["Raw IR reading"].value, unit: "" };
            obj["pir-activity-counter"] = { value: data["Activity counter"].value, unit: "" };
            obj["total-voc"] = { value: data["Total VOC"].value, unit: data["Total VOC"].unit };

            return obj; //result;
        },
    };
}

//Decentlab PR26
if (typeof this.decentlab_decoder_pr26 == "undefined") {
    this.decentlab_decoder_pr26 = {
        PROTOCOL_VERSION: 2,
        /* device-specific parameters */
        PARAMETERS: {
            Pmin: 0.0,
            Pmax: 1.0,
        },
        SENSORS: [
            {
                length: 2,
                values: [
                    {
                        name: "pressure",
                        displayName: "Pressure",
                        convert: function (x) {
                            return ((x[0] - 16384) / 32768) * (this.PARAMETERS.Pmax - this.PARAMETERS.Pmin) + this.PARAMETERS.Pmin;
                        },
                        unit: "bar",
                    },
                    {
                        name: "height",
                        displayName: "Height",
                        convert: function (x) {
                            return (10000 * (((x[0] - 16384) / 32768) * (this.PARAMETERS.Pmax - this.PARAMETERS.Pmin) + this.PARAMETERS.Pmin - 4000)) / 16000;
                        },
                        unit: "mm",
                    },

                    {
                        name: "temperature",
                        displayName: "Temperature",
                        convert: function (x) {
                            return (x[1] - 384) * 0.003125 - 50;
                        },
                        unit: "°C",
                    },
                ],
            },
            {
                length: 1,
                values: [
                    {
                        name: "battery_voltage",
                        displayName: "Battery voltage",
                        convert: function (x) {
                            return x[0] / 1000;
                        },
                        unit: "V",
                    },
                ],
            },
        ],

        read_int: function (bytes, pos) {
            return (bytes[pos] << 8) + bytes[pos + 1];
        },

        decode: function (msg) {
            var bytes = msg;
            var i, j;
            if (typeof msg === "string") {
                bytes = [];
                for (i = 0; i < msg.length; i += 2) {
                    bytes.push(parseInt(msg.substring(i, i + 2), 16));
                }
            }

            var version = bytes[0];
            if (version != this.PROTOCOL_VERSION) {
                return { error: "protocol version " + version + " doesn't match v2" };
            }

            var deviceId = this.read_int(bytes, 1);
            var flags = this.read_int(bytes, 3);
            var result = { protocol_version: version, device_id: deviceId };
            // decode payload
            var pos = 5;
            for (i = 0; i < this.SENSORS.length; i++, flags >>= 1) {
                if ((flags & 1) !== 1) continue;

                var sensor = this.SENSORS[i];
                var x = [];
                // convert data to 16-bit integer array
                for (j = 0; j < sensor.length; j++) {
                    x.push(this.read_int(bytes, pos));
                    pos += 2;
                }

                // decode sensor values
                for (j = 0; j < sensor.values.length; j++) {
                    var value = sensor.values[j];
                    if ("convert" in value) {
                        result[value.name] = value.convert.bind(this)(x);
                    }
                }
            }
            return result;
        },
    };
}



// tectelic decoder
// This one is a mess, but I _think_ it should still be relatively simple... (Erik)
if (typeof this.tektelicDecoder == "undefined") {
    this.tektelicDecoder = function () {
    function extract_bytes(chunk, start_bit, end_bit) {
        var total_bits = end_bit - start_bit + 1;
        var total_bytes = total_bits % 8 === 0 ? to_uint(total_bits / 8) : to_uint(total_bits / 8) + 1;
        var offset_in_byte = start_bit % 8;
        var end_bit_chunk = total_bits % 8;

        var arr = new Array(total_bytes);

        for (byte = 0; byte < total_bytes; ++byte) {
            var chunk_idx = to_uint(start_bit / 8) + byte;
            var lo = chunk[chunk_idx] >> offset_in_byte;
            var hi = 0;
            if (byte < total_bytes - 1) {
                hi = (chunk[chunk_idx + 1] & ((1 << offset_in_byte) - 1)) << (8 - offset_in_byte);
            } else if (end_bit_chunk !== 0) {
                // Truncate last bits
                lo = lo & ((1 << end_bit_chunk) - 1);
            }

            arr[byte] = hi | lo;
        }

        return arr;
    }

    function apply_data_type(bytes, data_type) {
        output = 0;
        if (data_type === "unsigned") {
            for (var i = 0; i < bytes.length; ++i) {
                output = to_uint(output << 8) | bytes[i];
            }

            return output;
        }

        if (data_type === "signed") {
            for (var i = 0; i < bytes.length; ++i) {
                output = (output << 8) | bytes[i];
            }

            // Convert to signed, based on value size
            if (output > Math.pow(2, 8 * bytes.length - 1)) output -= Math.pow(2, 8 * bytes.length);

            return output;
        }

        if (data_type === "bool") {
            return !(bytes[0] === 0);
        }

        if (data_type === "hexstring") {
            return toHexString(bytes);
        }

        // Incorrect data type
        return null;
    }

    function decode_field(chunk, start_bit, end_bit, data_type) {
        chunk_size = chunk.length;
        if (end_bit >= chunk_size * 8) {
            return null; // Error: exceeding boundaries of the chunk
        }

        if (end_bit < start_bit) {
            return null; // Error: invalid input
        }

        arr = extract_bytes(chunk, start_bit, end_bit);
        return apply_data_type(arr, data_type);
    }

    function byteToArray(byteArray) {
        arr = [];
        for (var i = 0; i < byteArray.length; i++) {
            arr.push(byteArray[i]);
        }

        return arr;
    }

    // Converts value to unsigned
    function to_uint(x) {
        return x >>> 0;
    }

    // Checks if two arrays are equal
    function is_equal(arr1, arr2) {
        if (arr1.length != arr2.length) return false;

        for (var i = 0; i != arr1.length; i++) {
            if (arr1[i] != arr2[i]) return false;
        }
        return true;
    }

    function toHexString(byteArray) {
        var arr = [];
        for (var i = 0; i < byteArray.length; ++i) {
            arr.push(("0" + (byteArray[i] & 0xff).toString(16)).slice(-2));
        }
        return arr.join("");
    }

    function decode_data(bytes, port) {
        //data - Array of bytes.

        decoded_data = {};
        decoder = [
            {
                key: [0x00, 0xff],
                fn: function (arg) {
                    // Battery voltage
                    decoded_data.battery_voltage = decode_field(arg, 0, 15, "signed") * 0.01;
                    return 2;
                },
            },
            {
                key: [0x01, 0x00],
                fn: function (arg) {
                    // Reed switch state
                    decoded_data.reed_state = decode_field(arg, 0, 7, "unsigned");
                    return 1;
                },
            },
            {
                key: [0x02, 0x00],
                fn: function (arg) {
                    // Light detected
                    decoded_data.light_detected = decode_field(arg, 0, 7, "unsigned");
                    return 1;
                },
            },
            {
                key: [0x03, 0x67],
                fn: function (arg) {
                    // Temperature
                    decoded_data.ambient_temperature = decode_field(arg, 0, 15, "signed") * 0.1;
                    return 2;
                },
            },
            {
                key: [0x04, 0x68],
                fn: function (arg) {
                    // Relative humidity
                    decoded_data.relative_humidity = decode_field(arg, 0, 7, "unsigned") * 0.5;
                    return 1;
                },
            },
            {
                key: [0x05, 0x02],
                fn: function (arg) {
                    // Acceleration magnitude
                    decoded_data.impact_magnitude = decode_field(arg, 0, 15, "unsigned") * 0.001;
                    return 2;
                },
            },
            {
                key: [0x07, 0x71],
                fn: function (arg) {
                    // Acceleration vector
                    acceleration = { xaxis: null, yaxis: null, zaxis: null };
                    decoded_data.acceleration = acceleration;
                    decoded_data.acceleration.xaxis = decode_field(arg, 0, 15, "signed") * 0.001;
                    decoded_data.acceleration.yaxis = decode_field(arg, 16, 31, "signed") * 0.001;
                    decoded_data.acceleration.zaxis = decode_field(arg, 32, 47, "signed") * 0.001;
                    return 6;
                },
            },
            {
                key: [0x08, 0x04],
                fn: function (arg) {
                    // Reed switch count
                    decoded_data.reed_count = decode_field(arg, 0, 15, "unsigned");
                    return 2;
                },
            },
            {
                key: [0x09, 0x00],
                fn: function (arg) {
                    // Moisture
                    decoded_data.moisture = decode_field(arg, 0, 7, "unsigned");
                    return 1;
                },
            },
            {
                key: [0x0a, 0x00],
                fn: function (arg) {
                    // Motion
                    decoded_data.motion_event_state = decode_field(arg, 0, 7, "unsigned");
                    return 1;
                },
            },
            {
                key: [0x0b, 0x67],
                fn: function (arg) {
                    // MCU temperature
                    decoded_data.mcu_temperature = decode_field(arg, 0, 15, "signed") * 0.1;
                    return 2;
                },
            },
            {
                key: [0x0c, 0x00],
                fn: function (arg) {
                    // Impact alarm
                    decoded_data.impact_alarm = decode_field(arg, 0, 7, "unsigned");
                    return 1;
                },
            },
            {
                key: [0x0d, 0x04],
                fn: function (arg) {
                    // Motion event count
                    decoded_data.motion_event_count = decode_field(arg, 0, 15, "unsigned");
                    return 2;
                },
            },
            {
                key: [0x0e, 0x00],
                fn: function (arg) {
                    // External connector state
                    decoded_data.extconnector_state = decode_field(arg, 0, 7, "unsigned");
                    return 1;
                },
            },
            {
                key: [0x0f, 0x04],
                fn: function (arg) {
                    // External connector count
                    decoded_data.extconnector_count = decode_field(arg, 0, 15, "unsigned");
                    return 2;
                },
            },
            {
                key: [0x10, 0x02],
                fn: function (arg) {
                    // Ambient light intensity
                    decoded_data.light_intensity = decode_field(arg, 0, 7, "unsigned");
                    return 1;
                },
            },
            {
                key: [0x11, 0x02],
                fn: function (arg) {
                    // External connector analog
                    decoded_data.extconnector_analog = decode_field(arg, 0, 15, "unsigned") * 0.001;
                    return 2;
                },
            },
        ];

        decoded_data["raw"] = JSON.stringify(byteToArray(bytes));
        decoded_data["port"] = port;

        for (var bytes_left = bytes.length; bytes_left > 0; ) {
            var found = false;

            for (var i = 0; i < decoder.length; i++) {
                var item = decoder[i];
                var key = item.key;
                var keylen = key.length;

                header = bytes.slice(0, keylen);
                // Header in the data matches to what we expect
                if (is_equal(header, key)) {
                    var f = item.fn;
                    consumed = f(bytes.slice(keylen, bytes.length)) + keylen;
                    bytes_left -= consumed;
                    bytes = bytes.slice(consumed, bytes.length);
                    found = true;
                    break;
                }
            }
            if (found) {
                continue;
            }

            // No header located, abort
            console.log("[ERROR] Header not found!!");
            return decoded_data;
        }

        return decoded_data;
    }

    return {
        decode: decode_data,
    };
};
}


//EyoeDecoder
// I think this is PrefixedValues, but it's a bit messy, so will have to dig deeper (Erik)
if (typeof this.eyeoDecoder == "undefined") {
    this.eyeoDecoder = function () {
    function decode(payload) {
        let stream = payload; //document.getElementById("encoded").value.trim(); // start

        let byte_stream = [];

        if (isHex(stream)) {
            byte_stream = getHex(stream);
        } else {
            //	  document.getElementById("decoded").innerHTML = "Invalid stream";
            //   invalid stream
        }

        let decoded_object = parseSensorLoRaWAN(byte_stream); // den skickas in

        if (decoded_object == null || decoded_object.includes(null)) {
            node.warn("invalid stream"); //document.getElementById("decoded").innerHTML = "Invalid stream";
        } else {
            //document.getElementById("decoded").innerHTML = JSON.stringify(decoded_object, null, 2).slice(1,-1);
            return decoded_object;
        }
    }

    function isHex(value) {
        if (value.length == 0) return false;

        if (value.startsWith("0x") || value.startsWith("0X")) {
            value = value.substring(2);
        }

        let reg_exp = /^[0-9a-fA-F]+$/;

        if (reg_exp.test(value) && value.length % 2 == 0) {
            return true;
        } else {
            return false;
        }
    }

    function getHex(value) {
        if (value.startsWith("0x") || value.startsWith("0X")) {
            value = value.substring(2);
        }

        let num_bytes = value.length / 2;
        let bytes = [];

        for (let i = 0; i < num_bytes; i++) {
            bytes.push(parseInt(value.substring(i * 2, i * 2 + 2), 16));
        }

        return bytes;
    }

    function parseSensorLoRaWAN(buffer) {
        if (buffer == null) {
            return null;
        }

        let data_fields = [];

        let payload_length = buffer.length;
        let iterated_message_length = 0;

        let initial_port_id = 21; //TODO, set port with parameter //document.getElementById("port").value.trim();

        let data_field = parseDataField(buffer, iterated_message_length, parseInt(initial_port_id));
        data_fields.push(data_field[0]);
        iterated_message_length += data_field[1];

        while (iterated_message_length < payload_length) {
            data_field = parseDataField(buffer, iterated_message_length, null);

            if (data_field == null) {
                data_fields.push(null);
                iterated_message_length += 1;
            } else {
                data_fields.push(data_field[0]);
                iterated_message_length += data_field[1] + 1;
            }
        }

        return data_fields;
    }

    function parseDataField(buffer, index, port_id) {
        let id = buffer[index];
        let index_shift = 1;

        if (port_id != null) {
            id = port_id;
            index_shift = 0;
        }

        switch (id) {
            case 0:
                return [
                    {
                        ID: id,
                        MessageType: "Reserved",
                    },
                    0,
                ];

            case 1:
                return [
                    {
                        ID: id,
                        MessageType: "System Firmware Version",
                        Value: parseVersionUplink(buffer, index + index_shift),
                    },
                    4,
                ];

            case 2:
                return [
                    {
                        ID: id,
                        MessageType: "Debug Statistics",
                        Value: null,
                    },
                    0,
                ];

            case 3:
                return [
                    {
                        ID: id,
                        MessageType: "Acknowledgment Uplink",
                        Value: parseAcknowledgementUplink(buffer, index + index_shift),
                    },
                    4,
                ];

            case 10:
                return [
                    {
                        ID: id,
                        MessageType: "GPS Position",
                        Value: parseGPSData(buffer, index + index_shift),
                    },
                    6,
                ];

            case 20:
                return [
                    {
                        ID: id,
                        MessageType: "Battery Voltage",
                        Value: parseBatteryVoltage(buffer, index + index_shift),
                    },
                    2,
                ];

            case 21:
                return [
                    {
                        ID: id,
                        MessageType: "Analog In 1",
                        Value: parseAnalogIn(buffer, index + index_shift),
                    },
                    2,
                ];

            case 22:
                return [
                    {
                        ID: id,
                        MessageType: "Analog In 2",
                        Value: parseAnalogIn(buffer, index + index_shift),
                    },
                    2,
                ];

            case 23:
                return [
                    {
                        ID: id,
                        MessageType: "Analog In 3",
                        Value: parseAnalogIn(buffer, index + index_shift),
                    },
                    2,
                ];

            case 30:
                return [
                    {
                        ID: id,
                        MessageType: "Digital IO State",
                        Value: parseDigitalIOState(buffer, index + index_shift),
                    },
                    1,
                ];

            case 31:
                return [
                    {
                        ID: id,
                        MessageType: "Input 1 Pulse Count",
                        Value: parseInputPulseCount(buffer, index + index_shift),
                    },
                    2,
                ];

            case 32:
                return [
                    {
                        ID: id,
                        MessageType: "Input 2 Pulse Count",
                        Value: parseInputPulseCount(buffer, index + index_shift),
                    },
                    2,
                ];

            case 33:
                return [
                    {
                        ID: id,
                        MessageType: "Input 3 Pulse Count",
                        Value: parseInputPulseCount(buffer, index + index_shift),
                    },
                    2,
                ];

            case 39:
                return [
                    {
                        ID: id,
                        MessageType: "Digital Input Alert",
                        Value: parseDigitalInputAlert(buffer, index + index_shift),
                    },
                    6,
                ];

            case 40:
                return [
                    {
                        ID: id,
                        MessageType: "Internal Temperature",
                        Value: parseInternalTemperature(buffer, index + index_shift),
                    },
                    2,
                ];

            case 41:
                return [
                    {
                        ID: id,
                        MessageType: "Digital Matter I2C Temp Probe 1 (Red)",
                        Value: parseI2CTempProbe(buffer, index + index_shift),
                    },
                    2,
                ];

            case 42:
                return [
                    {
                        ID: id,
                        MessageType: "Digital Matter I2C Temp Probe 2 (Blue)",
                        Value: parseI2CTempProbe(buffer, index + index_shift),
                    },
                    2,
                ];

            case 43:
                return [
                    {
                        ID: id,
                        MessageType: "Digital Matter I2C Temp & Relative Humidity",
                        Value: parseI2CTempRelativeHumidity(buffer, index + index_shift),
                    },
                    3,
                ];

            case 50:
                return [
                    {
                        ID: id,
                        MessageType: "Battery Energy Used Since Power Up",
                        Value: parseBatteryEnergySincePower(buffer, index + index_shift),
                    },
                    2,
                ];

            case 51:
                return [
                    {
                        ID: id,
                        MessageType: "Estimated Battery % Remaining",
                        Value: parseEstimatedBatteryRemaining(buffer, index + index_shift),
                    },
                    1,
                ];

            case 128:
                return [
                    {
                        ID: id,
                        MessageType: "SDI-12 Measurement 1",
                        Value: parseSDIMeasurement(id, buffer, index + index_shift, port_id),
                    },
                    getSDISize(buffer, index + index_shift, port_id),
                ];

            case 129:
                return [
                    {
                        ID: id,
                        MessageType: "SDI-12 Measurement 1 - Part 2",
                        Value: parseSDIMeasurement(id, buffer, index + index_shift, port_id),
                    },
                    getSDISize(buffer, index + index_shift, port_id),
                ];

            case 130:
                return [
                    {
                        ID: id,
                        MessageType: "SDI-12 Measurement 2",
                        Value: parseSDIMeasurement(id, buffer, index + index_shift, port_id),
                    },
                    getSDISize(buffer, index + index_shift, port_id),
                ];

            case 131:
                return [
                    {
                        ID: id,
                        MessageType: "SDI-12 Measurement 2 - Part 2",
                        Value: parseSDIMeasurement(id, buffer, index + index_shift, port_id),
                    },
                    getSDISize(buffer, index + index_shift, port_id),
                ];

            case 132:
                return [
                    {
                        ID: id,
                        MessageType: "SDI-12 Measurement 3",
                        Value: parseSDIMeasurement(id, buffer, index + index_shift, port_id),
                    },
                    getSDISize(buffer, index + index_shift, port_id),
                ];

            case 133:
                return [
                    {
                        ID: id,
                        MessageType: "SDI-12 Measurement 3 - Part 2",
                        Value: parseSDIMeasurement(id, buffer, index + index_shift, port_id),
                    },
                    getSDISize(buffer, index + index_shift, port_id),
                ];

            case 134:
                return [
                    {
                        ID: id,
                        MessageType: "SDI-12 Measurement 4",
                        Value: parseSDIMeasurement(id, buffer, index + index_shift, port_id),
                    },
                    getSDISize(buffer, index + index_shift, port_id),
                ];

            case 135:
                return [
                    {
                        ID: id,
                        MessageType: "SDI-12 Measurement 4 - Part 2",
                        Value: parseSDIMeasurement(id, buffer, index + index_shift, port_id),
                    },
                    getSDISize(buffer, index + index_shift, port_id),
                ];

            case 136:
                return [
                    {
                        ID: id,
                        MessageType: "SDI-12 Measurement 5",
                        Value: parseSDIMeasurement(id, buffer, index + index_shift, port_id),
                    },
                    getSDISize(buffer, index + index_shift, port_id),
                ];

            case 137:
                return [
                    {
                        ID: id,
                        MessageType: "SDI-12 Measurement 5 - Part 2",
                        Value: parseSDIMeasurement(id, buffer, index + index_shift, port_id),
                    },
                    getSDISize(buffer, index + index_shift, port_id),
                ];

            case 223:
                return [
                    {
                        ID: 223,
                        MessageType: "Reserved",
                    },
                    0,
                ];

            default:
                return null;
        }
    }

    function parseLittleEndianInt32(buffer, offset) {
        let result = (buffer[offset + 3] << 24) + (buffer[offset + 2] << 16) + (buffer[offset + 1] << 8) + buffer[offset];

        if ((result & 0x80000000) > 0) result = result - 0x100000000;

        return result;
    }

    function parseLittleEndianInt24(buffer, offset) {
        let result = (buffer[offset + 2] << 16) + (buffer[offset + 1] << 8) + buffer[offset];

        if ((result & 0x800000) > 0) result = result - 0x1000000;

        return result;
    }

    function parseLittleEndianInt16(buffer, offset) {
        let result = (buffer[offset + 1] << 8) + buffer[offset];

        if ((result & 0x8000) > 0) result = result - 0x10000;

        return result;
    }

    function parseLittleEndianUInt16(buffer, offset) {
        let result = (buffer[offset + 1] << 8) + buffer[offset];

        return result;
    }

    function parseGPSData(buffer, index) {
        if (buffer[index] == 255 && buffer[index + 1] == 255 && buffer[index + 2]) {
            return "No fix available";
        }

        let latitude = 0.0000256 * parseLittleEndianInt24(buffer, index);
        let longitude = 0.0000256 * parseLittleEndianInt24(buffer, index + 3);

        return {
            Latitude: latitude,
            Longitude: longitude,
        };
    }

    function parseVersionUplink(buffer, index) {
        return {
            Product: buffer[index],
            HardwareRev: buffer[index + 1],
            FirmwareMajor: buffer[index + 2],
            FirmwareMinor: buffer[index + 3],
        };
    }

    function parseAcknowledgementUplink(buffer, index) {
        let seq_num = buffer[index] & 0x7f;
        let downlink_state = (buffer[index] & 0x80) > 0;
        let firmware_major = buffer[index + 1];
        let firmware_minor = buffer[index + 2];

        return {
            SequenceNumber: seq_num,
            DownlinkAccepted: downlink_state,
            FirmwareMajor: firmware_major,
            FirmwareMinor: firmware_minor,
        };
    }

    function parseBatteryVoltage(buffer, index) {
        return parseLittleEndianUInt16(buffer, index);
    }

    function parseAnalogIn(buffer, index) {
        return parseLittleEndianUInt16(buffer, index);
    }

    function parseDigitalIOState(buffer, index) {
        let digital_input_1_state = buffer[index] & 1 ? "1" : "0";
        let digital_input_2_state = buffer[index] & 2 ? "1" : "0";
        let digital_input_3_state = buffer[index] & 4 ? "1" : "0";
        let digital_output_3v3_state = buffer[index] & 8 ? "1" : "0";

        return {
            DI1: digital_input_1_state,
            DI2: digital_input_2_state,
            DI3: digital_input_3_state,
            DO3V3: digital_output_3v3_state,
        };
    }

    function parseInputPulseCount(buffer, index) {
        let input_pulse_count = parseLittleEndianUInt16(buffer, index);

        return input_pulse_count;
    }

    function parseDigitalInputAlert(buffer, index) {
        let current_digital_input_state = buffer[index];
        let digital_input_trigger = buffer[index + 1];
        let digital_input_1_change_count = parseLittleEndianUInt16(buffer, index + 2);
        let digital_input_2_change_count = parseLittleEndianUInt16(buffer, index + 4);

        return {
            CurrentDigitalInputState: current_digital_input_state,
            DigitalInputAlertTrigger: digital_input_trigger,
            DigitalInput1ChangeCount: digital_input_1_change_count,
            DigitalInput2ChangeCount: digital_input_2_change_count,
        };
    }

    function parseInternalTemperature(buffer, index) {
        let internal_temperature = parseLittleEndianInt16(buffer, index) / 100;

        return internal_temperature;
    }

    function parseI2CTempProbe(buffer, index) {
        let temp_probe = parseLittleEndianInt16(buffer, index) / 100;

        return temp_probe;
    }

    function parseI2CTempRelativeHumidity(buffer, index) {
        let temperature = parseLittleEndianInt16(buffer, index) / 100;
        let relative_humidity = buffer[index + 2] / 2;

        return {
            Temperature: temperature,
            RelativeHumidity: relative_humidity,
        };
    }

    function parseBatteryEnergySincePower(buffer, index) {
        let battery_energy_used = parseLittleEndianInt16(buffer, index);

        return battery_energy_used;
    }

    function parseEstimatedBatteryRemaining(buffer, index) {
        let estimated_battery_remaining = parseLittleEndianInt16(buffer, index);

        return estimated_battery_remaining;
    }

    function parseSDISoilMoistureData(buffer, index, num_samples) {
        let data = [];

        for (let i = 0; i < num_samples; i++) {
            data.push(buffer[index + i + 1] / 2 - 5);
        }

        return data;
    }

    function parseSDITempData(buffer, index, num_samples) {
        let data = [];

        for (let i = 0; i < num_samples; i++) {
            data.push(buffer[index + i + 1] / 2 - 40);
        }

        return data;
    }

    function parseSDIINT16Data(buffer, index, num_samples) {
        let data = [];

        for (let i = 0; i < num_samples; i++) {
            data.push(parseLittleEndianInt16(buffer, index + i * 2 + 1) / 100);
        }

        return data;
    }

    function parseSDIINT32Data(buffer, index, num_samples) {
        let data = [];

        for (let i = 0; i < num_samples; i++) {
            data.push(parseLittleEndianInt32(buffer, index + i * 4 + 1) / 1000);
        }

        return data;
    }

    function parseSDIINT12Data(buffer, index, num_samples) {
        let data = [];

        for (let i = 0; i < num_samples; i++) {
            let rawVal = 0;
            let twiceOffset = i * 3;
            if ((twiceOffset & 1) > 0) {
                rawVal = ((buffer[index + 1 + (twiceOffset - 1) / 2] & 0xf) << 8) + buffer[index + 1 + (twiceOffset + 1) / 2];
            } else {
                rawVal = (buffer[index + 1 + twiceOffset / 2] << 4) + (buffer[index + 1 + twiceOffset / 2 + 1] >> 4);
            }
            data.push(rawVal / 20 - 50);
        }

        return data;
    }

    function getSDISize(buffer, index/*, port_id*/) {// argument unused (Erik)
        let num_samples = buffer[index] & 0x0f;
        let data_type_id = buffer[index] >> 4;
        let size = 0;

        switch (data_type_id) {
            case 0: //Soil moisture
                size = num_samples + 1;
                return size;

            case 1: // Temperature
                size = num_samples + 1;
                return size;

            case 2: //INT16
                size = num_samples * 2 + 1;
                return size;

            case 3: //INT32
                size = num_samples * 4 + 1;
                return size;

            case 4: //INT12
                size = Math.ceil(num_samples * 1.5) + 1;
                return size;

            default:
                size = 0 + 1;
                return size;
        }
    }

    function parseSDIMeasurement(/*_id,*/ buffer, index/*, port_id*/) { // Argument unused (Erik)
        let num_samples = buffer[index] & 0x0f;
        let data_type_id = buffer[index] >> 4;
        let data = null;

        switch (data_type_id) {
            case 0: //Soil moisture
                data = parseSDISoilMoistureData(buffer, index, num_samples);
                return data;

            case 1: //Temperature
                data = parseSDITempData(buffer, index, num_samples);
                return data;

            case 2: //INT16
                data = parseSDIINT16Data(buffer, index, num_samples);
                return data;

            case 3: //INT32
                data = parseSDIINT32Data(buffer, index, num_samples);
                return data;

            case 4: //INT12
                data = parseSDIINT12Data(buffer, index, num_samples);
                return data;

            default:
                data = null;
                return data;
        }
    }

    return {
        decode: decode,
    };
};
}


//oy1700
// Has some odd interleaved format? (Erik)
if (typeof this.oy1700Decoder == "undefined") {
    this.oy1700Decoder = function (payload) {
    let dataBytes = payload;

    let OY1700Data = {
        Time: String,

        Temperature: 0.0,
        Humidity: 0.0,
        PM1_0: 0,
        PM2_5: 0,
        PM10: 0,
        PMcount0_3: 0,
        PMcount0_5: 0,
        PMcount1_0: 0,
        PMcount2_5: 0,
        PMcount5_0: 0,
    };


	// This uses some sort of interleaved format for some reason, unsure why? (Erik)
    TempString = dataBytes.substring(0, 2) + dataBytes.substring(4, 5);
    TempRh = dataBytes.substring(2, 4) + dataBytes.substring(5, 6);
    TempPM1_0 = dataBytes.substring(6, 10);
    TempPM2_5 = dataBytes.substring(10, 14);
    TempPM10 = dataBytes.substring(14, 18);

    //Extracting hex string and converting to decimal

    OY1700Data.Temperature = parseInt(TempString, 16) / 10 - 80; //.toFixed(2)
    OY1700Data.Humidity = parseInt(TempRh, 16) / 10 - 25; //.toFixed(2)
    OY1700Data.PM1_0 = parseInt(TempPM1_0, 16);
    OY1700Data.PM2_5 = parseInt(TempPM2_5, 16);
    OY1700Data.PM10 = parseInt(TempPM10, 16);

    OY1700Data.Time = new Date().toISOString();

    //parsedValues.push(OY1200Data)

    //return parsedValues
    return OY1700Data;
};
}


//oy1200
if (typeof this.oy1200Decoder == "undefined") {
    this.oy1200Decoder = function (payload) {
    let dataBytes = payload;

    let parsedValues = [];

    port = 1;
    if (port === 1) {
        if (dataBytes.length !== 24) {
            //if(dataBytes.length !== 12){
            return null;
        }
        console.log("Databytes: - ", dataBytes);
        //capacity = dataBytes.length / 12;
        capacity = dataBytes.length / 24;

        for (index = 0; index < capacity; index++) {
            let OY1200Data = {
                Time: String,
                CO2Raw: 0,
                CO2Filtered: 0,
                Temperature: 0.0,
                Humidity: 0.0,
            };

            //Converting the buffer value to hex string
            //dataBytes = dataBytes.toString('hex');

            //Extracting hex string and converting to decimal
            OY1200Data.CO2Raw = parseInt(dataBytes.substring(4, 8), 16);
            OY1200Data.CO2Filtered = parseInt(dataBytes.substring(8, 12), 16);
            OY1200Data.Temperature = parseInt(dataBytes.substring(12, 16), 16) / 100;
            OY1200Data.Humidity = parseInt(dataBytes.substring(16, 20), 16) / 100;
            OY1200Data.Time = new Date().toISOString();

            parsedValues.push(OY1200Data);
        }
    } else {
        return null;
    }

    return parsedValues;
};
}


// pyxi rft tracker decoder TODO: This needs to be fixed, it's not FixedPosition, it is PrefixedValue
// Simple FixedPositions (probably), there's some time/date shenanigans in there that I'm pretty sure doesn't matter?  (Erik)
if (typeof this.pyxiRftTrackerDecoder == "undefined") {
    this.pyxiRftTrackerDecoder = function (payload) {

    // change 0 static and 2 stop to notmoving and 1 start and 3 moving to moving
    function Movement(Status) {
        if (Status === 0 || Status === 2) {
            return (Status = "False");
        } else {
            return (Status = "True");
        }
    }

    var str = payload;

    var strOut1  = str.substring(0, 4); //ApplicationId(2b)
    var strOut2  = str.substring(4, 12); //DeviceId(4b)
    var strOut3  = str.substring(12, 14); //Status(1b)
    var strOut4  = str.substring(14, 16); //G (1b)
    var strOut5  = str.substring(16, 24); //Timestamp(4b)
    var strOut6  = str.substring(24, 32); //latitude(4b)
    var strOut7  = str.substring(32, 40); //Longitude(4b)
    var strOut8  = str.substring(40, 42); //nb satellites(1b)
    var strOut9  = str.substring(42, 46); //course(2b)
    var strOut10 = str.substring(46, 50); //speed(2b)
    var strOut11 = str.substring(50, 52); //V(1b)
    var strOut12 = str.substring(52, 56); //vbat level(2b)


    var d = {
        ApplicationId: strOut1, // last 4 pos in appEUI
        DeviceId: strOut2, // last 8 pos in DevEUI
        Status: Movement(parseInt("0x" + strOut3)), // 0(static), 1(Start alert), 2(Stop alert), 3(moving)
        G: strOut4, // 47 GPS pos, 56 battery level, 4D computed use rate
        timestamp: new Date(parseInt("0x" + strOut5) * 1000).toISOString(), // måste sedan räkna om!
        //LogDateandTime:new Date(parseInt("0x"+strOut4)*1000).toISOString(),
        //timestamp:timeConverter(timestamp1),
        latitude: parseInt("0x" + strOut6) / 1000000, //fixa till
        longitude: parseInt("0x" + strOut7) / 1000000,
        nbSatellites: parseInt("0x" + strOut8),
        course: parseInt("0x" + strOut9), // grader 360
        speed: parseInt("0x" + strOut10), // km/h
        V: strOut11,
        vbatlevel: parseInt("0x" + strOut12) / 100,
    };
    return d;
};
}


//Sensative Presence (15)
// PrefixedValues, metricsData is not set at all?  (Erik)
// Is Strip Presence?
if (typeof this.sensativePresenceDecoder == "undefined") {
    this.sensativePresenceDecoder = function (bytes) {
    var port = 1;
    // Decode an uplink message from a buffer
    // (array) of bytes to an object of fields.

    function decodeFrame(type, target) {
        switch (type & 0x7f) {
            case 0:
                target.emptyFrame = {};
                break;
            case 1: // Battery 1byte 0-100%
                target.battery = {};
                target.battery = bytes[pos++];
                break;
            case 2: // TempReport 2bytes 0.1degree C
                target.temperature = {};
                target.temperature.value = ((bytes[pos] & 0x80 ? 0xffff << 16 : 0) | (bytes[pos++] << 8) | bytes[pos++]) / 10;
                break;
            case 3:
                // Temp alarm
                target.tempAlarm = {};
                target.tempAlarm.highAlarm = !!(bytes[pos] & 0x01);
                target.tempAlarm.lowAlarm = !!(bytes[pos] & 0x02);
                pos++;
                break;
            case 4: // AvgTempReport 2bytes 0.1degree C
                target.averageTemperature = {};
                target.averageTemperature.value = ((bytes[pos] & 0x80 ? 0xffff << 16 : 0) | (bytes[pos++] << 8) | bytes[pos++]) / 10;
                break;
            case 5:
                // AvgTemp alarm
                target.avgTempAlarm = {};
                target.avgTempAlarm.highAlarm = !!(bytes[pos] & 0x01);
                target.avgTempAlarm.lowAlarm = !!(bytes[pos] & 0x02);
                pos++;
                break;
            case 6: // Humidity 1byte 0-100% in 0.5%
                target.humidity = {};
                target.humidity.value = bytes[pos++] / 2;
                break;
            case 7: // Lux 2bytes 0-65535lux
                target.lux = {};
                target.lux.value = (bytes[pos++] << 8) | bytes[pos++];
                break;
            case 8: // Lux 2bytes 0-65535lux
                target.lux2 = {};
                target.lux2.value = (bytes[pos++] << 8) | bytes[pos++];
                break;
            case 9: // DoorSwitch 1bytes binary
                target.door = {};
                target.door.value = !!bytes[pos++];
                break;
            case 10: // DoorAlarm 1bytes binary
                target.doorAlarm = {};
                target.doorAlarm.value = !!bytes[pos++];
                break;
            case 11: // TamperSwitch 1bytes binary
                target.tamperSwitch = {};
                target.tamperSwitch.value = !!bytes[pos++];
                break;
            case 12: // TamperAlarm 1bytes binary
                target.tamperAlarm = {};
                target.tamperAlarm.value = !!bytes[pos++];
                break;
            case 13: // Flood 1byte 0-100%
                target.flood = {};
                target.flood.value = bytes[pos++];
                break;
            case 14: // FloodAlarm 1bytes binary
                target.floodAlarm = {};
                target.floodAlarm.value = !!bytes[pos++];
                break;
            case 15: // FoilAlarm 1bytes binary
                target.foilAlarm = {};
                target.foilAlarm.value = !!bytes[pos++];
                break;
            case 16: // UserSwitchAlarm
                target.userSwitch = {};
                target.userSwitch.value = !!bytes[pos++];
                break;
            case 17: // Door count
                target.doorCount = {};
                target.doorCount.value = (bytes[pos++] << 8) | bytes[pos++];
                break;
            case 18: // Movment / Occupancy
                target.presence = {};
                target.presence.value = (bytes[pos++] << 8) | bytes[pos++];
                break;
            case 80:
                target.combined = {};
                target.combined.hum = bytes[pos++] / 2;
                target.combined.temp = ((bytes[pos] & 0x80 ? 0xffff << 16 : 0) | (bytes[pos++] << 8) | bytes[pos++]) / 10;
                break;
            case 81:
                target.combined = {};
                target.combined.hum = bytes[pos++] / 2;
                target.combined.avgTemp = ((bytes[pos] & 0x80 ? 0xffff << 16 : 0) | (bytes[pos++] << 8) | bytes[pos++]) / 10;
                break;
            case 82:
                target.combined = {};
                target.combined.door = !!bytes[pos++];
                target.combined.temp = ((bytes[pos] & 0x80 ? 0xffff << 16 : 0) | (bytes[pos++] << 8) | bytes[pos++]) / 10;
                break;
            case 110:
                target.buildId = {};
                target.buildId.modified = !!(bytes[pos] & 0xf0);
                target.buildId.id = 0;
                for (i = 0; i < 4; i++) {
                    target.buildId.id <<= 8;
                    target.buildId.id |= bytes[pos++];
                }
                target.buildId.id &= 0x0fffffff;
                pos += 4; // Ignore remaining 4 bytes
                break;
            case 112: // Capacitance Raw Sensor Value 2bytes 0-65535
                target.capacitanceFlood = {};
                target.capacitanceFlood.value = (bytes[pos++] << 8) | bytes[pos++];
                break;
            case 113: // Capacitance Raw Sensor Value 2bytes 0-65535
                target.capacitancePad = {};
                target.capacitancePad.value = (bytes[pos++] << 8) | bytes[pos++];
                break;
            case 114: // Capacitance Raw Sensor Value 2bytes 0-65535
                target.capacitanceEnd = {};
                target.capacitanceEnd.value = (bytes[pos++] << 8) | bytes[pos++];
                break;
        }
    }

    var decoded = {};
    var pos = 0;
    var type;

    switch (port) {
        case 1:
            if (bytes.length < 2) {
                decoded.error = "Wrong length of RX package";
                break;
            }
            decoded.historySeqNr = (bytes[pos++] << 8) | bytes[pos++];
            decoded.prevHistSeqNr = decoded.historySeqNr;
            while (pos < bytes.length) {
                type = bytes[pos++];
                if (type & 0x80) decoded.prevHistSeqNr--;
                decodeFrame(type, decoded);
            }
            break;

        case 2:
            var now = new Date();
            decoded.history = {};
            if (bytes.length < 2) {
                decoded.history.error = "Wrong length of RX package";
                break;
            }
            var seqNr = (bytes[pos++] << 8) | bytes[pos++];
            while (pos < bytes.length) {
                decoded.history[seqNr] = {};
                decoded.history.now = now.toUTCString();
                secondsAgo = (bytes[pos++] << 24) | (bytes[pos++] << 16) | (bytes[pos++] << 8) | bytes[pos++];
                decoded.history[seqNr].timeStamp = new Date(now.getTime() - secondsAgo * 1000).toUTCString();
                type = bytes[pos++];
                decodeFrame(type, decoded.history[seqNr]);
                seqNr++;
            }
    }
    return decoded;
};
}


// Ambiductor
// Looks to be simple FixedPositions, though has some unconventional stuff that needs to be accounted for with metricsData (Erik)
if (typeof this.ambiductorDecoder == "undefined") {
    this.ambiductorDecoder = function (payload) {

    var str = payload;

    var strOut1  = str.substring(0, 8);   //Current date and time(4b)
    var strOut2  = str.substring(8, 10);  //Status Code(1b)
    var strOut3  = str.substring(10, 18); //Current volume(4b)
    var strOut4  = str.substring(18, 26); //Log date and time(4b)
    var strOut5  = str.substring(26, 34); //Volume at log date and time(4b)
    var strOut6  = str.substring(34, 38); //Delta volume 1(one hour before)(2b)
    var strOut7  = str.substring(38, 42); //Delta volume 2(2b)
    var strOut8  = str.substring(42, 46); //Delta volume 3(2b)
    var strOut9  = str.substring(46, 50); //Delta volume 4(2b)
    var strOut10 = str.substring(50, 54); //Delta volume 5(2b)
    var strOut11 = str.substring(54, 58); //Delta volume 6(2b)
    var strOut12 = str.substring(58, 62); //Delta volme 7(2b)
    var strOut13 = str.substring(62, 66); //Delta volme 8(2b)
    var strOut14 = str.substring(66, 70); //Delta volme 9(2b)
    var strOut15 = str.substring(70, 74); //Delta volme 10(2b)
    var strOut16 = str.substring(74, 78); //Delta volme 11(2b)
    var strOut17 = str.substring(78, 82); //Delta volme 12(2b)
    var strOut18 = str.substring(82, 86); //Delta volme 13(2b)
    var strOut19 = str.substring(86, 90); //Delta volme 14(2b)
    var strOut20 = str.substring(90, 94); //Delta volme 15(2b)
    var strOut21 = str.substring(94, 96); //Padding type(1b)



    var d = {
        Currentdate: new Date(parseInt("0x" + strOut1) * 1000).toISOString(), // Date for messure
        StatusCode: strOut2, //normal, low batt
        CurrentVolume: parseInt("0x" + strOut3) * 0.001, // 0(static), 1(Start alert), 2(Stop alert), 3(moving)
        LogDateandTime: new Date(parseInt("0x" + strOut4) * 1000).toISOString(), //(parseInt("0x"+strOut4)),  // 47 GPS pos, 56 battery level, 4D computed use rate
        VolumeLogDateTime: parseInt("0x" + strOut5) * 0.001, // volume this measurement
        DeltaVolume1: parseInt("0x" + strOut6) * 0.001, //volume last measurement, 1 hour
        DeltaVolume2: parseInt("0x" + strOut7) * 0.001, // Volume second last message, 2 hours back
        DeltaVolume3: parseInt("0x" + strOut8) * 0.001,
        DeltaVolume4: parseInt("0x" + strOut9) * 0.001, //
        DeltaVolume5: parseInt("0x" + strOut10) * 0.001, //
        DeltaVolume6: parseInt("0x" + strOut11) * 0.001,
        DeltaVolume7: parseInt("0x" + strOut12) * 0.001,
        DeltaVolume8: parseInt("0x" + strOut13) * 0.001,
        DeltaVolume9: parseInt("0x" + strOut14) * 0.001,
        DeltaVolume10: parseInt("0x" + strOut15) * 0.001,
        DeltaVolume11: parseInt("0x" + strOut16) * 0.001,
        DeltaVolume12: parseInt("0x" + strOut17) * 0.001,
        DeltaVolume13: parseInt("0x" + strOut18) * 0.001,
        DeltaVolume14: parseInt("0x" + strOut19) * 0.001,
        DeltaVolume15: parseInt("0x" + strOut20) * 0.001,
        PaddingType: strOut21,
    };

    return d;
};
}


// Meteo decoders ///////
// Meteo Helix
if (typeof this.meteoHelixDecoder == "undefined") {
    this.meteoHelixDecoder = function (bytes) {

    // if(bytes.length != 11) return {"status": "ERROR", "description": "11 bytes are required"}

    var bindata = data2bits(bytes);
	var pos = 0;

	// NOTE: bitShift function for meteo decode, this one needs to be in this scope so it encloses the above pos variable, which was global before (Erik)
	function bitShift(bits, bindata) {
		var num = bin2dec(bindata.substr(pos, bits));
		pos += bits;
		return Number(num);
	}


	var decoded = {};

    decoded.Type = bitShift(2, bindata);
    decoded.Battery = precisionRound(bitShift(5, bindata) * 0.05 + 3, 2);
    decoded.Temperature = precisionRound(bitShift(11, bindata) * 0.1 - 100, 1);
    decoded.T_min = precisionRound( decoded.Temperature - bitShift(6, bindata) * 0.1, 1);
    decoded.T_max = precisionRound( decoded.Temperature + bitShift(6, bindata) * 0.1, 1);
    decoded.Humidity = precisionRound(bitShift(9, bindata) * 0.2, 1);
    decoded.Pressure = bitShift(14, bindata) * 5 + 50000;
    decoded.Irradiation = bitShift(10, bindata) * 2;
    decoded.Irr_max = decoded.Irradiation + bitShift(9, bindata) * 2;
    decoded.Rain = precisionRound(bitShift(8, bindata), 1);
    decoded.Rain_min_time = precisionRound(bitShift(8, bindata), 1);

    return decoded;
};
}


// Meteo Wind
if (typeof this.meteoWindDecoder == "undefined") {
    this.meteoWindDecoder = function(bytes) {

    // if (bytes.length != 9) return { status: "ERROR", describtion: "9 bytes are required" };


	var bindata = data2bits(bytes);
	var pos = 0;

	// NOTE: bitShift function for meteo decode, this one needs to be in this scope so it encloses the above pos variable, which was global before (Erik)
	function bitShift(bits, bindata) {
		var num = bin2dec(bindata.substr(pos, bits));
		pos += bits;
		return Number(num);
	}


    var decoded = {};

    decoded.Type = bitShift(2, bindata);
    decoded.Battery = precisionRound(bitShift(5, bindata) * 0.05 + 3, 2);
    decoded.Wind_ave10 = precisionRound(bitShift(9, bindata) * 0.1, 1);
    decoded.Wind_max10 = decoded.Wind_ave10 + precisionRound(bitShift(9, bindata) * 0.1, 1);
    decoded.Wind_min10 = decoded.Wind_ave10 - precisionRound(bitShift(9, bindata) * 0.1, 1);
    decoded.Dir_ave10 = precisionRound(bitShift(9, bindata) * 1, 1);
    decoded.Dir_max10 = precisionRound(bitShift(9, bindata) * 1, 1);
    decoded.Dir_hi10 = precisionRound(bitShift(8, bindata) * 1, 1);
    decoded.Dir_lo10 = precisionRound(bitShift(8, bindata) * 1, 1);

    return decoded;
};
}



//////////////////////////////////////////////////
// #region Global script functions ////////////////////////

// #region Meteo specific functions  vvvvvvvvv
// TODO: move back into decoder function scope?
function pad(num) {
    var s = "0000000" + num;

    return s.slice(-8);
}

function dec2bin (num) {
    // return pad(ConvertBase(num).from(10).to(2));
	return pad(parseInt(num, 10).toString(2));
}

function bin2dec (num) {
    // return ConvertBase(num).from(2).to(10);
	return parseInt(num, 2).toString(10);
}

function data2bits(data) {
    var binary = "";
    for (var i = 0; i < data.length; i++) {
        binary += dec2bin(data[i]);
    }
    return binary;
}
// #endregion Meteo specific functions
////////////


function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function isEmptyValue(value) {
    return value === undefined || value === null || value === "" || isNaN(value) || value === "null";
}

function isEmptyObj(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
}


// bitMask
// Creates a bitmask containing 1's that is 'width' wide:
// width 2: 0000 0011
// width 5: 0001 1111
// If not 0 <= width < 31, then function returns odd values
function bitMask(width) {
	return (1 << width) - 1;
}
// #endregion Global script functions




/////////////////////////////////////////////////////////////////////////
// MAIN DECODER /////////////////////////////////////////////////////////
const payload = msg.payload;

if(!payload) {
	return msg; // eslint-disable-line
}


const deviceTypeId = msg.device.DeviceTypeId;

var bytes = hexToBytes(payload);
var payloadData;
var metricsData = {};

var decodeFunction;

//SWITCH TO DECODE
switch (deviceTypeId) {
	case 1:
		// NOTE: Not handled at all, should we do something here? (Erik)
		break;

    case 2: // Elsys basic
    case 3: // Elsys CO2
    case 11: // Elsys Grideye (NOTE: Not handled at the moment, and currently doesn't need to be (Erik))
    case 12: // Elsys sound
	case 13: // Elsys Occupancy (NOTE: Not handled at the moment, and currently doesn't need to be (Erik))
	case 21: // Elsys Ultrasonic
    case 22: // Elsys CO2 Lite

		decodeConfig = this.elsysDecodeConfig;

		// TODO: Change this to grab function from config
		decodeFunction = this.DecodePrefixPayload;


		var decodedData = decodeFunction(msg.payload, decodeConfig);

		payloadData = decodedData.payloadData;
		// metricsData = decodedData.metricsData;

		metricsData = {
            Temperature: payloadData.temperature,
            Humidity: payloadData.humidity,
            CO2: payloadData.co2,
            Voltage: parseFloat(payloadData.vdd) * 0.001,
            Presence: payloadData.motion,
            Illuminance: payloadData.light,
            SoundPeak: payloadData.soundPeak,
            SoundAvg: payloadData.soundAvg,
        };

		break;


    case 5: //decentlab
		// decodeConfig = this.decentLabDecodeConfig;
		// decodeF = this.DecodeDecentLabPayload;

		// var decodedData = decodeF(msg.payload, decodeConfig);

		// payloadData = decodedData.payloadData;

        payloadData = decentlab_decoder.decode(payload);

        metricsData = {
            Temperature: payloadData["air-temperature"].value,
            Humidity: payloadData["air-humidity"].value,
            Pressure: payloadData["barometric-pressure"].value,
            Illuminance: payloadData["illuminance"].value,
            CO2: payloadData["co2-concentration"].value,
            TVOC: payloadData["total-voc"].value,
            Presence: payloadData["pir-activity-counter"].value,
            AmbientLightInfrared: payloadData["ambient-light-infrared"].value,
            AmbientLightVisibleInfrared: payloadData["ambient-light-visible-infrared"].value,
            Voltage: payloadData["battery-voltage"].value,
        };
        break;


    case 7:
		decodeConfig = this.yabbyDecodeConfig;
		decodeFunction = this.DecodeFixedPayload;

		// TODO: these three lines could be refactored out of the switch once everything has been generalized, but for now I'll put them here as a very functional work around (Erik).
		var decodedData = decodeFunction(msg.payload, decodeConfig);

		payloadData = decodedData.payloadData;
		metricsData = {
            Position: payloadData.longitudeDeg + "," + payloadData.latitudeDeg,
            Speed: payloadData.speedKmph,
            Heading: payloadData.headingDeg,
            Movement: payloadData.inTrip,
            Voltage: payloadData.batV,
        };
		break;


    case 9: // Senseairco2
        payloadData = this.oy1200Decoder(payload)[0];
        metricsData = {
            Temperature: payloadData.Temperature,
            Humidity: payloadData.Humidity,
            Illuminance: payloadData.light,
            CO2: payloadData.CO2Filtered,
            Presence: payloadData.motion,
        };
        break;


    case 10:
        var decodemodule = this.tektelicDecoder();
        payloadData = decodemodule.decode(bytes, 10);
        metricsData = {
            Temperature: payloadData.ambient_temperature,
            Humidity: payloadData.relative_humidity,
            Presence: payloadData.motion_event_state,
            Voltage: payloadData.battery_voltage,
        };
        break;


    case 14: //peoplecounter
		decodeConfig = this.peopleCounterDecodeConfig;
		decodeFunction = this.DecodeFixedPayload;

		var decodedData = decodeFunction(msg.payload, decodeConfig);

		payloadData = decodedData.payloadData;
        metricsData = {
            OccupancyOut: payloadData.CounterA,
            OccupancyIn: payloadData.CounterB,
            Voltage: payloadData.BatteryVoltage / 100,
        };

        break;


    case 15:
        payloadData = this.sensativePresenceDecoder(bytes);
        metricsData = {
            //TODO set the Presense metric data
        };
        break;


    case 16:
		decodeConfig = this.cgDeskSenseDecoderConfig;
		decodeFunction = this.DecodePrefixPayload;

		var decodedData = decodeFunction(msg.payload, decodeConfig);

		payloadData = decodedData.payloadData;
		metricsData = {
            Presence: payloadData.occupied,
            Occupancy: payloadData.occupied,
            Voltage: payloadData.vdd,
        };
		break;


    case 17:
        var decodemodule = this.eyeoDecoder();
        payloadData = decodemodule.decode(payload);
        metricsData = {
            Temperature: payloadData[2].Value,
            Pressure: payloadData[0].Value,
            Voltage: parseFloat(payloadData[1].Value) * 0.001,
        };
        break;


    case 18:
		decodeConfig = this.ellenexDecodeConfig;
		decodeFunction = this.DecodeFixedPayload;

		var decodedData = decodeFunction(msg.payload, decodeConfig);

		payloadData = decodedData.payloadData;

		// TODO: This is a workaround for missing implementation detail
		// Currently there's no way to describe several values from one set of bytes, so this will have to do for now(Erik)
		let sensorRange = 10000;
		payloadData.height = sensorRange * ((payloadData.rawPressure - 4000) / 16000); // water height in millimeter

        metricsData = {
            Temperature: payloadData.temperature,
            Pressure: payloadData.rawPressure,
            Height: payloadData.height,
            Voltage: parseFloat(payloadData.vdd) * 0.001,
        };
        break;


    case 19:
        payloadData = this.oy1700Decoder(payload);
        metricsData = {
            Temperature: payloadData.Temperature,
            Humidity: payloadData.Humidity,
            PM1_0: payloadData.PM1_0,
            PM2_5: payloadData.PM2_5,
            PM10: payloadData.PM10,
        };
        break;


    case 25:
        payloadData = this.decentlab_decoder_pr26.decode(payload);
        metricsData = {
            Temperature: payloadData.temperature,
            Pressure: payloadData.pressure,
            Height: payloadData.height,
            Voltage: payloadData.battery_voltage,
        };
        break;


    case 26:
		decodeConfig = this.pyxiRftTrackerDecoderConfig;
		decodeFunction = this.DecodeFixedPayload;

		var decodedData = decodeFunction(msg.payload, decodeConfig);

		payloadData = decodedData.payloadData;


		// NOTE: This function could be changed to return boolean values instead?
		// NOTE: This post processing could possibly be done somewhere else, but for now this works
		function Movement(Status) {
			if (Status === 0 || Status === 2) {
				return (Status = "False");
			} else {
				return (Status = "True");
			}
		}

		payloadData.Status = Movement(payloadData.Status);
		payloadData.timestamp = new Date(payloadData.timestamp).toISOString();

		metricsData = {
            Position: payloadData.longitude + "," + payloadData.latitude,
            Speed: payloadData.speed,
            Heading: payloadData.course,
            Movement: payloadData.Status,
            Voltage: payloadData.vbatlevel,
        };

        break;


    case 27:
        payloadData = this.ambiductorDecoder(payload);
        metricsData = {
            Volume: payloadData.VolumeLogDateTime,
        };
        node.warn(payloadData);
        break;


	case 30:
		Decoder = this.meteoHelixDecoder;

		payloadData = Decoder(bytes);

		metricsData = {
			Voltage: payloadData.Battery,
			Temperature: payloadData.Temperature,
			Humidity: payloadData.Humidity,
			Pressure: payloadData.Pressure,
			Irradiation: payloadData.Irradiation,
			Rain: payloadData.Rain,
		};

		break;

	case 31:
		Decoder = this.meteoWindDecoder;

		payloadData = Decoder(bytes);

		metricsData = {
			Voltage: payloadData.Battery,
			Wind: payloadData.Wind_ave10,
			Angle: payloadData.Dir_ave10,
		};

		break;



    default:
        node.warn("decode for devicetypeid: " + deviceTypeId + " not implemented!");
        break;
}


msg.payloadData = payloadData;
msg.metricsData = metricsData;

return msg;






//#region
///////////////////////////////////////////////////////////////////////
/* TEMPLATES FOR EASY COPYING (CAN BE DELETED WITHOUT ISSUE) (ERIK)

// FixedPositions Value template
{  // PayloadType(1B)
	"ignore":true,

	"numBytes":1,

	"stringType":true, // Note for string type: numBytes means 2 characters each in hexa
	"bufferF":"readUInt16BE",

	"vendorConversionScale":100,
	"ourConversionScale":0.001,

	"vendorName":"PayloadType",
	"ourName":"payloadType"
},

// FixedPositions BitsFlags template
{
	"numBytes": 1,

	"bufferF":"readUInt8", // For now this has to be used in conjunction with "bitsType" (Add errorchecks?)

	"bitsType":"flags", // bitsConfig is implicitly read as bools
	"bitsConfigs":[
		{ // 8.0  0: Out of trip, 1: In-trip
			"vendorName":"inTrip"
		},
		{ // 8.1 Last fix failed
			"vendorName":"fixFailed"
		},
		{ // 8.2 Man down (no movement for configured period)
			"vendorName":"manDown"
		},
		// 8.3 -8.7 Reserved (Ignore)
		{ ignore: true },{ ignore: true },{ ignore: true },{ ignore: true },{ ignore: true },
	]
},

// FixedPositions BitsValues template
{
	"numBytes": 1,

	"bufferF":"readUInt8", // For now this has to be used in conjunction with "bitsType" (Add errorchecks?)

	"bitsType":"bitValues",
	"bitsConfigs":[
		{ // 9.0-9.2 (3 bits) Heading, LSb = 45°, rounded to nearest
			"vendorName":"headingDeg",
			"numBits":3,

			"vendorConversionScale":45
		},
		{ // 9.3-9.7 (5 bits) Speed, LSb = 5km/h, rounded down
			"vendorName":"speedKmph",
			"numBits":5,

			"vendorConversionScale":5
		},
	]
},
*/



//////////////////////////////////////////////////////
// Useful buffer functions
// Int/UInt specifies a signed/unsigned integer value
// LE/BE specifies LittleEndian/BigEndian
// 0 < byteLength <= 6

// buf.readIntBE(offset, byteLength)
// buf.readIntLE(offset, byteLength)
// buf.readUIntBE(offset, byteLength)
// buf.readUIntLE(offset, byteLength)

// 32bit (4 bytes)
// buf.readFloatBE([offset])
// buf.readFloatLE([offset])

// 64 bit (8 bytes)
// buf.readDoubleBE([offset])
// buf.readDoubleLE([offset])



/*
////////////////////////////////////////////////////////////////
// Archived Code ///////////////////////////////////////////////
//CG DeskSense (Superceded by general decoder)
// I think this is a simple PrefixedValues type, should be easy to convert (Erik)
/* if (typeof this.cgDeskSenseDecoder == "undefined") {
    this.cgDeskSenseDecoder = function (bytes, port) {
    // File: 	"Capgemini OfficeSense Payload Decoder (Light)"
    // Date:	2020-08-11
    // Author: 	A Smithuis

    var TYPE_build = 0x01; // Build timestamp                              			( 7 bytes)
    var TYPE_HW_V = 0x02; // Hardware Version                              			( 1 bytes)
    var TYPE_SW_V = 0x03; // Software Version                              			( 2 bytes)
    var TYPE_PCBID = 0x04; // PCB Identifier (PXXXXXX)                     			( 3 bytes)
    var TYPE_PCBV = 0x05; // PCB Identifier version (VXX)							( 1 bytes)
    var TYPE_hbInterval = 0x10; // Heartbeat msg Interval                        	( 2 bytes)
    var TYPE_loraRejoinCnt = 0x12; // Number of msgs needed before forced new join  ( 1 bytes)
    var TYPE_devFunction = 0x20; // Device function - WIP                         	( 1 bytes)
    var TYPE_devBattery = 0x22; // Device Battery lvl                            	( 2 bytes)
    var TYPE_TempC = 0x30; // Temperature (deg C)                           		( 2 bytes)
    var TYPE_TempF = 0x31; // Temperature (deg F)(deprecated)                  		( 2 bytes)
    var TYPE_Humidity = 0x32; // Humidity (%)                                  		( 1 bytes)
    var TYPE_CO2 = 0x33; // CO2 (ppm)                                     			( 2 bytes)
    var TYPE_nSamplesNeeded = 0x40; // Config: number of samples                    ( 1 bytes)
    var TYPE_tSample = 0x41; // Config: time between samples                  		( 2 bytes)
    var TYPE_tStopped = 0x42; // Config: silence time after msg                		( 2 bytes)
    var TYPE_tIdle = 0x43; // Config: time before releasing room            		( 2 bytes)
    var TYPE_nSamplesTaken = 0x44; // Number of samples taken during FP             ( 1 bytes)
    var TYPE_nSamplesPos = 0x45; // Number of samples detected motion             	( 1 bytes)
    var TYPE_occupied = 0x46; // Room occupied? (1=yes, 0=no)                  		( 1 bytes)
    var TYPE_CO2_CalCnt = 0x66; // CO2 Calibration Counter

    var obj = {};
    for (i = 0; i < bytes.length; i++) {
        switch (bytes[i]) {
            // 0x01
            case TYPE_build: {
                var year = (bytes[i + 1] << 8) | bytes[i + 2];
                var month = bytes[i + 3];
                var day = bytes[i + 4];
                var hour = bytes[i + 5];
                var minutes = bytes[i + 6];
                var seconds = bytes[i + 7];
                var buildnum = new Date(year, month - 1, day, hour, minutes, seconds);
                obj.buildnum = buildnum.toString();
                i += 7;
                break;
            }

            // 0x02
            case TYPE_HW_V: {
                var hwVersion = bytes[i + 1];
                obj.hwVersion = hwVersion;
                i += 1;
                break;
            }

            // 0x03
            case TYPE_SW_V: {
                var swVersion = bytes[i + 1] + "." + bytes[i + 2];
                obj.swVersion = swVersion;
                i += 2;
                break;
            }

            // 0x04 - PCB identifier (PXXXXXX)
            case TYPE_PCBID: {
                var pcbID = "P";
                for (var j = 0; j < 3; j++) {
                    var val = parseInt(bytes[i + 1 + j]);
                    if (val < 10) {
                        pcbID += "0";
                    }
                    pcbID += val.toString();
                }
                obj.pcbID = pcbID;
                i += 3;
                break;
            }

            // 0x05 - PCB identifier version (VXX)
            case TYPE_PCBV: {
                var pcbv = bytes[i + 1];
                obj.pcbv = pcbv;
                i += 1;
                break;
            }

            // 0x10
            case TYPE_hbInterval: {
                var hbInterval = (bytes[i + 1] << 8) | bytes[i + 2];
                obj.hbInterval = hbInterval;
                i += 2;
                break;
            }

            // 0x12
            case TYPE_loraRejoinCnt: {
                var loraRejoinCnt = bytes[i + 1];
                obj.loraRejoinCnt = loraRejoinCnt * 100;
                i += 1;
                break;
            }

            // 0x20
            case TYPE_devFunction: {
                var devFunction = bytes[i + 1];
                obj.devFunction = devFunction;
                i += 1;
                break;
            }

            // 0x22
            case TYPE_devBattery: {
                var vdd = (bytes[i + 1] << 8) | bytes[i + 2];
                obj.vdd = vdd / 1000;
                i += 2;
                break;
            }

            // 0x30
            case TYPE_TempC: {
                var tempC = (bytes[i + 1] << 8) | bytes[i + 2];
                obj.tempC = tempC / 100;
                i += 2;
                break;
            }

            // 0x31
            case TYPE_TempF: {
                var tempF = (bytes[i + 1] << 8) | bytes[i + 2];
                obj.tempF = tempF / 100;
                i += 2;
                break;
            }

            // 0x32
            case TYPE_Humidity: {
                var humidity = bytes[i + 1];
                obj.humidity = humidity;
                i += 1;
                break;
            }

            // 0x33
            case TYPE_CO2: {
                var co2 = (bytes[i + 1] << 8) | bytes[i + 2];
                obj.co2 = co2;
                i += 2;
                break;
            }

            // 0x40
            case TYPE_nSamplesNeeded: {
                var nSamplesNeeded = bytes[i + 1];
                obj.nSamplesNeeded = nSamplesNeeded;
                i += 1;
                break;
            }

            // 0x41
            case TYPE_tSample: {
                var tSample = (bytes[i + 1] << 8) | bytes[i + 2];
                obj.tSample = tSample;
                i += 2;
                break;
            }

            // 0x42
            case TYPE_tStopped: {
                var tStopped = (bytes[i + 1] << 8) | bytes[i + 2];
                obj.tStopped = tStopped;
                i += 2;
                break;
            }

            // 0x43
            case TYPE_tIdle: {
                var tIdle = (bytes[i + 1] << 8) | bytes[i + 2];
                obj.tIdle = tIdle;
                i += 2;
                break;
            }

            // 0x44
            case TYPE_nSamplesTaken: {
                var nsample = bytes[i + 1];
                obj.nsample = nsample;
                i += 1;
                break;
            }

            // 0x45
            case TYPE_nSamplesPos: {
                var npositive = bytes[i + 1];
                obj.npositive = npositive;
                i += 1;
                break;
            }

            // 0x46
            case TYPE_occupied: {
                var occupied = bytes[i + 1];
                obj.occupied = occupied;
                i += 1;
                break;
            }

			// 0x47
			case TYPE_activity: {
				var activity = (bytes[i + 1]);
				obj.activity = activity;
				i += 1;
				break;
			}

			// 0x48
			case TYPE_activityThresh: {
				var activityThreshold = (bytes[i + 1]);
				obj.activityThreshold = activityThreshold;
				i += 1;
				break;
			}

			// 0x49
			case TYPE_thresholdHyst: {
				var thresholdHyst = (bytes[i + 1]);
				obj.thresholdHyst = thresholdHyst;
				i += 1;
				break;
			}

            case TYPE_CO2_CalCnt: {
                var Co2CalCounter = (bytes[i + 1] << 16) | (bytes[i + 2] << 8) | bytes[i + 3];
                obj.Co2CalCounter = Co2CalCounter;
                i += 3;
                break;
            }

            default: {
                // Unrecognized Parameter ID!
                break;
            }
        }
    }
    return obj;
}
} */


//yabby (superceded by general function)
/*function yabberDecoder() {
    function isHex(val, port) {
        if (val.length == 0) return true;

        var hadPrefix = false;
        if (val.startsWith("0x") || val.startsWith("0X")) {
            val = val.substring(2); //get rid of starting '0x'
            hadPrefix = true;
        }

        if ((val.length & 1) == 1) return false;

        var orig_input = val;
        var input = val.replace(/[^A-Fa-f0-9]/g, "");
        if (orig_input != input) return false;

        if (getBase64(val) == null) return true;

        // Could be hex, or could be Base64
        if (hadPrefix) return Decoder(getHex(val), port) != null;
        else return Decoder(getBase64(val), port) == null;
    }

    function getHex(val) {
        if (val.startsWith("0x") || val.startsWith("0X")) {
            val = val.substring(2); //get rid of starting '0x'
        }

        var numBytes = val.length / 2;
        var bytes = [];

        for (var i = 0; i < numBytes; i++) {
            bytes.push(parseInt(val.substring(i * 2, i * 2 + 2), 16));
        }

        return bytes;
    }

    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    function getBase64(input) {
        var output = new Array();
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        var orig_input = input;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        if (orig_input != input) return null;

        if (input.length % 4) return null;

        var j = 0;
        while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output[j++] = chr1;
            if (enc3 != 64) output[j++] = chr2;
            if (enc4 != 64) output[j++] = chr3;
        }

        return output;
    }

    function Decoder(bytes) {
        var port = 1;
        // Decode an uplink message from a buffer
        // (array) of bytes to an object of fields.
        var decoded = {};

        if (bytes == null) return null;

        if (port === 1) {
            if (bytes.length != 11) return null;

            decoded.type = "position";

            decoded.latitudeDeg = bytes[0] + bytes[1] * 256 + bytes[2] * 65536 + bytes[3] * 16777216;
            if (decoded.latitudeDeg >= 0x80000000) decoded.latitudeDeg -= 0x100000000;
            decoded.latitudeDeg /= 1e7;

            decoded.longitudeDeg = bytes[4] + bytes[5] * 256 + bytes[6] * 65536 + bytes[7] * 16777216;
            if (decoded.longitudeDeg >= 0x80000000) decoded.longitudeDeg -= 0x100000000;
            decoded.longitudeDeg /= 1e7;

            decoded.inTrip = (bytes[8] & 0x1) !== 0 ? true : false;
            decoded.fixFailed = (bytes[8] & 0x2) !== 0 ? true : false;
            decoded.manDown = (bytes[8] & 0x4) !== 0 ? true : false;

            decoded.headingDeg = (bytes[9] & 0x7) * 45;
            decoded.speedKmph = (bytes[9] >> 3) * 5;

            decoded.batV = bytes[10] * 0.025;
        } else if (port === 2) {
            if (bytes.length != 3) return null;

            decoded.type = "downlink ack";

            decoded.sequence = bytes[0] & 0x7f;
            decoded.accepted = (bytes[0] & 0x80) !== 0 ? true : false;
            decoded.fwMaj = bytes[1];
            decoded.fwMin = bytes[2];
        } else if (port === 3) {
            if (bytes.length != 11) return null;

            decoded.type = "stats";

            decoded.initialBatV = (bytes[0] & 0xf) !== 0 ? 4.0 + (bytes[0] & 0xf) * 0.1 : null;
            decoded.txCount = 32 * ((bytes[0] >> 4) + (bytes[1] & 0x7f) * 16);
            decoded.tripCount = 32 * ((bytes[1] >> 7) + (bytes[2] & 0xff) * 2 + (bytes[3] & 0x0f) * 512);
            decoded.gpsSuccesses = 32 * ((bytes[3] >> 4) + (bytes[4] & 0x3f) * 16);
            decoded.gpsFails = 32 * ((bytes[4] >> 6) + (bytes[5] & 0x3f) * 4);
            decoded.aveGpsFixS = 1 * ((bytes[5] >> 6) + (bytes[6] & 0x7f) * 4);
            decoded.aveGpsFailS = 1 * ((bytes[6] >> 7) + (bytes[7] & 0xff) * 2);
            decoded.aveGpsFreshenS = 1 * ((bytes[7] >> 8) + (bytes[8] & 0xff) * 1);
            decoded.wakeupsPerTrip = 1 * ((bytes[8] >> 8) + (bytes[9] & 0x7f) * 1);
            decoded.uptimeWeeks = 1 * ((bytes[9] >> 7) + (bytes[10] & 0xff) * 2);
        }

        return decoded;
    }

    return {
        decode: Decoder,
    };
}
*/

// people counter (superceded by general function)
/*
// Looks like a simple FixedPositions, can probably easily convert (Erik)
if(typeof this.peopleCounterDecoder == "undefined") {
	this.peopleCounterDecoder = function (str) {
    if (str.length < 46) {
        node.warn("peopleCounterDecoder: payload to short");
        return;
    }

    var strOut1 = str.substring(0, 2); //PayloadType(8b)
    var strOut2 = str.substring(2, 4); //Type Variant(8b)
    var strOut3 = str.substring(4, 20); //EUI(64b)

    var strOut4 = str.substring(20, 22); //Device Status(8b)
    var strOut5 = str.substring(22, 26); //Battery Voltage(16b)
    var strOut6 = str.substring(26, 30); //CounterA(16b)
    var strOut7 = str.substring(30, 34); //CounterB(16b)
    var strOut8 = str.substring(34, 36); //SensorStatus(8b)
	var strOut9 = str.substring(36, 40); //TotalCounterA(16b)
    var strOut10 = str.substring(40, 44); //TotalCounterB(16b)
    var strOut11 = str.substring(44, 46); //PayloadCounter(8b)

    var d = {
        DeviceStatus: strOut4,
        BatteryVoltage: parseInt(strOut5, 16),
        CounterA: parseInt("0x" + strOut6),
        CounterB: parseInt("0x" + strOut7),
        SensorStatus: strOut8,
        TotalCntA: parseInt("0x" + strOut9),
        TotalCntB: parseInt("0x" + strOut10),
        PayloadCounter: parseInt("0x" + strOut11),
    };

    return d;
}
}
*/


//Elsys Decoder (Superceded by general function)
// Still needed for deviceTypeId 21, I still need to convert that one (Erik)
// Basically just needs the rest of the types defined (Erik)
// Also needs some redefining of the decodeConfig format to allow for several values per type (Erik)
/* if(typeof this.elsysDecoder == "undefined") {
	this.elsysDecoder = function () {
		const TYPE_TEMP = 0x01; //temp 2 bytes -3276.8°C -->3276.7°C
		const TYPE_RH = 0x02; //Humidity 1 byte  0-100%
		const TYPE_ACC = 0x03; //acceleration 3 bytes X,Y,Z -128 --> 127 +/-63=1G
		const TYPE_LIGHT = 0x04; //Light 2 bytes 0-->65535 Lux
		const TYPE_MOTION = 0x05; //No of motion 1 byte  0-255
		const TYPE_CO2 = 0x06; //Co2 2 bytes 0-65535 ppm
		const TYPE_VDD = 0x07; //VDD 2byte 0-65535mV
		const TYPE_ANALOG1 = 0x08; //VDD 2byte 0-65535mV
		const TYPE_GPS = 0x09; //3bytes lat 3bytes long binary
		const TYPE_PULSE1 = 0x0a; //2bytes relative pulse count
		const TYPE_PULSE1_ABS = 0x0b; //4bytes no 0->0xFFFFFFFF
		const TYPE_EXT_TEMP1 = 0x0c; //2bytes -3276.5C-->3276.5C
		const TYPE_EXT_DIGITAL = 0x0d; //1bytes value 1 or 0
		const TYPE_EXT_DISTANCE = 0x0e; //2bytes distance in mm
		const TYPE_ACC_MOTION = 0x0f; //1byte number of vibration/motion
		const TYPE_IR_TEMP = 0x10; //2bytes internal temp 2bytes external temp -3276.5C-->3276.5C
		const TYPE_OCCUPANCY = 0x11; //1byte data
		const TYPE_WATERLEAK = 0x12; //1byte data 0-255
		const TYPE_GRIDEYE = 0x13; //65byte temperature data 1byte ref+64byte external temp
		const TYPE_PRESSURE = 0x14; //4byte pressure data (hPa)
		const TYPE_SOUND = 0x15; //2byte sound data (peak/avg)
		const TYPE_PULSE2 = 0x16; //2bytes 0-->0xFFFF
		const TYPE_PULSE2_ABS = 0x17; //4bytes no 0->0xFFFFFFFF
		const TYPE_ANALOG2 = 0x18; //2bytes voltage in mV
		const TYPE_EXT_TEMP2 = 0x19; //2bytes -3276.5C-->3276.5C
		const TYPE_EXT_DIGITAL2 = 0x1a; // 1bytes value 1 or 0
		const TYPE_EXT_ANALOG_UV = 0x1b; // 4 bytes signed int (uV)
		const TYPE_DEBUG = 0x3d; // 4bytes debug

		function bin16dec(bin) {
			var num = bin & 0xffff;
			if (0x8000 & num) num = -(0x010000 - num);
			return num;
		}

		function bin8dec(bin) {
			var num = bin & 0xff;
			if (0x80 & num) num = -(0x0100 - num);
			return num;
		}

		function DecodeElsysPayload(data) {
			var obj = new Object();
			for (i = 0; i < data.length; i++) {
				//console.log(data[i]);
				switch (data[i]) {
					case TYPE_TEMP: //Temperature
						var temp = (data[i + 1] << 8) | data[i + 2];
						temp = bin16dec(temp);
						obj.temperature = temp / 10;
						i += 2;
						break;
					case TYPE_RH: //Humidity
						var rh = data[i + 1];
						obj.humidity = rh;
						i += 1;
						break;
					case TYPE_ACC: //Acceleration
						obj.x = bin8dec(data[i + 1]);
						obj.y = bin8dec(data[i + 2]);
						obj.z = bin8dec(data[i + 3]);
						i += 3;
						break;
					case TYPE_LIGHT: //Light
						obj.light = (data[i + 1] << 8) | data[i + 2];
						i += 2;
						break;
					case TYPE_MOTION: //Motion sensor(PIR)
						obj.motion = data[i + 1];
						i += 1;
						break;
					case TYPE_CO2: //CO2
						obj.co2 = (data[i + 1] << 8) | data[i + 2];
						i += 2;
						break;
					case TYPE_VDD: //Battery level
						obj.vdd = (data[i + 1] << 8) | data[i + 2];
						i += 2;
						break;
					case TYPE_ANALOG1: //Analog input 1   1Jt0!hnEOez62I
						obj.analog1 = (data[i + 1] << 8) | data[i + 2];
						i += 2;
						break;
					case TYPE_GPS: //gps
						i++;
						obj.lat = (data[i + 0] | (data[i + 1] << 8) | (data[i + 2] << 16) | (data[i + 2] & 0x80 ? 0xff << 24 : 0)) / 10000;
						obj.long = (data[i + 3] | (data[i + 4] << 8) | (data[i + 5] << 16) | (data[i + 5] & 0x80 ? 0xff << 24 : 0)) / 10000;
						i += 5;
						break;
					case TYPE_PULSE1: //Pulse input 1
						obj.pulse1 = (data[i + 1] << 8) | data[i + 2];
						i += 2;
						break;
					case TYPE_PULSE1_ABS: //Pulse input 1 absolute value
						var pulseAbs = (data[i + 1] << 24) | (data[i + 2] << 16) | (data[i + 3] << 8) | data[i + 4];
						obj.pulseAbs = pulseAbs;
						i += 4;
						break;
					case TYPE_EXT_TEMP1: //External temp
						var temp = (data[i + 1] << 8) | data[i + 2];
						temp = bin16dec(temp);
						obj.externalTemperature = temp / 10;
						i += 2;
						break;
					case TYPE_EXT_DIGITAL: //Digital input
						obj.digital = data[i + 1];
						i += 1;
						break;
					case TYPE_EXT_DISTANCE: //Distance sensor input
						obj.distance = (data[i + 1] << 8) | data[i + 2];
						i += 2;
						break;
					case TYPE_ACC_MOTION: //Acc motion
						obj.accMotion = data[i + 1];
						i += 1;
						break;
					case TYPE_IR_TEMP: //IR temperature
						var iTemp = (data[i + 1] << 8) | data[i + 2];
						iTemp = bin16dec(iTemp);
						var eTemp = (data[i + 3] << 8) | data[i + 4];
						eTemp = bin16dec(eTemp);
						obj.irInternalTemperature = iTemp / 10;
						obj.irExternalTemperature = eTemp / 10;
						i += 4;
						break;
					case TYPE_OCCUPANCY: //Body occupancy
						obj.occupancy = data[i + 1];
						i += 1;
						break;
					case TYPE_WATERLEAK: //Water leak
						obj.waterleak = data[i + 1];
						i += 1;
						break;
					case TYPE_GRIDEYE: //Grideye data
						i += 65;
						break;
						// Code from official website
						// var ref = data[i+1];
						// i++;
						// obj.grideye = [];
						// for(var j = 0; j < 64; j++) {
							// obj.grideye[j] = ref + (data[1+i+j] / 10.0);
						// }
						// i += 64;
						// break;
					case TYPE_PRESSURE: //External Pressure
						var temp = (data[i + 1] << 24) | (data[i + 2] << 16) | (data[i + 3] << 8) | data[i + 4];
						obj.pressure = temp / 1000;
						i += 4;
						break;
					case TYPE_SOUND: //Sound
						obj.soundPeak 	= data[i + 1];
						obj.soundAvg = data[i + 2];
						i += 2;
						break;
					case TYPE_PULSE2: //Pulse 2
						obj.pulse2 = (data[i + 1] << 8) | data[i + 2];
						i += 2;
						break;
					case TYPE_PULSE2_ABS: //Pulse input 2 absolute value
						obj.pulseAbs2 = (data[i + 1] << 24) | (data[i + 2] << 16) | (data[i + 3] << 8) | data[i + 4];
						i += 4;
						break;
					case TYPE_ANALOG2: //Analog input 2
						obj.analog2 = (data[i + 1] << 8) | data[i + 2];
						i += 2;
						break;
					case TYPE_EXT_TEMP2: //External temp 2
						var temp = (data[i + 1] << 8) | data[i + 2];
						temp = bin16dec(temp);
						obj.externalTemperature2 = temp / 10;
						i += 2;
						break;
					case TYPE_EXT_DIGITAL2: //Digital input 2
						obj.digital2 = data[i + 1];
						i += 1;
						break;
					case TYPE_EXT_ANALOG_UV: //Load cell analog uV
						obj.analogUv = (data[i + 1] << 24) | (data[i + 2] << 16) | (data[i + 3] << 8) | data[i + 4];
						i += 4;
						break;
					default:
						//something is wrong with data
						i = data.length;
						break;
				}
			}
			return obj;
		}

		return {
			decode: DecodeElsysPayload, //DecodeElsysPayload: DecodeElsysPayload
		};
}
}
 */


//ellenex (Superceded by general decoder (fixed position)
/*
if (typeof this.ellenexDecoder == "undefined") {
    this.ellenexDecoder = function () {
    function Singed16BitInteger(rawtemp) {
        if (rawtemp > 32767) {
            return rawtemp - 65536;
        } else {
            return rawtemp;
        }
    }

    function decode(payloadRaw, sensorRange) {
        var obj = {};
        let i = 0;
        let value = 0;

        // Board Serial 2 bytes
        value = (payloadRaw[i++] << 8) | payloadRaw[i++];
        obj.boardserial = value;

        // Data Type 1 bytes - always 0, ignore
        value = payloadRaw[i++];
        obj.dataType = value;
        console.log(i);

        // Pressure 2 bytes
        value = (payloadRaw[i++] << 8) | payloadRaw[i++];
        obj.rawPressure = value;
        obj.height = sensorRange * ((obj.rawPressure - 4000) / 16000); // water height in millimeter
        console.log(i);

        // Temperature 2 bytes
        value = (payloadRaw[i++] << 8) | payloadRaw[i++];
        obj.temperature = Singed16BitInteger(value) / 100; // degree centigrade
        console.log(i);

        // battery voltage 1 bytes (1/10 V)
        value = payloadRaw[i++];
        obj.vdd = value * 100; // mV
        //obj.voltage = value / 10     //Ola added /10
        return obj;
    }

    return {
        decode: decode,
    };
}
}
*/
