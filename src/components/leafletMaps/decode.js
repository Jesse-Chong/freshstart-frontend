/*
 * Copyright (C) 2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 * License-Filename: LICENSE
 */
// Table for decoding characters back into numbers
const DECODING_TABLE = [
    62, -1, -1, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, -1, -1, -1, -1, 63, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
];
// Version of the encoding format
const FORMAT_VERSION = 1;

// Constants for third dimension types
const ABSENT = 0;
const LEVEL = 1;
const ALTITUDE = 2;
const ELEVATION = 3;
// Reserved values 4 and 5 should not be selectable
const CUSTOM1 = 6;
const CUSTOM2 = 7;

// Use BigInt if available, otherwise fallback to Number
const Num = typeof BigInt !== "undefined" ? BigInt : Number;

function decode(encoded) {
    // Decode the string into an array of numbers
    const decoder = decodeUnsignedValues(encoded);
    // Extract header information
    const header = decodeHeader(decoder[0], decoder[1]);

    // Calculate scaling factors based on precision
    const factorDegree = 10 ** header.precision;
    const factorZ = 10 ** header.thirdDimPrecision;
    const { thirdDim } = header;

    let lastLat = 0;
    let lastLng = 0;
    let lastZ = 0;
    const res = [];

    // Decode each coordinate
    let i = 2;
    for (;i < decoder.length;) {
        // Use delta encoding to reconstruct coordinates
        const deltaLat = toSigned(decoder[i]);
        const deltaLng = toSigned(decoder[i + 1]);
        lastLat += deltaLat;
        lastLng += deltaLng;

        if (thirdDim) {
            const deltaZ = toSigned(decoder[i + 2]);
            lastZ += deltaZ;
            res.push([lastLat / factorDegree, lastLng / factorDegree, lastZ / factorZ]);
            i += 3;
        } else {
            res.push([lastLat / factorDegree, lastLng / factorDegree]);
            i += 2;
        }
    }

    // Check if all data was processed
    if (i !== decoder.length) {
        throw new Error('Invalid encoding. Premature ending reached');
    }

    return {
        ...header,
        polyline: res,
    };
}
// Helper function to decode a single character
function decodeChar(char) {
    const charCode = char.charCodeAt(0);
    return DECODING_TABLE[charCode - 45];
}
// Decode the encoded string into an array of unsigned values
function decodeUnsignedValues(encoded) {
    let result = Num(0);
    let shift = Num(0);
    const resList = [];

    encoded.split('').forEach((char) => {
        const value = Num(decodeChar(char));
        result |= (value & Num(0x1F)) << shift;
        if ((value & Num(0x20)) === Num(0)) {
            resList.push(result);
            result = Num(0);
            shift = Num(0);
        } else {
            shift += Num(5);
        }
    });

    if (shift > 0) {
        throw new Error('Invalid encoding');
    }

    return resList;
}


// Decode the header information
function decodeHeader(version, encodedHeader) {
    if (+version.toString() !== FORMAT_VERSION) {
        throw new Error('Invalid format version');
    }
    const headerNumber = +encodedHeader.toString();
    const precision = headerNumber & 15;
    const thirdDim = (headerNumber >> 4) & 7;
    const thirdDimPrecision = (headerNumber >> 7) & 15;
    return { precision, thirdDim, thirdDimPrecision };
}
// Convert an unsigned value to a signed value
function toSigned(val) {
    let res = val;
    if (res & Num(1)) {
        res = ~res;
    }
    res >>= Num(1);
    return +res.toString();
}

export {
    decode,
    ABSENT,
    LEVEL,
    ALTITUDE,
    ELEVATION
};