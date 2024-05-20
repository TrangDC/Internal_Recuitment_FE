import { Switch, SwitchProps, styled } from '@mui/material'

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 32,
  height: 19,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(14px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor:
          theme.palette.mode === 'dark' ? '#2ECA45' : 'primary.main',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        //opacity: 0.5,
        backgroundColor: '#E3E6EB',
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      //opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      backgroundColor: '#F5F5F7',
      border: '1px solid #E3E6EB',
      opacity: 1,
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: 'white !important',
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 15,
    height: 15,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#CADFF1' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}))
