'use strict'

let _check   = require('./testHelper').check
let _summary = require('./testHelper').summary
let util     = require('util')
let _inspect = util.inspect

let coerce   = require('./index')
let deepEqu  = function(a, b) {
    let _deepEqu = require('assert').deepStrictEqual
    try      {_deepEqu(a, b)}
    catch(e) {return false}
    return true
}

let check = (name, op, vals) => {
    let pairs = vals.length / 2
    if ((pairs|0) !== pairs)
        throw new Error('vals must be pairs of [input, expected]')
    for (let i=0; i!=pairs; ++i) {
        let input  = vals[2*i]
        let expect = vals[2*i+1]
        let output = op(input)
        _check(
            name+': '+_inspect(input)+' => '+_inspect(expect)+' / '+_inspect(output),
            deepEqu( output, expect )
        )
    }

}

// Name, Op, {Input, Expected}*
check('int', coerce.int, [
    0,         0,
    1,         1,
    '0',       0,
    '1',       1,
    3.14,      3,
    9.99,      9,
    '-6',      -6,
    '-6.67',   -6,
    '3.14',    3,
    '3.1a',    undefined,
    '4b',      undefined,
    'inv',     undefined,
    [],        undefined,
    {},        undefined,
    ()=>0,     undefined,
    undefined, undefined
])

check('float', coerce.float, [
    '1.234',      1.234,
    '1',          1,
    '0',          0,
    1,            1,
    9.99,         9.99,
    '-3',         -3,
    '-3.14',      -3.14,
    '3.x',        undefined,
    '-3x',        undefined,
    [],           undefined,
    undefined,    undefined
])

check('bool', coerce.bool, [
    'true',       true,
    'True',       true,
    'TRUE',       true,
    '1',          true,
    1,            true,
    true,         true,
    'false',      false,
    'False',      false,
    'FALSE',      false,
    '0',          false,
    0,            false,
    false,        false,
    123,          undefined,
    'faLse',      undefined,
    'tRUE',       undefined,
    '000',        undefined,
    null,         undefined,
    undefined,    undefined,
    [],           undefined,
    ()=>true,     undefined
])


check('string', coerce.string, [
    'abc',        'abc',
    1.23,         '1.23',
    null,         'null',
    undefined,    'undefined',
    true,         'true',
    [1,2],        util.inspect([1,2]),
    {a:1},        util.inspect({a:1})
])

check('defArray', coerce.array, [
    1,               [1],
    'nosplit',       ['nosplit'],
    '1,2,3',         ['1', '2', '3'],
    'a c , d f,xyz', ['a c', 'd f', 'xyz'],
    [1],             [1],
    [1,'a',null],    [1, 'a', null],
    {},              [{}],
    null,           undefined,
    undefined,      undefined
])

check('intArray', coerce.arrayOf(coerce.int), [
    '1,2,3',         [1,2,3],
    '1,b,3',         [1,undefined,3],
    123,             [123],
    [1,2],           [1,2],
    ['1','2'],       [1,2],
    '123',           [123]
])

check('boolArray', coerce.arrayOf(coerce.bool), [
    '1,true,True',   [true,  true,  true],
    '1,false,True',  [true,  false, true],
    [0,1,0,1],       [false, true,  false, true],
    '1,undef,0',     [true,  undefined, false],
    '1',             [true]
])

check('strArray', coerce.arrayOf(coerce.string), [
    [1,'s',null],    ['1', 's', 'null'],
    '1',             ['1'],
    [true, 1, null], ['true', '1', 'null']
])

_summary()
