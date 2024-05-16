import BlackListCandidateModal from '../BlackListCandidateModal'

interface IBlackListCandidateModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  is_black_list?: boolean
  title: string
}

const AddBlackListCandidateModal = ({is_black_list = true, ...props}: IBlackListCandidateModal) => {
  return <BlackListCandidateModal is_black_list={is_black_list} {...props} />
}

export default AddBlackListCandidateModal