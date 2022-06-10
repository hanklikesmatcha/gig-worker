import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  InputField,
  Submit,
} from '@redwoodjs/forms'
import { useEffect, useState } from 'react'
import { supabase } from 'src/utils/supabaseClient'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}
// TODO: Figure out how to store image url for a Talent
const TalentForm = (props) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const onSubmit = async (event) => {
    event.profilePhoto =
      event.profilePhoto[0].lastModified + '_' + event.profilePhoto[0].name
    props.onSave(event, props?.talent?.id)
    const { data, error } = await supabase.storage
      .from('gig-worker')
      .upload(event.profilePhoto, selectedImage, {
        cacheControl: '3600',
        upsert: false,
      })
  }
  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <Label
          name="profilePhoto"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Profile photo
        </Label>

        <InputField
          type="file"
          accept="image/gif"
          name="profilePhoto"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          onChange={(event) => {
            setSelectedImage(event.target.files[0])
          }}
        />
        <FieldError name="profilePhoto" className="rw-field-error" />
        <Label
          name="firstName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          First name
        </Label>
        <TextField
          name="firstName"
          defaultValue={props.talent?.firstName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="firstName" className="rw-field-error" />
        <Label
          name="lastName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Last name
        </Label>
        <TextField
          name="lastName"
          defaultValue={props.talent?.lastName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="lastName" className="rw-field-error" />
        <Label
          name="mobile"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Mobile
        </Label>
        <TextField
          name="mobile"
          defaultValue={props.talent?.mobile}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="mobile" className="rw-field-error" />
        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>
        <TextField
          name="email"
          defaultValue={props.talent?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="email" className="rw-field-error" />
        <Label
          name="intro"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Intro
        </Label>
        <TextField
          name="intro"
          defaultValue={props.talent?.intro}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="intro" className="rw-field-error" />
        <Label
          name="location"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Location
        </Label>
        <TextField
          name="location"
          defaultValue={props.talent?.location}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="location" className="rw-field-error" />
        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TalentForm
