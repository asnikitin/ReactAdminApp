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
                  <TextField source="id" />
                  {/* <ReferenceField label="User" source="userId" reference="users">
                      <TextField source="name" />
                  </ReferenceField> */}
                  <TextField source="userId" />
                  <ImageField source="image" />
                  <TextField source="title" />
                  <TextField source="body" />
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
            <TextField source="userId" />


            <ImageInput source="image" label="Image" accept="image/*" placeholder={<p>Drop your file here</p>}>
              <ImageField source="image" title="Image" />
          </ImageInput>



          <TextInput source="title" />
            <LongTextInput source="body" />
          </SimpleForm>


    </Edit>
);


export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>

{console.log(props)}
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>




          <ArrayInput source="posts">
              <SimpleFormIterator>
                  <DateInput source="date" />
                  <TextInput source="url" />
                  <ImageInput source="image" label="Image" accept="image/*" placeholder={<p>Drop your file here</p>}>
                    <ImageField source="image" title="Image" />
                </ImageInput>
              </SimpleFormIterator>
          </ArrayInput>

          <ArrayInput source="comments">
              <SimpleFormIterator>
                  <DateInput source="date" />
                  <TextInput source="url" />
                  <ImageInput source="image" label="Image" accept="image/*" placeholder={<p>Drop your file here</p>}>
                    <ImageField source="image" title="Image" />
                </ImageInput>
              </SimpleFormIterator>
          </ArrayInput>

          <ArrayInput source="settings">
              <SimpleFormIterator>
                  <DateInput source="date" />
                  <TextInput source="url" />
                  <ImageInput source="image" label="Image" accept="image/*" placeholder={<p>Drop your file here</p>}>
                    <ImageField source="image" title="Image" />
                </ImageInput>
              </SimpleFormIterator>
          </ArrayInput>


          <FileInput source="files" label="Files" accept="image/*" multiple>
            <FileField source="files" title="files" />
          </FileInput>



          <ArrayInput source="forwardlinks">
              <SimpleFormIterator>
                  <TextInput source="name" />
                  <ImageInput source="image" label="Image" accept="image/*" placeholder={<p>Drop your file here</p>}>
                    <ImageField source="image" title="Image" />
                </ImageInput>
                <DateInput source="date" label="" />
                <TextInput source="text" label="" />
              </SimpleFormIterator>
          </ArrayInput>




          <TextInput source="title" />
            <LongTextInput source="body" />
          </SimpleForm>


    </Create>
);
