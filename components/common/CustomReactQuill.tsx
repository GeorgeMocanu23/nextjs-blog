import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const CustomReactQuill = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      modules={modules}
      placeholder="Type your feedback here..."
      style={{ marginTop: '10px' }}
    />
  )
}

export default CustomReactQuill