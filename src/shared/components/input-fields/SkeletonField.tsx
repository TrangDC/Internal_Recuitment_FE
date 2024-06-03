import { Skeleton, SkeletonProps, styled} from '@mui/material'
import { FC } from 'react'

const StyledSkeleton = styled(Skeleton)<SkeletonProps>(({ theme }) => ({
  width: '100%',
  height: '40px',
  transform: 'scale(1)'
}))

const SkeletonField: FC<SkeletonProps> = (props) => {
  return <StyledSkeleton {...props}/>
}

export default SkeletonField