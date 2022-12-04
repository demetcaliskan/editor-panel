import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux'
import { addDocumentToCollection } from '../utils/firebaseFunctions'

const Editor = () => {
  const [key, setKey] = useState('')
  const [title, setTitle] = useState('')
  const [preview, setPreview] = useState('')
  const [bodyText, setBodyText] = useState('')
  const [createTime, setCreateTime] = useState()
  const [publishTime, setPublishTime] = useState()
  const [isPublished, setIsPublished] = useState()

  const ownerId = useSelector((state) => state.user.id)

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
    <div className='py-10 flex flex-col justify-center w-full items-center'>
      <input
        type={'checkbox'}
        onChange={(e) => setIsPublished(e.target.value)}
      />
      <div className='flex flex-col items-start w-11/12 p-6 bg-slate-400 mb-10 rounded-md shadow-md'>
        <input
          className='block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40'
          placeholder='Key...'
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          className='block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40'
          placeholder='Title...'
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className='block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40'
          placeholder='Preview...'
          onChange={(e) => setPreview(e.target.value)}
        />
      </div>
      <div className='w-11/12 p-6 bg-white rounded-md shadow-md mb-10'>
        <ReactQuill
          modules={modules}
          theme='snow'
          onChange={setBodyText}
          placeholder='Content goes here...'
        />
      </div>
      <button
        className='mb-20 w-64 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-slate-700 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600'
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
    </div>
  )
}

export default Editor
