import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, Popper, styled, TextField, Typography } from "@mui/material";
import FlexBox from "shared/components/flexbox/FlexBox";

export const AccordionWrapper = styled(Accordion)(({ theme }) => ({
  borderBottom: '1px solid #E3E6EB',
  margin: '0px !important',

  '&:before': {
    height: '0px'
  }
}))

export const AccordionHeader = styled(AccordionSummary)(({ theme }) => ({
  flexDirection: 'row-reverse',
  padding: '6px 12px',

  '.Mui-expanded & #down_icon': {
    position: 'relative',
    left: '7px',
    top: '7px'
  }
}))

export const AccordionBody = styled(AccordionDetails)(({ theme }) => ({
  padding: 0
}))

export const FlexBoxBody = styled(FlexBox)(({ theme }) => ({
  padding: '6px 12px 6px 50px',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

export const TextFieldPopper = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}))

export const ButtonFilterStyled = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  boxShadow: 'none',
  fontSize: '12px',
  height: '20px',
  WebkitBoxPack: 'start',
  justifyContent: 'flex-start',
  padding: '0px 5px',
  border: 'none',

  '& span': {
    color: theme.palette.primary[800],
    fontWeight: 500,
    fontSize: 13,
    lineHeight: '15.85px',
  },

  '&:hover': {
    border: 'none',
    backgroundColor: 'white',
  },
}))

export const TypographyStyled = styled(Typography)(({ theme }) => ({
  minWidth: '285px',
  maxWidth: '500px',
  backgroundColor: 'white',
  boxShadow:
    'rgba(40, 41, 61, 0.04) 0px 2px 4px 0px, rgba(96, 97, 112, 0.16) 0px 8px 16px 0px',

  '& .MuiInputBase-root': {
    backgroundColor: 'white',
  },
}))

export const PopperStyled = styled(Popper)(({ theme }) => ({
  zIndex: 1300,
}))

export const SkillContainerWrapper = styled(FlexBox)(({ theme }) => ({
  flexDirection: 'column',
  borderRadius: '4px',
  overflow: 'hidden',
  border: '1px solid #d1cccc',
  boxShadow: '0px 2px 4px 0px #28293D0A',
}))

export const ChipSkill = styled(Chip)(({ theme }) => ({
  backgroundColor: '#F1F9FF',
  fontSize: '14px',
  color: '#121625',
  lineHeight: '21px',
  fontWeight: 500,
  marginRight: 0.5,
  marginBottom: 0.5,
}))