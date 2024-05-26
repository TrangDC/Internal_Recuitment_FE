import { Box } from '@mui/material'

const GenerateInnerHTML = ({innerHTML}: {innerHTML: string}) => {
  return (
    <Box dangerouslySetInnerHTML={{ __html: innerHTML }}></Box>
  )
}

export default GenerateInnerHTML

export const innerHTMLTextArea = (str: string) => {
  return  <Box dangerouslySetInnerHTML={{ __html: str.replace(/\n/g, '<br>') }}></Box>
};