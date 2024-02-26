import React, { useState } from "react"

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState("No file chosen")

  return (
    <form>
      <div className='flex flex-row items-center'>
        <input
          type='file'
          id='custom-input'
          onChange={(e) => setSelectedFile(e.target.files[0].name)}
          className='hidden'
        />
        <label
          htmlFor='custom-input'
          className='block text-sm text-gray-500 mr-4 py-2 px-4
              rounded-md border border-gray-300 text-sm font-semibold bg-blue-900
              text-white hover:bg-green-600 cursor-pointer'>
          Choose file
        </label>
        <label className='text-sm text-gray-500'>{selectedFile}</label>
      </div>
    </form>
  )
}

export default FileInput
