import { Skeleton, SkeletonProps, styled } from '@mui/material'

const StyledSkeleton = styled(Skeleton)<SkeletonProps>(({ theme }) => ({
  width: '100%',
  height: '40px',
  transform: 'scale(1)',
}))

interface SekeletonFieldProps {
  children: React.ReactNode
  isloading: boolean
  skeletonProps?: SkeletonProps
}

function LoadingField({
  children,
  isloading,
  skeletonProps,
}: SekeletonFieldProps) {
  return <>{isloading ? <StyledSkeleton {...skeletonProps} /> : children}</>
}
export default LoadingField
