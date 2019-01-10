const callApi = async (files) => {


  const formData = new FormData()
formData.append('files', files)


  var fetchConf = { method: 'POST',
                headers: {
  "Content-Type": 'multipart/form-data'   },
   body: formData,
   dody: '232323',

               cache: 'default' };

               console.log("Attempting to send fetchConf", fetchConf);

   const response = await fetch('http://localhost:3001/upload', fetchConf);
const body = await response;  console.log("response", response);
if (response.status !== 200) throw Error(body.message);
 return body; };



/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => (type, resource, params) => {
    if (type === 'UPDATE' || type === 'CREATE' && resource === 'posts') {
        // notice that following condition can be true only when `<ImageInput source="pictures" />` component has parameter `multiple={true}`
        // if parameter `multiple` is false, then data.pictures is not an array, but single object


        if (params.data.gallery && params.data.gallery.length) {

            const formerPictures = params.data.gallery.filter(p => !(p.rawFile instanceof File));
            const newPictures = params.data.gallery.filter(p => p.rawFile instanceof File);

            //  now we need to send a fetch ({ newPictures}) to upload

console.log(newPictures[0] instanceof File);
console.log(newPictures[0].rawFile instanceof File);
            return Promise.all(callApi(params.data.gallery).then(body  => console.log('body inpromise')))
                // .then(transformedNewPictures => requestHandler(type, resource, {
                //     ...params,
                //     data: {
                //         ...params.data,
                //         gallery: [...transformedNewPictures, ...formerPictures],
                //     },
                // }));
        }




    }
    // for other request types and resources, fall back to the default request handler
    return requestHandler(type, resource, params);
};

export default addUploadFeature;
