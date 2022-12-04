import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { addDocumentToCollection } from '../utils/firebaseFunctions'

const Editor = () => {
  const [key, setKey] = useState('')
  const [title, setTitle] = useState('')
  const [preview, setPreview] = useState('')
  const [bodyText, setBodyText] = useState('')
  const [createTime, setCreateTime] = useState()
  const [publishTime, setPublishTime] = useState()
  const [isPublished, setIsPublished] = useState()

  const ownerId = 'deneme'

  const newArticleObject = {
    key: key,
    title: title,
    preview: preview,
    body: bodyText,
    createdAt: createTime,
    publishedAt: publishTime,
    status: isPublished,
    ownerId: ownerId,
  }

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  return (
    <>
      <input placeholder='Key...' onChange={(e) => setKey(e.target.value)} />
      <input
        placeholder='Title...'
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder='Preview...'
        onChange={(e) => setPreview(e.target.value)}
      />

      <ReactQuill
        modules={modules}
        theme='snow'
        onChange={setBodyText}
        placeholder='Content goes here...'
      />
      <input
        type={'checkbox'}
        onChange={(e) => setIsPublished(e.target.value)}
      />
      <button
        onClick={async () => {
          if (isPublished && publishTime === undefined) {
            setPublishTime(new Date().toJSON())
          }
          setCreateTime(new Date().toJSON())
          await addDocumentToCollection(newArticleObject, key, 'articles')
        }}
      >
        Save
      </button>
    </>
  )
}

export default Editor
