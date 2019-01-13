// in addUploadFeature.js


const callApi = async (name, file) => {


  let dat = new FormData();
    dat.append('name', name);
    dat.append('image', file);

  var fetchConf = { method: 'POST',
   files: dat,
   body: dat,
   cache: 'default' };
   const response = await fetch('http://localhost:3001/upload', fetchConf);
  const body = await response.json();
console.log(body);
if (response.status !== 200) console.log('Error' , body);
 return body; };



/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const send_file_to_api = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    // reader.onload = () => resolve(callApi(file.Gallery, reader.result));
    reader.onload = () => resolve(callApi(file.Gallery, file.rawFile));
    reader.onerror = reject;
    reader.readAsDataURL(file.rawFile);
});

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */



const addUploadFeature = requestHandler => (type, resource, params) => {


      if (type === 'CREATE' && resource === 'posts') {


        if (params.data.gallery && params.data.gallery.length) {
            // only freshly dropped pictures are instance of File
            const formerPictures = params.data.gallery.filter(p => !(p.rawFile instanceof File));
            const newPictures = params.data.gallery.filter(p => p.rawFile instanceof File);

            return Promise.all(newPictures.map(send_file_to_api))
                .then(resolved_images => resolved_images.map((src, index) => ({
                    src: src.images,
                    title: `${newPictures[index].title}`,
                })))
                .then(transformedNewPictures => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        gallery: [...transformedNewPictures, ...formerPictures],
                    },
                }));
        }


      }


    if (type === 'UPDATE' && resource === 'posts') {

    }

    return requestHandler(type, resource, params);
};

export default addUploadFeature;
