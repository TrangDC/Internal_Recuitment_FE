import { Fragment } from 'react'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import ChangeStatusProvider from './context/KanbanJobContext'
import FilterCandidate from './components/FilterCandidate'
import RenderListByPage from './components/renderListByPaget'

const OpeningJob = () => {
  return (
    <Fragment>
      <ChangeStatusProvider>
        <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
          <HeadingWrapper sx={{ borderBottom: 0 }}>
            <FilterCandidate />
          </HeadingWrapper>
          <RenderListByPage />
        </BoxWrapperOuterContainer>
      </ChangeStatusProvider>
    </Fragment>
  )
}

export default OpeningJob
