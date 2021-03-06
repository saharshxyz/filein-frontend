import { ReactNode, useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { useDropzone } from 'react-dropzone'

import uploadFileState from 'state/uploadFile'

export interface UploadButtonProps {
	className?: string
	children?: ReactNode
}

const UploadButton = ({ className, children }: UploadButtonProps) => {
	const uploadFile = useSetRecoilState(uploadFileState)
	
	const onDrop = useCallback((files: File[]) => {
		const file = files[0]
		
		if (file)
			uploadFile(file)
	}, [uploadFile])
	
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		noDrag: true,
		multiple: false
	})
	
	return (
		<div {...getRootProps({ className, role: 'button' })}>
			<input {...getInputProps()} />
			{children}
		</div>
	)
}

export default UploadButton
