const OSS = require('ali-oss');

const client = new OSS({
    
});

const headers = {
    'Access-Control-Allow-Origin': '*',
};

export async function put (file, path) {
    let fullPath = path ? '/'+path.join('/') : '/images'
    try {
      const r1 = await client.put( fullPath + '/' + file.name , file.raw, headers);
      return r1
    } catch (e) {
      console.error('error: %j', e);
    }
  }
