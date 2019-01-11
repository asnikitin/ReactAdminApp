import React from 'react';
import { List, Datagrid, ImageField, ImageInput, FileInput, FileField, TextField, ReferenceField, EditButton, Edit, SimpleForm, DisabledInput, SelectInput, TextInput, LongTextInput, ReferenceInput , Create , Filter, Responsive, SimpleList} from 'react-admin';
import { ArrayInput, SimpleFormIterator, DateInput} from 'react-admin';
import { AutocompleteInput } from 'react-admin';



export const PostList = props => (
  <List {...props}>
      <Responsive
          small={
              <SimpleList
                  primaryText={record => record.title}
                  secondaryText={record => `${record.views} views`}
                  tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
              />
          }
          medium={
              <Datagrid>
                  <ImageField source="image" />
                  <TextField source="title" />
                  <TextField source="body" />
                  <TextField source="category" />
                  { <ReferenceField label="User" source="userId" reference="users">
                      <TextField source="name" />
                  </ReferenceField> }
                  <TextField source="id" />
                  <EditButton />
              </Datagrid>
          }
      />
  </List>
);


const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);



const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = props => (

     <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
          <DisabledInput source="id" />
            {/* <ReferenceInput source="userId" reference="users">
             <SelectInput optionText="name" />
            </ReferenceInput> */}

            <ImageInput source="gallery" label="Gallery" accept="image/*" multiple={true} placeholder={<p>Drop your file here</p>}>
              <ImageField source="gallery" title="Gallery" />
            </ImageInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
            <TextInput source="category" />
            <TextField source="userId" label="author"/>

          </SimpleForm>

    </Edit>
);



const callApi = async (data) => {

  let dat = new FormData();
    dat.append('image', data);
    dat.append('name', "Imagname");

  var fetchConf = { method: 'POST',
   files: dat,
   body: dat,
   cache: 'default' };
   const response = await fetch('http://localhost:3001/upload', fetchConf);
const body = await response;  console.log("response", response);
if (response.status !== 200) console.log(body);
 return body; };



const handleImageChange = (e) => {
     e.preventDefault();

     let reader = new FileReader();
     let file = e.rawFile;


     reader.onloadend = () => {
// return callApi(file)
     }

     reader.readAsDataURL(file)
 }

export const PostCreate = props => (




    <Create {...props}>
        <SimpleForm>

          { /* console.log(props) */ }



            <ImageInput source="gallery" label="Gallery" accept="image/*" multiple={true} placeholder={<p>Drop your file here</p>}>
              <ImageField source="gallery" title="Gallery" />
            </ImageInput>

            <TextInput source="title" />
            <LongTextInput source="body" />
            <TextInput source="category" />

            <ReferenceInput source="userId" reference="users" label="author">
                <SelectInput optionText="name" />
            </ReferenceInput>



          </SimpleForm>


    </Create>
);
