import {
  Fragment,
} from 'react'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import ListCandidate from './components/ListCandidate'
import ChangeStatusProvider from './context/ChangeStatusContext'
import FilterCandidate from './components/FilterCandidate'

const OpeningJob = () => {
  return (
    <Fragment>
      <ChangeStatusProvider>
        <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
          <HeadingWrapper sx={{ borderBottom: 0 }}>
            <FilterCandidate />
          </HeadingWrapper>
          <ListCandidate />
        </BoxWrapperOuterContainer>
      </ChangeStatusProvider>
    </Fragment>
  )
}

export default OpeningJob
