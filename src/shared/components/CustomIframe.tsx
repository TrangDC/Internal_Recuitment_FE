import { CSSProperties } from 'react'

type CustomIframeProps = {
  value: string
  title: string
  iframeStyle?: CSSProperties
}

function CustomIframe({ value, title, iframeStyle }: CustomIframeProps) {
  const iframeContent = `
    <html>
      <head>
        <style>
          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 4px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: #8CA3BA;
            border-radius: 5px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #8CA3BA;
          }
          /* For Firefox */
          body {
            scrollbar-width: thin;
            scrollbar-color: #888 #f1f1f1;
          }
          /* Additional body styling */
          body {
            font-family:Montserrat , sans-serif;
            font-size:12px
          }
        </style>
      </head>
      <body>
        ${value}
      </body>
    </html>
  `

  return <iframe style={iframeStyle} srcDoc={iframeContent} title={title} />
}

export default CustomIframe
