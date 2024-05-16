import { Pagination, PaginationProps, styled } from '@mui/material'

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  padding: '16px 0',
  backgroundColor: '#ffffff',

  '& .MuiPagination-ul': {
    justifyContent: 'center',
  },
  '& .MuiPagination-ul .MuiButtonBase-root': {
    color: theme.palette.grey[300],
    border: 'none',
  },
  '& .MuiPagination-ul .MuiPaginationItem-previousNext, .MuiPaginationItem-previousNext ': {
    minWidth: '20px',
    height: '20px',
  },
 
  '& .MuiPagination-ul .Mui-selected': {
    backgroundColor: theme.palette.primary[100],
    color: theme.palette.primary[500],
  },
  '&  .MuiPagination-ul .MuiPaginationItem-previousNext': {
    border: '2px solid',
    borderColor: theme.palette.primary[500],
    color: theme.palette.primary[600],
  },
  '& .MuiPagination-ul .Mui-disabled': {
    borderColor: theme.palette.primary[300],
    color: theme.palette.primary[300],
    opacity: 1,
  },
  //   '& .MuiPaginationItem-root': { fontWeight: 600 },
  //   '& .MuiPaginationItem-page:hover': {
  //     color: '#fff',
  //     backgroundColor: theme.palette.primary.main,
  //   },
  '& .MuiPaginationItem-page.Mui-selected': {
    fontWeight: 600,
    //   color: "#fff",
    //   borderRadius: "4px",
    //   backgroundColor: theme.palette.primary.main,
  },
  //   '& .MuiPaginationItem-previousNext': {
  //     color: theme.palette.text.disabled,
  //     border: `1px solid ${theme.palette.text.disabled}`,
  //     '&:hover': { backgroundColor: 'transparent' },
  //   },
  //   '& .MuiPagination-ul li': { marginLeft: 4, marginRight: 4 },
}))

const AppPagination = (props: PaginationProps) => (
  <StyledPagination {...props} />
)

export default AppPagination
