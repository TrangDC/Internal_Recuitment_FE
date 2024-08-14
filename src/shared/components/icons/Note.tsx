import { SvgIcon, SvgIconProps } from '@mui/material'

const Note = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" fill="#F1F9FF" />
      {/* <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#B6DEFC" /> */}
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.0522 12.2034L26.4431 16.5943C26.7794 16.9306 26.9703 17.3943 26.9703 17.8761V26.2124C26.9703 27.2124 26.1522 28.0306 25.1522 28.0306H15.1431C14.1431 28.0306 13.334 27.2124 13.334 26.2124L13.3431 13.4852C13.3431 12.4852 14.1522 11.667 15.1522 11.667H20.7613C21.2431 11.667 21.7067 11.8579 22.0522 12.2034ZM21.5158 18.0306H25.6067L20.6067 13.0306V17.1215C20.6067 17.6215 21.0158 18.0306 21.5158 18.0306ZM15.531 20.5306H24.6976V22.1973H15.531V20.5306ZM24.6976 23.864H15.531V25.5306H24.6976V23.864Z"
        fill="#1F84EB"
      />
    </SvgIcon>
  )
}

export default Note
