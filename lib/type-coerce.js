'use strict'

let util = require('util')
let isNumber    = util.isNumber
let isString    = util.isString
let isFunction  = util.isFunction
let isArray     = util.isArray
let isSep       = (obj)=>util.isString(obj) || util.isRegExp(obj)

function int(val) {
    let ret = float(val)
    return ret===undefined ? undefined : (ret|0)
}

function float(val) {
    if ( isNumber(val) )
        return val
    if ( isString(val) ) {
        var flt = parseFloat(val)
        if ( Number.isFinite(flt) && flt.toString()===val)
            return flt
    }
    return undefined
}

function bool(val) {
    const True  = ['true',  'True',  'TRUE',  '1', 1, true]
    const False = ['false', 'False', 'FALSE', '0', 0, false]
    if ( True.indexOf(val)!==-1) return true
    if (False.indexOf(val)!==-1) return false
    return undefined
}

function string(val) {
    if ( isString(val) )
        return val
    return util.inspect(val)
}

function array(val, _elemT, _sep) {
    return arrayOf(_elemT, _sep)(val)
}

function arrayOf(_elemT, _sep) {
    // parse sep,elemT, check if any is omitted, or passed in wrong order
    let elemType = [_elemT, _sep].find(isFunction) || any
    let sep      = [_elemT, _sep].find(isSep)      || /\s*,\s*/g

    return (val) => {
        if (val===null || val===undefined)
            return undefined
        if (isString(val))
            val = val.split(sep)
        if (!isArray(val))
            val = [val]
        return val.map(elemType)
    }
}

function any(val) {
    return val
}

function date(val) {
    return new Date(val)
}

module.exports = {
    int:        int,
    float:      float,
    bool:       bool,
    string:     string,
    array:      array,
    arrayOf:    arrayOf,
    date:       date,
    any:        any
}
