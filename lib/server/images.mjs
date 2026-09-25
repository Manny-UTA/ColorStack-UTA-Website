export const MAX_IMAGE_BYTES = Math.floor(1.4 * 1024 * 1024);
export function validImage(value) {
 if(typeof value !== 'string') return false;
 const match = /^data:image\/(jpeg|png|webp);base64,/.exec(value);
 if(!match) return false;
 const data = value.slice(match[0].length);
 if(!data.length || data.length % 4 || data.length > Math.ceil(MAX_IMAGE_BYTES/3)*4 || /[^A-Za-z0-9+/=]/.test(data) || !/^[A-Za-z0-9+/]+={0,2}$/.test(data)) return false;
 const bytes = data.length/4*3-(data.endsWith('==')?2:data.endsWith('=')?1:0);
 return bytes <= MAX_IMAGE_BYTES;
}
// Update just one slot atomically, preserving other officers' concurrent edits.
// Older versions stored either an object or a JSON-encoded string in this key.
export const UPDATE_IMAGE = `
local raw = redis.call('GET', KEYS[1])
local images = {}
if raw then
 images = cjson.decode(raw)
 if type(images) == 'string' then images = cjson.decode(images) end
 if type(images) ~= 'table' then return redis.error_reply('INVALID_IMAGE_STORE') end
end
if ARGV[2] == '' then images[ARGV[1]] = nil else images[ARGV[1]] = ARGV[2] end
redis.call('SET', KEYS[1], cjson.encode(images))
return 1
`;
