import test from 'node:test';
import assert from 'node:assert/strict';
import {validImage,MAX_IMAGE_BYTES} from '../lib/server/images.mjs';
test('accepts bounded raster data URLs and rejects other types and malformed encodings',()=>{
 assert.equal(validImage('data:image/png;base64,iVBORw0KGgo='),true);
 for(const value of [null,{},'https://example.com/a.png','data:image/svg+xml;base64,PHN2Zz4=','data:image/png;base64,','data:image/png;base64,a===']) assert.equal(validImage(value),false);
});
test('enforces decoded byte limit at boundary',()=>{
 assert.equal(validImage('data:image/jpeg;base64,'+Buffer.alloc(MAX_IMAGE_BYTES).toString('base64')),true);
 assert.equal(validImage('data:image/jpeg;base64,'+Buffer.alloc(MAX_IMAGE_BYTES+1).toString('base64')),false);
});
