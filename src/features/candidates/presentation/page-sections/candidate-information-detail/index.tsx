import TabCustomize from 'shared/components/tab'
import CandidateGeneral from '../CandidateGeneral'
import CandidateActivities from '../CandidateActivities'
import { ContainerMain } from '../../components/Container'

const CandidateInformationDetail = () => {
  const renderItem = [
    { label: 'General', Component: CandidateGeneral },
    { label: 'Activities', Component: CandidateActivities },
  ]

  return (
    <ContainerMain
      square
      sx={{
        border: '1px solid #e3e6eb',
      }}
    >
      <TabCustomize
        renderItem={renderItem}
        TabListProps={{
          TabIndicatorProps: {
            style: {
              backgroundColor: 'transparent',
            },
          },
        }}
        tabWrapperSx={{
          fontSize: '15px',
          color: '#4D607A',
          backgroundColor: 'white',
          '&.Mui-selected': {
            color: '#00508A',
            fontWeight: '500',
            borderBottom: 'none',
          },
        }}
        tabPanelSx={{
          borderRadius: '0px',
          boxShadow: 'none',
        }}
      ></TabCustomize>
    </ContainerMain>
  )
}

export default CandidateInformationDetail
