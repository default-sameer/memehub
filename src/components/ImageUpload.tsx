import React from 'react'

interface imageUrl{
    setImageUrl: any
}

const ImageUploader = ({setImageUrl}: imageUrl) => {
    const dropbox = React.useRef(null)
    const fileSelect = React.useRef(null)
    const [image, setImage] = React.useState(null)
    const [progress, setProgress] = React.useState(0)

    async function handleImageUpload() {
        if (fileSelect) {
            // @ts-ignore
            fileSelect.current.click()
        }
    }

    // @ts-ignore
    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            uploadFile(files[i])
        }
    }

    function uploadFile(file : File) {
        // ToDo: Upload file to Real server
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`
        const xhr = new XMLHttpRequest()
        const fd = new FormData()
        xhr.open('POST', url, true)
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

        // Update progress (can be used to show progress indicator)
        xhr.upload.addEventListener('progress', (e) => {
            setProgress(Math.round((e.loaded * 100.0) / e.total))
        })
        
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const response = JSON.parse(xhr.responseText)

                setImage(response.secure_url)
                // @ts-ignore
                setImageUrl(response.secure_url)
            }
        }

        fd.append(
            'upload_preset',
            // ToDo: Replace with your own preset
            process.env.NEXT_PUBLIC_UPLOAD_PRESET
        )
        fd.append('tags', 'browser_upload')
        fd.append('file', file)
        xhr.send(fd)

    }

    React.useEffect(() => {
        function dragEnter(e : React.DragEvent<HTMLDivElement>) {
            e.stopPropagation()
            e.preventDefault()
        }

        function dragOver(e : React.DragEvent<HTMLDivElement>) {
            e.stopPropagation()
            e.preventDefault()
        }

        function drop(e : React.DragEvent<HTMLDivElement>) {
            e.stopPropagation()
            e.preventDefault()

            const dt = e.dataTransfer
            const files = dt.files

            handleFiles(files)
        }

        // @ts-ignore
        dropbox.current.addEventListener('dragenter', dragEnter, false)
        // @ts-ignore
        dropbox.current.addEventListener('dragover', dragOver, false)
        // @ts-ignore
        dropbox.current.addEventListener('drop', drop, false)

        return () => {
            try {
                // @ts-ignore
                dropbox.current.removeEventListener('dragenter', dragEnter)
                // @ts-ignore
                dropbox.current.removeEventListener('dragover', dragOver)
                // @ts-ignore
                dropbox.current.removeEventListener('drop', drop)
            } catch(err) {
                console.log('listener error', err)
            }
        }
    }, [])
    
    return (
        <>
            <div className="mb-4 sm:mb-8 h-72 sm:h-96 w-full mx-auto" ref={dropbox}>
                {image ? (
                    <img className="rounded-lg w-full h-full" src={image.replace('upload/', 'upload/w_600/')}/>
                ) : (
                    <div
                        className="bg-[#1b1b1b] border-4 border-dashed border-gray-400 rounded-lg h-full w-full"
                    >
                        <div className="flex justify-center items-center h-full">
                            {progress === 0 ? (
                                <div className="text-head text-center">
                                    <div>Drag and Drop Memes</div>
                                    <div className="my-2">or</div>
                                    <button
                                        className="bg-palette-primary text-head border border-[#ffa31a] hover:bg-[#ffa31a] active:bg-[#ffa31a] px-4 py-2 rounded block m-auto"
                                        onClick={handleImageUpload}
                                        type="button"
                                    >
                                    Browse
                                    </button>
                                </div>
                            ) : (
                                <span className="text-gray-700">{progress}%</span>
                            )}

                            <input
                                ref={fileSelect}
                                type='file'
                                accept='image/*'
                                className="hidden"
                                onChange={(e) => handleFiles(e.target.files)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ImageUploader